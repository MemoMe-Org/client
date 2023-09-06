import { FC } from 'react'
import Image from 'next/image'
import getPeriod from '@/utils/period'
import { prompt } from '@/public/fonts/f'
import { BsDownload } from '@/public/icons/ico'

const Message: FC<{ message: MessageStates }> = ({ message }) => {
    console.log(message)

    return (
        <>
            <article
                className={` ${message.files.length === 0 ? 'flex items-center justify-center' : ''} relative w-[300px] min-h-[250px] rounded-[30px]  p-3 bg-clr-11`}
                style={{
                    boxShadow: `10px 10px 18px 0 rgba(0, 0, 0, 0.3), inset -10px -10px 18px 0 rgba(0, 0, 0, 0.3), inset 10px 10px 18px 0 rgba(255, 255, 255, 0.2)`
                }}>
                {message.files.length === 0 ?
                    <div
                        className={`${prompt.className} text-[1.2em] text-center text-clr-13`}
                        dangerouslySetInnerHTML={{ __html: message.texts! }}
                    /> :
                    <article className='h-full flex flex-col justify-between'>
                        <div
                            className={`${prompt.className} text-[1.2em] text-center text-clr-13 border-b-2`}
                            dangerouslySetInnerHTML={{ __html: message.texts! }}
                        />
                        {message.files.map((file) => (
                            <div
                                key={file.idx}
                                className='relative w-full flex gap-1 h-full rounded-bl-[30px] rounded-br-[30px] object-cover overflow-hidden'>
                                {file.type === ('image/png' || 'image/jpeg') ?
                                    <Image
                                        priority
                                        src={file.url}
                                        width={300}
                                        height={300}
                                        alt={file.idx}
                                    /> : <></>
                                }
                                <button className='absolute bottom-2 right-3'>
                                    <BsDownload />
                                </button>
                            </div>
                        ))}
                    </article>
                }
                <span className={`${message.files.length === 0 ? 'bottom-2' : 'top-2'} absolute right-3 text-xs font-semibold text-clr-4`}>
                    {getPeriod(message.date)}
                </span>
            </article>
        </>
    )
}

export default Message