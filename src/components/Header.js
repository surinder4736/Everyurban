import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import logo from '../Images/logo-min.png';

import './NavMenu.css';
var jQuery= require('jquery');
//import { logo } from './img/logo.png'; // relative path to image 

class Header extends Component {
  constructor (props) {
    super(props);
   
  }

  render(){
		
		
    return(
			<header>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
					<a id="hamburger" href="#"><i className="fas fa-bars"></i></a>
					
					<a href="/" className="logo"><img src={logo} alt="" /></a>
					<div className="button">
						<a href="/Signup" className="signup">Sign Up</a>
						<span>&nbsp;|&nbsp;</span>
						<a href="/Login" className="login">Log In</a>
					</div>
				
				</div>
			</div>
		</header>
    )
  }
  
 


}
export default Header;