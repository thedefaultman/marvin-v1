//This code comes from trpc route handler page https://trpc.io/docs/server/adapters/nextjs#route-handlers


import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/trpc';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({})
  });

export { handler as GET, handler as POST };