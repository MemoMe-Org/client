/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from '@/app/api/axios'
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { LoaderTwo } from '@/components/Loader'
import { useEffect, useState, FC } from 'react'
import { AxiosError, AxiosResponse } from 'axios'

const MyPage: FC<MyPage> = ({ children, param }) => {
    const token = useToken()
    const router = useRouter()

    const [data, setData] = useState<any>({})
    const [auth, setAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleMyPage = async (): Promise<void> => {
        setIsLoading(true)
        await axios.get(`/auth/api/${param}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: AxiosResponse) => {
            setAuth(true)
            setData(res.data?.user || {})
        }).catch((err: AxiosError) => {
            const statusCode: unknown = err.response?.status
            if (statusCode === 401 || statusCode === 403) {
                router.push('/login')
            } else {
                throwError(err)
            }
        }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (token) {
            handleMyPage()
        } else {
            if (token === '') {
                handleMyPage()
            }
        }
    }, [token])

    if (isLoading) return <LoaderTwo />

    const username = data?.username
    const avatar_url = data?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={auth}
                data={avatar_url ? { avatar_url } : { username }}
            />

            {children({ data })}
        </>
    )
}

export default MyPage