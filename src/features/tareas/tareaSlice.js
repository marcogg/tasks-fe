import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import tareaService from './tareaService'


const initialState = {
    tareas:[],
    isError: false,
    isSuccess:false,
    isLoading: false,
    message:''
    
}
// crear una nueva tarea

// El create async thunk el primero es el prefijo que nos aparecerá en el redux tools
// El segundo parámetro es una function async
export const crearTarea = createAsyncThunk('tareas/crear', async (tareaData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.register(tareaData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Obtener la lista de tareas
// Un underscore, significa que el primer parámetro va vacío, aquí NO lo uso porque el user lo saco del token
export const getTareas = createAsyncThunk('tareas/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.getTareas(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Eliminar una tarea
export const deleteTarea = createAsyncThunk('tareas/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.deleteTarea(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// CADA QUE CREAMOS UNA FUNCION CON THUNKAPI NECESITO UN EXTRAREDUCER

export const tareaSlice = createSlice({
    name:'tarea',
    initialState,
    reducers:{
        reset: (state) => {
            initialState
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(crearTarea.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(crearTarea.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tareas.push(action.payload)
        })
        .addCase(crearTarea.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(getTareas.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getTareas.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tareas=action.payload
        })
        .addCase(getTareas.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(deleteTarea.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteTarea.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            // Aqui, para que se actualice la página sin la tarea que acabo de borrar, hago un filter de JS Vanilla
            state.tareas = state.tareas.filter((tarea) => tarea._id !== action.payload.id)
        })
        .addCase(deleteTarea.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
    }
})

export const {reset} = tareaSlice.actions
export default tareaSlice.reducer