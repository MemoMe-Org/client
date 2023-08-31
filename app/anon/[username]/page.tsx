/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect } from 'react'
import axios from '@/app/api/axios'
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { LoaderTwo } from '@/components/Loader'
import { LuVerified } from '@/public/icons/ico'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

const page = ({ params: { username } }: Params) => {
    const token = useToken()
    const router = useRouter()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['anon-user'],
        queryFn: async () => {
            return await axios.get(
                `/api/msg/anon/${username.toLowerCase().trim()}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((res: AxiosResponse) => {
                    return res.data?.user
                }).catch((err: AxiosError) => {
                    const statusCode: unknown = err.response?.status
                    if (statusCode === 401 || statusCode === 404) {
                        router.push('/404')
                    } else {
                        throwError(err)
                    }
                })
        },
        enabled: false
    })

    useEffect(() => {
        if (token) {
            refetch()
        } else {
            if (token === '') {
                refetch()
            }
        }
    }, [token])

    if (isLoading) return <LoaderTwo />

    console.log(data)

    const name = data?.username
    const avatar_url = data?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={data?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />

            <main className='w-full min-h-screen bg-clr-12 pt-5'>
                <section className='w-[90vw] ml-9'>
                    <article className='flex gap-4 items-center'>
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex gap-2 items-center'>
                                <h5>@{data?.username}</h5>
                                {data?.verified && <LuVerified />}
                            </div>
                            <p>{data?.bio}</p>
                        </div>
                    </article>
                </section>
                <section className='w-[90vw] min-h-[250px] mx-auto py-5 px-3 rounded-lg bg-clr-0'>

                </section>
            </main>
        </>
    )
}

export default page