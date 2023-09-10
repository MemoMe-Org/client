import axiosReq from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'
const generativeUrl = isProd ? process.env.NEXT_PUBLIC_GEN_URL : 'http://localhost:1002'

const axios = axiosReq.create({
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
                document.cookie = `access_token=${res.data.access_token}; path=/; domain=''; secure; samesite=strict; max-age=${20 * 60}`

                return axios(req)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
    }
)


const generativeApi = axiosReq.create({
    baseURL: generativeUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
export { generativeApi }