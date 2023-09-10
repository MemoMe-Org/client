import axiosStatic from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'
const generativeUrl = isProd ? process.env.NEXT_PUBLIC_GEN_URL : 'http://localhost:1002'

const axios = axiosStatic.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (err) => {
        const req = err.config

        if (err.response.status === 401 && err.response.data.message === 'Access token expired.') {
            try {
                const res = await axios.post('/auth/refresh')
                req.headers.authorization = `Bearer ${res.data.access_token}`

                return axios(req)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
    }
)

const axiosReq = axiosStatic.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

const generativeApi = axiosStatic.create({
    baseURL: generativeUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
export { generativeApi, axiosReq }