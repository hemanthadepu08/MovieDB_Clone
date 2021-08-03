import React,{ useState } from 'react';
import logo from '../../images/logo-1.svg';
import "./style.css";
import { Link } from 'react-router-dom';



const Topbar = () => {

  const [hamburger, setHamburger] = useState(false)

  const hangleHamburger = () => {
    setHamburger(!hamburger)
  }

    return ( 
      <header>
        <nav style={{backgroundColor:"#032541",height: "70px",padding: "0 7rem"}} className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to='/'><img style={{width:"150px"}} src={logo} alt="logo"/></Link>
          <button className="navbar-toggler" onClick={hangleHamburger} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={hamburger?"collapse active navbar-collapse":"collapse navbar-collapse"} id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/movie" className="nav-link text-white" href="/#">Movies<span className="sr-only">(current)</span></Link>
              </li>
            </ul>
            <Link to='/login'>Login</Link>
          </div>
        </nav>
      </header>
     );
}
 
export default Topbar;