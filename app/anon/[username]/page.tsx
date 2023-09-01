/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import { useEffect, useRef } from 'react'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { questrial } from '@/public/fonts/f'
import { LoaderTwo } from '@/components/Loader'
import { useMessageStore } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import axios, { generativeApi } from '@/app/api/axios'
import { LuVerified, BsFillSendFill } from '@/public/icons/ico'

const page = ({ params: { username } }: Params) => {
    const token = useToken()
    const router = useRouter()
    const {
        progress, medias, resetStates,
        loading, setProgress, setLoading,
    } = useMessageStore()
    const textEditorRef = useRef<HTMLDivElement>(null)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['anon-user'],
        queryFn: async () => {
            return await axios.get(
                `/api/msg/anon/${username.toLowerCase().trim()}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((res: AxiosResponse) => {
                    return res.data?.user
                }).catch((err: AxiosError) => {
                    const statusCode: unknown = err.response?.status
                    if (statusCode === 401 || statusCode === 404) {
                        router.push('/404')
                    } else {
                        throwError(err)
                    }
                })
        },
        enabled: false
    })

    useEffect(() => {
        if (token) {
            refetch()
        } else {
            if (token === '') {
                refetch()
            }
        }
    }, [token])

    if (isLoading) return <LoaderTwo />

    console.log(data)

    const name = data?.username
    const avatar_url = data?.avatar?.url

    const sendMsg = async (): Promise<void> => {
        setLoading(true)

        const payload = {
            texts: textEditorRef.current ? textEditorRef.current.innerHTML : ''
        }

        const formData: FormData = new FormData()

        if (medias) {
            for (let i = 0; i < medias.length; i++) {
                formData.append('anon_files', medias[i], medias[i].name)
            }
        }

        for (const key in payload) {
            formData.append(key, payload[key as keyof typeof payload])
        }

        await axios.post(
            `/api/msg/anon/${username}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress(progressEvent) {
                    const percentage = (progressEvent.loaded / (progressEvent.total || 1)) * 100
                    setProgress(percentage)
                },
            }
        ).then((res: AxiosResponse) => {
            resetStates()
        }).catch((err: AxiosError) => throwError(err)).finally(() => setLoading(false))
    }

    const genMsgType = async (): Promise<string> => {
        const response = await generativeApi.get(`/questions/${data?.msg_type}?choice=random`)
        return response.data?.question
    }

    return (
        <>
            <NavBar
                isAuthenticated={data?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />

            <main className='w-full min-h-screen bg-clr-12 pt-5'>
                <section className='w-[90vw] max-w-[700px] flex flex-col gap-7 mx-auto'>
                    <article className='flex gap-4 items-center'>
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex gap-2 items-center'>
                                <h5>@{data?.username}</h5>
                                {data?.verified && <LuVerified />}
                            </div>
                            <p>{data?.bio}</p>
                        </div>
                        <div>
                            {/* avatar container */}
                        </div>
                    </article>
                    <article
                        className='relative min-h-[250px] py-5 px-3 rounded-lg bg-clr-0'
                        style={{
                            boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`
                        }}>
                        <div className='absolute top-2.5 right-3.5'>
                            {!loading ?
                                <button
                                    className={`rounded-full px-3 py-1.5 font-medium tracking-wider bg-clr-1 text-clr-11 flex gap-2 items-center text-lg hover:bg-clr-8 hover:text-clr-11 ${questrial.className}`}
                                    onClick={async () => await sendMsg()}>
                                    <BsFillSendFill />
                                    <span>Send</span>
                                </button> :
                                <div className='w-[100px] bg-clr-6 h-5 overflow-hidden rounded-full trans'>
                                    <div
                                        className='h-full bg-clr-1 rounded-full trans'
                                        style={{
                                            width: `${progress}%`
                                        }} />
                                </div>}
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}

export default page