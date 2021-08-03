import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMG_PATH, SEARCH_API } from '../../API';
import Topbar from '../topbar';
import "./style.css";
import Skeleton from "react-loading-skeleton";



const Searchpage = () => {

    const { searchquery } = useParams();
    const [searchData, setsearchData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axios(`${SEARCH_API}${searchquery}`)
        .then((res)=> {
            setTimeout(() => {
                setLoader(false)
                
            }, 500);
            setsearchData(res.data.results)
            
        })
        .catch((err) => console.log(err))
    }, [searchquery])

    

    return ( <div>
        <Topbar/>
        {   loader? searchData?.map((id,index) => 
            <div key={index} style={{display:"flex",gap:"1rem",justifyContent:"center"}}> 
                <Skeleton style={{ borderRadius: "1rem" }} width={100} height={150}/>
                <div>
                <Skeleton style={{display:"block",marginTop:"0.5rem",maxWidth:"300px"}} count={2} width={300} />
                <Skeleton style={{padding:"0.5rem",display:"block",marginTop:"1rem",maxWidth:"1000px"}} count={2} width={1000} />
            </div>
        </div>):searchData?.map(({title,release_date,poster_path,overview,id},index)=> 
            
            <div key={index} style={{display: "flex",flexDirection: "column",alignItems: "center",gap: "1rem",marginTop:"1rem"}}>
                <div style={{display: "flex",border: "1px solid rgb(227,227,227)",boxShadow:" 0 2px 8px rgb(0 0 0 / 10%)",borderRadius:"1rem",width:"100%",maxWidth: "75%"}}>
                    <Link className="wrapper" style={{display:"flex"}}  to={`/movie/${id}`}>
                    <img style={{width:"100px",objectFit:"cover",display: "inline-block",float:"left",borderRadius:" 1rem 0 0 1rem"
                    }} 
                    src={poster_path!=null ? `${IMG_PATH}${poster_path}`:"https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1"} 
                    onError={(e)=>{e.target.onerror = null; e.target.src="https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1"}}
                    alt={title} title={title}/>
                    <div style={{padding:"0.5rem"}}>
                        <h6 style={{fontSize: "1.3rem",paddingTop: "0.5rem"}}>{title}</h6>
                        <p>{release_date}</p>
                        <p className="limit-line">{overview}</p>
                    </div>
                    </Link> 
                </div>
            </div>)
        }
        
    </div> );
}
 
export default Searchpage;