import {useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { user_Avatar } from "../Utils/constants";
import { addUser } from "../Utils/userSlice";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Authentication = () => { 
    const navigate = useNavigate();
    const dispatch = useDispatch() 
    const db = getFirestore();
    const[formMode,setFormMode] = useState("login") 
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    const[validationError,setValidationError]=useState("")
   
    // console.log(name,email,password)
    const handleFormModeToggle = (e) => {
        e.preventDefault();
        setFormMode((prevMode) => (prevMode === "login" ? "signup" : "login"))
    }
  
    const handleSignUp = (name,email,password) => {
        console.log(auth)
        createUserWithEmailAndPassword(auth, email, password)
    
           .then((userCredential) => {
              const user = userCredential.user;
              updateProfile(user,{
                displayName:name,
                photoURL:user_Avatar
              })
               .then(() => {
                dispatch(addUser({uid:user.uid,name:user.displayName,email:user.email,photo:user.photoURL}))
              })
              createUserProfile();
              //console.log(user,"curuser");
              navigate("/home")
           })
           .catch((error) => {
              
              const errorMessage = error.message;
              setValidationError(errorMessage)
           });
      
    }

    const handleSignIn = (email,password) => {
        console.log(auth)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const user = userCredential.user;
               console.log(user);
               navigate("/home")
            
            })
            .catch((error) => {
              
               const errorMessage = error.message;
               console.log(auth);
               console.log(error,"err")
               setValidationError(errorMessage)
            });
           
        }

   const createUserProfile = (user) => {
   console.log("called");
       setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          bio: "New user bio",
          createdAt: new Date(),
  });
};
    return(
      <div>
        <img src="../images/app_image.jpg" className="object-cover relative h-screen w-screen bg-cover bg-center" alt="bg_img"></img>
        <div class="absolute inset-0 flex items-center justify-center">
       
        <form className="absolute flex flex-col justify-center items-center  space-y-5 border border-black bg-black opacity-80 rounded-sm p-10 ">
        <h1 className="text-white text-left w-full text-4xl font-bold ">{formMode === "login" ? "Sign In" : "Sign Up"}</h1>
        
       {formMode === "signup" && <input
            className="border border-gray-500 rounded-md h-14 w-60 placeholder:text-black pl-3"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                onChange={(e)=>setName(e.target.value)}
          /> }

          <input
            className="border border-gray-500 rounded-md h-14 w-60 placeholder:text-black pl-3"
                type="text"
                id="email"
                name="email"
                placeholder="Enter your Email"
                onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className=" h-14 w-60 border border-gray-500 rounded-md placeholder:text-black pl-3"
               type="password"
               id="password"
               name="password"
               placeholder="Enter Your Password"
               onChange={(e)=>setPassword(e.target.value)}
          />
          <p className="text-red-600 font-bold ">{validationError}</p>
          <button 
            onClick={(e) => 
                {
                  e.preventDefault();
                  formMode === "signup" ? 
                  handleSignUp(name,email,password)
                  :
                  handleSignIn(email,password)}} 
            type="submit"
            className="bg-green-600 rounded-md h-14 w-60 text-white font-bold text-xl">
            {formMode === "login" ? "Sign In" : "Sign Up"}
          </button>
          <button className="text-white text-left w-full " onClick={(e) => handleFormModeToggle(e)}>{formMode === "login" ? "New to insta? Sign Up" : "Already Registered? Sign In"}</button>
        </form>
        </div>
      </div>
    );
};
export default Authentication;