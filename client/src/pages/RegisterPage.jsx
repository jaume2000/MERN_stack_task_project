import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function RegisterPage() {

    const {register,handleSubmit, formState: {errors}} = useForm()
    const {signup, isAuthenticated, errors: registerErrors} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/tasks")
            console.log("user is authenticated")
        }
    },[isAuthenticated])

    const onSubmit = handleSubmit(async (values)=>{
        signup(values)
    })


    //console.log(registerErrors);

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                {
                    registerErrors.map((e,i)=>(
                        <div key={i} className='bg-red-500 p-2 text-white text-center'>{e}</div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <input type="text"
                        {...register("username", {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                        placeholder="Username"
                    />
                    {errors.username && (<p className='text-red-500'>Usermane is required</p>)}
                    <input type="email"
                            {...register("email", {required: true})}
                            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                            placeholder="Email"
                        />
                    {errors.email && (<p className='text-red-500'>Email is required</p>)}

                    <input type="password"
                        {...register("password", {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 my-2 py-2 rounded-md'
                        placeholder="Password"
                    />
                    {errors.password && (<p className='text-red-500'>Password is required</p>)}


                    <button type="submit" className='bg-zinc-500 rounded-md w-full px-10 py-1 mt-3 mb-5'>Register</button>
                </form>
                <p className='flex gp-x-2 justify-between'>
                    {"Already have an account?"} <Link className="text-sky-500" to='/login'>Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
 