// LOS ARCHIVOS SERVICE SON LOS QUE INTERACTUAN DIRECTAMENTE CON MI BASE DE DATOS

import axios from 'axios'
const API_URL = 'https://kind-pink-piranha-cuff.cyclic.app/api/tareas/'
// const API_URL = 'http://.../api/tareas/'


// Crear una nueva tarea

const crearTarea = async (tareaData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.post(API_URL, tareaData, config)
    // Axios siempre regresa todo dentro de data, por eso...
    return response.data
}

//get tareas
const getTareas = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}


//delete tarea
const deleteTarea = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const tareaService = {
    crearTarea,
    getTareas,
    deleteTarea
}

export default tareaService