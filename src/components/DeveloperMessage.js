import React, { Component } from 'react';
import userAction from '../actions/user';
import {connect} from 'react-redux';
import Jquery from 'jquery';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png'
import DevelopoerMessageBody from 'react-body-classname';
class DeveloperMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    renderMessage(){
        return(
            <section className="container">
               <div className="row container m-0">
               <div class="col-md-6 offset-md-3  shadow-sm p-3 mb-5 bg-white rounded " style={{margin:'198px auto'}}>
                <div className="box">
                    <img src={logo} />
                <h1>
                Thank you for successfully creating your account with us.<br></br>
                Someone will get in touch with you soon.
                </h1>
             <p>
             <a href="/">Back to Home</a>
            </p>
                </div>
                </div>
               </div>
            </section>
        )
    }

    render() { 
        const{user}=this.props;
        debugger
        return( 
           <DevelopoerMessageBody className="developerMesssageBgColor">
        <div>
           {this.renderMessage()} 
        </div>
        </DevelopoerMessageBody>
         );
    }
}

DeveloperMessage.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
      user: state.users.user,
    };
  }
export default connect(mapStateToProps)(DeveloperMessage);
