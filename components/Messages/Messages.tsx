/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import axios from '@/app/api/axios'
import useToken from '@/hooks/useToken'
import { FC, useEffect, useState } from 'react'
import { useMessageStore } from '@/utils/store'
import { AxiosError, AxiosResponse } from 'axios'

const Messages: FC<TabProps> = ({ username }) => {
    const limit = 10 as const
    const {
        page, setPage,
    } = useMessageStore()
    const token = useToken()
    const [messages, setMessages] = useState<any[]>([])

    const fetchMessages = async (): Promise<void> => {
        await axios.get(
            `/api/msg/${username}?limit=${limit}&page=${page}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: AxiosResponse) => {
            console.log(res.data)
            setPage(page + 1)
            setMessages((prevMessages) => [...prevMessages, ...res.data?.messages])
        }).catch((res: AxiosError) => {

        })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
            ) {
                (async () => await fetchMessages())()
            }
        }

        window.addEventListener('scroll', handleScroll);

        (async () => await fetchMessages())()

        return () => {
            window.addEventListener('scroll', handleScroll)
        }
    }, [token, page])

    console.log(messages)

    return (
        <section>
            <header className="flex items-center justify-between">
                <h3>30 Messages</h3>
            </header>
            <article className="grid w-full">

            </article>
        </section>
    )
}

export default Messages