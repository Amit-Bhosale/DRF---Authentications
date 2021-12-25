import React,{useState,useEffect} from 'react';
import {Link,Navigate}from "react-router-dom"
import {connect} from "react-redux";
import {signup} from "../actions/auth"
import axios from 'axios';
const Signup = ({signup,isAuthenticated}) => {
    const [account, setaccount] = useState(false)
    const [formdata,setformdata]=useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        re_password:'',
    });

    const {first_name,last_name,email,password,re_password}=formdata;

    const onChange=e=>setformdata({...formdata,[e.target.name]:e.target.value})

    const onSubmit=e=>{
        e.preventDefault();

        if (password===re_password) {
            signup(first_name,last_name,email,password,re_password);
            setaccount(true);
        }
        else{
            alert("Password don't match")
        }
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
        if(account){
            return <Navigate to='/'/>
        }

  

    return (
        <div className="m-5">
            <h2>Sign up</h2>
            <p>Create your Account</p>
            <form onSubmit={e=>onSubmit(e)}>
                <div>
                    <h5>First Name</h5>
                    <input type="text" name="first_name" id="firstname" value={first_name} required onChange={e=>onChange(e)}/>
                    <h5>Last Name</h5>
                    <input type="text" name="last_name" id="lastname" value={last_name} required onChange={e=>onChange(e)}/>
                    <h5>Email</h5>
                    <input type="email" name="email" id="email" value={email} required  onChange={e=>onChange(e)}  />
                    <h5>Password</h5>
                    <input type="password" name="password" id="password" value={password}  onChange={e=>onChange(e)}  required/>
                    <h5>Retype Password</h5>
                    <input type="password" name="re_password" id="confirmpassword" value={re_password}  onChange={e=>onChange(e)}  required/>
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={ContinuewithGoogle}>Google</button>
            <p>Already have an Account? <Link to='/login' >Login</Link> </p>
            <p>Forget your password? <Link to='/reset-password' >Click here</Link> </p>
        </div>
    )

}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{signup}) (Signup)
