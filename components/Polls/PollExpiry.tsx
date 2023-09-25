import { FC } from 'react'
import Modal from '../Modals/Modal'
import { poppins } from '@/public/fonts/f'
import { useModalStore, usePoll } from '@/utils/store'

const PollExpiry: FC<{ pollId: string }> = ({ pollId }) => {
    const { expiry, setExpiry } = usePoll()
    const { pollExpiryModal, setPollExpiryModal } = useModalStore()

    const handleExpiry = async (): Promise<void> => {
        let date: string = ''

        if (expiry) {
            date = new Date(expiry).toISOString()
        }

        console.log(date)
    }

    return (
        <Modal
            get={pollExpiryModal}
            set={setPollExpiryModal}>
            <h3 className={`${poppins.className} text-clr-13 text-lg font-medium`}>
                Set Poll Expiry Date
            </h3>
            <article className='w-full my-3 flex justify-center items-center'>
                <input
                    type='datetime-local'
                    onChange={(e) => setExpiry(e.target.value)}
                    className={`outline-none px-1 py-0.5 rounded-md`}
                />
            </article>
            <button
                onClick={async () => handleExpiry()}
                className='save-btn-2 absolute right-4 bottom-2'>
                Save
            </button>
        </Modal>
    )
}

export default PollExpiry