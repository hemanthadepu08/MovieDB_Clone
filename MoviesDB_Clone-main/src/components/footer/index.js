import React from 'react';
import "./style.css";
//import { a } from 'react-router-dom'

const Footer = () => {
    return ( 
        <section className="footer-wrapper">
            <div>
                <img style={{width:"150px",display:"block"}} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="logo" />
                <button style={{margin:"1rem 0"}}>JOIN THE COMMUNITY</button>

            </div>
            
            <div>
                <h5>THE BASICS</h5>
                <li><a href="/#" rel="noopener noreferrer">About TMDb</a></li>
                <li><a href="/#" rel="noopener noreferrer">Contact Us</a></li>
                <li><a href="/#" rel="noopener noreferrer">Support Forums</a></li>
                <li><a href="/#" rel="noopener noreferrer">API</a></li>
                <li><a href="/#" rel="noopener noreferrer">System Status</a></li>
            </div>
            <div>
                <h5>GET INVOLVED</h5>
                <li><a href="/#" rel="noopener noreferrer">Contribution Bible</a></li>
                <li><a href="/#" rel="noopener noreferrer">3rd Party Applications</a></li>
                <li><a href="/#" rel="noopener noreferrer">Add New Movie</a></li>
                <li><a href="/#" rel="noopener noreferrer">Add New TV Show</a></li>
            </div>
            <div>
                <h5> COMMUNITY</h5>
                <li><a href="/#" rel="noopener noreferrer">Guidelines</a></li>
                <li><a href="/#" rel="noopener noreferrer">Discussions</a></li>
                <li><a href="/#" rel="noopener noreferrer">Leaderboard</a></li>
                <li><a href="/#" rel="noopener noreferrer">Twitter</a></li>
            </div>
            <div>
                <h5>LEGAL</h5>
                <li><a href="/#" rel="noopener noreferrer">Terms of Use</a></li>
                <li><a href="/#" rel="noopener noreferrer">API Terms of Use</a></li>
                <li><a href="/#" rel="noopener noreferrer">Privacy Policy</a></li>
            </div>
            
        </section>
     );
}
 
export default Footer;