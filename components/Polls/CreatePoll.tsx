import Modal from '../Modal'
import Input from '../EditInput'
import { v4 as uuid } from 'uuid'
import { usePoll } from '@/utils/store'
import { ChangeEvent, FC, useState } from 'react'
import MediasUpload from '../Messages/MediaUpload'
import { AiOutlineMinusSquare } from '@/public/icons/ico'

const CreatePoll: FC<ModalComponent> = ({ get, set }) => {
    const {
        setTitle, options, title,
        medias, setMedias, setOptions,
    } = usePoll()
    const [
        filePreview, setMFilePreview
    ] = useState<string>('')

    const handleOptionChange = (
        id: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const updatedOptions = options.map(
            (option) => option.id === id ? {
                ...option,
                option: event.target.value
            } : option
        )

        setOptions(updatedOptions)
    }

    const handleAddOption = () => {
        if (options.length < 10) {
            setOptions([...options, { id: uuid(), option: '' }])
        }
    }

    const handleRemoveOption = (id: string) => {
        if (options.length > 2) {
            const updatedOptions = options.filter((option) => option.id !== id)
            setOptions(updatedOptions)
        }
    }

    console.log(options)

    return (
        <Modal
            get={get}
            set={set}>
            <section>
                {/* <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`mb-3`}
                /> */}
                <Input
                    type='text'
                    label='Question/Title'
                    value={title}
                    onChange={setTitle}
                />
                <MediasUpload
                    get={medias}
                    set={setMedias}
                    id='poll_files'
                />
                <article className='flex flex-col gap-2 mt-5 w-full'>
                    {options.map(({ id, option }) => (
                        <div
                            key={id}
                            className='flex gap-3 w-full'>
                            <input
                                type='text'
                                value={option}
                                maxLength={89}
                                onChange={(e) => handleOptionChange(id, e)}
                                className={`w-full`}
                            />
                            {options.length > 2 &&
                                <button
                                    onClick={() => handleRemoveOption(id)}
                                    className={``}>
                                    <AiOutlineMinusSquare />
                                </button>}
                        </div>
                    ))}
                    {options.length < 10 &&
                        <button
                            onClick={() => handleAddOption()}
                            className={``}>
                            Add
                        </button>}
                </article>
            </section>
        </Modal>
    )
}

export default CreatePoll