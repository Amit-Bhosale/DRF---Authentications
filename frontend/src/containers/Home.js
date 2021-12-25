import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="d-flex justify-content-center m-4">
    <div className="row align-items-md-stretch">
      <div className="col-md-6">
        <div className="h-100 p-5 text-white bg-dark rounded-3">
          <h2>React Django Authentication System</h2>
          <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
          <Link to='/login'><button className="btn btn-outline-light" type="button">Login</button></Link>
        </div>
      </div>
        </div>
        </div>
    )
}

export default Home
