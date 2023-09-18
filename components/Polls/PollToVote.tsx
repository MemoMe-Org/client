import { FC } from 'react'

const PollToVote: FC<{ poll: MyPoll | undefined }> = ({ poll: Poll }) => {
    return (
        <section className={`rounded-lg bg-clr-0 p-5 relative min-h-[340px]`}
            style={{
                boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`
            }}>

        </section>
    )
}

export default PollToVote