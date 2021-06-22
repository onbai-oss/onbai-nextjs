import axios, { AxiosInstance } from 'axios'
import toast from 'react-hot-toast';

const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

function showLoading() {
  hideLoading()
  const loadContent = document.createElement('div')
  loadContent.className = 'onbai-loading-full'
  loadContent.innerHTML = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45"/>
    </svg>
    `
  document.body.appendChild(loadContent)
}
function hideLoading() {
  const listLoading = document.querySelectorAll('.onbai-loading-full')
  listLoading.forEach((e) => e.remove())
}

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    showLoading()
    return config
  },
  function (error) {
    // Do something with request error
    hideLoading()
    return Promise.reject(error)
  }
)

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    hideLoading()
    return response
  },
  function (error) {
    hideLoading()
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error('Có lỗi, vui lòng thử lại.')
    return Promise.reject(error)
  }
)

export { API }
