import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function Login() {
    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            console.log(error)
            setErr(true);
        }
    }
  return (
    <div className='flex justify-center items-center bg-purple-600 w-full h-screen text-white font-body'>
        <div className='bg-purple-700 rounded-md p-3 h-5/6 shadow-md w-96 flex flex-col '>
            <div className='text-5xl font-bold text-center p-4'>
                KWIK 
            </div>
            <div className='h-full flex flex-col justify-between '>
                <h2 className='text-2xl text-center text-purple-200'>
                    Login Now
                </h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='flex flex-col p-2'>
                        <label>
                           Enter your email 
                        </label>
                        <input type='text' placeholder='someone@gmail.com' className='rounded-md px-3 py-1 text-black'/>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label>
                            Password
                        </label>
                        <input type='password' placeholder='......' className='rounded-md px-3 py-1 text-black'/>
                    </div>
                    <button className='bg-purple-800 hover:bg-purple-900 p-2 m-4 rounded-md '>Sign up</button>
                    { err && <span className='text-sm text-red-300 text-center -translate-y-3'>Something went wrong !!! </span> }
                </form>
                <h5>
                    You don't have an account <a className='text-purple-200 hover:text-purple-50 cursor-pointer'><Link to={'/register'}>Register Now</Link></a> 
                </h5>
            </div>
        </div>
    </div>
  )
}

export default Login
