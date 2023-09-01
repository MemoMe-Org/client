"use client"
import { FC } from 'react'
import { poppins } from '@/public/fonts/f'

const MediasUpload: FC = () => {

    return (
        <section className='mt-6 mb-9'>
            <h6 className={`flex gap-2 items-center text-[16px] font-medium tracking-wide ${poppins.className}`}>
                <span className='text-clr-4'>Medias</span>
                <span className='text-clr-7'>*</span>
            </h6>
            <article className='border-[2px] border-dashed border-clr-12 min-h-[50px] w-full rounded-xl mt-2'>

            </article>
        </section>
    )
}

export default MediasUpload