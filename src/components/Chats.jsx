import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthenContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import CryptoJS from 'crypto-js';
// import { REACT_APP_SECRET_KEY } from '../config';
const key = import.meta.env.VITE_SECRET_KEY;
const Chats = () => {

    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <div className='flex flex-col overflow-y-scroll p-2 gap-2 flex-grow'>

            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                const lastMessageText = chat[1].lastMessage?.text;
                const decryptedText = lastMessageText ? CryptoJS.AES.decrypt(lastMessageText, key).toString(CryptoJS.enc.Utf8) : '';
                return (
                    <div
                        className='flex gap-2 items-center bg-purple-300 rounded-md p-1 h-16 cursor-pointer hover:bg-purple-400'
                        key={chat[0]}
                        onClick={() => handleSelect(chat[1].userInfo)}
                    >
                        <div className='min-w-14 max-w-14 h-14 rounded-full overflow-hidden'>
                            <img src={chat[1].userInfo.photoURL} alt="" className='h-full object-cover' />
                        </div>
                        <div className='h-14 overflow-hidden'>
                            <p className='font-semibold'>{chat[1].userInfo.displayName}</p>
                            <p className='text-sm'>{decryptedText}</p>
                        </div>
                    </div>
                )
            })}

            {/* <div className='flex gap-2 items-center bg-purple-300 rounded-md p-1 h-16 cursor-pointer hover:bg-purple-400'>
            <div className='min-w-14 max-w-14 h-14 rounded-full overflow-hidden'>
                <img src="./pp2.png" alt="" className='h-full object-cover'/>
            </div>
            <div className='h-14 overflow-hidden'>
                <p className='font-semibold'>Sewwandi perera </p>
                <p className='text-sm'>Hii dear</p>
            </div>
        </div>
        <div className='flex gap-2 items-center bg-purple-300 rounded-md p-1 h-16 cursor-pointer hover:bg-purple-400'>
            <div className='min-w-14 max-w-14 h-14 rounded-full overflow-hidden'>
                <img src="./pp3.jpg" alt="" className='h-full object-cover'/>
            </div>
            <div className='h-14 overflow-hidden'>
                <p className='font-semibold'>Saman </p>
                <p className='text-sm'># f*** you </p>
            </div>
        </div> */}
        </div>
    )
}

export default Chats
