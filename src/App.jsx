import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import { useContext } from "react";
import { AuthContext } from "./context/AuthenContext";

function App() {

  const { currentUser } = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
