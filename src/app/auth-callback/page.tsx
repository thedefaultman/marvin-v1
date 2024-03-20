
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';



const page = async () => {
    //to pass the origin of dashboard to the auth-callback page
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const { data, isLoading, error } = trpc.authCallback.useQuery(undefined);

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
        // Handle error
        if (error && error.data?.code === "UNAUTHORIZED") {
            router.push("/sign-in");
        }
    }, [isLoading, data, router, origin, error]);

  return (
    <div className=' w-full mt-24 flex justify-center'>
      <div className=' flex flex-col items-center gap-2'>
        <Loader2 className= ' h-8 w-8 animate-spin text-zinc-800'/>
        <h3 className=' font-semibold text-xl'>Setting up your account</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  )
}

export default page
