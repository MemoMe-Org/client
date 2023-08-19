import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { kaushan, poppins } from '@/public/fonts/f'

const NavBar: FC<NavProps> = ({ isAuthenticated, pathName, data }) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <header className='fixed top-0 w-full'>
            <nav className='px-10 py-5 flex justify-between w-full items-center'>
                <Link href='/'
                    className={`font-bold tracking-wide text-2xl ${kaushan.className} md:text-4xl`}>
                    <span className='text-clr-8'>Memo</span>
                    <span className='text-clr-1'>Me</span>
                </Link>
                <div>
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
                        <div className='relative'>
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
                            {
                                open && <button></button>
                            }
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default NavBar