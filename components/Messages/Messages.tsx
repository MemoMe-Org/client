/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Message from './Message'
import axios from '@/app/api/axios'
import { AxiosResponse } from 'axios'
import useToken from '@/hooks/useToken'
import { LoaderThree } from '../Loader'
import { prompt } from '@/public/fonts/f'
import { FC, useEffect, useState } from 'react'
import { useMessageStore } from '@/utils/store'

const Messages: FC<TabProps> = ({ username }) => {
    const limit = 10 as const
    const token = useToken()
    const {
        fetching, setTotalMessages,
        setFetching, totalMessages,
    } = useMessageStore()
    const [page, setPage] = useState<number>(1)
    const [messages, setMessages] = useState<MessageStates[]>([])

    const fetchMessages = async (): Promise<void> => {
        if (fetching) {
            return
        }
        setFetching(true)
        await axios.get(
            `/api/msg/${username}?limit=${limit}&page=${page}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: AxiosResponse) => {
            setTotalMessages(res?.data?.length)
            setMessages((prevMessages) => [...prevMessages, ...res.data?.messages])
        }).finally(() => setFetching(false))
    }

    useEffect(() => {
        if (token) {
            (async () => await fetchMessages())()
        } else {
            if (token === '') {
                (async () => await fetchMessages())()
            }
        }
    }, [token, page])

    return (
        <section className='relative mb-[20px]'>
            <header className="flex items-center justify-between">
                <h3>{totalMessages}</h3>
            </header>
            <article className="grid w-full">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}
                <div className='w-full flex justify-center items-center'>
                    {fetching ?
                        <LoaderThree /> :
                        <button
                            className={`${messages.length === totalMessages && 'hidden'} ${prompt.className} mt-3 px-3 py-1.5 text-lg tracking-wider bg-clr-13 text-clr-0 w-fit rounded-full`}
                            onClick={() => setPage((prev) => prev + 1)}>
                            Load more
                        </button>}
                </div>
            </article>
        </section>
    )
}

export default Messages