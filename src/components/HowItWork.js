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
		   <section id="banner" >
               <div className="container">
               <h1>How It Work</h1><hr></hr>
               <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </p>
               </div>
			</section>
   

     {/* Footer section */}
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
				<p>EveryUrban 2020. All rights reserved.</p>
			</div>
		</footer>

      </div>
      );
  }
}

// Home.propTypes = {
//   user: PropTypes.object.isRequired
// };
// function mapStateToProps(state) {
//     return {
//       user: state.users.user
//     };
//   }
export default HowItWork;