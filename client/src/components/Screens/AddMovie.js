import React,{useState,useContext,useRef,useEffect} from 'react'
import M, { Modal } from 'materialize-css'
import axios from 'axios'
import {MovieContext}from'../../App'
import ReactStars from "react-rating-stars-component";
import Loading from './Loading'
const AddMovie = () => {
 
   //const {state,dispatch}=useContext(MovieContext)
  
      const[loading,setLoading]=useState(true)
      const[title,setTitle]=useState('')
      const[photo,setPhoto]=useState('')
      const[description,setDescription]=useState('')
      const [genres, setGenre] = useState("Action")
      const[rating,setRating]=useState(0.5)
      const [actors, setActors] = useState('')
      const [trailer, setTrailer] = useState('')
      const  addModal = useRef(null)
      useEffect(()=>{
        M.Modal.init(addModal.current)
    },[])
      const handleChange = (e) => {
      
        const photo = e.target.files[0]; // accesing file
        console.log(photo);
        setPhoto(photo); // storing file
    }

      const ratingChanged = (newRating) => {
        console.log(newRating);
        setRating(newRating)
        console.log(rating)
       
      };
    
  const Addmovie = () => {
    
    setLoading(true)
    var formData = new FormData()

    formData.append('description', description)
    formData.append('title', title)
    formData.append('actors', actors)
    formData.append('trailer', trailer)
    formData.append('genres', genres)
    formData.append('rating', rating)
    formData.append('photo', photo)
    console.log(formData)
    axios.post('/create', formData, {
      headers: {
        Accept: 'application/json',

      },
    }).then((res) => {
      console.log(res.data)
      M.toast({ html: 'uploaded successfully', classes: '#66bb6a green lighten-1' })
      setLoading(false)
      M.Modal.getInstance(addModal.current).close()
      })

      // localStorage.setItem('movies',JSON.stringify(res.data))
      // dispatch({type:'Movies',payload:{movies:{title,description,genres,rating}}})
      .catch((error) => {
        console.log(error.response.data.error)
        M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
      })
  }
    return (
      <div>
        <div>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1">  <i className="material-icons">add</i></a>

          <div id="modal1" className="modal"ref={addModal}>
            <div className="modal-content">
              <h4>Modal Header</h4>

              <div className="row">
                <div className="input-field col s6">
                  <input value={title} id="first_name2" type="text" className="validate" onChange={(e) => setTitle(e.target.value)} />
                  <label className="active" htmlFor="first_name2"> Title:</label>
                  <select onChange={(e) => setGenre(e.target.value)} value={genres} className="browser-default">
                    <option disabled defaultValue>genres</option>
                    <option value="Action" >Action</option>
                    <option value="Horror" >Horror</option>
                    <option value="Comedy" >Comedy</option>
                    <option value="documentary"  >documentary</option>
                  </select>
                  <div className="input-field col s12">
                    <input value={actors} id="first_name2" type="text" className="validate" onChange={(e) => setActors(e.target.value)} />
                    <label className="active" htmlFor="first_name2"> Actors:</label>
                  </div>
                  <div className="input-field col s12">
                    <input value={trailer} id="first_name2" type="text" className="validate" onChange={(e) => setTrailer(e.target.value)} />
                    <label className="active" htmlFor="first_name2"> trailer:</label>
                  </div>
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="textarea1">Description</label>
                  </div>
                </div>
Rating:  <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  value={rating}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />

                <label style={{ marginLeft: "5px" }} htmlFor="file" className="label-file">Choisir une image</label>
                <input className="input-file" id="file" type="file" onChange={handleChange} />

              </div>
            </div>
            <div className="modal-footer">
              <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => Addmovie()}>Add Movie
            <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AddMovie
