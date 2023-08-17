import { toast } from "react-hot-toast"

const notify = (msg: string, action: NotifyAction) => {
    if (action === 'success') {
        toast.success(msg, {
            duration: 1900
        })
    }

    if (action === 'error') {
        toast.error(msg, {
            duration: 2300
        })
    }
}


export default notify