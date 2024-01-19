import React, { useContext } from 'react';  // Importing useContext from React
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from "../context/ChatContext";

const Chat = () => {

    const { data } = useContext(ChatContext);

  return (
    <div className='flex-grow flex justify-between'>
        <div className='flex-grow bg-purple-800 rounded-e-md lg:rounded-none flex flex-col '>
            <div className=' shadow-md text-white px-4 py-2 h-16 flex items-center gap-4 relative'>
                <div className='rounded-full overflow-hidden'>
                    <img src={data.user.photoURL} alt="" className='h-12 w-12 object-cover'/>
                </div>
                <p>
                    {data.user.displayName}
                </p>
                <div>
                    <img src="./menu1.png" alt="" className='h-10 w-10 object-cover absolute right-4 top-4 cursor-pointer hover:bg-purple-600 p-2'/>
                </div>
                <div className='absolute border-purple-900 border shadow-md bg-white rounded-md text-purple-950 flex-col items-start gap-2 p-2 top-12 right-5 hidden'>
                    <button className='hover:bg-fuchsia-700 py-1 px-2 rounded-md hover:text-white'>Delete Chat</button>
                    <button className='hover:bg-red-600 py-1 px-2 rounded-md hover:text-white'>Block User</button>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
        <div className='hidden bg-purple-200 rounded-e-md w-64 flex-col'>
            <div className='h-1/2 overflow-hidden'>
                <div className='h-5/6'>
                    <img className='h-full w-full object-cover hover:saturate-150' src="./pp2.png" alt="" />
                </div>
                <p className='text-center font-semibold text-2xl text-purple-900'>Sewwandi</p>
            </div>
            <div className='relative flex-grow p-3 flex flex-col gap-2 text-purple-800'>
                <div className=''>
                    <p className='font-light text-sm'>Full Name : </p>
                    <p>Sewwandi Perera</p>
                </div>
                <div>
                    <p className='font-light text-sm'>Email : </p>
                    <p>Sewwandi@gmail.com</p>
                </div>
                <div className='absolute right-5 bottom-5 text-sm flex gap-2'>
                    <button className='bg-fuchsia-500 px-3 py-2 rounded-lg text-white hover:scale-105'>Delete Chat</button>
                    <button className='bg-red-500 px-3 py-2 rounded-lg text-white hover:scale-105'>Block User</button>     
                </div>
            </div>
        </div>
    </div>
  );
}

export default Chat
