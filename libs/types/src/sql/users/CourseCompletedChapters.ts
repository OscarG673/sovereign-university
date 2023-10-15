// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { AccountsUid } from './Accounts';
import type { CoursesId } from '../content/Courses';

/** Identifier type for users.course_completed_chapters */
export type CourseCompletedChaptersPart = number;

/** Identifier type for users.course_completed_chapters */
export type CourseCompletedChaptersChapter = number;

/** Represents the table users.course_completed_chapters */
export default interface CourseCompletedChapters {
  uid: AccountsUid;

  course_id: CoursesId;

  part: CourseCompletedChaptersPart;

  chapter: CourseCompletedChaptersChapter;

  completed_at: number;
}

/** Represents the initializer for the table users.course_completed_chapters */
export interface CourseCompletedChaptersInitializer {
  uid: AccountsUid;

  course_id: CoursesId;

  part: CourseCompletedChaptersPart;

  chapter: CourseCompletedChaptersChapter;

  /** Default value: now() */
  completed_at?: number;
}

/** Represents the mutator for the table users.course_completed_chapters */
export interface CourseCompletedChaptersMutator {
  uid?: AccountsUid;

  course_id?: CoursesId;

  part?: CourseCompletedChaptersPart;

  chapter?: CourseCompletedChaptersChapter;

  completed_at?: number;
}
