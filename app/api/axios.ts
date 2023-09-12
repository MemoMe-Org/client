import getCookie from '@/utils/getCookie'
import axiosStatic, { AxiosInstance } from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'
const generativeUrl = isProd ? process.env.NEXT_PUBLIC_GEN_URL : 'http://localhost:1002'

const axios: AxiosInstance = axiosStatic.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('access_token')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (err) => {
        if (err.response.status === 401) {
            const req = err.config
            try {
                const res = await axios.post('/auth/refresh')
                req.headers.authorization = `Bearer ${res.data?.access_token}`

                return axios(req)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
    }
)

const axiosReq: AxiosInstance = axiosStatic.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

const generativeApi = axiosStatic.create({
    baseURL: generativeUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
export { generativeApi, axiosReq }