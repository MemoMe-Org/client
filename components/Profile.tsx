/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link'
import Levels from './Levels'
import { FC, useState } from 'react'
import {
    AiOutlineCamera, AiOutlinePlus, LuVerified
} from '@/public/icons/ico'
import formatNumber from '@/utils/formatNumber'
import { poppins, questrial } from '@/public/fonts/f'

const Profile: FC<IProfile> = ({ user, pathName }) => {
    console.log(user)
    const [onMouse, setOnMouse] = useState<boolean>(false)
    const [plusClicked, setPlusClicked] = useState<boolean>(false)

    return (
        <main className='profile-main overflow-hidden'>
            {pathName === 'main' && <button className='plus'>
                <AiOutlinePlus
                    className={`plus-icon ${plusClicked && 'active'} w-full`}
                    onClick={() => setPlusClicked((prev) => !prev)}
                />
            </button>}
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
                                                <AiOutlineCamera
                                                    className="text-clr-0 text-4xl md:text-5xl lg:text-6xl"
                                                />
                                            </div>
                                        </div> :
                                        <div
                                            onMouseLeave={() => setOnMouse(false)}
                                            onMouseEnter={() => setOnMouse(true)}
                                            className={`${onMouse && 'before:content-[""] before:bg-clr-x before:absolute before:top-0 before:right-0 before:w-full before:h-full before:z-[999] cursor-pointer'} relative rounded-full overflow-hidden w-[7rem] h-[7rem] flex items-center justify-center border-[0.125rem] border-clr-5 flex-shrink-0`}>
                                            <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                                {user?.username![0].toUpperCase()}
                                            </div>
                                            <div className={`hidden ${onMouse && 'cam-ico'}`}>
                                                <AiOutlineCamera
                                                    className="text-clr-0 text-4xl md:text-5xl lg:text-6xl"
                                                />
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </>
                        <p className='flex gap-3 items-center justify-center font-semibold cursor-pointer text-clr-2 text-xl md:text-3xl lg:text-5xl tracking-wide'>
                            <Link href={`/anon/${user?.username}`} target='_check'>
                                @{user?.username}
                            </Link>
                            {user?.Account?.verified && <LuVerified />}
                        </p>
                    </div>
                </article>
                <article className='profile-card'>
                    <div>
                        <span
                            className={`${questrial.className} px-2.5 py-1.5 rounded-full text-clr-11 font-semibold tracking-wider`}
                            style={{
                                background: `linear-gradient(138deg, rgba(60,49,49,1) 75%, rgba(251,164,45,1) 100%)`
                            }}>
                            Profile Views: {formatNumber(user?.Profile?.views)}
                        </span>
                        {
                            pathName === 'main' ?
                                <Levels
                                    msgPoint={user?.Profile?.msg_point}
                                    pollPoint={user?.Profile?.poll_point}
                                /> : user?.Settings?.show_levels && <Levels
                                    msgPoint={user?.Profile?.msg_point}
                                    pollPoint={user?.Profile?.poll_point}
                                />
                        }
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Profile