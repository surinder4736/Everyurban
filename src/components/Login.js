import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import createLogo from '../Images/login-create.png';
import rightarrow from '../Images/rightarrow.png';
import maillogo from '../Images/mail-logo.jpg';
import Hamberg from './HamberHeader';
import validator from 'validator';
import userAction from '../actions/user';
import Jquery from 'jquery';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import LoginBody from 'react-body-classname';
import './bodyStyle.css';
const{login,resendemail} = userAction;
class Login extends Component {
    constructor(props) {
        super(props);
		this.state = {messageServerside:'',passwordViewMode:false,conPwdViewMode:false,username:'',
		password:'',message:'', message1:'',title:'Password Show',ismodalshow:'fade', modaldisplay:'none' }
		this.clickLoginHandle=this.clickLoginHandle.bind(this);
		this.txtUserChange=this.txtUserChange.bind(this);
		this.txtPasswordChange=this.txtPasswordChange.bind(this);
		this.pressEnterKey=this.pressEnterKey.bind(this);
		// document.body.className="loginBodyBgColor";

	}

	txtUserChange(event){
		this.setState({username:event.target.value,message:'',messageServerside:''});

	}
	txtPasswordChange(event){
		this.setState({password:event.target.value,message1:'',messageServerside:''});
	}

	clickLoginHandle(e){
		const {dispatch} = this.props;
		e.preventDefault();
		let curObj=this;
		let username=this.state.username;
		let password=this.state.password;
		curObj.setState({message:'',message1:''});
		if(validator.isEmpty(username)===true){
			curObj.setState({message:'Please enter the Username'});
		}else if(validator.isEmail(username)===false){
			curObj.setState({message:'Email format is not correct'});
		}
		if(validator.isEmpty(password)===true){
			curObj.setState({message1:'Please enter the Password'});
		}
		if(validator.isEmpty(username)===false && validator.isEmpty(password)===false ){
			//Call the api
		 const data={
			 email:username,
			 password:password
		 }
			dispatch(login(data));
			this.setState({messageServerside:''});
		}
			
		
	}

	componentWillReceiveProps(nextProps){
	
		const{user}=nextProps;
		if(nextProps.user!==this.props.user){
			if(user!=null && user.auth===true && user.is_email_verified==="true" && user.isadmin===false){
			const uid=user.unique_userid;
			const randomID=user.random_id;
			 if(user.role_type!=undefined && user.role_type=="developer"){
				 //Developer can not access the profile page, in that case redirect on particular message page.
				window.location.href=`/developer`;
			 }else{
				window.location.href=`/profile/${uid}/${randomID}`;
			 }
			this.setState({messageServerside:''});
			}else if(user!=null && user.auth===true && user.is_email_verified==="true" && user.isadmin===true){
				window.location.href="/admin";
				console.log("Admin Login");
			}

			else if(user!=null && user.auth===true && user.is_email_verified==="false"){
				// this.setState({messageServerside:'Please verify your email to login.'});
				// this.setState({ismodalshow:'show', modaldisplay:'block'});
				Swal.fire({
					title: 'Please verify your email to login.',
					icon: 'warning',
					showConfirmButton: false,
					html:'<button type="button" role="button" tabindex="0" class="swal2-confirm swal2-styled btn-resend">' + 'Resend Email' + '</button> <button type="button" role="button" tabindex="0" class="swal2-confirm swal2-styled btn-close" >' + 'ok' + '</button>',
					confirmButtonText: 'OK'
				});
			}

		  	else if(user!=null && user.message==="Unauthorized"){
				this.setState({messageServerside:'Sorry username and password invalid'});
			}
			else{
				 this.setState({messageServerside:'Sorry username and password invalid'});
			}
			

		}
		if(nextProps.isResendEmail!=this.props.isResendEmail){
			Swal.fire({
				title: 'A verification email has been sent.',
				// text: 'Please verify your email.',
				icon: 'success',
				confirmButtonText: 'OK'
				
			});
		}
			
	}

	renderMailModal(){
		return(
		  <div class={"modal " + this.state.ismodalshow } style={{display: this.state.modaldisplay}}  id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" id="emailModal" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal.bind(this)}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div className="row text-center">
							<div className="col-md-12">
								<img id="inboximg" src={maillogo} alt=""></img>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 text-center">
								<p>Please verify your email to login.</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary btn-round-none" onClick={this.resendEmail.bind(this)}   aria-label="Close" >Resend Email</button>
						<button type="button" class="btn btn-primary btn-round-none" data-dismiss="modal" aria-label="Close" onClick={this.closeModal.bind(this)} >Ok</button>
					</div>
				</div>
			</div>
		</div>
  
		)
	  }
	
	componentDidMount(){
		let curobj=this;
		Jquery("input:password").focus(function(){
			 Jquery("#viewPass").css("display", "block");
		});
		this.setState({messageServerside:''});
		Jquery(document).on('click', '.btn-resend', function() {
		 	curobj.resendEmail();
		 });
		 Jquery(document).on('click', '.btn-close', function() {
		 	Swal.close();
		 }); 
		
	}

	resendEmail(){
		const{user,dispatch}=this.props;
		const data={
			email:this.state.username
		}
		dispatch(resendemail(data));
	}

	// resendEmail(e){
	// 	e.preventDefault();
	// 	const{user,dispatch}=this.props;
	// 	const data={
	// 			email:this.state.username
	// 	}
	// 	dispatch(resendemail(data));
	// 	this.setState({ismodalshow:'fade', modaldisplay:'none'});
	// }

	closeModal(e){
		e.preventDefault();
		this.setState({ismodalshow:'fade', modaldisplay:'none'});
	}

	handlePasswordViewMode(e){

		if(this.state.passwordViewMode==true){
		  this.setState({passwordViewMode:false,title:'Password Show'});
		  
		  
		}
		else{
		  this.setState({passwordViewMode:true,title:'Password Hide'});
		 
		}
	  }

		pressEnterKey(e){
			if(e.keyCode==13){
				this.clickLoginHandle(e);
			}
		}

    render() { 
			const{messageServerside}=this.state;
        return ( 
					<LoginBody className="loginBodyBgColor">
            <div>
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
                <h2>Log In</h2>
								<div className="errorMsg">{messageServerside}</div>
								<input type="text" onChange={this.txtUserChange} required placeholder="E-mail" value={this.state.username} />
								<div className="errorMsg">{this.state.message}</div>
								<input id="inputPassword" onKeyDown={this.pressEnterKey} onChange={this.txtPasswordChange} value={this.state.password} type={this.state.passwordViewMode==false?'password':''}  placeholder="Password" style={{width:''}} />{' '}
								<span id="viewPass" title={this.state.title} className={this.state.passwordViewMode==false?'far fa-eye':'fa fa-eye-slash'} onClick={this.handlePasswordViewMode.bind(this)}></span>
								{/* <div className="errorMsg">{this.state.message1}</div> */}
								<button className="btn gradient" onKeyDown={this.pressEnterKey} onClick={this.clickLoginHandle}>LOG IN</button>
								<a href="/ForgetPassword">Forgot your password?</a>
								<a className="create" href="/signup">Create Your Account <img src={rightarrow} alt=""/></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		{/* {this.renderMailModal()} */}
            </div>
			</LoginBody>
         );
    }
}

Login.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
	  user: state.users.user,
	  isResendEmail:state.users.isResendEmail,
    };
  }
export default connect(mapStateToProps)(Login);