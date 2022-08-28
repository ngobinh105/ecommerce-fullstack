import axios from 'axios'
const token = localStorage.getItem('userToken')
axios.defaults.baseURL = 'https://safe-oasis-02926.herokuapp.com/api/v1'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
export default axios
