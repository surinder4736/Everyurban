import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
import banner from '../Images/banner.jpg';
import aim from '../Images/aim.png';
import people from '../Images/people-300x294.jpg';
import city from '../Images/city.jpg';
import developers from '../Images/developers.jpg'
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
							<h1>Revolutionizing the Process<br />of Urban Development</h1>
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
						<h2 className="text-md-left text-center">We Aim to Create Communities Designed for People</h2>
						<p className="text-md-left text-center">Crowdsourcing Ideas for the Next Generation of Urban Space Development.</p>
						{/* <a className="btn cyan" href="#">JOIN OUR MAILING LIST</a> */}
					</div>
				</div>
			</div>
		</section>
      {/* Warning Section */}
      <section className="winning">
			<div className="container">
				<h2>A Place where Developers, Designers, Planners and the Community come together</h2>
				<p>EveryUrban is a Platform that helps make Urban Planning and Master Planned Developments Social.</p>
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
								<p className="text-md-left text-center">EveryUrban connects designers of architecture with real development projects and income opportunities while maintaining creative freedom and gaining industry experience.</p>
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
								<p className="text-md-left text-center"> EveryUrban help developers scale, grow and maximize their business through collaborating with architects around the world to create the best living communities for generations to come. </p>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</section>
		 {/* Subscriber Image */}
		 <div className="subscribe-section">
     		<img src={subscribe} alt=""/>
		 	<p className="center-text">BE A PART OF CHANGE</p>
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