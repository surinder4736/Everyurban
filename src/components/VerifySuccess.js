import React, { Component } from 'react';
import userAction from '../actions/user';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png';
import VerifySuccessBody from 'react-body-classname';
import Jquery from 'jquery';
const{verifyemail} = userAction;
class VerifySuccess extends Component {
    constructor(props) {
        super(props);
        this.state = { getParam:'',renderContent:'',changeStatus:'' }
         this.state.getParam=this.props.match.params.email;
         //const{dispatch,user}=this.props;
         const{dispatch}=this.props;
         if(this.state.getParam!=null){
             const data={
                 email:this.state.getParam
             }
             dispatch(verifyemail(data));
         }
        
    }

    componentWillReceiveProps(nextProps){
        const{isEmailVerified:{user}}=nextProps;
        if(user!=null && user!=this.props.isEmailVerified.user){
            this.setState({ changeStatus: user.is_email_verified });
        }    
    }

    renderUpdatedMessage(){
        const{isEmailVerified}=this.props;
        return(
            <section className="container">
               <div className="row container m-0">
               <div class="col-md-6 offset-md-3 shadow-sm p-3 mb-5 bg-white rounded " style={{margin:'198px auto'}}>
                <div className="box">
                    <img src={logo} />
                    {isEmailVerified.user.role_type!="architect" && 
                <h1>
                Sorry this email already verified.<br></br> 
                Someone will get in touch with you soon.
            </h1>
                    }
           
           {isEmailVerified.user.role_type=="architect" && 
                <h1>
                Sorry this email already verified.<br></br> 
                Please login and start updating your profile.
            </h1>
                    }

            <p>
             <a href="/Login">Back to Login</a>
            </p>
                </div>
                </div>
               </div>
            </section>
        )
    }

    renderSuccessVerify(){
        const{isEmailVerified}=this.props;
        debugger
        return(
            <section className="container">
               <div className="row container m-0">
               <div class="col-md-6 offset-md-3 shadow-sm p-3 mb-5 bg-white rounded " style={{margin:'198px auto'}}>
                <div className="box">
                    <img src={logo} />
                    {/* Developer email verification message */}
                    
                {isEmailVerified.user.role_type!="architect" &&
                <h1>
                Thank you for verifying your email.<br></br>
                Someone will get in touch with you soon.
                </h1>
                }
                 {/* Architect email verification message */}
                {isEmailVerified.user.role_type=="architect" &&
                <h1>
                Thank you for confirming your E-mail.<br></br>
                To start recieving projects,please complete your profile.
                </h1>
                }
           
            <p>
             <a href="/Login">Back to Login</a>
            </p>
                </div>
                </div>
               </div>
            </section>
        )
    }

    render() { 
        try{
        const{changeStatus}=this.state;
        debugger
        return(
            <VerifySuccessBody className="verifySuccess">
        <div> 
           {changeStatus=="false" ? this.renderSuccessVerify() : this.renderUpdatedMessage()} 
        </div>
            </VerifySuccessBody>
             );
        }catch(err){
            return(
                <section className="container">
               <div className="row container m-0">
               <div class="col-md-6 offset-md-3 shadow-sm p-3 mb-5 bg-white rounded " style={{margin:'198px auto'}}>
                <div className="box">
                    <h1>Sorry this Something went wrong</h1>
                  </div>
                  </div>
                  </div>
                  </section>
            )
        }
    }
}

VerifySuccess.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
        isEmailVerified: state.users.isEmailVerified,
    };
  }
export default connect(mapStateToProps)(VerifySuccess);
