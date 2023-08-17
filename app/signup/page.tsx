/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState } from 'react'
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
        email, setPassword,
        password, setEmail,
        resetStates
    } = UserStore()

    const [password2, setPassword2] = useState<string>("")

    const handleSignup = async () => {
        await axios.post('/auth/signup', {
            email, password, password2
        }).then((res: AxiosResponse) => {
            resetStates()
            setPassword2("")
            notify('success', res.data?.msg)
            setTimeout(() => {
                router.push('/login')
            }, 300)
        }).catch((err: AxiosError) => throwError(err))
    }

    return (
        <AuthLayout handler={handleSignup}>
            <article className='flex flex-col gap-5'>
                <Input
                    type='email'
                    label='Email'
                    value={email}
                    onChange={setEmail}
                />
                <Input
                    type='password'
                    label='Password'
                    value={password}
                    onChange={setPassword}
                />
                <Input
                    type='password'
                    label='Confirm Password'
                    value={password2}
                    onChange={setPassword2}
                />
            </article>
        </AuthLayout>
    )
}

export default page