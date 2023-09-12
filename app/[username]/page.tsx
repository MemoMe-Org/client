/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import { axiosReq } from '@/app/api/axios'
import Profile from '@/components/Profile'
import { useEffect, useState } from 'react'
import throwError from '@/utils/throwError'
import { LoaderTwo } from '@/components/Loader'
import { AxiosError, AxiosResponse } from 'axios'

const page = ({ params: { username } }: Params) => {
    const token = useToken()

    const [data, setData] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleUserPage = async (): Promise<void> => {
        setIsLoading(true)
        await axiosReq.get(
            `/api/user/${username?.toLowerCase()?.trim()}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: AxiosResponse) => {
            setData(res.data || {})
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (token) {
            handleUserPage()
        } else {
            if (token === '') {
                handleUserPage()
            }
        }
    }, [token])

    if (isLoading) return <LoaderTwo />

    const name = data?.authUser?.username
    const avatar_url = data?.authUser?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={data?.authUser?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />

            <Profile
                user={data?.user}
                pathName='user'
                username={username}
            />
        </>
    )
}

export default page