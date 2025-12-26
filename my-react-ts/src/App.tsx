import { StrictMode } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import CodeEditer from './pages/CodeEditer';


function App() {


  return ( <> 

  <Routes>
  <Route path='/' element={<Home/>} />
     <Route path='/login' element={<div><Login/></div>} />
  <Route path='/signup' element={<SignUp/>} />
  <Route path='/editer/:projectId' element={<CodeEditer/>} />
   </Routes>

  </>
  )
}

export default App
