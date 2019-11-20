import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import userAction from '../actions/user';
import Header from './Header';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
const{logout} = userAction;
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    clickLogoutHandle(e){
        const{dispatch}=this.props;
        e.preventDefault();
        dispatch(logout());
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user!=this.props.user){
            window.location.href="/Login";
        }
    }
    render() { 
        return ( 
            <div>
            {/* Header components open */}
         <Header />
        <MenuComponent />
            {/* Header components end */}
            {/* Profile top section */}
        <section class="profile-top">
			<div class="container">
				<div class="d-md-flex align-items-end">
					<div class="col-lg-3 col-md-4 col-xs-12">
						<div class="dp">
							<img src="images/dp.jpg" alt=""/>
							<a href="#"><i class="fas fa-pencil-alt"></i> Change Picture</a>
						</div>
					</div>
					<div class="col-lg-9 col-md-8 col-xs-12">
						<div class="right">
							<div>
								<h3>Harry Potter <span class="flag flag-us"></span></h3>
								<h4>Los Angeles, CA, United States</h4>
							</div>
							<div>
								<div class="button">
									<a href="#"><i class="fas fa-edit"></i> Edit Profile</a>
									<span> | </span>
									<a href="#"><i class="far fa-save"></i> Save</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		{/* Profile bottom Section */}
        <section class="profile-bot">
			<div class="container">
				<div class="d-md-flex align-items-start">
					<div class="col-lg-3 col-md-4 col-xs-12">
						<div class="about">
							<h5>About</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat vitae est id accumsan. In pulvinar in justo vel cursus. Sed consectetur aliquam.</p>
							<hr/>
							<h5>Linked Account</h5>
							<a href="#"><i class="fab fa-facebook"></i> Facebook</a>
							<a href="#"><i class="fab fa-google-plus"></i> Google</a>
							<a href="#"><i class="fab fa-dribbble"></i> Dribbble</a>
							<hr/>
							<h5 class="lang">
								Language
								<a href="#"><i class="fas fa-plus-circle"></i></a>
							</h5>
							<p>English | Native</p>
							<hr/>
							<h5>Portfolio</h5>
							<p>Type your portfolio link below</p>
							<form action="#">
								<input type="text" placeholder="https://portfolio-link.xyz" />
								<button><i class="fas fa-link"></i></button>
							</form>
						</div>
					</div>
					<div class="col-lg-9 col-md-8 col-xs-12">
						<div class="spacer"></div>
						<div class="card">
							<h5>Experience</h5>
							<article>
								<h6>Berj Khalifa Floor Plan Design | Dubai</h6>
								<p class="location"><span>United Arab Emirates</span><span>Jan 2019 - Sep 2019</span></p>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat vitae est id accumsan. In pulvinar in justo vel cursus. Sed consectetur aliquam.</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat vitae est id accumsan. In pulvinar in justo vel cursus. Sed consectetur aliquam.</p>
								<a class="more" href="#">See more</a>
							</article>
							<hr/>
							<article>
								<h6>Berj Khalifa Floor Plan Design | Dubai</h6>
								<p class="location"><span>United Arab Emirates</span><span>Jan 2019 - Sep 2019</span></p>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat vitae est id accumsan. In pulvinar in justo vel cursus. Sed consectetur aliquam.</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat vitae est id accumsan. In pulvinar in justo vel cursus. Sed consectetur aliquam.</p>
								<a class="more" href="#">See more</a>
							</article>
							<a href="#" class="view">View More</a>
						</div>
						<div class="card">
							<h5>Education</h5>
							<article>
								<h6>World University of Architecture</h6>
								<p class="location"><span>BSc, Civil Engineering</span><span>2010 - 2014</span></p>
							</article>
							<hr/>
							<article>
								<h6>Earth University of Construction</h6>
								<p class="location"><span>MSc, Civil Engineering</span><span>2010 - 2014</span></p>
							</article>
							<a href="#" class="view">View More</a>
						</div>
					</div>
				</div>
			</div>
		</section>
        {/* Profile footer Section */}
        <ProfileFooter />
        </div>
         );
    }
}
 
Profile.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }

export default connect(mapStateToProps)(Profile);