import React from 'react';
import Skeleton  from "react-loading-skeleton"

export const Skeletonloader = () => {
    let n = 8
    return (
    <div style={{display:"flex",gap:"1rem"}}>{
      
        [...Array(n)].map((item,i) => ( 
            <div key={i}> 
              <Skeleton style={{ borderRadius: "1rem" }} width={150} height={222}/>
              <Skeleton style={{marginTop:"0.75rem"}} count={2} />
            </div> 
            ))
      }
    </div>
  );
}


 
 
