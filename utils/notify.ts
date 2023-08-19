import { toast } from 'react-hot-toast'

const notify = (action: NotifyAction, msg: string): void => {
    if (action === 'success') {
        toast.success(msg, {
            duration: 2300
        })
    }

    if (action === 'error') {
        toast.error(msg, {
            duration: 3200
        })
    }
}


export default notify