import getCookie from '@/utils/getCookie'
import throwError from '@/utils/throwError'
import axiosStatic, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

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
            config.headers.authorization = `Bearer ${accessToken}`
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
        const req = err.config
        if (err.response && err.response.status === 401 && !req._retry) {
            req._retry = true
            await axios.post('/auth/refresh')
                .then((res: AxiosResponse) => {
                    req.headers.authorization = `Bearer ${res.data?.access_token}`
                    return axios(req)
                }).catch((err: AxiosError) => {
                    throwError(err)
                    return Promise.reject(err)
                })
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