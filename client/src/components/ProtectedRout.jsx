import { Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginPage from '../pages/LoginPage'


function ProtectedRout() {
    const {user, isAuthenticated, isLoading} = useAuth()

    // En principio el problema era que siempre que se recarga la página se resetea el estado.
    // Si accedemos a /tasks por ejemplo, se resetea el estado, se ejecuta este código y nos manda de nuevo al login.
    // En cambio, ahora, como añadimos un useEffect(..., [] ) en el AuthContext, se ejecuta después de resetear el estado y como cargamos Loadng...
    // No se resetea el estado, nos esperamos a que isAuthenticated se ponga a True, ya que cuando cambia el estado, este componente se actualiza
    // y seguimos a la siguiente ruta (yendo al else) o si no ocurre correctamente la autenticación, volvemos al login.
    if (isLoading) return <h1>Loading...</h1>
    if (!isLoading && !isAuthenticated){
        return <Navigate to='/login' replace /> 
    }
    else{
        return (
            <Outlet/>
        )
    }
}

export default ProtectedRout