import axios from 'axios'
const token = JSON.parse(localStorage.getItem('userToken') as string)

axios.defaults.baseURL = 'https://safe-oasis-02926.herokuapp.com'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
export default axios
