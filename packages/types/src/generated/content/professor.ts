// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

import type { z } from 'zod';

import {
  formattedProfessorSchema,
  joinedProfessorSchema,
  professorLocalizedSchema,
  professorSchema,
} from '@sovereign-university/schemas';

export type FormattedProfessor = z.infer<typeof formattedProfessorSchema>;
export type JoinedProfessor = z.infer<typeof joinedProfessorSchema>;
export type ProfessorLocalized = z.infer<typeof professorLocalizedSchema>;
export type Professor = z.infer<typeof professorSchema>;
