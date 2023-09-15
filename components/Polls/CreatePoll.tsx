import Modal from '../Modal'
import { usePoll } from '@/utils/store'
import { ChangeEvent, FC, useState } from 'react'

const CreatePoll: FC<ModalComponent> = ({ get, set, data }) => {
    const {
        file, setFile,
        options, setOptions
    } = usePoll()
    const [
        filePreview, setMFilePreview
    ] = useState<string>('')

    const handleOptionChange = (
        id: number,
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
        const idx = options.length + 1
        setOptions([...options, { id: idx, option: '' }])
    }

    const handleRemoveOption = (id: number) => {
        const updatedOptions = options.filter((option) => option.id !== id)
        setOptions(updatedOptions)
    }

    return (
        <Modal
            get={get}
            set={set}>

        </Modal>
    )
}

export default CreatePoll