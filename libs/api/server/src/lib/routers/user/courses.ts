import { z } from 'zod';

import {
  createCompleteChapter,
  createGetProgress,
} from '@sovereign-university/api/user';

import { protectedProcedure } from '../../procedures';
import { createTRPCRouter } from '../../trpc';

export const userCoursesRouter = createTRPCRouter({
  completeChapter: protectedProcedure
    .meta({
      openapi: { method: 'POST', path: '/users/courses/chapters/complete' },
    })
    .input(
      z.object({
        courseId: z.string(),
        part: z.number(),
        chapter: z.number(),
      }),
    )
    .output(z.any())
    .mutation(({ ctx, input }) =>
      createCompleteChapter(ctx.dependencies)({
        uid: ctx.user.uid,
        courseId: input.courseId,
        part: input.part,
        chapter: input.chapter,
      }),
    ),
  getProgress: protectedProcedure
    .meta({
      openapi: { method: 'GET', path: '/users/courses/progress' },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) =>
      createGetProgress(ctx.dependencies)({ uid: ctx.user.uid }),
    ),
});
