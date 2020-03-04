import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
import banner from '../Images/banner.jpg';
import aim from '../Images/aim.png';
import people from '../Images/people-300x294.jpg';
import subscribe from '../Images/subscribe-1.jpg';
import Footer from './Footer';
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
				<section id="banner" >
			 <div className="banner-background" style={{backgroundImage:`url(${banner})`}}>
			  <div className="carousel slide" data-ride="carousel">
				<div className="carousel-inner">
				<div className="carousel-item active">
        	<div className="overlay"  >
        		<div >
							<h2>CREATING THE CITY OF YOUR DREAMS IS AT YOUR FINGERTIPS</h2>
							<h1>Revolutionizing the process<br />of urban development</h1>
							<a className="btn gradient" href="/Login" >Get Started</a>
						</div>
					</div>
				</div>
				<div className="carousel-item">
					<div className="overlay"  >
						<div>
							<h2>We Aim to Create Cities Designed for People</h2>
							<h1>Crowdsourcing ideas for <br />next generation urban <br /> space development</h1>
							<a className="btn gradient" href="#">Get Started</a>
						</div>
					</div>
				</div>

				<div className="carousel-item">
					<div className="overlay"  >
						<div>
							<h2>A place where Developers, Architects, Cities and the Community come together</h2>
							<h1> EveryUrban is a platform that helps<br/> make urban planning and master <br/> planned developments social.</h1>
							<a className="btn gradient" href="#">Get Started</a>
						</div>
					</div>
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
						<a className="nav-link active" id="city-tab" data-toggle="tab" href="#city" role="tab" aria-controls="city" aria-selected="false">ARCHITECTS</a>
					</li>
					<li className="nav-item">
						<a className="nav-link " id="developers-tab" data-toggle="tab" href="#developers" role="tab" aria-controls="developers" aria-selected="false">DEVELOPERS</a>
					</li>
				</ul>
				<div className="tab-content">
						<div className="tab-pane fade show active" id="city" role="tabpanel" aria-labelledby="city-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={people} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">ARCHITECTS</h2>
								<p className="text-md-left text-center">EveryUrban helps Architects connect with Real Development Projects, Gain Experience while maintaining Creative Freedom and Making Money.</p>
							</div>
						</div>
					</div>
					<div className="tab-pane fade  " id="developers" role="tabpanel" aria-labelledby="developers-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={people} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">DEVELOPERS</h2>
								<p className="text-md-left text-center"> EveryUrban helps Developers Scale, Grow and Maximize their Business through Collaborating with Architects Around the World to Create the Best Living Communities for Generations to come. </p>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</section>
		 {/* Subscriber Image */}
		 <div className="subscribe-section">
     <img src={subscribe} alt=""/>
		 <div className="center-text">BE A PART OF THE CHANGE</div>
		 </div>
      {/* footer section */}
     <Footer />
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