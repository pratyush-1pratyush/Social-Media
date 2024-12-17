import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../Utils/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
            navigate("/")
           }).catch((error) => {
             // An error happened.
           });
    }
   
  return (
    <>
     <button onClick={() => handleSignOut()}>Logout</button>
    </>
    
  )
}

export default Header