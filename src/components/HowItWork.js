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
export class HowItWork extends Component {
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
		   <section id="howitwork" >
               <div className="howitwork-body">
               <h1>How It Work</h1>
               <p>
                 We help Developers and Architects collaborate to create communities fit for the future through a global community. 
               </p>
               </div>
               <div className="howitwork-content">
                 
                    <div className="list-body-header"><h1>Sign Up</h1></div>
                    <div className="list-body">
                      <div className="numbers"><h2>1</h2></div>
                      <div className="item-list">
                      <p>Its free and only takes a couple seconds. Make sure you confirm your e-mail account.</p>
                      <p>Developers will be contacted by our support team with instructions for project submission.</p>
                      <p>Architects will need to complete their profile in order to receive project notifications.</p>
                     </div>
                    </div>
                   
                    <div className="list-body-header"><h1 className="header">Project Brief</h1></div>
                    <div className="list-body">
                      <div className="numbers-two"><h2>2</h2></div>
                      <div className="item-list-two">
                      <p>Developer briefs are reviewed by the EveryUrban team and details finalized before circulating to the Architect community.</p>
                      <p>Architects can discover projects that inspire them and submit their creative ideas through our project brief template to bid for the schematic design contract.</p>
                      </div>
                    </div>

                    <div className="list-body-header"><h1>Partnership</h1></div>
                    <div className="list-body">
                      <div className="numbers"><h2>3</h2></div>
                      <div className="item-list">
                      <p>Proposals that interest the Developer will be reviewed by an EveryUrban licensed local certified Architect partner to assess viability.</p>
                      <p>If the Developer wants to move forward with you idea, you will receive a contract for the project. </p>
                       </div>
                   </div>

               </div>
              
    	</section>
   

     {/* Footer section */}
      <Footer />
      </div>
      );
  }
}
export default HowItWork;