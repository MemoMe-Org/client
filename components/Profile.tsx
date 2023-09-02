/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link'
import Levels from './Levels'
import dynamic from 'next/dynamic'
import { FC, useState, useEffect } from 'react'
import {
    AiOutlineCamera, AiOutlinePlus, LuVerified
} from '@/public/icons/ico'
import formatNumber from '@/utils/formatNumber'
import { poppins, questrial } from '@/public/fonts/f'
import { useRouter, useSearchParams } from 'next/navigation'

const PollTab = dynamic(() => import('@/components/Polls/Polls'))
const MessageTab = dynamic(() => import('@/components/Messages/Messages'))

const Profile: FC<IProfile> = ({ user, pathName }) => {
    console.log(user)
    const [onMouse, setOnMouse] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<ActiveTab>('message')
    const [plusClicked, setPlusClicked] = useState<boolean>(false)

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        router.push(`/profile?tab=${activeTab}`)
    }, [searchParams, router, activeTab])

    return (
        <main className='profile'>
            {pathName === 'main' &&
                <button
                    className='fixed z-[999] bottom-14 right-9 p-2 bg-clr-12 cursor-pointer rounded-full text-2xl lg:text-4xl md:text-3xl'
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        animation: 'bounce 2s ease-in-out infinite'
                    }}
                    onClick={() => setPlusClicked((prev) => !prev)}>
                    <AiOutlinePlus className={`plus-icon ${plusClicked && 'active'} w-full`} />
                </button>}
            <article className=''>

            </article>
            <article className="profile-header">
                <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                    {pathName === 'main' ? "Profile" : "User Profile"}
                </h1>
            </article>
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
                <article className='flex gap-9 mt-5'>
                    <button
                        onClick={() => setActiveTab('message')}
                        className={`${questrial.className} tab ${activeTab === 'message' && 'active'}`}>
                        Messages
                    </button>
                    <button onClick={() => setActiveTab('poll')}
                        className={`${questrial.className} tab ${activeTab === 'poll' && 'active'}`}>
                        Polls
                    </button>
                </article>
                {activeTab === 'poll' && <PollTab />}
                {activeTab === 'message' && <MessageTab />}
            </section>
        </main>
    )
}

export default Profile