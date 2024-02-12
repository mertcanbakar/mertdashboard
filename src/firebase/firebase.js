import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCuG-uRxUfrrb8rZhZZfHahtIRPrErQhmE",
    authDomain: "limely-admin.firebaseapp.com",
    projectId: "limely-admin",
    storageBucket: "limely-admin.appspot.com",
    messagingSenderId: "851323823470",
    appId: "1:851323823470:web:e585afac21c238d7a58d7f",
    measurementId: "G-EGBF4300NY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth()

export const register = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user;
}
export const login = async (email, password) => {
    try{
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user;
    }
    catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try{
        await signOut(auth)
        return true
    } catch(error){
        console.log(error.message)
    }
}

export default app;