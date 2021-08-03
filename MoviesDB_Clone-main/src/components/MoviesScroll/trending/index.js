import React from 'react';
import "./style.css";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from 'react-router-dom';

const Trendingmovies = (props) => {
    return ( 
        <div style={{position:'relative'}}>
          <Link to={`/movie/${props.movieId}`}>
            <img style={{width:"150px",borderRadius:"1rem",cursor:"pointer"}} src={props.image} alt="img"/>
          </Link>    
            <div style={{position:'absolute',width: "35px", height: "35px", borderRadius: "50%", boxShadow: "0px 0px 2px 2px", background: "#081C22",top: "13rem",
    left: "1rem"}}>
                <CircularProgressbar value={`${props.rate * 10}`} text={`${props.rate * 10}%`}
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
            <div className="movies-info">
                <p>{props.title}</p>
                <p>{props.releaseDate}</p>
            </div>
        </div>
     );
}
 
export default Trendingmovies;