
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png';
import './NavMenu.css';
import logOutHandle from '../actions/user';
import {APIURL} from '../Config/config'
import Axios from 'axios';
const{logout} = logOutHandle;


var jQuery= require('jquery');
//import { logo } from './img/logo.png'; // relative path to image 

class ViewModeHeader extends Component {
  constructor (props) {
    super(props);
   
  }
   
  render() {
    const{user,profileUrl}=this.props;
    return(
			<header>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
                
                 <div style={{margin:'auto'}}><a href="#" className="prfile-logo"><img src={logo} alt="" /></a> </div>
			
				</div>
			</div>
		</header>
    )
  }
  
 


}

ViewModeHeader.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(ViewModeHeader);