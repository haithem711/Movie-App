import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import ReactStars from "react-rating-stars-component";
import Loading from './Loading';
const MovieTitle = () => {
  const { slug } = useParams();
  const [data, setData] = useState([])
   const[loading,setLoading]=useState(true)
  useEffect(() => {
    axios.get(`/moviess/${slug}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
        setLoading(false)
      })

  }, [])

  return (
    <div style={{ width: '75%', margin: 'auto' }}>
     {   (loading)?<Loading/> : 
     <>
     
     <h2 className="header">{data.title}</h2>
    
<div className="card horizontal">

        <img className="imag" src={`http://localhost:5000/api/movies/photo/${data.slug}`} />

        <div className="card-stacked">
          <div className="card-content">
            <h5> Actors:</h5> {data.actors}
            <div ><h5> genres:</h5><p style={{ float: 'inline-end' }} >{data.genres}</p></div>
            <h5> Desription:</h5>{data.description}
            <h5> Rating:</h5> 
            <ReactStars
              count={5}
              value={data.rating}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false}
            />

          </div>
        </div>
      </div>
      <iframe width="100%" height="600" style={{ marginBottom: '50px' }}
        src={`${data.trailer}`}>
      </iframe>
      </>
      }
    </div>
  )
}
export default MovieTitle
