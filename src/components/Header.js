import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png';
import './NavMenu.css';
import {APIURL} from '../Config/config'
import Axios from 'axios';
import userAction from '../actions/user';
const{logout} = userAction;
var jQuery= require('jquery');
//import { logo } from './img/logo.png'; // relative path to image 

class Header extends Component {
  constructor (props) {
    super(props);
  }

  logOutHandle(e){
	e.preventDefault();
	const{dispatch}=this.props;
	dispatch(logout());
        // Axios.delete(`${APIURL}sessionsExpired`).then((resp)=>{
        //     console.log("Logout Successfully");
        //     window.location.href='/login';
        // })
	}

  	render(){
	const{user}=this.props;
	let userexit= user;
	if(user!=null){
		if(Object.keys(user).length == 0){
			userexit= null
		}
	}
	
    return(
			<header>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
					<a id="hamburger" href="#"><i className="fas fa-bars"></i></a>
					
					<a href="/" className="logo"><img src={logo} alt="" /></a>
					{ userexit==null && userexit==undefined && 
						<div className="button">
							<a href="/signup" className="signup">Sign Up</a>
							<span className="headerbuttonmargin">|</span>
							<a href="/login" className="login">Log In</a>
						</div>
					}
					{userexit !=null && userexit !=undefined &&
						<div className='button' >
							<a href="#" style={{cursor:'pointer'}} onClick={this.logOutHandle.bind(this)} className="signup">Logout</a>
						</div>
					}
				
				</div>
			</div>
		</header>
    )
  }
}
Header.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(Header);
// export default Header;