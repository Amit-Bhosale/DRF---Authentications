import React,{useState,useEffect} from 'react';
import {Link,Navigate}from "react-router-dom"
import {connect} from "react-redux";
import {login} from "../actions/auth"
import axios from 'axios';

const Login = ({login,isAuthenticated}) => {

    const [formdata,setformdata]=useState({
        email:'',
        password:'',
    });

    const {email,password}=formdata;

    const onChange=e=>setformdata({...formdata,[e.target.name]:e.target.value})

    const onSubmit=e=>{
        e.preventDefault();
        login(email,password)
    };

    const ContinuewithGoogle = async () =>{
        try {
            const resp=await axios.get(`/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:8000`);
            window.location.replace(resp.data.authorization_url);
        } catch (error) {
            
        }
    }
    //Is user Authenticated
    //Return to Home Page

        if (isAuthenticated) {
            return <Navigate to='/' />
        }

  

    return (
        <div className="m-5">
            <h2>Login</h2>
            <p>Sign into your Account</p>
            <form onSubmit={e=>onSubmit(e)}>
                <div>
                    <h5>Email</h5>
                    <input type="email" name="email" id="email" name="email" value={email} required  onChange={e=>onChange(e)}  />
                    <h5>Password</h5>
                    <input type="password" name="password" id="password" value={password}  onChange={e=>onChange(e)}  required/>
                </div>
                <button type="submit">Log in</button>
            </form>
            <p>Dont have an Account? <Link to='/signin' >Signup</Link> </p>
                <button onClick={ContinuewithGoogle}>Google</button>
            <p>Forget your password? <Link to='/reset-password' >Click here</Link> </p>
        </div>
    )


}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login); 