import React,{useRef,useEffect} from 'react'
import {Link}from 'react-router-dom'
import M from 'materialize-css'

const Navbare = () => {
  
 
  var Option = {
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor

    
 }
  const  sidenav = useRef(null)
  useEffect(()=>{
    M.Sidenav.init(sidenav.current,Option)
},[])
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper #2962ff blue accent-4 ">
            <Link to="/" className="brand-logo " style={{marginLeft:'10px'}} >Movie App React</Link>
            <Link to ="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
            <ul className="right hide-on-med-and-down"style={{marginRight:"15px"}}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About Us</Link></li>

             
            </ul>
          </div>
        
        
        <ul className="sidenav" id="slide-out"ref={sidenav} >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About us</Link></li>

        </ul>
        </nav>
        
       
      </div>
    
       

 
       
    )
}

export default Navbare
