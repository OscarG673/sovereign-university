import { firstRow } from '@sovereign-university/database';
import { ChangedFile, QuizQuestion } from '@sovereign-university/types';

import { Language } from '../../../const';
import { Dependencies } from '../../../dependencies';
import { ChangedContent } from '../../../types';
import {
  getContentType,
  getRelativePath,
  separateContentFiles,
} from '../../../utils';

import { createProcessLocalFile } from './local';
import { createProcessMainFile } from './main';

interface QuizQuestionDetails {
  id: number;
  path: string;
  language?: Language;
}

export interface ChangedQuizQuestion extends ChangedContent {
  id: number;
}

/**
 * Parse quiz question details from path
 *
 * @param path - Path of the file
 * @returns Quiz details
 */
export const parseDetailsFromPath = (path: string): QuizQuestionDetails => {
  const pathElements = path.split('/');

  // Validate that the path has at least 4 elements (quizzes/questions/id)
  if (pathElements.length < 3) throw new Error('Invalid quiz question path');

  const id = Number(pathElements[2]);

  if (isNaN(id)) throw new Error('Invalid quiz question path');

  return {
    id,
    path: pathElements.slice(0, 3).join('/'),
    language: pathElements[3].replace(/\..*/, '') as Language,
  };
};

export const groupByQuizQuestion = (files: ChangedFile[]) => {
  const quizQuestionsFiles = files.filter(
    (item) => getContentType(item.path) === 'quizzes/questions',
  );

  const groupedQuizQuestions = new Map<string, ChangedQuizQuestion>();

  for (const file of quizQuestionsFiles) {
    try {
      const {
        id,
        path: quizQuestionPath,
        language,
      } = parseDetailsFromPath(file.path);

      const quizQuestion: ChangedQuizQuestion = groupedQuizQuestions.get(
        quizQuestionPath,
      ) || {
        type: 'quizzes/questions',
        id,
        path: quizQuestionPath,
        files: [],
      };

      quizQuestion.files.push({
        ...file,
        path: getRelativePath(file.path, quizQuestionPath),
        language,
      });

      groupedQuizQuestions.set(quizQuestionPath, quizQuestion);
    } catch {
      console.warn(`Unsupported path ${file.path}, skipping file...`);
    }
  }

  return Array.from(groupedQuizQuestions.values());
};

export const createProcessChangedQuizQuestion =
  (dependencies: Dependencies) => async (quizQuestion: ChangedQuizQuestion) => {
    const { postgres } = dependencies;

    const { main, files } = separateContentFiles(quizQuestion, 'question.yml');

    return postgres.begin(async (transaction) => {
      const processMainFile = createProcessMainFile(transaction);
      const processLocalFile = createProcessLocalFile(transaction);

      await processMainFile(quizQuestion, main);

      const id = await transaction<QuizQuestion[]>`
          SELECT id FROM content.quiz_questions WHERE id = ${quizQuestion.id}
        `
        .then(firstRow)
        .then((row) => row?.id);

      if (!id) {
        throw new Error(
          `Quiz not found for id ${quizQuestion.id} and path ${quizQuestion.path}`,
        );
      }

      for (const file of files) {
        try {
          await processLocalFile(quizQuestion, file);
        } catch (error) {
          console.error(
            `Error processing file ${file.path} for quiz question ${quizQuestion.id}:`,
            error,
          );
        }
      }
    });
  };
