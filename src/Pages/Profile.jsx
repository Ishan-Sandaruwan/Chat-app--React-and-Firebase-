import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthenContext'

function Profile() {
    const currentUser = useContext(AuthContext);
    const user = currentUser.currentUser;
console.log(user);
    return (
    <div className='font-body relative bg-purple-600 w-full h-screen flex items-center justify-center text-white '>
        <div className='bg-violet-700 p-4 rounded-md h-5/6 w-96 flex flex-col gap-8'>
            <div className="flex flex-col items-center gap-2">
                <div className='rounded-full overflow-hidden mt-8'>
                    <img src={user.photoURL} alt="profile photo" className='h-28' />
                </div>
                <p className='font-semibold text-2xl'>{user.displayName}</p>
            </div>
            <div className="form-container flex-grow flex flex-col gap-12 relative">
                <div className="flex flex-col px-6">
                    <label htmlFor="">User Name</label>
                    <input type="text" name="" id="" className='rounded-md px-2 py-1 text-black' value={user.displayName}/>
                </div>
                <div className="flex flex-col px-6 -mt-4">
                    <label htmlFor="">Email Address</label>
                    <input type="text" name="" id="" className='rounded-md px-2 py-1 text-black' value={user.email}/>
                </div>
                <div className='absolute bottom-1 text-purple-200 cursor-pointer'>
                    <p className='hover:text-white'>Change profile photo</p>
                    <p className='hover:text-white'>Change Password</p>
                </div>
                <div className='absolute bottom-0 right-2 bg-red-500 px-4 py-1 rounded-md hover:opacity-80'>
                    <button onClick={()=>signOut(auth)}>LOG OUT</button>
                </div>
            </div>
        </div>
      <p className='absolute top-4 left-4 cursor-pointer  '><Link to={'/'}>Back to Home</Link></p>
    </div>
  )
}

export default Profile
