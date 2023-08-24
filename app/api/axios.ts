import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'
const generativeUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:1002'

export default axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})


const generativeApi = axios.create({
    baseURL: generativeUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export { generativeApi }