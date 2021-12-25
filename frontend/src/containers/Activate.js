import React,{useState,useEffect} from 'react';
import {Link,Navigate,useParams}from "react-router-dom"
import {connect} from "react-redux";
import {verify} from "../actions/auth"

const Activate = ({verify}) => {
    const params =useParams()
    const [verified, setverified] = useState(false)

    const verify_account=e=>{
       const uid=params.uid;
       const token=params.token;
        verify(uid,token)
        setverified(true)
    };

    //Is user Authenticated
    //Return to Home Page

        if (verified) {
            return <Navigate to='/' />
        }

  

    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <h1>Verify your Account:</h1>
                <button onClick={verify_account} className='mt-5 button button-primary' type='button'>Verify</button>
            </div>
        </div>
    )

};

export default connect(null,{verify}) (Activate);