import React,{ useEffect,useState } from 'react';
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { moviesDB_URL, API_KEY, IMG_PATH, YOUTUBE_URL} from '../../API';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactPlayer from "react-player";
import Topbar from '../topbar';
import NumberFormat from 'react-number-format';
import Skeleton  from "react-loading-skeleton";
import Footer from '../footer/index';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


const Moviesdetails = () => {
    const { movieid } = useParams();
    const [movieData, setMovieData] = useState([])
    const [youtubeKey, setYoutubeKey] = useState([])
    const [trailerPlayer, settrailerPlayer] = useState(false)
    const [casts, setCasts] = useState([])
    const [count, setCount] = useState(12)
    const [socialMedia, setSocialMedia] = useState([])
    const [bannerLoader, setBannerLoader] = useState(true)
    const [spinnerLoader, setSpinnerLoader] = useState(false)

    const override = css`
    position: fixed;
    top: 40%;
    left: 45%;
    transform:translateX(50%) !important;
        `;
    

     useEffect(() => {
        axios(`${moviesDB_URL}/movie/${movieid}?api_key=${API_KEY}&language=en-US`)
        .then((res) => {
            setMovieData(res.data)
            setBannerLoader(false)
        })
        .catch((err)=> console.log(err));

        //YouTube key
        axios(`${moviesDB_URL}/movie/${movieid}/videos?api_key=${API_KEY}`)
        .then((res) => {
            setYoutubeKey(res.data.results[0].key)
           // setSpinnerLoader(false)
        })
        .catch((err)=> console.log(err));

        //cast and crew

        axios(`${moviesDB_URL}/movie/${movieid}/credits?api_key=${API_KEY}`)
        .then((res) =>setCasts(res.data.cast))
        .catch((err)=> console.log(err))
        
        //social media
        axios(`${moviesDB_URL}/movie/${movieid}/external_ids?api_key=${API_KEY}`)
        .then((res) =>setSocialMedia(res.data))
        .catch((err)=> console.log(err))
     }, [movieid])

     ///-----------Convert the time, Minutes to hour
    const convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h + "h"}${m + "m"}`;
    }
    const playTrailer = () => {
        settrailerPlayer(!trailerPlayer)
        setSpinnerLoader(!spinnerLoader)
    }
    const closeButton = () => {
        settrailerPlayer(trailerPlayer)
    }
    const addmore = () => {
        setCount(count+12);
    }
    

    return ( <div>
        <Topbar/>
        {
            // Loader---------------
            bannerLoader?
            <div style={{display:"flex",gap:"4rem",justifyContent:"center",marginTop:"1rem",flexWrap:"wrap"}}> 
                <Skeleton style={{ borderRadius: "1rem" }} width={300} height={422}/>
                <div>
                    <Skeleton style={{padding:"0.5rem",display:"block",marginTop:"1rem",maxWidth:"400px"}} count={2} width={400} />
                    <Skeleton circle={true} height={75} width={75} />
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton style={{padding:"0.5rem",display:"block",marginTop:"1rem",maxWidth:"800px"}} count={3} width={800} />

                </div>
            </div>:(movieData && 
            <div className="movie-infos">
                <div className="left">
                    <img style={{width:"300px"}} src={movieData.poster_path!= null ?`${IMG_PATH}/${movieData.poster_path}`:"https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1"} alt={movieData.title} title={movieData.title}/>
                    <img className="bg-image" src={movieData.backdrop_path!= null ?`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path}`:"https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1"} 
                    alt={movieData.title}/>
                </div>
                <div className="right">
                    <h1 class="movieTitle">{movieData.title}</h1>
                    <div className="generic">{movieData.release_date}
                        <span>{
                        movieData.genres?.map((genre,index) => <ul key={index} style={{listStyleType:"none",display:"inline-block"}}>
                            <li>{genre.name}</li>
                        </ul>)
                        }</span>
                        <span style={{paddingLeft:"0.5rem"}}>{ convertMinsToHrsMins(movieData.runtime) }</span>
                    </div>
                    <div className="button-content">
                        <div className="progrees-bar" style={{width: "70px", height: "70px", borderRadius: "50%", boxShadow: "0px 0px 2px 3px #032541", background: "#081C22",display:"inline-block",order: "0"}}>
                            <CircularProgressbar value={`${movieData.vote_average * 10}`} text={`${movieData.vote_average * 10}%`}
                            styles={{
                                trail: {
                                stroke: '#d6d6d6',
                                strokeLinecap: 'butt',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                                },
                                text: {
                                fill: '#fff',
                                fontSize: "1.7rem",
                                fontWeight:"600"
                                }               
                            }}
                            />
                        </div>
                        <button>
                            <span style={{padding: "0.8rem 0.6rem"}} class="material-icons">
                                format_list_bulleted
                            </span>
                        </button>
                        
                        <button>
                            <span style={{padding: "0.8rem 0.6rem"}} class="material-icons">
                                favorite
                            </span>
                        </button>
                        
                        <button>
                            <span  style={{padding: "0.8rem 0.6rem"}} class="material-icons">
                                bookmark
                            </span>
                        </button>
                        
                        <button>
                            <span style={{padding: "0.8rem 0.6rem"}} class="material-icons">
                                grade
                            </span>
                        </button>
                        <div class="trailer" style={{cursor:"pointer",fontSize:"1.3rem", display:"inline-block",marginLeft:"1rem",order:'1',flex:"50%"}} onClick={playTrailer}><i className="fas fa-play"></i>
                            Play Trailer
                            <div className={trailerPlayer?"close-button active":"close-button"}>
                                Trailer Player
                                <button onClick={closeButton}><i style={{textAlign:"right", order:'2'}}className="far fa-window-close"></i></button>
                            </div>
                            {
                                trailerPlayer && <><ClipLoader color="white" loading={spinnerLoader} css={override} size={100} />
                                <ReactPlayer
                                url={`${YOUTUBE_URL}${youtubeKey}`}
                                className='react-player'
                                controls
                                width='50%'
                                height='80%'
                                /></>
                            }
                            
                            
                        </div>
                        
                    </div>    
                    <p style={{paddingTop:"1rem"}}>OVERVIEW:<br/>{movieData.overview}</p>
                </div>
            </div>)
        }
        <div className="movies-info-wrapper" style={{display:"flex",margin:"1rem 0",flexWrap:"wrap"}}>
            <div className="cast-wrapper" style={{maxWidth:"70%"}}>
            <h4 style={{margin:"0 7% 1rem", fontSize:"2rem"}}>Top Billed Cast</h4>
            { <div className="scrollbar" style={{display: "flex",gap: "1rem",overflowX: "auto",margin: "0rem 7%",padding: "1rem 0"}}>
                {
                    casts.slice(0,count).map((cast,index) => 
                    <div key={index} style={{boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",display: "inline-block",borderRadius: "1rem"}}>
                        <img style={{width: "140px",objectFit: "cover",height: "170px",objectPosition: "top center",borderRadius:"1rem 1rem 0 0"}} 
                        src={cast.profile_path!= null?`${IMG_PATH}/${cast.profile_path}`:"https://www.hhcenter.org/wp-content/uploads/2017/02/person-placeholder.jpg"} title={cast.name} alt={cast.name}/>
                        <div className="profile-info">
                            <p style={{fontWeight: "800",marginBottom: "0.5rem"}}>{cast.name}</p>
                            <p style={{fontSize: "0.8rem"}}>{cast.character}</p>
                        </div>
                    </div>)
                }
                <button style={{backgroundColor: "transparent", border:"none",textDecoration:"underline",cursor:"pointer",outline:"none"}} onClick={addmore}>View more</button>

            </div> }
            </div>
            <div>
                <div className="social-media-wrapper" style={{display:"flex",gap:"1rem",marginBottom:"1.5rem"}}>
                    <span><a href={socialMedia.facebook_id!=null?`https://www.facebook.com/${socialMedia.facebook_id}`:"/#"} rel="noopener noreferrer" target="_blank"><i style={{fontSize:"2rem",cursor:"pointer"}} class="fab fa-facebook-square"></i></a></span>
                    <span><a href={socialMedia.twitter_id!=null?`https://twitter.com/${socialMedia.twitter_id}`:"/#"} rel="noopener noreferrer" target="_blank"><i style={{fontSize:"2rem",cursor:"pointer"}} class="fab fa-twitter"></i></a></span>
                    <span><a href={socialMedia.instagram_id!=null?`https://www.instagram.com/${socialMedia.instagram_id}`:"/#"} rel="noopener noreferrer" target="_blank"><i style={{fontSize:"2rem",cursor:"pointer",borderRight:"1px solid gray",paddingRight:"0.75rem"}} class="fab fa-instagram"></i></a></span>
                    <span><a href={movieData.homepage!=null?movieData.homepage:"/#"} rel="noopener noreferrer" target="_blank"><i style={{fontSize:"2rem",transform: "rotate(45deg)",cursor:"pointer"}} class="fas fa-link"></i></a></span>
                </div>
                <div>
                    {
 
                        movieData && 
                        <div >
                            <h6>Status</h6>
                            <p>{movieData.status}</p>
                            <h6>Orginal Language</h6>
                            <p>English</p>
                            <h6>Budget</h6>
                            <NumberFormat value={movieData.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            <h6 style={{marginTop:"0.5rem"}}>Revenue</h6>
                            <NumberFormat value={movieData.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </div>
                     
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </div> );
}
 
export default Moviesdetails;