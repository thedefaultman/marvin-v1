
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { useEffect } from 'react';


const page = async () => {
    //to pass the origin of dashboard to the auth-callback page
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const { data, isLoading } = trpc.authCallback.useQuery(undefined);

    // const {data, isLoading} = trpc.authCallback.useQuery(undefined, {
    //   onSuccess: ({ success }) => {
    //     if (success) {
    //       // user is synced to db
    //       router.push(origin ? `/${origin}` : '/dashboard')
    //     }
    //   }
    // })

    //onSuccess is deprecated. using side effect
    useEffect(() => {
        if (!isLoading && data?.success) {
            // user is synced to db
            router.push(origin ? `/${origin}` : '/dashboard');
        }
    }, [isLoading, data, router, origin]);

  return (
    <div>
      
    </div>
  )
}

export default page
