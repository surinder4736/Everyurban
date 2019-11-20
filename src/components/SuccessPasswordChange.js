import React, { Component } from 'react';
import userAction from '../actions/user';

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
               <div className="row">
               <div class="col-md-6 offset-md-3 mt-4 shadow-sm p-3 mb-5 bg-white rounded ">
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
        return( <div style={{background:'lightgray', backgroundSize:'' ,height:'700px'}}>
           {this.renderSuccess()} 
        </div> );
    }
}


export default SuccessPasswordChange;
