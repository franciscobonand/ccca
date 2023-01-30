import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { router, createContext } from './trpc';


const app = express();
const appRouter = router({
    // TODO: add routers
});

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

app.listen(4000, () => console.log("Server is running on port 4000"));
