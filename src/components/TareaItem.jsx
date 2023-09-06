import { useDispatch } from "react-redux"

const TareaItem = ({tarea}) => {

    // Aqui inicializamos el Dispatch que es el trigger que corre funciones
    const dispatch = useDispatch()

  return (
    <div className="tarea">
        <div>
            {new Date(tarea.createdAt).toLocaleString('es-MX')}
        </div>
        <h3>{tarea.texto}</h3>
        <button onClick={ () => dispatch(deleteTarea(tarea.id))} className="close">X</button>
    </div>
  )
}

export default TareaItem