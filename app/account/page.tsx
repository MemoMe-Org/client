/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState } from 'react'
import MyPage from '@/components/MyPage'
import { UserStore } from '@/utils/store'
import Input from '@/components/EditInput'
import { inter, poppins } from '@/public/fonts/f'

const page = () => {
    const {
        userId, setUserId,
        password, setPassword2,
        password2, setPassword,
    } = UserStore()

    const [pswd, setPswd] = useState<string>('')

    // edit username
    // account disabling
    // change password
    // delete your account

    return (
        <MyPage param='account'>
            {({ data }) => {
                return (
                    <main className='profile'>
                        <article className="profile-header">
                            <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                                Personal Account
                            </h1>
                        </article>
                        <section
                            className={`${poppins.className} flex flex-col gap-10 text-clr-13 mb-10`}>
                            {/* Edit Username */}
                            <article className='rounded-lg border-[0.75px] overflow-hidden'>
                                <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                    <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                        Your username
                                    </h3>
                                    <p className='text-[14px] text-clr-16'>
                                        This is your account username.
                                    </p>
                                    <Input
                                        type='text'
                                        value={userId}
                                        label='memome.one/'
                                        onChange={setUserId}
                                    />
                                </div>
                                <footer className='px-7 py-2 flex justify-between items-center bg-clr-14 w-full border-t-[0.75px]'>
                                    <p className='text-clr-17 text-sm'>
                                        Please use 32 characters at maximum.
                                    </p>
                                    <button
                                        className='bg-clr-16 hover:bg-clr-16/75 text-clr-0 rounded-lg px-3 py-1.5'>
                                        Save
                                    </button>
                                </footer>
                            </article>
                            {/* Change Password */}
                            <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                                <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                    <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                        Change Password
                                    </h3>
                                    <div className='flex flex-col gap-2.5 w-full'>
                                        <Input
                                            type='text'
                                            value={pswd}
                                            label='Current Password'
                                            onChange={setPswd}
                                        />
                                        <Input
                                            type='text'
                                            value={password}
                                            label='New Password'
                                            onChange={setPassword}
                                        />
                                        <Input
                                            type='text'
                                            value={password2}
                                            label='Confirm Password'
                                            onChange={setPassword2}
                                        />
                                    </div>
                                </div>
                                <footer className='px-7 py-2 flex justify-between items-center bg-clr-14 w-full border-t-[0.75px]'>
                                    <p className='text-clr-17 text-sm'>
                                        Please choose a strong password.
                                    </p>
                                    <button
                                        className='bg-clr-16 hover:bg-clr-16/75 text-clr-0 rounded-lg px-3 py-1.5'>
                                        Save
                                    </button>
                                </footer>
                            </article>
                        </section>
                    </main >
                )
            }}
        </MyPage>
    )
}

export default page