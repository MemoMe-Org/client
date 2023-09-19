import { FC } from 'react'
import axios from '@/app/api/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { usePoll } from '@/utils/store'

const OptionsToVote: FC<{ poll: MyPoll | undefined }> = ({ poll }) => {

    const { setPoll } = usePoll()

    const expired = () => {
        const now = new Date().getTime()

        if (poll && poll.expiry) {
            const expiryTimestamp = Date.parse(poll.expiry)

            if (!isNaN(expiryTimestamp) && now > expiryTimestamp) {
                return true
            }
        }

        return false
    }

    const vote = async (optionId: string) => {
        await axios.post(`/api/poll/vote/${poll?.createdById}/${poll?.id}/${optionId}`)
            .then((res: AxiosResponse) => {
                setPoll(res.data?.poll)
            }).catch((err: AxiosError) => {

            }).finally(() => { })
    }


    return (
        <section className='w-full my-3'>
            {poll?.options?.map((option) => {
                return (
                    <article key={option.id}
                        className=''
                    >
                        <button
                            disabled={Boolean(poll.active === false || expired() || poll.hasVoted)}>
                            {option.texts}
                        </button>
                    </article>
                )
            })}
        </section>
    )
}

export default OptionsToVote