import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest, loginRequest, verifyTokenRequest} from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    //PROBLEMA: Cuando se recarga la página (por ejemplo, accediendo a /tasks, se BORRA el estado.)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const signup = async (user) => {
        try{
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
            setErrors([])
        } catch (error) {
            setErrors(error.response.data)
        }

    }

    const signin = async (user) => {
        try{
            const res = await loginRequest(user)
            console.log(res)
            setUser(res.data)
            setIsAuthenticated(true)
            setErrors([])
        }
        catch(err){
            console.log(err)
            setErrors(err.response.data)
        }
    }

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            
            return  ()=> clearTimeout(timer)
        }
    }, [errors])

    //Este efecto se ejecuta después de crear el componente y de resetear el estado.
    useEffect(()=>{
        async function checkLogin () {
            const cookies = Cookies.get()

            if(!cookies.token){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return;
            }
            else{
                try{
                    const res = await verifyTokenRequest(cookies.token)
                    console.log(res)
                    if(!res.data){
                        setLoading(false)
                        setIsAuthenticated(false)
                        return;
                    }
                    else{
                        setIsAuthenticated(true)
                        setLoading(false)
                        setUser(res.data)
                    }
                }
                catch(err){
                    setIsAuthenticated(false)
                    setLoading(false)
                    setUser(null)
                    setErrors(err.response.data)
                }
            }
        }

        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            isLoading,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}