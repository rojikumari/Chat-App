import React, { useState } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth , db} from '../firebase';
import {setDoc,doc , Timestamp} from 'firebase/firestore';
import {useHistory} from 'react-router-dom';
function Register() {
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  let history = useHistory();
  const { name, email, password, error, loading } = data;
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setData({...data, error : null , loading : true})
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields required" });
    }
    try{
        const result = await createUserWithEmailAndPassword(auth,email,password);
        await setDoc(doc(db,'users',result.user.uid),{
            uid : result.user.uid,
            name,
            email,
            createdAt : Timestamp.fromDate(new Date()),
            isOnline : true,
        });
        setData({name : '', email : '', password : '' , error : null , loading : false})
        alert("Registered Successfully")
        history.replace("/login")
        // firebase.firestore().collection('users').doc(id).set({})
        // console.log(result.user);
    }
    catch(err){
      setData({...data, error : err.message , loading : false})
    }
  }
  return (
    <section>
      <h2>Create An Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={handleChange}
          />
        </div>
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
          <button className="btn" disabled={loading}>{loading ? "Registering..." : "Registered"}</button>
        </div>
      </form>
    </section>
  );
}
export default Register;
