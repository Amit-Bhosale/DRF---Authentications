import React,{useState} from "react";
import { Link, Navigate,useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({reset_password_confirm }) => {
    const params =useParams()
  const [requestSent, setrequestSent] = useState(false);
  const [formdata, setformdata] = useState({
    new_password: "",
    re_new_password:""
  });

  console.log(params)
  const { new_password,re_new_password } = formdata;

  const onChange = (e) =>
    setformdata({ ...formdata, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;
    reset_password_confirm(uid, token, new_password, re_new_password);
    setrequestSent(true);
  };

  //Is user Authenticated
  //Return to Home Page

  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <div className="m-5">
      <h2>Enter New Password</h2>
      <p>Change your password</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <h4>New Password</h4>
        <input
          type="password"
          name="new_password"
          id="password"
          value={new_password}
          onChange={(e) => onChange(e)}
          required
        />
        <h4>Re-Enter New Password</h4>
        <input
          type="password"
          name="re_new_password"
          id="new_password"
          value={re_new_password}
          onChange={(e) => onChange(e)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default connect(null, {reset_password_confirm}) (ResetPasswordConfirm);
