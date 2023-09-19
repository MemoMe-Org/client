/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Link from 'next/link'
import Image from 'next/image'
import axios from '@/app/api/axios'
import NavBar from '@/components/Nav'
import { usePoll } from '@/utils/store'
import { useEffect, useState } from 'react'
import { LoaderTwo } from '@/components/Loader'
import { LuVerified } from '@/public/icons/ico'
import { AxiosError, AxiosResponse } from 'axios'
import PollToVote from '@/components/Polls/PollToVote'
import { lato, poppins, questrial } from '@/public/fonts/f'

const page = ({ params: { createdById, pollId } }: PollParams) => {
    const [userData, setUserData] = useState<any>({})

    const { pollLoad, setPollLoad, setPoll, poll } = usePoll()

    const getPoll = async () => {
        setPollLoad(true)
        await axios.get(`/api/poll/get/${createdById}/${pollId}`)
            .then((res: AxiosResponse) => {
                setPoll(res.data?.poll)
                setUserData(res.data?.user || {})
            }).catch((res: AxiosError) => {

            }).finally(() => setPollLoad(false))
    }

    const vote = async (optionId: string) => {
        await axios.post(`/api/poll/vote/${createdById}/${pollId}/${optionId}`)
            .then((res: AxiosResponse) => {
                console.log(res.data)
            }).catch((res: AxiosError) => {

            }).finally(() => { })
    }

    useEffect(() => {
        getPoll()
    }, [createdById, pollId])

    if (pollLoad) return <LoaderTwo />

    const name = userData?.username
    const avatar_url = userData?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={userData?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />
            <main className='w-full min-h-screen bg-clr-12 pt-5'>
                <section className='w-[90vw] max-w-[700px] flex flex-col gap-7 mx-auto'>
                    <article className='flex gap-4 items-center'>
                        <div className='grid place-items-center h-[5rem] w-[5rem] rounded-full overflow-hidden border-[2px] bg-clr-0 border-clr-5'>
                            {avatar_url ?
                                <Image
                                    alt='avatar'
                                    priority
                                    width={300}
                                    height={300}
                                    src={avatar_url}
                                    className='object-cover w-full h-full'
                                /> :
                                <div className={`${lato.className} text-clr-2 text-3xl font-bold`}>
                                    {name ? name[0].toUpperCase() : '0'}
                                </div>
                            }
                        </div>
                        <div className='flex flex-col gap-1.5 flex-wrap'>
                            <div className={`${questrial.className} flex gap-2 items-center text-clr-2 font-medium text-lg`}>
                                <Link
                                    href={`/${name}`}
                                    target='_blank'>
                                    @{name}
                                </Link>
                                {userData?.Account?.verified && <LuVerified />}
                            </div>
                            <p className={`${poppins.className} text-clr-13 text-sm`}>
                                {userData?.Profile?.bio}
                            </p>
                        </div>
                    </article>
                    <PollToVote poll={poll} />
                </section>
            </main>
        </>
    )
}

export default page