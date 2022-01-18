import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { auth , db} from "../firebase";
import { signOut} from "firebase/auth"
import {updateDoc, doc} from 'firebase/firestore'
import {AuthContext} from '../context/auth'
import {useHistory} from "react-router-dom"
function Navbar() {
    let history = useHistory();
    // console.log(AuthContext);
  const {user} = useContext(AuthContext)  
  async function handleSignOut(){
      await updateDoc(doc(db,'users',auth.currentUser.uid),{
          isOnline : false,
      })
      await signOut(auth);
      history.replace('./login')
  }
  return (
    <nav>
      <h3>
        <Link to="/">NewGenChat</Link>
      </h3>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={handleSignOut}>logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
