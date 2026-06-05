
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import CodeEditer from './pages/CodeEditer';
import { ProtectedRoute, PublicRoute } from './componets/RouteGuard';


function App() {


  return ( <> 

  <Routes>
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
    <Route path='/login' element={<PublicRoute><div><Login/></div></PublicRoute>} />
    <Route path='/signup' element={<PublicRoute><SignUp/></PublicRoute>} />
    <Route path='/editer/:projectId' element={<ProtectedRoute><CodeEditer/></ProtectedRoute>} />
  </Routes>

  </>
  )
}

export default App
