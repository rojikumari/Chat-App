import React, { useState } from "react";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth , db} from '../firebase';
import {doc, updateDoc} from 'firebase/firestore';
import {useHistory} from 'react-router-dom';
function Login() {
  
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  let history = useHistory();
  const { email, password, error, loading } = data;
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setData({...data, error : null , loading : true})
    if ( !email || !password) {
      setData({ ...data, error: "All fields required" });
    }
    try{
        const result = await signInWithEmailAndPassword(auth,email,password);
        await updateDoc(doc(db,'users',result.user.uid),{
            isOnline : true,
        });
        setData({email : '', password : '' , error : null , loading : false})
        alert("loggedin  Successfully")
        history.replace("/")
        // firebase.firestore().collection('users').doc(id).set({})
        // console.log(result.user);
    }
    catch(err){
      setData({...data, error : err.message , loading : false})
    }
  }
  return (
    <section>
      <h2>Login to your Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>{loading ? 'logging in....' : 'login'}</button>
        </div>
      </form>
    </section>
  );
}
export default Login;
