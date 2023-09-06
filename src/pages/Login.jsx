import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
// UseNAvigate nos ayuda a ir a una página en particular
import { useNavigate } from 'react-router-dom'
// toast es un paquete para mostrar mensjaes bonitos
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner.jsx'


const Login = () => {
    // Form State
    const [formData, sendFormData]   = useState({
        email: '',
        password:'',
    })

    const {email, password} = formData

    // ONCHANGE
    const onChange = (e) => { 
        sendFormData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)


    // OnSubmit
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

 // Manejanod cuando ejecuar las funciones con UseEffect
 useEffect(()=>{
    if (isError) {
        toast.error(message)
    }

    if (isSuccess) {
        navigate('/')
    }

    // Reseteando los valores
    dispatch(reset())

}, [user, isError, isSuccess, message. navigate, dispatch])

if(isLoading) {
    return <Spinner />
}

  return (
    <>
    <section className='heading'>
        <h5><FaSignInAlt/>Registrar Login de usuario</h5>
        <p>Por favor inicia sesión en la app</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
        {/* Here the "value" attribute belongs to the destructured object in the useState  */}
        <div className='form-group'>
            <input 
                type="email" 
                className='form-control' 
                id='email' 
                name='email' 
                placeholder='Escribe tu email'
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
            <button type='submit' className='btn btn-block'>Crear</button>
        </div>
        </form>
    </section>

    </>
    )
}

export default Login