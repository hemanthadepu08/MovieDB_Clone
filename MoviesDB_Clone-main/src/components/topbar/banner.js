import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const Banner = ({dynamicBg}) => {

  const [search, setsearch] = useState("")

  const searchText = (e) => {
    setsearch(e.target.value)
  }

  const searchBtn = (e) => {
    e.preventDefault();
    setsearch("")
  }


  return ( <div className="banner-wrapper">
    <div className="banner-bg">{
      dynamicBg &&
      <img src={dynamicBg.backdrop_path!=null?`https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)${dynamicBg.backdrop_path}`:"https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/8s4h9friP6Ci3adRGahHARVd76E.jpg"} alt="banner-img"/>
    }
      <h2>Welcome.</h2>
      <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
      <form className="search-wrapper" onSubmit={searchBtn}>
        <input type="text" value={search} onChange={searchText} placeholder="Search..."/>
        <Link to={`/search/${search}`}>
          <button type="submit">Search</button>
        </Link>
      </form>
    </div>
  
  </div> );
}
 
export default Banner;