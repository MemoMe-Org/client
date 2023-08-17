import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'

export default axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
