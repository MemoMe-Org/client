import { ChangeEvent, FC } from 'react'
import Modal from '../Modal'
import { usePoll } from '@/utils/store'

const CreatePoll: FC<ModalComponent> = ({ get, set, data }) => {
    const {
        options, setOptions
    } = usePoll()

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