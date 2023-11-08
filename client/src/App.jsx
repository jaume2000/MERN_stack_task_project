import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TaskFormPage from "./pages/TaskFormPage"
import TasksPage from './pages/TasksPage'
import ProfilePage from "./pages/ProfilePage"
import ProtectedRout from "./components/ProtectedRout"
import TaskProvider from './context/TaskContext'

function App(){
  return (
  <AuthProvider>
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          /* Rutas públicas */
          <Route path='/' element={<h1>{<HomePage/>}</h1>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          /* Rutas privadas */
          <Route element={<ProtectedRout/>}>
            <Route path='/tasks' element={<h1>{<TasksPage/>}</h1>}/>
            <Route path='/add-task' element={<h1>{<TaskFormPage/>}</h1>}/>
            <Route path='/task/:id' element={<h1><TaskFormPage/></h1>}/>
            <Route path='/profile' element={<h1><ProfilePage/></h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  </AuthProvider>
  )
}

export default App