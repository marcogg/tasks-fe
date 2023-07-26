import {useState, useEffect} from 'react'
import {FaUser, FaUserAltSlash} from 'react-icons/fa'
// Use selector equivale al useState de React, useDispatch es el que desencadena la funcionón, el trigger
import { useSelector, useDispatch } from 'react-redux'
// UseNAvigate nos ayuda a ir a una página en particular
import { useNavigate } from 'react-router-dom'
// toast es un paquete para mostrar mensjaes bonitos
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner.jsx'


const Register = () => {
    // Form State
    const [formData, sendFormData]   = useState({
        name: '',
        email: '',
        password:'',
        password2:'',
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

    // ONCHANGE
    const onChange = (e) => { 
        sendFormData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    // Manejanod cuando ejecuar las funciones con UseEffect
    useEffect(()=>{
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate('/login')
        }

        // Reseteando los valores
        dispatch(reset())

    }, [user, isError, isSuccess, message. navigate, dispatch])

    // OnSubmit
    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Los passwords no coinciden')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }


    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className='heading'>
        <h5><FaUser/>Registrar un usuario</h5>
        <p>Por favor regístrate en la app</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
        {/* Here the "value" attribute belongs to the destructured object in the useState  */}
        <div className='form-group'>
            <input 
                type="text" 
                className='form-control' 
                id='name' 
                name='name'
                placeholder='Escribe tu nombre'
                value={name}
                    onChange={onChange}
            />
        </div>
        <div className='form-group'>
            <input 
                type="email" 
                className='form-control' 
                id='email' 
                name='email' 
                placeholder='Escribe tu contraseña'
                value={email}
                    onChange={onChange}
            />
        </div>
        <div className='form-group'>
            <input 
                type="password" 
                className='form-control' 
                id='password' 
                name='password'
                placeholder='Escribe tu contraseña'
                value={password}
                onChange={onChange}
            />
        </div>
        <div className='form-group'>
            <input 
                type="password" 
                className='form-control' 
                id='password2' 
                name='password2' 
                value={password2}
                placeholder='Por favor confirma tu password'
                onChange={onChange}
            />
        </div>
        <div className='form-group'>
            <button type='submit' className='btn btn-block'>Crear</button>
        </div>
        </form>
    </section>

    </>
    )
}

export default Register