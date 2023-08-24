/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect } from 'react'
import axios from '@/app/api/axios'
import useToken from '@/hooks/useToken'
import throwError from '@/utils/throwError'
import { LoaderTwo } from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

const page = ({ params: { username } }: Params) => {
    const token = useToken()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['anon-user'],
        queryFn: async () => {
            return await axios.get(
                `/api/user/anon/${username.toLowerCase().trim()}?token=${token}`
            )
                .then((res: AxiosResponse) => {
                    return res.data
                }).catch((err: AxiosError) => {
                    throwError(err)
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
        <></>
    )
}

export default page