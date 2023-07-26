import axios from 'axios'

const API_URL = 'https://kind-pink-piranha-cuff.cyclic.app/api/users/'

//crear un usuario
const register = async(userData) =>{
    const response = await axios.post(API_URL, userData)

    // Axios siempre devuelve dentro de la respuesta un objeto Data, que es la respuesta del back
    return response.data
}

//login usuario
const login = async(userData) =>{
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// logout
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService