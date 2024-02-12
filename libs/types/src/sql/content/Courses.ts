// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Identifier type for content.courses */
export type CoursesId = string;

/** Represents the table content.courses */
export default interface Courses {
  id: CoursesId;

  level: string;

  hours: number;

  last_updated: number;

  last_commit: string;

  last_sync: number;

  requires_payment: boolean;

  paid_price_euros?: number;

  paid_description?: string;

  paid_video_link?: string;

  paid_start_date?: number;

  paid_end_date?: number;
}

/** Represents the initializer for the table content.courses */
export interface CoursesInitializer {
  id: CoursesId;

  level: string;

  hours: number;

  /** Default value: now() */
  last_updated?: number;

  last_commit: string;

  /** Default value: now() */
  last_sync?: number;

  /** Default value: false */
  requires_payment?: boolean;

  paid_price_euros?: number;

  paid_description?: string;

  paid_video_link?: string;

  paid_start_date?: number;

  paid_end_date?: number;
}

/** Represents the mutator for the table content.courses */
export interface CoursesMutator {
  id?: CoursesId;

  level?: string;

  hours?: number;

  last_updated?: number;

  last_commit?: string;

  last_sync?: number;

  requires_payment?: boolean;

  paid_price_euros?: number;

  paid_description?: string;

  paid_video_link?: string;

  paid_start_date?: number;

  paid_end_date?: number;
}
