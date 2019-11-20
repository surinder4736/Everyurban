import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import logo from '../Images/logo.png';

import './NavMenu.css';
var jQuery= require('jquery');
//import { logo } from './img/logo.png'; // relative path to image 

class MenuComponent extends Component {
  constructor (props) {
    super(props);
   
  }

  render(){
    return(
			<div>
		<div id="menu">
		<div class="container">
			<ul class="nav flex-column">
				<li class="nav-item">
					<a class="nav-link active" href="/"><i class="fas fa-home"></i> Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i class="fas fa-lightbulb"></i> How it works</a>
				</li>
				<li class="nav-item">
					<a class="nav-link gray" href="#"><i>&nbsp;</i> Support</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i><img src="images/logo-icon-black.png" alt=""/></i> About Us</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i class="fas fa-users"></i> Social Media</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i class="fas fa-headset"></i> Contact Us</a>
				</li>
				<li class="nav-item">
					<a class="nav-link gray" href="#"><i>&nbsp;</i> Resources</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i class="fas fa-user-plus"></i> Sign Up</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i class="fas fa-file-alt"></i> Terms of Service</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><i class="fas fa-scroll"></i> Privacy Policy</a>
				</li>
			</ul>
		</div>
	</div>
	 <div id="menu-bg"></div>
			</div>
    )
  }
  
 


}
export default MenuComponent;