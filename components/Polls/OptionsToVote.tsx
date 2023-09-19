import axios from '@/app/api/axios'
import { usePoll } from '@/utils/store'
import { prompt, questrial } from '@/public/fonts/f'
import throwError from '@/utils/throwError'
import { AxiosError, AxiosResponse } from 'axios'
import { GiCheckMark } from 'react-icons/gi'
import { formatNumber } from '@/utils/formatNumber'

const OptionsToVote = () => {

    const {
        setPoll, voteLoad,
        poll, setVoteLoad
    } = usePoll()

    console.log(poll)

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
        <section className='mb-3'>
            <div className='w-full my-3.5 flex flex-col gap-3'>
                {poll?.options?.map((option) => {
                    const optionPercentage = (option.totalVotes / poll.totalVotes) * 100
                    return (
                        <article key={option.id}
                            className='w-full'
                        >
                            <button
                                title={`${optionPercentage.toFixed(1)}%`}
                                onClick={async () => vote(option.id)}
                                className={`${prompt.className} ${poll.hasVoted ? 'rounded-md' : 'rounded-full'} px-2 py-1 w-full flex justify-between relative text-sm bg-clr-7 text-clr-0 disabled:bg-clr-9`}
                                style={{
                                    boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`
                                }}
                                disabled={Boolean(poll.active === false || expired() || poll.hasVoted)}>
                                <span>{option.texts}</span>
                                {poll.hasVoted && poll.votedOption === option.id && <GiCheckMark />}
                                {poll.hasVoted && <span>{option.totalVotes}</span>}
                            </button>
                        </article>
                    )
                })}
            </div>
            <div className={`${questrial.className} flex items-center justify-between text-sm text-clr-4 font-medium tracking-wide px-3 md:px-5`}>
                <span>Views &#8226; {formatNumber(poll?.views!)}</span>
                <span>Total Vote(s) &#8226; {poll?.totalVotes}</span>
            </div>
        </section>
    )
}

export default OptionsToVote