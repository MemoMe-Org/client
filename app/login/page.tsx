/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from '@/app/api/axios'
import notify from '@/utils/notify'
import Input from '@/components/Input'
import { UserStore } from '@/utils/store'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/AuthLayout'
import { AxiosResponse, AxiosError } from 'axios'

const page = () => {
    const router = useRouter()
    const {
        resetStates, loading, setLoading
        userId, setPassword, password, setUserId,
    } = UserStore()

    const handleLogin = async () => {
        await axios.post('/auth/login', { userId, password })
            .then((res: AxiosResponse) => {
                resetStates()
                notify('success', res.data?.msg)
                setTimeout(() => {
                    router.push('/profile')
                }, 300)
            }).catch((err: AxiosError) => throwError(err))
    }

    return (
        <AuthLayout handler={handleLogin}>
            <article className='flex flex-col gap-5'>
                <Input
                    type='text'
                    label='Email or Username'
                    value={userId}
                    onChange={setUserId}
                />
                <Input
                    type='password'
                    label='Password'
                    value={password}
                    placeholder="********"
                    onChange={setPassword}
                />
            </article>
        </AuthLayout>
    )
}

export default page