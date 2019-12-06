import React, { Component } from 'react';
import userAction from '../actions/user';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../Images/logo.png'
class DeveloperMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    renderMessage(){
        return(
            <section className="container">
               <div className="row">
               <div class="col-md-6 offset-md-3 mt-4 shadow-sm p-3 mb-5 bg-white rounded ">
                <div className="box">
                    <img src={logo} />
                <h1>
                Thank you for verifying your email.<br></br>
                Someone will get in touch with you soon
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
        return( <div style={{background:'lightgray',height:'700px' }}>
           {this.renderMessage()} 
        </div> );
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
