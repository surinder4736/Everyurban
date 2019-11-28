import React, { Component } from 'react';
import footerLogo from '../Images/logo-footer.png';
class ProfileFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <footer class="footer2">
			<div class="container">
				<div class="d-md-flex justify-content-between">
					<div>
						<img src={footerLogo} alt=""/>
						<small>EveryUrban 2018. All rights reserved.</small>
					</div>
					<div>
						<a href="#">About</a>
						<a href="#">Blog</a>
						<a href="#">Feedback</a>
					</div>
					<div>
						<a href="#">Community</a>
						<a href="#">Trust &amp; Safety</a>
						<a href="#">Help &amp; Support</a>
					</div>
					<div>
						<a href="#">Terms of Service</a>
						<a href="#">Privacy Policy</a>
						<a href="#">Accessibility</a>
					</div>
					<div>
						<a href="#">Cookies Policy</a>
						<a href="#">Enterprise Solutions</a>
						<a href="#">Hiring Headquaters</a>
					</div>
				</div>
			</div>
		</footer>
        </div> );
    }
}
 
export default ProfileFooter;