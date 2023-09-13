/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from '../api/axios'
import { useState } from 'react'
import notify from '@/utils/notify'
import MyPage from '@/components/MyPage'
import { UserStore } from '@/utils/store'
import Input from '@/components/EditInput'
import SwitchBtn from '@/components/Switch'
import throwError from '@/utils/throwError'
import { inter, poppins } from '@/public/fonts/f'
import { AxiosError, AxiosResponse } from 'axios'
import { LoaderThree } from '@/components/Loader'

const page = () => {
    const {
        userId, setUserId,
        disabled, setDisabled,
        password, setPassword2,
        password2, setPassword,
    } = UserStore()

    const [pswd, setPswd] = useState<string>('')
    const [userLoading, setUserLoading] = useState<boolean>(false)
    const [pswdLoading, setPswdLoading] = useState<boolean>(false)

    const editPswd = async (): Promise<void> => {
        setPswdLoading(true)
        await axios.put(
            '/auth/api/account/reset-pswd',
            { pswd, password, password2 }
        ).then((res: AxiosResponse) => {
            notify('success', res.data?.msg)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setPswdLoading(false))
    }

    const editUsername = async (): Promise<void> => {
        setUserLoading(true)
        await axios.patch(
            '/auth/api/account/username',
            { username: userId }
        ).then((res: AxiosResponse) => {
            setUserId(res.data?.username)
            notify('success', res.data?.msg)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setUserLoading(false))
    }

    const toggleDisbility = async (): Promise<void> => {
        await axios.get(
            '/auth/api/account/disable',
        ).then((res: AxiosResponse) => {
            setDisabled(res.data?.disabled)
        }).catch((err: AxiosError) => throwError(err))
    }

    return (
        <>
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
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            Please use 32 characters at maximum.
                                        </p>
                                        <button
                                            className='save-btn-2'
                                            disabled={userId === data?.username}
                                            onClick={async () => await editUsername()}>
                                            {userLoading ? <LoaderThree /> : 'Save'}
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
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            Please choose a strong password.
                                        </p>
                                        <button
                                            className='save-btn-2'
                                            onClick={async () => await editPswd()}>
                                            {pswdLoading ? <LoaderThree /> : 'Save'}
                                        </button>
                                    </footer>
                                </article>
                                {/* Account disabling */}
                                <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                                    <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                        <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                            {disabled ? 'Enable' : 'Disable'} your Account
                                        </h3>
                                        <SwitchBtn
                                            get={disabled}
                                            set={setDisabled}
                                            handler={toggleDisbility}
                                        />
                                    </div>
                                    <footer className='px-7 py-2 flex justify-between items-center bg-clr-14 w-full border-t-[0.75px]'>
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            Make your account {disabled ? 'active.' : 'inactive.'}
                                        </p>
                                    </footer>
                                </article>
                                {/* Account Deletion */}
                                <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                                    <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                        <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                            Delete Personal Account
                                        </h3>
                                        <p className='text-[14px] text-clr-16'>
                                            Permanently remove your Personal Account and all of its contents from Memome.
                                        </p>
                                    </div>
                                    <footer className='px-7 py-2 md:flex-col md:justify-center md:gap-5 flex justify-between items-center bg-clr-20 w-full border-t-[0.75px]'>
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            This action is Irreversible, so please continue with caution.
                                        </p>
                                        <button onClick={() => notify('success', 'Coming soon.')}
                                            className='bg-clr-18 hover:bg-clr-19 text-clr-0 hover:text-clr-12 rounded-lg px-3 py-1.5 text-sm md:text-base shadow-md trans'>
                                            Delete Personal Account
                                        </button>
                                    </footer>
                                </article>
                            </section>
                        </main >
                    )
                }}
            </MyPage>
        </>
    )
}

export default page