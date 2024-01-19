import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthenContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    console.log(message); 
    return (
        <div ref={ref}
            className={`flex gap-2 ${message.senderId === currentUser.uid && "flex-row-reverse"}`}>
            <div className='flex flex-col gap-1 w-12'>
                <div className='rounded-full overflow-hidden shadow-lg w-8'>
                    <img src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    } alt="" className='w-8 h-8 object-cover' />
                </div>
                {/* <p className='text-xs text-purple-400'>
                    just now 
                </p> */}
            </div>
            <div className='flex flex-col gap-1 items-start'>
                <p className='px-3 py-1 bg-purple-400 rounded-xl '>
                    {message.text}
                </p>
                {message.img && <img src={message.img} alt="" className="max-w-52 rounded-md shadow-md"/>}
            </div>
        </div>
    );
};

export default Message
