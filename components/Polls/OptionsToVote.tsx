import axios from '@/app/api/axios'
import { usePoll } from '@/utils/store'
import throwError from '@/utils/throwError'
import { AxiosError, AxiosResponse } from 'axios'
import { formatNumber } from '@/utils/formatNumber'
import { prompt, questrial } from '@/public/fonts/f'
import { GiCheckMark, AiOutlineLoading3Quarters } from '@/public/icons/ico'

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
        setVoteLoad(true)
        await axios.post(
            `/api/poll/vote/${poll?.createdById}/${poll?.id}/${optionId}`
        ).then((res: AxiosResponse) => setPoll(res.data?.poll))
            .catch((err: AxiosError) => throwError(err))
            .finally(() => setVoteLoad(false))
    }


    return (
        <section className='mb-3'>
            <div className='w-full my-3.5 flex flex-col gap-3'>
                {poll?.options?.map((option) => {
                    const optionPercentage = (option.totalVotes / poll.totalVotes) * 100
                    return (
                        <article
                            key={option.id}
                            className='w-full'
                        >
                            <button
                                onClick={async () => vote(option.id)}
                                className={`${prompt.className} ${poll.hasVoted ? 'rounded-md' : 'rounded-full'} relative h-[30px] flex items-center overflow-hidden bg-clr-1 w-full text-clr-0 disabled:bg-clr-9`}
                                style={{
                                    boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`
                                }}
                                disabled={Boolean(poll?.active === false || expired() || poll.hasVoted)}>
                                {(poll.hasVoted || expired() || poll.active === false) &&
                                    <div
                                        className={`transition-all ease-in-out duration-500 absolute bg-clr-3 h-full rounded-md`}
                                        style={{
                                            width: `${optionPercentage}%`,
                                            boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`
                                        }} />}
                                <>
                                    {voteLoad ?
                                        <div className='w-full px-2 py-1 flex justify-between relative text-sm'>
                                            <span>
                                                {option.texts}
                                            </span>
                                            <AiOutlineLoading3Quarters className='vote-load font-bold text-lg' />
                                        </div> :
                                        <div className='w-full px-2 py-1 flex justify-between relative text-sm'>
                                            <span>
                                                {option.texts}
                                            </span>
                                            {poll.hasVoted && poll.votedOption === option.id && <GiCheckMark />}
                                            {poll.hasVoted &&
                                                <span>
                                                    {option.totalVotes} &#8226; {optionPercentage.toFixed(1)}%
                                                </span>}
                                        </div>}
                                </>
                            </button>
                        </article>
                    )
                })}
            </div>
            <div className={`${questrial.className} flex items-center justify-between text-sm text-clr-4 font-medium tracking-wide px-1.5 md:px-3.5`}>
                <span>View(s) &#8226; {formatNumber(poll?.views!)}</span>
                {(poll?.active === false || expired()) &&
                    <span className='text-xs'>Final Results</span>}
                <span>Total Vote(s) &#8226; {poll?.totalVotes}</span>
            </div>
        </section>
    )
}

export default OptionsToVote