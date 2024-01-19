import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthenContext'

function Navbar() {
  const navigate = useNavigate()
  const currentUser = useContext(AuthContext)
  const user = currentUser.currentUser;

  console.log(currentUser)
  return (
    <div className='flex h-16 bg-white justify-between p-2 px-4 items-center rounded-ss-md'>
        <h2 className='font-semibold text-3xl text-purple-950'>KWIK</h2>
        <div className='rounded-full overflow-hidden cursor-pointer' onClick={()=> navigate('/profile')}>
          <img src={user.photoURL} alt="" className='h-10 hover:scale-105' />
        </div>
    </div>
  )
}

export default Navbar
