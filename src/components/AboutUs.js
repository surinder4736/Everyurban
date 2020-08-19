import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
// import banner from '../Images/banner.jpg';
// import aim from '../Images/aim.png';
// import people from '../Images/people-300x294.jpg';
// import subscribe from '../Images/subscribe-1.jpg';
import footerLogo from '../Images/logo-footer.png';
import Footer from './Footer';
import Community from '../Images/Community.png';
import Protecting from '../Images/Protecting.png';
import Empowering from '../Images/Empowering.png';
import arrow from '../Images/arrow5-blue.png';
export class AboutUs extends Component {
 // static displayName = Home.name;

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
		    <section id="aboutus" >
          <div className="aboutus-body">
            <h1>About Us</h1>
            {/* <p>
              Use place holder for now content is available. Should be around two or three lines,not too long. Longer story will be below.  
              The menu bar rather than "About Us" will be changed to "Our Mission".
            </p> */}
            <p>
            EveryUrban was created in order to help propel the world of development, design and planning
towards the future through adopting technologies and strategies to create the best sustainable
communities. We aim to empower creativity by offering opportunities to designers from all
backgrounds and skillsets around the world.
            </p>
            <p>
            Design Architects can more closely connect with their core passions and freely create without
limiting imagination to a strict agenda while gaining experience and income opportunities to
further their careers.
            </p>
            <p>
            Community Developers can discover new talent and ideas that would normally be confined to
the local environment with added support and professional guidance from the EveryUrban
expert team.
            </p>
            <p>
            EveryUrban helps bridge the gap in communication between architectural design and real
estate development by bringing additional expertise to maximize project vision and success,
streamlining the process of strategy, design and negotiation.
            </p>
          </div>
          <div className="container aboutus-cotent">
            <h1 className="text-center" style={{color:'#3AA3d7'}}>Our Key Objectives:</h1><br/>
            <div className="row objective-content" style={{color:'#3AA3d7'}}>
              <div className="col-md-4">
                <p className="text-center key-objects" style={{fontWeight:'600',fontSize:'20px'}}>Community Wellness</p>
                <div className="text-center">
                <img src={Community} alt="" width="50%"/>
                </div>
                <p className="text-center">
                Incorporating smart features into spaces to improve convenience, reducing stress, and strengthen community relationships within the neighborhood and local city planners.
                </p>
              </div>
              <div className="col-md-4">
                <p className="text-center key-objects" style={{fontWeight:'600',fontSize:'20px'}}>Protecting Our Planet</p>
                <div className="text-center">
                <img src={Protecting} alt="" width="50%"/>
                </div>
                <p className="text-center">High-efficiency systems and materials managing consumption and reducing waste whilst maximizing yield. We want to build harmoniously with the surrounding environment.</p>
              </div>
              <div className="col-md-4">
                <p className="text-center key-objects" style={{fontWeight:'600',fontSize:'20px'}}>Empowering the Economy</p>
                <div className="text-center">
                  <img src={Empowering} alt="" width="50%"/>
                  </div>
                <p className="text-center">
                Maximizing performance, capacity, and consolidating the need for housing will help intensify growing regions, strengthen the economy, and promote growth creating further opportunities for the local community.
                </p>
              </div>
            </div>
            <h1 className="text-center about-bottom-link" style={{color:'#3AA3d7'}}>Learn more about <a href="/howitworks" style={{textDecoration:'underline'}}>How It Works <img src={arrow} alt="" width="25px" /></a></h1>
          </div>
          
			  </section>
      <Footer />
      </div>
    );
  }
}
export default AboutUs;