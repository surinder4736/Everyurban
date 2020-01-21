import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
import banner from '../Images/banner.jpg';
import aim from '../Images/aim.png';
import people from '../Images/people-300x294.jpg';
import subscribe from '../Images/subscribe-1.jpg';
import footerLogo from '../Images/logo-footer.png';
export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    
}
componentDidMount() {
  
}

  render () {
    return (
      <div>
        <Header />
        <MenuComponent />
        {/* Slider */}
    <section id="banner" className="carousel slide" data-ride="carousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
        {/* style="background-image:url('images/banner.jpg');" */}
					<div class="overlay" style={{backgroundImage:`url(${banner})`}} >
        
						<div>
							<h2>CREATING THE CITY OF YOUR DREAMS IS AT YOUR FINGERTIPS</h2>
							<h1>Revolutionizing the process<br />of urban development</h1>
							<a className="btn gradient" href="/Login" >Get Started</a>
						</div>
					</div>
				</div>
				<div className="carousel-item">
					<div className="overlay" style={{backgroundImage:`url(${banner})`}} >
						<div>
							<h2>CREATING THE CITY OF YOUR DREAMS IS AT YOUR FINGERTIPS</h2>
							<h1>Revolutionizing the process<br />of urban development</h1>
							<a className="btn gradient" href="#">Get Started</a>
						</div>
					</div>
				</div>
			</div>
		</section>
      {/* Aim Section */}
      <section className="aim">
			<div className="container">
				<div className="d-md-flex align-items-center">
					<div className="col-md-5">
						<img src={aim} alt=""/>
					</div>
					<div className="col-md-7">
						<h2 className="text-md-left text-center">WE AIM TO CREATE CITIES DESIGNED FOR PEOPLE</h2>
						<p className="text-md-left text-center">Crowdsourcing ideas for next generation urban space development.</p>
						{/* <a className="btn cyan" href="#">JOIN OUR MAILING LIST</a> */}
					</div>
				</div>
			</div>
		</section>
      {/* Warning Section */}
      <section className="winning">
			<div className="container">
				<h2>A WINNING COMBINATION FOR DEVELOPERS, CITY AND THE PEOPLE IN THE NEIGHBOURHOOD.</h2>
				<p>EveryUrban is a new startup aiming to make urban planning and master planned developments social.</p>
			</div>
		</section>
      {/* People Section */}
      <section className="people">
			<div className="container">
				<ul className="nav nav-tabs" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="people-tab" data-toggle="tab" href="#people" role="tab" aria-controls="people" aria-selected="true">PEOPLE</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="developers-tab" data-toggle="tab" href="#developers" role="tab" aria-controls="developers" aria-selected="false">DEVELOPERS</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="city-tab" data-toggle="tab" href="#city" role="tab" aria-controls="city" aria-selected="false">CITY</a>
					</li>
				</ul>
				<div className="tab-content">
					<div className="tab-pane fade show active" id="people" role="tabpanel" aria-labelledby="people-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={people} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">PEOPLE</h2>
								<p className="text-md-left text-center">People can voice their opinions to the developers directly Give real-time feedback on the development concepts Make requests for what they want their neighbourhood to offer Leverage their wants and needs to developers Quick transparent communication between people - developers - city</p>
							</div>
						</div>
					</div>
					<div className="tab-pane fade" id="developers" role="tabpanel" aria-labelledby="developers-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={people} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">DEVELOPERS</h2>
								<p className="text-md-left text-center">People can voice their opinions to the developers directly Give real-time feedback on the development concepts Make requests for what they want their neighbourhood to offer Leverage their wants and needs to developers Quick transparent communication between people - developers - city</p>
							</div>
						</div>
					</div>
					<div className="tab-pane fade" id="city" role="tabpanel" aria-labelledby="city-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={people} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">CITY</h2>
								<p className="text-md-left text-center">People can voice their opinions to the developers directly Give real-time feedback on the development concepts Make requests for what they want their neighbourhood to offer Leverage their wants and needs to developers Quick transparent communication between people - developers - city</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
     {/* Subscriber Image */}
     <img src={subscribe} alt=""/>
      {/* footer section */}
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
				<p>EveryUrban 2019. All rights reserved.</p>
			</div>
		</footer>

      </div>
      );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user
    };
  }
export default connect(mapStateToProps) (Home);