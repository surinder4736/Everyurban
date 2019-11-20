import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import createLogo from '../Images/login-create.png';
import Hamberg from './HamberHeader';
import validator from 'validator'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import userAction from '../actions/user';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
const{resetPassword} = userAction;
class ForgetPassword extends Component {
    constructor(props) {
        super(props);
				this.state = {email:'', emailValidate:'',messageServerside:''}
				this.pressEnterKey=this.pressEnterKey.bind(this);
	}
	
	txtEmailChangeHandle(event){
	this.setState({ email:event.target.value,emailValidate:'',serversideMesg:''});
	}

	resetPassClickHandle(e){
		const{dispatch}=this.props;
	  e.preventDefault();
	  let curObj=this;
	  let email=this.state.email;
	  if(validator.isEmpty(email)===true){
		curObj.setState({ emailValidate:'Please enter an email address'});
	  }else if(validator.isEmail(email)===false){
		  curObj.setState({emailValidate : 'Email is not in correct format'});
	  }
	  if(validator.isEmpty(email)===false && validator.isEmail(email)===true){
		 const data={
			 email:email
		 }
		 dispatch(resetPassword(data));
	  }

	}

 componentWillReceiveProps(nextProps){
	 const{user}=nextProps;
	 if(nextProps.user!=this.props.user){
		if(user!=null && user!=undefined && user.statusCode=="ResetPassword"){

			Swal.fire({
				title: 'Success!',
				text: 'A password reset request has been sent to your registered Email. Please check your email and follow instruction.',
				icon: 'success',
				confirmButtonText: 'OK'		
			});
			this.setState({messageServerside:'',email:''});
		}else if(user.message.statusCode=="NOTEXIST" && user.message.status==404){
			//let errorMessage="";
					this.setState({messageServerside:''});
					Swal.fire({
						title: 'Error!',
						text: 'Sorry this email not exist please enter valid email',
						icon: 'error',
						confirmButtonText: 'Cancel'		
					});
		}
	 }
 }

 pressEnterKey(e){
	if (e.keyCode == 13) {
		this.resetPassClickHandle(e);
	}
 }

    render() { 
        return (
            <div style={{background:'#dcdcdc',paddingBottom:'60px'}}>
            <Hamberg />
           <MenuComponent />
           <section id="login">
			<div className="holder">
				<div className="d-md-flex align-items-stretch">
					<div className="left">
						<div className="d-flex align-items-center justify-content-center">
							<div>
								<img src={footerLogo} alt=""/>
								<p>Revolutionizing the Process of<br />Urban Development</p>
							</div>
						</div>
					</div>
					<div className="right">
						<div className="d-flex align-items-center justify-content-center">
							<div>
                            <h2>Forgot Password</h2>
								<input type="email" onKeyDown={this.pressEnterKey} onChange={this.txtEmailChangeHandle.bind(this)} value={this.state.email} placeholder="Email Address" />
								<div className="errorMsg">{this.state.emailValidate}</div>
								<button className="btn gradient" onKeyDown={this.pressEnterKey}  onClick={this.resetPassClickHandle.bind(this)}>Reset Password</button>
								{/* <a href="#">Forgot your username or password?</a> */}
								<a className="create" href="/Signup">Create Your Account <img src={createLogo} alt=""/></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
            </div>

         );
    }
}
ForgetPassword.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(ForgetPassword);