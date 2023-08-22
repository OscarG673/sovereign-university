import { enforceAuthenticatedUserMiddleware } from './middlewares/auth';
import { createProcedure } from './trpc';

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = createProcedure();

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 */
export const protectedProcedure = publicProcedure.use(
  enforceAuthenticatedUserMiddleware
);
