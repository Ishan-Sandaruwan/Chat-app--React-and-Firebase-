import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenContext";
import { ChatContext } from "../context/ChatContext";
import CryptoJS from 'crypto-js';
// import { REACT_APP_SECRET_KEY } from '../config';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const key = import.meta.env.VITE_SECRET_KEY;

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    
    const encryptedText = CryptoJS.AES.encrypt(text, key).toString();

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const encryptedImg = CryptoJS.AES.encrypt(downloadURL, key).toString();
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text:encryptedText,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: encryptedImg,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text:encryptedText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text:encryptedText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text:encryptedText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='flex bg-purple-300 p-2 rounded-ee-md lg:rounded-none'>
      <input
        type="text"
        placeholder='Type Your Message'
        className='flex-grow rounded-md px-2 py-1 mr-2'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <img src="./emoji.png" alt="" className='h-10 w-10 object-cover cursor-pointer hover:opacity-60' />
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label htmlFor="file">
        <img src="./attachment1.png" alt="" className='h-10 w-10 object-cover cursor-pointer hover:opacity-60' />
      </label>
      <img
        src="./send.png"
        alt=""
        onClick={handleSend}
        className='h-10 w-10 object-cover cursor-pointer hover:scale-110'
      />
    </div>
  )
}

export default Input
