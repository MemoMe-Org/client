/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect } from 'react'
import axios from '@/app/api/axios'
import useToken from '@/hooks/useToken'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { LoaderTwo } from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import NavBar from '@/components/Nav'

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

    return (
        <>

        </>
    )
}

export default page