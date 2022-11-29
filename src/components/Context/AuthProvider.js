import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config'
export const AuthContext=createContext();
const auth =getAuth(app);

const AuthProvider = ({children}) => {
 
    const [user,setUser]=useState(null);
    const [loader,setLoader]=useState(true);
    
    const createUser =(email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser =(email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateProfileUser =(userInfo)=>{
        setLoader(true)
       return updateProfile(auth.currentUser,userInfo)
    }
    const logOut=()=>{
        setLoader(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false);
        })
        return () => unsubscribe();
    },[])


    const resetPassword =(email)=>{
        setLoader(true)
        return sendPasswordResetEmail(auth, email)
    }
    const provider = new GoogleAuthProvider();
    const GoogleSignin=()=>{
        setLoader(true)
        return signInWithPopup(auth, provider)
       }
  
    const userInformation={user,resetPassword,createUser,loginUser,logOut,loader,setLoader,updateProfileUser,GoogleSignin}
    return (
        <AuthContext.Provider value={userInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


