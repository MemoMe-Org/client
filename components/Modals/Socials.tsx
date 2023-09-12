import Modal from '../Modal'
import Link from 'next/link'
import { FC, useState } from 'react'
import {
    AiOutlineTwitter, AiOutlineWhatsApp, AiFillCopy
} from '@/public/icons/ico'
import { prompt } from '@/public/fonts/f'

const Socials: FC<ModalComponent> = ({ get, set, data }) => {
    const share = `Please, send me anonymous messages on https://memome.one/anon/${data?.username}`

    const [copy, setCopy] = useState('Copy to clipboard')

    const copyToClipboard = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopy('Link Copied!')
            setTimeout(() => {
                setCopy('Copy to clipboard')
            }, 1200)
        } catch (err) {
            setCopy('Failed to copy!')
        }
    }

    return (
        <Modal get={get} set={set}>
            <ul className='flex flex-col gap-4 mt-6'>
                <li
                    className={`${prompt.className} social-list`}
                    onClick={async () => await copyToClipboard(share)}>
                    <p>
                        <span>{copy}</span>
                        <AiFillCopy />
                    </p>
                </li>
                <li className={`${prompt.className} social-list`}>
                    <Link target="_blank"
                        href={`https://twitter.com/intent/tweet?text=${share}`}>
                        <p>Twitter</p>
                        <AiOutlineTwitter />
                    </Link>
                </li>
                <li className={`${prompt.className} social-list`}>
                    <Link target="_blank"
                        href={`https://api.whatsapp.com/send?text=${share}`}>
                        <p>WhatsApp</p>
                        <AiOutlineWhatsApp />
                    </Link>
                </li>
            </ul>
        </Modal>
    )
}

export default Socials