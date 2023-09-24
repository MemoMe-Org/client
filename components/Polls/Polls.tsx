/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Poll from './Poll'
import PollMenu from './PollMenu'
import axios from '@/app/api/axios'
import { LoaderThree } from '../Loader'
import throwError from '@/utils/throwError'
import { FC, useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { poppins, prompt } from '@/public/fonts/f'
import { usePoll, useModalStore } from '@/utils/store'
import Share from '../Modals/Share'

const Messages: FC<TabProps> = ({ username }) => {
    const limit = 5 as const
    const {
        setIsAuthenticated,
        isOwner, setIsOwner,
        fetching, setTotalPolls,
        setFetching, totalPolls,
    } = usePoll()
    const [page, setPage] = useState<number>(1)
    const [polls, setPolls] = useState<MyPoll[]>([])
    const { pollModal, setPollModal } = useModalStore()

    const fetchPolls = async (): Promise<void> => {
        if (fetching) {
            return
        }
        setFetching(true)
        await axios.get(
            `/api/poll/fetch/${username}?limit=${limit}&page=${page}`,
        ).then((res: AxiosResponse) => {
            setTotalPolls(res.data?.length)
            setIsOwner(res.data?.isAuthenticated)
            setPolls((prevPolls) => [...prevPolls, ...res.data?.polls])
        }).catch((err: AxiosError) => {
            const statusCodes: unknown = err.response?.status
            if (statusCodes === 403 || statusCodes === 401) {
                setIsAuthenticated(true)
            } else {
                throwError(err)
            }
        }).finally(() => setFetching(false))
    }

    useEffect(() => {
        fetchPolls()
    }, [page, username])

    return (
        <section className='mb-[30px] w-[95vw] max-w-[600px] mx-auto'>
            <header className="text-left">
                <h3 className={`${poppins.className} font-medium text-sm tracking-wide mb-3`}>
                    {totalPolls} Polls
                </h3>
            </header>
            <article className="w-full gap-9 place-items-center grid grid-cols-1">
                {polls?.map((poll) => (
                    <section key={poll.id}>
                        <Share
                            get={pollModal}
                            set={setPollModal}
                            data={{
                                share: `Vote here: https://memome.one/poll/${poll.createdById}/${poll.id}`
                            }}
                            title='Share Poll'
                        />
                        <article className='flex gap-2 w-full'>
                            <Poll poll={poll} />
                            {isOwner && <PollMenu
                                poll={poll}
                                polls={polls}
                                setPolls={setPolls}
                            />}
                        </article>
                    </section>
                ))}
            </article>
            <div className='w-full flex justify-center items-center'>
                {fetching ?
                    <LoaderThree /> :
                    <button
                        className={`${polls.length <= totalPolls && 'hidden'} ${prompt.className} mt-3 px-3 py-1.5 text-lg tracking-wider bg-clr-13 text-clr-0 w-fit rounded-full`}
                        onClick={() => setPage((prev) => prev + 1)}>
                        Load more
                    </button>}
            </div>
        </section>
    )
}

export default Messages