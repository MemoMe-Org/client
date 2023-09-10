import axios from '@/app/api/axios'
import { AxiosResponse } from 'axios'

const logout = async () => {
    return await axios.get('/auth/logout')
        .then((res: AxiosResponse) => res)
}

export default logout