import React, { Component } from 'react';
import userAction from '../actions/user';
import SuccessPassChangeBody from 'react-body-classname';
import logo from '../Images/logo.png'
const{verifyemail} = userAction;
class SuccessPasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = { getParam:'',updateVerify:'' }
    }

    renderSuccess(){
        return(
            <section className="container">
               <div className="row container m-0">
               <div class="col-md-6 offset-md-3  shadow-sm p-3 mb-5 bg-white rounded " style={{margin:'198px auto'}}>
                <div className="box">
                    <img src={logo} />
                <h1>
                 Your password has been changed. 
                 To start receiving projects,please login first.
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
        //const{user}=this.props;
        return( 
            <SuccessPassChangeBody className="successPassChangeBgColor">
                <div>
                {this.renderSuccess()} 
               </div> 
            </SuccessPassChangeBody>
        );
    }
}


export default SuccessPasswordChange;
