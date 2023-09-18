import Image from 'next/image'
import { FC, useRef } from 'react'
import html2Canvas from 'html2canvas'
import getPeriod from '@/utils/period'
import download from '@/utils/download'
import { prompt } from '@/public/fonts/f'
import { BsDownload } from '@/public/icons/ico'

const Message: FC<{ message: MessageStates }> = ({ message }) => {

    const captureDivRef = useRef<HTMLDivElement>(null)

    const downloadDiv = (id: string) => {
        const divToCapture = captureDivRef.current

        if (!divToCapture) {
            return
        }

        html2Canvas(divToCapture).then((canvas) => {
            const dataURL = canvas.toDataURL('image/png')

            const downloadLink = document.createElement('a')
            downloadLink.href = dataURL
            downloadLink.download = `memome_${id}.png`
            downloadLink.click()
        })

        // trust me - I am coming back to it.
    }

    return (
        <>
            <article
                className={` ${message.files.length === 0 && 'flex items-center justify-center'} relative  sm:w-[280px] md:w-[350px] w-[230px] sm:min-h-[235px] md:min-h-[250px] min-h-[220px] rounded-[30px] p-3 bg-clr-11`}
                style={{
                    boxShadow: `10px 10px 18px 0 rgba(0, 0, 0, 0.3), inset -10px -10px 18px 0 rgba(0, 0, 0, 0.3), inset 10px 10px 18px 0 rgba(255, 255, 255, 0.2)`
                }}>
                {message.files.length === 0 ?
                    <>
                        {message.texts &&
                            <div
                                ref={captureDivRef}
                                className={`${prompt.className} text- [1.2em] text-center text-clr-13`}
                                style={{
                                    fontSize: '1.2em',
                                    textAlign: 'center',
                                }}
                                dangerouslySetInnerHTML={{ __html: message.texts }}
                            />}
                        <button
                            onClick={() => downloadDiv(message.id)}
                            className='absolute bottom-3 right-4 text-lg font-semibold text-black'>
                            <BsDownload />
                        </button>
                    </>
                    :
                    <article className='h-full flex flex-col justify-between'>
                        {message.texts &&
                            <div
                                className={`${prompt.className} text-[1.2em] text-center text-clr-13 mt-2`}
                                dangerouslySetInnerHTML={{ __html: message.texts }}
                            />}
                        <div className='flex gap-2 mt-2 h-[200px]'>
                            {message.files.map((file) => (
                                <div
                                    key={file.idx}
                                    className='relative w-full h-full rounded-bl-[30px] rounded-[30px] object-cover overflow-hidden'>
                                    {file.type === 'image/png' || file.type === 'image/jpeg' ?
                                        <Image
                                            priority
                                            className='w-full h-full object-cover'
                                            src={file.url}
                                            width={300}
                                            height={300}
                                            alt={file.idx}
                                        /> :
                                        <video
                                            controls
                                            width="300"
                                            height="300"
                                            className='w-full h-full overflow-hidden object-cover'>
                                            <source
                                                src={file.url}
                                                type={file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    }
                                    <button
                                        onClick={() => download(file.url)}
                                        className='absolute bottom-3 right-4 text-lg font-semibold text-black'>
                                        <BsDownload />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </article>
                }
                <span className={`absolute top-2 left-3 text-xs font-semibold text-clr-4`}>
                    {getPeriod(message.date)}
                </span>
            </article>
        </>
    )
}

export default Message