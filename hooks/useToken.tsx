/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect } from 'react'
import { UserStore } from '@/utils/store'

const useToken = () => {
    const { token, setToken } = UserStore()

    useEffect(() => {
        const authCookie = document.cookie
            .split('; ')
            .find((row: any) => row.startsWith(`auth=`))
            ?.split('=')[1] || ''

        setToken(authCookie)
    }, [])

    return token
}

export default useToken