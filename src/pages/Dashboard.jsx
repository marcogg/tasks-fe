import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import TareaForm from '../components/TareaForm'
import Spinner from '../components/Spinner'
import { getTareas, reset } from "../features/tareas/tareaSlice"



const Dashboard = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const {user} = useSelector((state) => state.auth)
const {tareas, isLoading, isError, message} = useSelector((state) => state.tarea)


useEffect(() =>{
if (isError){
  console.log(message)
}

if (!user){
  navigate('/login')
}

dispatch(getTareas())

return () =>{
  dispatch(reset)
}

},[user, navigate, isError, dispatch])

if(isLoading) {
  return <Spinner/>
}

  return (
    <>
      <section>
      {/* Aqui un operador ternario simplificado sin el equvalente del else */}
        <div>Bienvenido {user && user.name}</div>
        <p>Dashboard de tareas</p>
        <TareaForm/>
      </section>
      <section className="content">
      {tareas.length > 0 ? (
        <div className="tarea">
          {tareas.map((tarea) => (
            <TareaItem key={tarea._id} tarea={tarea}/>
          ))}
        </div>
        ):(<h3>No hay tareas para mostrar</h3>)}
      </section>
    </>
  )
}

export default Dashboard