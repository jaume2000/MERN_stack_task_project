import my_axios from './axios.js'


export const registerRequest = user => my_axios.post(`/register`, user)

export const loginRequest = user => my_axios.post(`/login`, user)

export const verifyTokenRequest = () => my_axios.get('/verify')