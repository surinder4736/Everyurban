import React, { Component } from 'react'
import footerLogo from '../Images/logo-footer-min.png';
import TermsFile from '../Pdf/termsofservice.pdf';
import PrivacyPolicyFile from '../Pdf/privacypolicy.pdf';

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
					<a href={PrivacyPolicyFile} target="_blank">Privacy Policy<span id="vh">|</span></a>  
					<a href="/contactus">Contact</a>
				</div>
				<img src={footerLogo} alt=""/>
				<div className="social">
					<a href="https://www.facebook.com/EveryUrban/" title="EveryUrban Facebook"><i className="fab fa-facebook-f"></i></a>
					<a href="https://www.instagram.com/everyurban/" title="EveryUrban Instagram"><i className="fab fa-instagram"></i></a>
					<a href="https://twitter.com/everyurban" title="EveryUrban Twitter"><i className="fab fa-twitter"></i></a>
					<a href="https://www.linkedin.com/company/everyurban" title="EveryUrban Linkedin"><i className="fab fa-linkedin-in"></i></a>
				</div>
				<p>EveryUrban 2020. All rights reserved.</p>
			</div>
		</footer>

            </div>
         );
    }
}
 
export default Footer;