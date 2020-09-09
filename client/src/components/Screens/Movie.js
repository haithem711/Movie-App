import React,{useState,useEffect} from 'react'
import AddMovie from './AddMovie'
import{Link} from'react-router-dom'
import M from 'materialize-css'
import axios from 'axios'
import ReactStars from "react-rating-stars-component";
import Loading from './Loading'
const Movie = () => {
    
  //  const {state,dispatch} = useContext(MovieContext)
  //const history=useHistory()
const[data,setData]=useState([])
const[loading,setLoading]=useState(true)
const[rating,setRating]=useState(0.5)
const[genres,setGenre]=useState("")
const[limit,setLimit]=useState(7)
const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: ''
});

const { search, results} = values;


    
 

        


const handleChange = e => {
 
    setValues({ ...values, search: e.target.value, searched: false, results: [] });
    axios.get(`movies/search?search=${search}`).then(res => {console.log(res)
        setValues({ ...values, results: res.data, searched: true, message: `${res.data.length} blogs found` })
        console.log(results.length);})
};
/*const searchSubmit = (e) => {
    e.preventDefault();
    axios.get(`movies/search?search=${search}`).then(res => {console.log(res)
        setValues({ ...values, results: res.data, searched: true, message: `${res.data.length} blogs found` });
})
};*/
const ratingChanged = (newRating) => {
    setRating(newRating)
   
  }

const deleteMovie=(slug)=>{
    axios.delete(`/delete/${slug}`).then((res)=>{console.log(res.data)
const newData=data.filter((item)=>{
       return item.slug!==res.slug
})
  setData(newData)  
  M.toast({html:'Deleted Succesfully' , classes:'#66bb6a green lighten-1'})
})
}

useEffect(() => {
    async function getData() { 
    axios.get(`/movies/filtre?cat=${genres}&rat=${rating}&limit=${limit}`).then((result)=>{
    setData(result.data)
   setLoading(false)
})}
getData()
}, [data])
    return (


        <div>
            <h2 style={{ textAlign: "center",color:'#2a62ff' }}>Movies App React Hooks</h2>
            <div style={{ display: "flex", margin: '50px', flexWrap: 'wrap' }}>
                <h4 >Filtre:</h4>

                <select  onChange={(e)=>setGenre(e.target.value)} value={genres} style={{ maxWidth: '200px', marginLeft: '20px', marginRight: '20px', marginTop: '20px' }} className="browser-default">
                    <option value=""   >All</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                    <option value="Comedy">Comedy</option>
                    <option value="documentary">documentary</option>
                </select>
                <div style={{ marginTop: '20px' }}>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="input-field col s18" style={{ marginLeft: '20px' }}>
                    <i className="material-icons prefix">search</i>
                    <textarea
                        placeholder="Search movies"
                        id="icon_prefix2"
                        className="materialize-textarea"
                        onChange={handleChange}
                    />
                   
                </div>
            </div>



      <div  style={{display:'flex',justifyContent:"space-around",flexWrap:'wrap',maxWidth:"90%",margin:'auto'}}>

    

                {(loading)?<Loading/>:
                (search) ? results.map(item => {
                    return (<div className="card" key={item._id} style={{ maxWidth: '250px', maxHeight: '500px' }}>
                        <div className="card-image">
                            <img style={{ maxHeight: '250px' }}  src={`http://localhost:5000/api/movies/photo/${item.slug}`}

                                alt={item.title} />
                            <span className="card-title">{item.title}</span>
                        </div>
                        <div className="card-content">
                            <p>{item.mdesc}</p>
                        </div>

                        <div className="card-action" style={{ display: 'flex' }}>
                            <div>
                                <Link to={`/${item.slug}`}>Watch Movie</Link>
                                <ReactStars
                                    count={5}
                                    value={item.rating}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    edit={false}
                                />
                                {item.genres}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <i onClick={() => deleteMovie(item.slug)} className="material-icons iconMovie">delete_forever</i>
                                <i className="material-icons iconMovie">edit</i>
                            </div>
                        </div>

                    </div>)
                }
                ): data.map(item => {
                            return (<div className="card" key={item._id} style={{ maxWidth: '250px', maxHeight: '500px' }}>
                                <div className="card-image">
                                    <img style={{ maxHeight: '250px' }} src={`http://localhost:5000/api/movies/photo/${item.slug}`}

                                        alt={item.title} />
                                    <span className="card-title">{item.title}</span>
                                </div>
                                <div className="card-content">
                                    <p>{item.mdesc}</p>
                                </div>

                                <div className="card-action" style={{ display: 'flex' }}>
                                    <div>
                                        <Link to={`/${item.slug}`}>Watch Movie</Link>
                                        <ReactStars
                                            count={5}
                                            value={item.rating}
                                            size={24}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                            edit={false}
                                        />
                                        {item.genres}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <i onClick={() => deleteMovie(item.slug)} className="material-icons iconMovie">delete_forever</i>
                                  <Link to={`/update/${item.slug}`}>  <i  className="material-icons iconMovie">edit </i></Link>     
                                    </div>
                                </div>

                            </div>)
                        }
                        )}



                <div className="card" style={{ maxWidth: '250px', height: '250px' }}>
                    <div className="card-image">
                        <img alt="Movies" src="https://lorempixel.com/250/250/nature/1" />
                        <span className="card-title">Add Movies</span>
                    </div>
                    <div className="card-content" style={{ padding: '75px' }}>
                        <AddMovie />
                    </div>

                </div>
            </div> 
            <div className='load' style={{marginBottom:'50px',marginLeft:'35%',marginTop:'200px',maxWidth:'100%' }}>
            <button style={{borderRadius:'5px'}}  onClick={() => setLimit(limit+3)} className="btn waves-effect waves-light" type="submit" name="action">Load More Movies
    <i className="material-icons right">cloud_download</i>
  </button> 
            </div>
           
  </div>    
    )
}

export default Movie
