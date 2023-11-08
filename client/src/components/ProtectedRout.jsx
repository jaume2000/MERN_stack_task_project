import { Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRout() {
    const {user, isAuthenticated, isLoading} = useAuth()

    //No acabo de entender porqué esto funciona.

    //En principio el problema era que siempre que se recarga la página se resetea el estado.
    //Si accedemos a /tasks por ejemplo, se resetea el estado, se ejecuta este código y nos manda de nuevo al login.
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