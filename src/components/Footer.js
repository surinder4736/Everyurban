import React, { Component } from 'react'
import footerLogo from '../Images/logo-footer.png';
import TermsFile from '../Pdf/TermsFile.pdf';

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
					<a href="/aboutus">About<span id="vh">|</span></a> 
					<a href={TermsFile} target="_blank">Terms of Service<span id="vh">|</span></a>  
					<a href={TermsFile} target="_blank">Privacy Policy<span id="vh">|</span></a>  
					<a href="/contactus">Contact</a>
				</div>
				<img src={footerLogo} alt=""/>
				<div className="social">
					<a href="https://www.facebook.com/EveryUrban/"><i className="fab fa-facebook-f"></i></a>
					<a href="https://www.instagram.com/everyurban/"><i className="fab fa-instagram"></i></a>
					<a href="https://twitter.com/everyurban"><i className="fab fa-twitter"></i></a>
					<a href="https://www.linkedin.com/company/everyurban"><i className="fab fa-linkedin-in"></i></a>
				</div>
				<p>EveryUrban 2020. All rights reserved.</p>
			</div>
		</footer>

            </div>
         );
    }
}
 
export default Footer;