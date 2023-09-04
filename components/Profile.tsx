"use client"
import Link from 'next/link'
import Levels from './Levels'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Avatar from './Modals/Avatar'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/utils/store'
import formatNumber from '@/utils/formatNumber'
import { FC, useState, useEffect } from 'react'
import {
    AiOutlineCamera, AiOutlinePlus, LuVerified
} from '@/public/icons/ico'
import { poppins, questrial } from '@/public/fonts/f'
import { BiSolidMessageDetail, FaPollH } from '@/public/icons/ico'
import Socials from './Modals/Socials'

const PollTab = dynamic(() => import('@/components/Polls/Polls'))
const MessageTab = dynamic(() => import('@/components/Messages/Messages'))

const Profile: FC<IProfile> = ({ user, pathName }) => {
    console.log(user)
    const router = useRouter()
    const {
        avatarModal, setAvatarModal,
        shareLinkModal, setShareLinkModal,
    } = useModalStore()

    const [onMouse, setOnMouse] = useState<boolean>(false)
    const [plusClicked, setPlusClicked] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<LevelType>('message')

    useEffect(() => {
        router.push(`/profile?tab=${activeTab}`)
    }, [router, activeTab])

    return (
        <main className='profile'>
            {/* Modals */}
            <Avatar
                get={avatarModal}
                set={setAvatarModal}
                data={{
                    username: user?.username,
                    avatar: user?.Profile?.avatar,
                }}
            />
            <Socials
                get={shareLinkModal}
                set={setShareLinkModal}
            />
            {pathName === 'main' &&
                <button
                    className='fixed z-[999] bottom-14 right-9 p-2 bg-clr-1 cursor-pointer rounded-full text-xl lg:text-3xl md:text-2xl'
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        animation: 'bounce 2s ease-in-out infinite'
                    }}
                    onClick={() => setPlusClicked((prev) => !prev)}>
                    <AiOutlinePlus className={`plus-icon ${plusClicked && 'active'} w-full`} />
                </button>}
            <article className={`${plusClicked && 'show-action'} action`}>
                <button
                    onClick={() => setShareLinkModal(true)}
                    className={`${poppins.className} flex gap-3 items-center tracking-wide text-clr-2 hover:text-clr-9 trans w-full`}>
                    <span >
                        Anonymous Link
                    </span>
                    <BiSolidMessageDetail className='text-lg lg:text-2xl md:text-xl' />
                </button>
                <button
                    className={`${poppins.className} flex gap-3 items-center tracking-wide text-clr-2 hover:text-clr-9 trans w-full`}>
                    <span>
                        Host a Poll
                    </span>
                    <FaPollH className='text-lg lg:text-2xl md:text-xl' />
                </button>
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
                                            <Image
                                                alt='avatar'
                                                width={300}
                                                height={300}
                                                loading='lazy'
                                                src={user?.Profile?.avatar?.url}
                                            />
                                        </div> :
                                        <div className='profile-not-avatar'>
                                            <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                                {user?.username ? user?.username[0].toUpperCase() : '0'}
                                            </div>
                                        </div>
                                    }
                                </> :
                                <>
                                    {user?.Profile?.avatar?.url ?
                                        <div
                                            onClick={() => setAvatarModal(!avatarModal)}
                                            onMouseLeave={() => setOnMouse(false)}
                                            onMouseEnter={() => setOnMouse(true)}
                                            className={`${onMouse && 'hovered'} profile-avatar`}>
                                            <Image
                                                alt='avatar'
                                                width={300}
                                                height={300}
                                                loading='lazy'
                                                src={user?.Profile?.avatar?.url}
                                            />
                                            <div className={`${onMouse && 'cam-ico'}`}>
                                                <AiOutlineCamera
                                                    className="text-clr-0 text-4xl md:text-5xl lg:text-6xl"
                                                />
                                            </div>
                                        </div> :
                                        <div
                                            onClick={() => setAvatarModal(!avatarModal)}
                                            onMouseLeave={() => setOnMouse(false)}
                                            onMouseEnter={() => setOnMouse(true)}
                                            className={`${onMouse && 'hovered'} relative profile-not-avatar`}>
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
                {activeTab === 'message' && <MessageTab username={user?.username} />}
            </section>
        </main>
    )
}

export default Profile