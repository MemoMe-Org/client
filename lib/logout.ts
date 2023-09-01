import axios from '@/app/api/axios'
import { AxiosResponse } from 'axios'

const logout = async (token: string) => {
    return await axios.get('/auth/logout', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res: AxiosResponse) => res)
}

export default logout