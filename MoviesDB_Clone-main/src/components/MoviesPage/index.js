import React,{useState,useEffect} from 'react';
import Footer from '../footer';
import Topbar from '../topbar';
import axios from "axios";
import { API_URL, IMG_PATH } from '../../API';
import { Skeletonloader } from '../skeletonLoader';
import PopularMovies from '../MoviesScroll/popular';

const Movies = () => {

    const [movies, setMovies] = useState([])
    const [loader, setLoader] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
        let endpoint = `${API_URL}${currentPage}`
        fetchMovies(endpoint);
    },[currentPage,API_URL])

    const fetchMovies = (path) => {
        axios.get(path)
            .then((res)=>{
                setMovies([...movies,...res.data.results])
                setLoader(false)
                setCurrentPage(res.data.page)
        })
    }
    const handelLoadmore = () => {
        setLoader(loader)
        let endpoint = `${API_URL}${currentPage + 1}`
        fetchMovies(endpoint);
    }

    // useEffect(() => {    
    //     
    // },[setMovies,setLoader])

    return ( <div>
        <Topbar />
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center", gap:"1rem",overflowX: "auto",width: "86%",margin:" 1rem auto"}}>{
            loader ? <Skeletonloader />:
            (movies?.map((movie, index) =>
                <React.Fragment  key={index}>
                        <PopularMovies
                            image={`${IMG_PATH}/${movie.poster_path}`}
                            movieId={movie.id}
                            title={movie.title}
                            releaseDate={movie.release_date}
                            rate={movie.vote_average}
                        /> 
                </React.Fragment>   
            ))
        }</div>
        <button
style={{margin:"1rem auto",width:"100%",maxWidth:"80%",padding:"0.5rem 0",backgroundColor:"#01B4E4",color:"#fff",fontWeight:"600",border:"none",borderRadius:"0.5rem",
display: "flex",alignItems: "center",justifyContent: "center",cursor:"pointer",outline:"none"}} onClick={handelLoadmore}>Load More</button>
        <Footer/>
    </div> );
}
 
export default Movies;