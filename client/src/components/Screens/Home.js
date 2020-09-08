import React,{useEffect} from 'react'
import M from 'materialize-css'
import {Link}from 'react-router-dom'
import Movie from './Movie'
import Rating from './Rating'

const Home = () => {

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems);
    });

    
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });
    return (
      
            
           <Movie/>
          
           

     
    )
}

export default Home
