import React,{useState} from 'react';
import {Link,Navigate}from "react-router-dom"
import {connect} from "react-redux";
import {reset_password} from "../actions/auth"

const ResetPassword = ({reset_password}) => {
    const [requestSent, setrequestSent] = useState(false)
    const [formdata,setformdata]=useState({
        email:''
    });

    const {email}=formdata;

    const onChange=e=>setformdata({...formdata,[e.target.name]:e.target.value})

    const onSubmit=e=>{
        e.preventDefault();
        reset_password(email);
        setrequestSent(true);
    };

    //Is user Authenticated
    //Return to Home Page

        if (requestSent) {
            return <Navigate to='/' />
        }

  

    return (
        <div className="m-5">
            <h2>Reset Password</h2>
            <p>Change your password</p>
            <form onSubmit={e=>onSubmit(e)}>
                <div>
                    <h5>Email</h5>
                    <input type="email" name="email" id="email" name="email" value={email} required  onChange={e=>onChange(e)}  />
                </div>
                <button type="submit">Proceed</button>
            </form>
        </div>
    )
}

export default connect(null,{reset_password}) (ResetPassword)
