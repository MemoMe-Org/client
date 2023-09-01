/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Link from 'next/link'
import axios from '@/app/api/axios'
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import { useEffect, useRef } from 'react'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { LoaderTwo } from '@/components/Loader'
import { useMessageStore } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import TextEditor from '@/components/TextEditor'
import { AxiosError, AxiosResponse } from 'axios'
import { lato, poppins, questrial } from '@/public/fonts/f'
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
            ).then((res: AxiosResponse) => {
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
            setTimeout(() => {
                if (data?.isAuthenticated) {
                    router.push('/profile')
                } else {
                    router.push('/login')
                }
            }, 500)
        }).catch((err: AxiosError) => throwError(err)).finally(() => setLoading(false))
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
                        <div className='grid place-items-center h-[5rem] w-[5rem] rounded-full overflow-hidden border-[2px] bg-clr-0 border-clr-5'>
                            {
                                avatar_url ?
                                    <img
                                        src={avatar_url}
                                        alt='avatar'
                                        loading='lazy'
                                        className='object-cover w-full h-full'
                                    /> :
                                    <div className={`${lato.className} text-clr-2 text-3xl font-bold`}>
                                        {name ? name![0].toUpperCase() : "0"}
                                    </div>
                            }
                        </div>
                        <div className='flex flex-col gap-1.5 flex-wrap'>
                            <div className={`${questrial.className} flex gap-2 items-center text-clr-2 font-medium text-lg`}>
                                <Link href={`/profile/${data?.username}`}>@{data?.username}</Link>
                                {data?.verified && <LuVerified />}
                            </div>
                            <p className={`${poppins.className} text-clr-13 text-sm`}>
                                {data?.bio}
                            </p>
                        </div>
                    </article>
                    <article
                        className='relative min-h-[250px] py-5 px-3 rounded-lg bg-clr-0'
                        style={{
                            boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`
                        }}>
                        <div className='absolute bottom-2.5 right-3.5'>
                            {!loading ?
                                <button
                                    className={`rounded-full px-3 py-1.5 font-medium tracking-wider bg-clr-1 text-clr-11 flex gap-2 items-center text-lg hover:bg-clr-8 hover:text-clr-11 ${questrial.className}`}
                                    onClick={async () => await sendMsg()}>
                                    <BsFillSendFill />
                                    <span>Send</span>
                                </button> :
                                <div className='w-[100px] bg-clr-6 h-5 overflow-hidden rounded-full'>
                                    <div
                                        className='h-full bg-clr-1 rounded-full transition-all duration-300 ease-in-out'
                                        style={{
                                            width: `${progress}%`
                                        }} />
                                </div>}
                        </div>
                        <h5 className={`${questrial.className} absolute top-2 left-4 text-lg text-clr-13 tracking-wider font-semibold`}>
                            Send me an anonymous message.
                        </h5>
                        {/* Containers */}
                        {data?.allowTexts && <TextEditor
                            textEditorRef={textEditorRef}
                            msgType={data?.msg_type || 'all'}
                        />}
                    </article>
                </section>
            </main>
        </>
    )
}

export default page