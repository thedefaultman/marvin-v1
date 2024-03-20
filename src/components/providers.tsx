'use client'

import React, { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import { httpBatchLink } from '@trpc/client'


//This whole thing wraps the app in a trpc provider and a react-query provider. Basically make it type safe for typescript
const providers = ({children}: PropsWithChildren) => {

    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/api/trpc'
            })
        ]
    }))
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}> 
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
export default providers
