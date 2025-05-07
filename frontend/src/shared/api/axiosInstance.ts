// import { authApi } from '@/entities/auth/api/auth.api'
import axios from 'axios'
import { accessToken } from './accessToken.api'
import { useAuthStore } from '@/entities/auth/lib/useAuthStore'
// import { accessToken } from './accessToken.api'

const axiosDefault = {
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api'
            : 'https://control-finance.top/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
}

export const apiAxios = axios.create(axiosDefault)
export const apiAxiosWithAuthToken = axios.create(axiosDefault)

apiAxiosWithAuthToken.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken.getToken()}`
    }
    return config
})
apiAxiosWithAuthToken.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().setIsAuth(false)
        }
        return Promise.reject(error)
    },
)

// apiAxiosWithAuthToken.interceptors.response.use(
//     (config) => {
//         return config
//     },
//     async (error) => {
//         const originalRequest = error.config
//         if (
//             error.response.status === 401 &&
//             error.config &&
//             !error.config._isRetry
//         ) {
//             originalRequest._isRetry = true
//             try {
//                 const response = await authApi.refreshTokens()
//                 accessToken.setToken(response.data.data.accessToken)
//                 return apiAxiosWithAuthToken.request(originalRequest)
//             } catch (error) {
//                 accessToken.removeToken()
//                 store.dispatch({ type: changeAuth, payload: false })
//             }
//         } else {
//             return Promise.reject(error)
//         }
//     },
// )
