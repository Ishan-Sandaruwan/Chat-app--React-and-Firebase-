import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

function Home() {
  return (
    <div className='font-body w-full h-screen bg-purple-600 flex items-center justify-center p-1 overflow-hidden'>
        <div className='bg-white max-w-5xl w-11/12 h-5/6 rounded-md flex '>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home
