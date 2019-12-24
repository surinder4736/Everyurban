import React, { Component } from 'react';
import Hamberg from './HamberHeader';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import createLogo from '../Images/login-create.png';
import Jquery from 'jquery';
import ReactTooltip from 'react-tooltip';
import userAction from '../actions/user';
import validator from 'validator';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
//const Swal = require('sweetalert2');

const{register} = userAction;
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {messageServerside:'',passwordViewMode:false,conPwdViewMode:false,title:'Password Show',email:'',password:'',roleType:'',termsConditon:false,emailValidate:'',passValidate:'',roleValidate:'',termsValidate:'' }
				this.handlePasswordEnter=this.handlePasswordEnter.bind(this);
				if(window.location.pathname=="/Signup"){
					Jquery("body").css("background", "#dcdcdc");
				}
			}
	
	componentDidMount(){
		Jquery("input:password").focusin(function(){
		Jquery("#viewPass").css("display", "block");
		 });
		 
	}
  //Password Show/Hide in TextBox
	handlePasswordViewMode(e){

		if(this.state.passwordViewMode==true){
		  this.setState({passwordViewMode:false,title:'Passsword Show'});
		}
		else{
		  this.setState({passwordViewMode:true,title:'Password Hide'});
		}
		}
		//Email TextChange 
		txtEmailChangeHandle(event){
			this.setState({email:event.target.value,emailValidate:'',messageServerside:''});
		}
		// Password TextChange
		txtPasswordChangeHandle(event){
			this.setState({password:event.target.value,passValidate:''});
		}
		// Role Change
		checkRoleHandle(event){
			this.setState({roleType:event.target.value, roleValidate:''});
		}		
		//TermsCondition Change
		// checkTermsCondition(event){
		// 	if (event.target.checked == true) {
		// 	this.setState({termsConditon:true,termsValidate:''});
		// 	}else{
		// 		this.setState({termsConditon: false,termsValidate:''});
		// 	}
		// }
		//SignUp Button click Handle
		signUpClickHandle(e){
			e.preventDefault();
			let curObj=this;
			let emailId=this.state.email;
			let password=this.state.password;
			let roleTypes=this.state.roleType;
			let terms=this.state.termsConditon;
			let strongRegex =new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9!@#\$%\^&\*])(?=.{6,12})");
			if(validator.isEmpty(emailId)===true){
				curObj.setState({emailValidate:'Please enter an email address'});
			}
			else if(validator.isEmail(emailId)===false){
				curObj.setState({emailValidate:'Email format is not correct'});
			}
			if(validator.isEmpty(password)===true){
				curObj.setState({passValidate:'Please enter the Password'});
			}else if(password.length<7){
				curObj.setState({passValidate:'Password length must be 7 characters'});
			}else if(strongRegex.test(password)===false){
				curObj.setState({passValidate:'Please enter a valid password '});
			}
			
			if(validator.isEmpty(roleTypes)){
				curObj.setState({roleValidate:'Please Choose your Role'});
			}
			// if(this.state.termsConditon===false){
			// 	curObj.setState({termsValidate:'Please accept terms and privacy'});
			// }

			if(validator.isEmpty(emailId)===false && strongRegex.test(password)===true && validator.isEmail(emailId)===true && validator.isEmpty(password)===false && validator.isEmpty(roleTypes)===false){
				const {dispatch} = this.props;
				const data={
						email:emailId,
						password:password,
						role_type:roleTypes,
						terms_condition:terms
				}
				dispatch(register(data));
			}
		}

     clearForm=()=>{
			this.setState({ email:'',password:'',roleType:'',termsConditon:false});
		}

		componentWillReceiveProps(nextProps){
			const{user}=nextProps;
			if(nextProps.user!=null && user!=this.props.user){
				if(user.auth===true && user.success_msg==="OK"){
					Swal.fire({
						title: 'A verification email has been sent.',
						text: 'Please verify your email to complete your registration.',
						icon: 'success',
						confirmButtonText: 'OK'		
					});
					this.setState({messageServerside:''});
				   this.clearForm();
				}
				else if(user.message.existMsg=="Exist" && user.message.statusCode==409){
					let errorMsg="Sorry this user already exists";
					this.setState({messageServerside:''});
					Swal.fire({
						title: 'Error!',
						text: errorMsg,
						icon: 'error',
						confirmButtonText: 'Cancel'		
					});
				}
				else{
					this.setState({messageServerside:'Unauthorized user'});
				}
			 
		}
	}

	handlePasswordEnter(e){
		//e.preventDefault();
		if (e.keyCode == 13) {
		this.signUpClickHandle(e);
	}
	}

    render() { 
        return ( <div style={{paddingBottom:'60px'}}>
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
							<div style={{marginTop:'-25px'}}>
								<h2 style={{margin:'0 0 4px'}}>Sign Up</h2>
								<div className="errorMsg" style={{height:'20px'}}>{this.state.messageServerside}</div>
								<input type="email" onChange={this.txtEmailChangeHandle.bind(this)} value={this.state.email} placeholder="Email Address" />
								<div className="errorMsg">{this.state.emailValidate}</div>
								<input id="inputPassword"  onKeyDown={this.handlePasswordEnter}  type={this.state.passwordViewMode==false?'password':''}  onChange={this.txtPasswordChangeHandle.bind(this)} value={this.state.password} placeholder="Password" style={{width:''}} />{' '}<span id="viewPass" title={this.state.title} className={this.state.passwordViewMode==false?'far fa-eye':'fa fa-eye-slash'} onClick={this.handlePasswordViewMode.bind(this)}></span>
								 <span id="questionMark" data-tip="Password must be atleast 7 characters and must contain atleast 1 numeric or special character" className="fas fa-question"></span>
								<ReactTooltip  />
								<div className="errorMsg">{this.state.passValidate}</div>
								<div className="radios">
									<label for="builder">
										<input type="radio" checked={this.state.roleType=="developer"} onChange={this.checkRoleHandle.bind(this)} name="type" id="builder" value="developer"  />
										<div class="checkmark"></div>
										I'm a developer/builder
									</label>
									<label for="architect">
										<input type="radio" checked={this.state.roleType=="architect"} onChange={this.checkRoleHandle.bind(this)} name="type" id="architect" value="architect" />
										<div className="checkmark"></div>
										I'm an architect
									</label>
									<div className="errorMsg" style={{height:'12px'}}>{this.state.roleValidate}</div>
								</div>
								
								<div class="toc">
									<label for="toc">
										{/* <input id="toc" type="checkbox" value="" checked={this.state.termsConditon} onChange={this.checkTermsCondition.bind(this)} /> */}
										{/* <div className="checkmark"></div> */}
										I have read and agree the <a href="#" target="_blank">Terms of Service</a> and <a href="#" target="_blank">Privacy Policy</a>.
									</label>
								{/* <div className="errorMsg" style={{height:'20px'}}>{this.state.termsValidate}</div> */}
								</div>
								<button className="btn gradient" onKeyDown={this.handlePasswordEnter} onClick={this.signUpClickHandle.bind(this)}>SIGN UP</button>
								<a className="create" style={{margin:'11px 0 0 '}} href="/Login">Have an account? Log In <img src={createLogo} alt=""/></a>
							</div>
							
						</div>
					
					</div>
				</div>
			</div>
		</section>
        </div> );
    }
}

Signup.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
 
export default connect(mapStateToProps)(Signup);