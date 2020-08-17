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
               <h1>How It Works</h1>
               <p>
               We streamline the process for Developers and Designers to collaborate. 
               </p>
               </div>
               <div className="howitwork-content">
                 
                    <div className="list-body-header"><h1>Sign Up</h1></div>
                    <div className="list-body">
                      <div className="numbers"><h2 className="verticle-align-one">1</h2></div>
                      <div className="item-list">
                      <p>It's free and only takes a couple seconds. If you were given a referral code, be
                        sure to enter it during sign up as it may increase your eligibility for more projects.
                        Confirm your e-mail to activate your account and receive projects.</p>
                      <p>Developers will be contacted by our support team for the project intake process.</p>
                      <p>Designers will receive a User ID number once the profile is updated with name and location.</p>
                     </div>
                    </div>
                   
                    <div className="list-body-header"><h1 className="header">Project RFP Brief</h1></div>
                    <div className="list-body">
                      <div className="numbers-two"><h2 className="verticle-align-two">2</h2></div>
                      <div className="item-list-two">
                      <p>A Request for Proposal (RFP) is a common term across a number of industries for soliciting proposals for a project through a bidding process. On the EveryUrban platform, Designers bid with ideas.</p>  
                      <p>Developers work closely with the EveryUrban team to finalize details before circulating to the Design Architect Community.</p>
                      <p>Designers will receive Project RFP Briefs they are eligible to participate in through the e-mail registered to the account and can submit their proposals to bid for the project contract.</p>
                      </div>
                    </div>

                    <div className="list-body-header"><h1>Partnership</h1></div>
                    <div className="list-body">
                      <div className="numbers"><h2 className="verticle-align-three">3</h2></div>
                      <div className="item-list">
                      <p>Proposals in consideration by the Developer will be assessed to ensure viability and feasibility. Designers may receive requests for revisions and upon selection of a proposal, the Designer of the Winning Concept will receive a contract detailing responsibilities, expectations and payment.</p>
                      <p>Designers of Winning Concepts under contract will receive full payment or a retainer for purchase of the design material submitted for the bid. The Project RFP briefs will outline the total payment offered for the project contract and the retainer amount if applicable.</p>
                       </div>
                   </div>

                   <div className="helpcentre-link">
                     <h1>Have more unanswered questions? Check out our <a href="/helpcentre" style={{textDecoration:'underline'}}>Help Centre -<i class="fas fa-angle-right"></i></a></h1>
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