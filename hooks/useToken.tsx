/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect } from 'react'
import getCookie from '@/utils/getCookie'
import { UserStore } from '@/utils/store'

const useToken = () => {
    const { token, setToken } = UserStore()

    useEffect(() => {
        const cookie = getCookie('auth')
        setToken(cookie)
    }, [document.cookie])

    return token
}

export default useToken