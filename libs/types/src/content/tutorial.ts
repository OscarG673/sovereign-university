import type { default as Tutorial } from '../sql/content/Tutorials';
import type { default as TutorialLocalized } from '../sql/content/TutorialsLocalized';
import type { default as TutorialCredits } from '../sql/content/TutorialCredits';

import { JoinedBuilder } from './builder';
import { JoinedProfessor } from './professor';

export type { default as Tutorial } from '../sql/content/Tutorials';
export type { default as TutorialLocalized } from '../sql/content/TutorialsLocalized';
export type { default as TutorialCredits } from '../sql/content/TutorialCredits';

export type JoinedTutorial = Pick<
  Tutorial,
  | 'id'
  | 'path'
  | 'level'
  | 'category'
  | 'subcategory'
  | 'last_updated'
  | 'last_commit'
> &
  Pick<
    TutorialLocalized,
    'language' | 'name' | 'description' | 'raw_content'
  > & {
    tags: string[];
  } & {
    builder?: Omit<JoinedBuilder, 'tags'>;
  };

export type JoinedTutorialCredits = TutorialCredits & {
  professor?: JoinedProfessor;
};
