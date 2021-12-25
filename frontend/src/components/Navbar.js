import React,{useEffect,Fragment} from 'react'
import { Link } from 'react-router-dom';
import {logout} from "../actions/auth";
import {connect} from "react-redux";
import { useSelector } from "react-redux";

const Navbar = ({logout,isAuthenticated}) => {
  // const isAuth=useSelector(state=>state.auth.isAuthenticated)
  // console.log(isAuth)
    const guestLink = () => (
        <Fragment>
          <div className="navbar-nav">
            <Link to="/" className="nav-link active" aria-current="page" href="#">
              Home
            </Link>
            <Link to="/login" className="nav-link" href="#">
              Log in
            </Link>
            <Link to="/signup" className="nav-link" href="#">
              Sign in
            </Link>
          </div>
        </Fragment>
      );

      const authLink = () => (
        <Fragment>
          <div className="navbar-nav">
            <Link to="/" className="nav-link active" aria-current="page" href="#">
              Home
            </Link>
            <a onClick={logout}  className="nav-link" href="#">
              Logout
            </a>
          </div>
        </Fragment>
      );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" href="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      {isAuthenticated?authLink(): guestLink()}
    </div>
  </div>
</nav>
  
    )
};


const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
  })
  
export default connect(mapStateToProps,{logout}) (Navbar)
