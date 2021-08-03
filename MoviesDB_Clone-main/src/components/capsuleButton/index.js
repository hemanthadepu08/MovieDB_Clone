import React,{useState} from 'react';
import "./style.css"

const Buttongroups = ({buttons,doSomethingAfterClick }) => {
    const [clickedId, setClickedId] = useState(0);

    const handingClick = (e,i) => {
        setClickedId(i)
        doSomethingAfterClick(e);
    }

    return (
        <div>
            { <div className="selector" >
                {
                buttons.map((buttonLabel, i) => ( <div key={i} className={i === clickedId ? "anchor selected" : "anchor"}>
                    <h3>
                        <button value={i} name={buttonLabel} onClick={(e) =>handingClick(e, i)}>{buttonLabel}</button>
                    </h3>
                    <div className="background"></div>
                </div>
                    ))
                }
            </div> }
            <select value={0} className="mobile-selector" aria-label="Default select example" onChange={(e) =>handingClick(e)}>
                {
                buttons.map((buttonLabel, i) => ( 
                        <option key={i} id={i} value={i}>{buttonLabel}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Buttongroups