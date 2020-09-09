import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import ReactStars from "react-rating-stars-component";
import axios from 'axios'
import { useParams} from "react-router-dom";
import Loading from './Loading';
const Update = () => {
  
    const { slug } = useParams();
    const[loading,setLoading]=useState(true)
    const [data, setData] = useState([])
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [genres, setGenre] = useState("")
    const [rating, setRating] = useState('')
    const [actors, setActors] = useState('')
    const [trailer, setTrailer] = useState('')

    useEffect(() => {
        async function getData() { 
        axios.get(`/moviess/${slug}`)
            .then((res) => {
                
                setData(res.data)
                setLoading(false)

            })}
            getData()

    }, [])


    const handleChange = (e) => {

        const photo = e.target.files[0]; // accesing file
        
        setPhoto(photo); // storing file
    }

    const ratingChanged = (newRating) => {
        
        setRating(newRating)
       

    };

    const Updatemovies = () => {

        var formData = new FormData()
        if (description) { formData.set('description', description) }
        if (actors) { formData.set('actors', actors) }
        if (trailer) { formData.set('trailer', trailer) }
        if (genres) { formData.set('genres', genres) }
        if (rating) { formData.set('rating', rating) }
        if (photo) { formData.set('photo', photo) }

        axios.put(`/moviess/${slug}`, formData, {
            headers: {
                Accept: 'application/json',

            },
        }).then((result) => {
            console.log(result.data)
            M.toast({ html: 'Updated Succesfully', classes: '#66bb6a green lighten-1' })
        })

            // localStorage.setItem('movies',JSON.stringify(res.data))
            // dispatch({type:'Movies',payload:{movies:{title,description,genres,rating}}})
            .catch((error) => {
                console.log(error.response.data.error)
                M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
            })
    }
    return (
        <div style={{ width: '75%', margin: 'auto' }}>


          { (loading)?<Loading/>: <div>
            <h2 className="header">Update Movie:</h2>
            <div className="card horizontal">

                <img className="imag" alt="Movies" src={`http://localhost:5000/api/movies/photo/${data.slug}`} />

                <div className="card-stacked">
                    <div className="card-content">


                        <select onChange={(e) => setGenre(e.target.value)} value={genres} className="browser-default">
                            <option disabled defaultValue>genres</option>
                            <option value="Action" >Action</option>
                            <option value="Horror" >Horror</option>
                            <option value="Comedy" >Comedy</option>
                            <option value="documentary"  >documentary</option>
                        </select>
                        <div className="input-field col s12">
                            <input value={actors} id="first_name2" placeholder={`${data.actors}`} type="text" className="validate" onChange={(e) => setActors(e.target.value)} />
                            <label className="active" htmlFor="first_name2"> Actors:</label>
                        </div>
                        <div className="input-field col s12">
                            <input value={trailer} placeholder={`${data.trailer}`} id="first_name2" type="text" className="validate" onChange={(e) => setTrailer(e.target.value)} />
                            <label className="active" htmlFor="first_name2"> trailer:</label>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={`${data.description}`} id="textarea1" className="materialize-textarea"></textarea>
                                <label htmlFor="textarea1">Description</label>
                            </div>
                        </div>


                        <ReactStars
                            count={5}
                            value={data.rating}
                            onChange={ratingChanged}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                            edit={true}
                        />
                        <label style={{ marginLeft: "5px" }} htmlFor="file" className="label-file">Choisir une image</label>
                        <input className="input-file" id="file" type="file" onChange={handleChange} />
                    </div>

                </div>
            </div>

                <button onClick={() => Updatemovies()} style={{ marginBottom: '50px' }} className="btn Center waves-effect waves-light" type="submit" name="action">Update
    <i className="material-icons right">send</i>
                </button>
            </div>}
        </div>




    )
}

export default Update
