/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Input from '@/components/Input'
import { UserStore } from '@/utils/store'
import AuthLayout from '@/components/AuthLayout'

const page = () => {
    const {
        email, setPassword,
        password, setEmail,
    } = UserStore()

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
            </article>
        </AuthLayout>
    )
}

export default page