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
import { useRouter } from 'next/navigation'
import { kaushan, poppins } from '@/public/fonts/f'

const NavBar: FC<NavProps> = ({ isAuthenticated, pathName, data }) => {
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
            <nav className='px-10 py-5 flex justify-between w-full items-center'>
                <Link href='/'
                    className={`font-bold tracking-wide text-2xl ${kaushan.className} md:text-4xl`}>
                    <span className='text-clr-8'>Memo</span>
                    <span className='text-clr-1'>Me</span>
                </Link>
                <div className='relative'>
                    {
                        pathName === 'login' &&
                        <Link className='submit-btn' href='/signup'>Sign Up</Link>
                    }
                    {
                        pathName === 'signup' &&
                        <Link className='submit-btn' href='/login'>Login</Link>
                    }
                    {
                        isAuthenticated &&
                        <div>
                            <button
                                onClick={() => setOpen(!open)}
                                className='relative rounded-full overflow-hidden w-[50px] h-[50px] object-cover border-[0.3125rem] border-clr-5 flex-shrink-0'>
                                {
                                    data?.avatar_url ?
                                        <Image src={data.avatar_url} alt='avatar' width={300} height={300} priority className='' /> :
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
                                        className='flex items-center gap-3 trans hover:text-red-500'>
                                        <span>Logout</span>
                                        <FiLogOut />
                                    </button>
                                </li>

                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default NavBar