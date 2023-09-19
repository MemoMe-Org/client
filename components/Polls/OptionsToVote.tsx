import axios from '@/app/api/axios'
import { usePoll } from '@/utils/store'
import { prompt } from '@/public/fonts/f'
import throwError from '@/utils/throwError'
import { AxiosError, AxiosResponse } from 'axios'

const OptionsToVote = () => {

    const {
        setPoll, voteLoad,
        poll, setVoteLoad
    } = usePoll()

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
                console.log(res.data)
                setPoll(res.data?.poll)
            }).catch((err: AxiosError) => throwError(err)).finally(() => { })
    }


    return (
        <section className='w-full my-3 flex flex-col gap-2'>
            {poll?.options?.map((option) => {
                return (
                    <article key={option.id}
                        className='w-full'
                    >
                        <button
                            onClick={async () => vote(option.id)}
                            className={`${prompt.className} ${poll.hasVoted ? 'rounded-full' : 'rounded-lg'} px-2 py-1 w-full text-left relative text-sm bg-clr-1 text-clr-0 disabled:bg-clr-9`}
                            style={{
                                boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`
                            }}
                            disabled={Boolean(poll.active === false || expired() || poll.hasVoted)}>
                            {option.texts}
                            <div className=''>

                            </div>
                        </button>
                    </article>
                )
            })}
        </section>
    )
}

export default OptionsToVote