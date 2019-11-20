import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import createLogo from '../Images/login-create.png';
import Hamberg from './HamberHeader';
import ReactTooltip from 'react-tooltip';
import Jquery from 'jquery';
import validator from 'validator'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import userAction from '../actions/user';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
const{changePassword} = userAction;
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {password:'', passValidate:'',title:'Password Show',messageServerside:'',passwordViewMode:false,conPwdViewMode:false }
        this.pressEnterKey=this.pressEnterKey.bind(this);
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

    txtPasswordChangeHandle(event){
	this.setState({ password:event.target.value,passValidate:''});
	}

	resetPassClickHandle(e){
      e.preventDefault();
      const{dispatch,match:{params}}=this.props;
      let curObj=this;
      let strongRegex =new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9!@#\$%\^&\*])(?=.{6,12})");
	  let password=this.state.password;
      if(validator.isEmpty(password)===true){
        curObj.setState({passValidate:'Please enter the Password'});
    }else if(password.length<7){
        curObj.setState({passValidate:'Password length must be 7 characters'});
    }else if(strongRegex.test(password)===false){
        curObj.setState({passValidate:'Please enter a valid password '});
    }
  if(validator.isEmpty(password)===false && strongRegex.test(password)===true){
      const getParams=params.unique_userid;
		 const data={
            unique_userid:getParams,
            password:password
         }
         dispatch(changePassword(data));
         
	  }

	}

    componentWillReceiveProps(nextProps){
        const{user}=nextProps;
        if(nextProps.user!=this.props.user){
           if(user!=null && user!=undefined && user.statusCode=="ChangePassword"){
               window.location.href="/passwordchange"
               this.setState({messageServerside:'',password:''});
           }else if(user.message.statusCode=="NOTEXIST" && user.message.status==404){
               //let errorMessage="";
                       this.setState({messageServerside:''});
                       Swal.fire({
                           title: 'Error!',
                           text: 'Sorry something went wrong',
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
                                <input id="inputPassword" onKeyDown={this.pressEnterKey} type={this.state.passwordViewMode==false?'password':''}  onChange={this.txtPasswordChangeHandle.bind(this)} value={this.state.password} placeholder="Password" style={{width:''}} />{' '}<span id="viewPass" title={this.state.title} className={this.state.passwordViewMode==false?'far fa-eye':'fa fa-eye-slash'} onClick={this.handlePasswordViewMode.bind(this)}></span>
								 <span id="questionMark" data-tip="Password must be atleast 7 characters and must contain atleast 1 numeric or special character" className="fas fa-question"></span>
								<ReactTooltip  />
								<div className="errorMsg">{this.state.passValidate}</div>
								<button className="btn gradient" onKeyDown={this.pressEnterKey} onClick={this.resetPassClickHandle.bind(this)}>Change Password</button>
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
 
ChangePassword.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(ChangePassword);