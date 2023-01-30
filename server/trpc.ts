import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import Database from './db/interface';

// created for each request
// TODO: figure out some way to 
export const createContext = (
    { req, res }: trpcExpress.CreateExpressContextOptions,
) => {
    const num = 123;
    return ({ req, res, num });   
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
