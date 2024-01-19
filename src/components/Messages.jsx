import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import CryptoJS from 'crypto-js';
// import { REACT_APP_SECRET_KEY } from '../config';
const key = import.meta.env.VITE_SECRET_KEY;

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    // const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    //   doc.exists() && setMessages(doc.data().messages);
    // });
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        // Decrypt and set messages
        const decryptedMessages = doc.data().messages.map((message) => {
          return {
            ...message,
            text: CryptoJS.AES.decrypt(message.text, key).toString(CryptoJS.enc.Utf8),
            img: message.img ? CryptoJS.AES.decrypt(message.img, key).toString(CryptoJS.enc.Utf8) : null,
          };
        });
        setMessages(decryptedMessages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // console.log(decryptedMessages);

  return (
    <div className='bg-white flex-grow p-3 overflow-y-scroll flex flex-col gap-2'>
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
    </div>
  )
}

export default Messages
