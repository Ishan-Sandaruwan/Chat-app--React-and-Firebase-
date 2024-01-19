import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthenContext";

function Search() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  // const cuser = currentUser.currentUser;

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("user_name", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        setErr(true);
        setUser(null);
      }      
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setErr(false);
      });
    } catch (err) {
      console.error("Error fetching documents: ", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.user_name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      else{
        console.log("alrady exists");
      }
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setUsername("")
  };

  return (
    <div className='w-full flex p-2 items-center flex-col gap-2'>
      <div className="flex gap-2 items-center">
        <div className=''>
          <img src="./search.png" alt="" className='w-6' />
        </div>
        <input 
          type="text" placeholder='Search Here' 
          className='px-2 py-1 rounded-md max-w-52' 
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}/>
      </div>
      <div className="w-full">
      {err && 
        <span className="text-sm pl-8 text-purple-800">User not found!</span> 
      } 
      {user && (
        <div className="flex gap-2 items-center bg-purple-400 px-4 py-1 rounded-md cursor-pointer" onClick={handleSelect}>
          <img src={user.photoURL} className="h-14 w-14 object-cover rounded-full" alt="" />
          <div className="text-purple-900">
            <span>{user.user_name}</span>
          </div>
        </div>
      )} 
      </div>
    </div>
  )
}

export default Search
