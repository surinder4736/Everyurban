
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png';
import './NavMenu.css';
import userAction from '../actions/user';
import {APIURL} from '../Config/config'
import Axios from 'axios';
const{logout} = userAction;

var jQuery= require('jquery');

class ProfileHeader extends Component {
  constructor (props) {
    super(props);
   
  }
   
  componentDidMount(){
    const{user}=this.props
    if(user==null){
      window.location.href='/login';
    }
    else if(user.auth===false){
      window.location.href='/login';
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user!=this.props.user){
      if(nextProps.user==null){
        window.location.href='/login';
      }
    }
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

  render() {
    const{user,profileUrl}=this.props;
    return(
			<header>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
        
        	<a id="hamburger" href="#"><i className="fas fa-bars"></i></a>
        
					<a href="#" className="prfile-logo"><img src={logo} alt="" /></a>
				
        	<div className='button' >
						<a href="#" style={{cursor:'pointer'}} onClick={this.logOutHandle.bind(this)} className="signup">Logout</a>
				    </div>
        
				</div>
			</div>
		</header>
    )
  }
  
 


}

ProfileHeader.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(ProfileHeader);