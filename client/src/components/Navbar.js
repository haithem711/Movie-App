import React from 'react'
import {Link}from 'react-router-dom'
import M from 'materialize-css'

const Navbare = () => {
  
 
  var options = {
    menuWidth: 10, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor

    
 }
  
 
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
       M.Sidenav.init(elems,options);})

    return (
      <>
      <div className="navbar-fixed">
        <nav >
          <div className="nav-wrapper #2962ff blue accent-4 ">
            <Link to="/" className="brand-logo " style={{marginLeft:'10px'}} >Movies App </Link>
            <Link to ="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
            <ul className="right hide-on-med-and-down"style={{marginRight:"15px"}}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About Us</Link></li>

             
            </ul>
          </div>
          </nav>
          </div>
        <ul className="sidenav" id="slide-out">
          <li><a href="/">Home</a></li>
          <li><a href="/About">About us</a></li>
        </ul>
       </>
        
       
     
    
       

 
       
    )
}

export default Navbare
