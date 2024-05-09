import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Swal from 'sweetalert2'

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const onResponseError = (error: any): Promise<AxiosError> => {
  const errorMessage = error?.response?.data?.message
  if (errorMessage) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      timer: 2000,
      showConfirmButton: false
    })
  }
  return Promise.reject(error)
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT_API as string
})

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    return config
  },
  async error => onRequestError(error)
)

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response
  },
  async error => onResponseError(error)
)

export default axiosInstance
