/* eslint-disable @next/next/no-img-element */
import {
    FiLogOut, FiSettings,
    RiAccountCircleFill
} from '@/public/icons/ico'
import Link from 'next/link'
import Image from 'next/image'
import axios from '@/app/api/axios'
import { useState, FC } from 'react'
import { AxiosResponse } from 'axios'
import useToken from '@/hooks/useToken'
import { poppins } from '@/public/fonts/f'
import { useRouter } from 'next/navigation'

const NavBar: FC<NavProps> = ({ isAuthenticated, data }) => {
    const token = useToken()
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)


    const logout = async () => {
        await axios.get('/auth/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: AxiosResponse) => router.push('/login'))
    }

    return (
        <header className='fixed top-0 w-full'>
            <nav className='md:px-14 px-10 py-3 flex justify-between w-full items-center'>
                <Link href='/'
                    className={`rounded-full object-cover overflow-hidden w-14 h-10`}>
                    <Image
                        src='https://d15zb4m4p46ai4.cloudfront.net/Dist/logo.png'
                        alt='logo' priority
                        width={150} height={150} />
                </Link>
                <div className='relative'>
                    {!isAuthenticated && <div className='object-cover overflow-hidden w-24 h-14'>
                        <Image
                            src='https://d15zb4m4p46ai4.cloudfront.net/Dist/logo-2.png'
                            alt='logo' priority
                            width={300} height={300} />
                    </div>}
                    {
                        isAuthenticated &&
                        <>
                            <button
                                onClick={() => setOpen(!open)}
                                className='relative rounded-full overflow-hidden w-[50px] h-[50px] object-cover border-[0.125rem] border-clr-2 flex-shrink-0'>
                                {
                                    data?.avatar_url ?
                                        <img src={data.avatar_url} alt='avatar' width={300} height={300} loading='lazy' /> :
                                        <div className={`${poppins.className} font-bold text-lg text-clr-2`}>
                                            {data?.username![0].toUpperCase()}
                                        </div>
                                }
                            </button>
                            <ul className={`${open && 'active'} font-medium nav-modal`}>
                                <li>
                                    <Link href='/settings' className='flex items-center gap-3 trans hover:text-clr-3'>
                                        <FiSettings />
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/account' className='flex items-center gap-3 hover:text-clr-3'>
                                        <RiAccountCircleFill />
                                        <span>Account</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={async () => await logout()}
                                        className='flex items-center gap-3 trans hover:text-clr-10'>
                                        <span>Logout</span>
                                        <FiLogOut />
                                    </button>
                                </li>
                            </ul>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default NavBar