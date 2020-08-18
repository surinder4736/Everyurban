import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
import banner from '../Images/banner-min.jpg';
import aim from '../Images/aim-min.png';
import people from '../Images/people-300x294.jpg';
import city from '../Images/city-min.jpg';
import developers from '../Images/developers-min.jpg'
import subscribe from '../Images/subscribe-1-min.jpg';
import arrowWhite from '../Images/arrow-white.png';
import logoemail from '../Images/logo-email.png';
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
							<h2>FREELANCE DESIGN JOBS WORLD WIDE</h2>
							<h1>Discovering Design Architect Talent and Development Projects</h1>
							<a className="btn gradient" href="/Login" >Get Started</a>
						</div>
					</div>
				</div>
				{/* <div className="carousel-item">
					<div className="overlay"  >
						<div>
							<h2>We Aim to Create Communities Designer for People</h2>
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
				</div> */}
			

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
						<h2 className="text-md-left text-center">Design Communities Everywhere from Anywhere</h2>
						<p className="text-md-left text-center">Empowering Architect Designers to Create and Innovate</p>
						<a className="btn gradient learnmore" href="/howitworks" > learn more <img src={arrowWhite} alt="" width="20px" /></a>
						{/* <a className="btn cyan" href="#">JOIN OUR MAILING LIST</a> */}
					</div>
				</div>
			</div>
		</section>
      {/* Warning Section */}
      <section className="winning">
			<div className="container">
				<h2>Powered by Experienced Planners, Engineers and Consultants.</h2>
				<p>The EveryUrban platform bridges the gap for Design Architects of all
backgrounds and locations to earn a living doing what they love.
</p>
			</div>
		</section>
      {/* People Section */}
      <section className="people">
			<div className="container">
				<ul className="nav nav-tabs" role="tablist">
					
					<li className="nav-item">
						<a className="nav-link active" id="city-tab" data-toggle="tab" href="#city" role="tab" aria-controls="city" aria-selected="false">Design Architects</a>
					</li>
					<li className="nav-item">
						<a className="nav-link " id="developers-tab" data-toggle="tab" href="#developers" role="tab" aria-controls="developers" aria-selected="false">Community Developers</a>
					</li>
				</ul>
				<div className="tab-content">
						<div className="tab-pane fade show active" id="city" role="tabpanel" aria-labelledby="city-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={developers} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">Designers</h2>
								<p className="text-md-left text-center">All Development Projects through EveryUrban are carefully vetted to protect
Designers and their work. We facilitate project bidding and contract
administration to ensure the most professional experience whether the Designer
is a student or from a different part of the world.</p>
							</div>
						</div>
					</div>
					<div className="tab-pane fade  " id="developers" role="tabpanel" aria-labelledby="developers-tab">
						<div className="d-md-flex align-items-center">
							<div className="col-md-5">
								<img src={city} alt=""/>
							</div>
							<div className="col-md-7">
								<h2 className="text-md-left text-center">Developers</h2>
								<p className="text-md-left text-center"> An all-in-one service provider from development planning and construction to
financial analysis. Let our industry professionals take care of it so you can focus
on finding the best design concepts for your project. </p>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</section>
		 {/* Subscriber Image */}
		 <div className="subscribe-section">
     		<img src={subscribe} alt=""/>
		 	<p className="center-text">START BUILDING COMMUNITIES TODAY</p>
			<a className="btn gradient subscribe-section-start " href="/login" >Get Started <img src={arrowWhite} alt="" width="20px" /></a>
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