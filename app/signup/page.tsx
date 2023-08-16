/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState } from 'react'
import Input from '@/components/Input'
import { UserStore } from '@/utils/store'
import AuthLayout from '@/components/AuthLayout'

const page = () => {
    const {
        email, setPassword,
        password, setEmail,
    } = UserStore()

    const [password2, setPassword2] = useState<string>("")

    return (
        <AuthLayout>
            <article className='flex flex-col gap-5'>
                <Input
                    type='email'
                    label='Email'
                    value={email}
                    onChange={setEmail} />
                <Input
                    type='password'
                    label='Password'
                    value={password}
                    onChange={setPassword} />
                <Input
                    type='password'
                    label='Confirm Password'
                    value={password2}
                    onChange={setPassword2} />
            </article>
        </AuthLayout>
    )
}

export default page