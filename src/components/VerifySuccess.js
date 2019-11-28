import React, { Component } from 'react';
import userAction from '../actions/user';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png'
const{verifyemail} = userAction;
class VerifySuccess extends Component {
    constructor(props) {
        super(props);
        this.state = { getParam:'',renderContent:'' }
         this.state.getParam=this.props.match.params.email;
         const{dispatch}=this.props;
         if(this.state.getParam!=null){
             const data={
                 email:this.state.getParam
             }
             dispatch(verifyemail(data));
         }
    
    }
    
    renderUpdatedMessage(){
        return(
            <section className="container">
               <div className="row">
               <div class="col-md-6 offset-md-3 mt-4 shadow-sm p-3 mb-5 bg-white rounded ">
                <div className="box">
                    <img src={logo} />
                <h1>
                Sorry  user email already verified so please go for login.
            </h1>
           
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
        return(
            <section className="container">
               <div className="row">
               <div class="col-md-6 offset-md-3 mt-4 shadow-sm p-3 mb-5 bg-white rounded ">
                <div className="box">
                    <img src={logo} />
                <h1>
                 Thank you for confirming your E-mail. 
                 To start recieving projects,please complete your profile.
            </h1>
           
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
        return( <div style={{background:'lightgray', backgroundSize:'' ,height:'700px'}}>
           {this.renderSuccessVerify()} 
        </div> );
    }
}

VerifySuccess.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(VerifySuccess);
