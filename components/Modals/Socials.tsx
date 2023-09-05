import { FC } from 'react'
import Modal from '../Modal'
import Link from 'next/link'

const Socials: FC<State<boolean>> = ({ get, set }) => {
    return (
        <Modal get={get} set={set}>
            <ul className='flex flex-col gap-3'>
                <li></li>
                <li>
                    <Link href={``}></Link>
                </li>
            </ul>
        </Modal>
    )
}

export default Socials