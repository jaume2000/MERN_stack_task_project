import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import {Link} from 'react-router-dom'


function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const {signin, errors: signinErrors} = useAuth()


  const onSubmit = handleSubmit(data=>{

    //console.log(data)
    signin(data)
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {
          signinErrors.map((e,i)=>(
              <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{e}</div>
          ))
        }
        <form onSubmit={onSubmit}>
          <input type="email"
                  {...register("email", {required: true})}
                  className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
                  placeholder="Email"
              />
          {errors.email && (<p className='text-red-500'>Email is required</p>)}

          <input type="password"
              {...register("password", {required: true, minLength: 6})}
              className='w-full bg-zinc-700 text-white px-4 my-2 py-2 rounded-md'
              placeholder="Password"
          />
          {errors.password?.type == 'required' && (<p className='text-red-500'>Password is required</p>)}
          {errors.password?.type == 'minLength' && (<p className='text-red-500'>Password must be at least 6 characters long</p>)}


          <button type="submit" className='bg-zinc-500 rounded-md w-full px-10 py-1 mt-3 mb-5'>Login</button>

        </form>

        <p className='flex gp-x-2 justify-between'>
          {"Don't have an account?"} <Link className="text-sky-500" to='/register'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage