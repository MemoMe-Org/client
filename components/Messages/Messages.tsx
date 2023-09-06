/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import axios from '@/app/api/axios'
import { AxiosResponse } from 'axios'
import useToken from '@/hooks/useToken'
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
    const [messages, setMessages] = useState<any[]>([])

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

    console.log(messages)

    return (
        <section className='mb-[200px]'>
            <header className="flex items-center justify-between">
                <h3>30 Messages</h3>
            </header>
            <article className="grid w-full">
                <button
                    className={`${messages.length === totalMessages && 'hidden'}`}
                    onClick={() => setPage((prev) => prev + 1)}>
                    Load more
                </button>
            </article>
        </section>
    )
}

export default Messages