/* eslint-disable @next/next/no-img-element */
"use client"
import { FC, useState } from 'react'
import Levels from './Levels'
import { AiOutlineCamera } from 'react-icons/ai'
import { poppins } from '@/public/fonts/f'

const Profile: FC<IProfile> = ({ user, pathName }) => {
    console.log(user)
    const [onMouse, setOnMouse] = useState<boolean>(false)

    return (
        <main className='profile-main'>
            <Levels
                msgPoint={user?.Profile?.msgPoint}
                pollPoint={user?.Profile?.pollPoint}
            />
            <section className="profile-header">
                <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                    {pathName === 'main' ? "Profile" : "User Profile"}
                </h1>
            </section>
            <section className="profile-cards">
                <article className="profile-card">
                    <div className="profile-card-center">
                        <>
                            {pathName !== 'main' ?
                                <>
                                    {user?.Profile?.avatar?.url ?
                                        <div
                                            className={`profile-avatar`}>
                                            <img
                                                src={user?.Profile?.avatar?.url}
                                                alt="avatar"
                                                title="Edit avatar"
                                                loading='lazy'
                                            />
                                            <div className={`${onMouse && 'cam-ico'}`}>
                                                <AiOutlineCamera className="text-clr-0 text-4xl md:text-5xl lg:text-6xl" />
                                            </div>
                                        </div> :
                                        <div className='rounded-full overflow-hidden w-[7rem] h-[7rem] flex items-center justify-center border-[0.125rem] border-clr-5 flex-shrink-0'>
                                            <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                                {user?.username![0].toUpperCase()}
                                            </div>
                                        </div>
                                    }
                                </> :
                                <>
                                    {user?.Profile?.avatar?.url ?
                                        <div
                                            onMouseLeave={() => setOnMouse(false)}
                                            onMouseEnter={() => setOnMouse(true)}
                                            className={`${onMouse && 'before:content-[""] before:bg-clr-x before:absolute before:top-0 before:right-0 before:w-full before:h-full before:z-[999] cursor-pointer'} profile-avatar`}>
                                            <img
                                                src={user?.Profile?.avatar?.url}
                                                alt="avatar"
                                                loading='lazy'
                                            />
                                            <div className={`${onMouse && 'cam-ico'}`}>
                                                <AiOutlineCamera className="text-clr-0 text-4xl md:text-5xl lg:text-6xl" />
                                            </div>
                                        </div> :
                                        <div className='rounded-full overflow-hidden w-[7rem] h-[7rem] flex items-center justify-center border-[0.125rem] border-clr-5 flex-shrink-0'>
                                            <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                                {user?.username![0].toUpperCase()}
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </>
                        <div>
                            <h3
                                className='leading-tight font-semibold cursor-pointer text-clr-2 text-xl md:text-3xl lg:text-5xl underline tracking-wide hover:text-clr-3 trans'>
                                @{user?.username}
                            </h3>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Profile