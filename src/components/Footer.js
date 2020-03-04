import React, { Component } from 'react'
import footerLogo from '../Images/logo-footer.png';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                 <footer>
			<div className="container">
			<div className="useful-link">
					<a href="#">About<span id="vh">|</span></a> 
					<a href="#">Terms of Service<span id="vh">|</span></a>  
					<a href="#">Privacy Policy<span id="vh">|</span></a>  
					<a href="#">Contact</a>
				</div>
				<img src={footerLogo} alt=""/>
				<div className="social">
					<a href="#"><i className="fab fa-facebook-f"></i></a>
					<a href="#"><i className="fab fa-instagram"></i></a>
					<a href="#"><i className="fab fa-twitter"></i></a>
					<a href="#"><i className="fab fa-linkedin-in"></i></a>
				</div>
				<p>EveryUrban 2020. All rights reserved.</p>
			</div>
		</footer>

            </div>
         );
    }
}
 
export default Footer;