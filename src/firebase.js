
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useId } from "react";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyA-PJDh79yfskExXr2ibs6l4-pGvxiZDNM",
  authDomain: "netflix-clone-d8b3a.firebaseapp.com",
  projectId: "netflix-clone-d8b3a",
  storageBucket: "netflix-clone-d8b3a.appspot.com",
  messagingSenderId: "431872006593",
  appId: "1:431872006593:web:be966a5d8e70e279243740"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) =>{
    try{
        const respone = await createUserWithEmailAndPassword(auth,email,password)
        const user = respone.user;

        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        });
    }
    catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}
 
const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth,db,login,signup,logout}