/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import axios from '@/app/api/axios'
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import Profile from '@/components/Profile'
import throwError from '@/utils/throwError'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderTwo } from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

const page = () => {
    const token = useToken()
    const router = useRouter()

    const [auth, setAuth] = useState<boolean>(false)

    const { refetch, data, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            return await axios.get('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res: AxiosResponse) => {
                setAuth(true)
                return res.data || {}
            }).catch((err: AxiosError) => {
                const statusCode: unknown = err.response?.status
                if (statusCode === 401 || statusCode === 403) {
                    router.push('/login')
                } else {
                    throwError(err)
                }
            })
        },
        enabled: false
    })

    useEffect(() => {
        if (token) refetch()
    }, [token])

    if (isLoading) return <LoaderTwo />

    const username = data?.user?.username
    const avatar_url = data?.user?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={auth}
                data={avatar_url ? { avatar_url } : { username }}
            />

            <Profile
                user={data?.user}
                pathName='main'
            />
        </>
    )
}

export default page