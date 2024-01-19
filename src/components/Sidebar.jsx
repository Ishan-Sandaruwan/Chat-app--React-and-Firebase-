import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='w-64 bg-purple-200 rounded-s-md flex flex-col'>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar
