import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import validator from 'validator';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
export class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state={id:0,fname:'',lname:'',email:'',enquiry:'',message:'',fnameErrorMsg:'',lnameErrorMsg:'',emailErrorMsg:'',messageErrorMsg:''}
    
}
componentDidMount() {
  
}

txtFNameOnChange(e){
    e.preventDefault();
    this.setState({ fname:e.target.value,fnameErrorMsg:''});
}

txtLNameOnChange(e){
    e.preventDefault();
    this.setState({ lname:e.target.value,lnameErrorMsg:''});
}

txtEmailOnChange(e){
    e.preventDefault();
    this.setState({ email:e.target.value,emailErrorMsg:''});
}

txtEnquiryOnChange(e){
    e.preventDefault();
    this.setState({ enquiry:e.target.value});
}

txtMessageOnChange(e){
    e.preventDefault();
    this.setState({ message:e.target.value,messageErrorMsg:''});
}

handleClickSave(e){
    e.preventDefault();
    const{fname,lname,email,enquiry,message}=this.state; 
    try {
    if(validator.isEmpty(fname)==true){
        this.setState({ fnameErrorMsg:"Please enter first name"  });
    }
    if(validator.isEmpty(lname)==true){
        this.setState({ lnameErrorMsg:"Please enter last name"  });
    }
    if(validator.isEmpty(email)==true){
        this.setState({ emailErrorMsg:"Please enter email address"  });
    }else if(validator.isEmail(email)==false){
        this.setState({ emailErrorMsg:"Email format is not valid"  });
    }
    if(validator.isEmpty(message)==true){
        this.setState({ messageErrorMsg:"Please enter your message"  });
    }
    //After Filled form
    if(validator.isEmpty(fname)==false  && validator.isEmpty(lname)==false && validator.isEmpty(email)==false && validator.isEmail(email)==true && validator.isEmpty(message)==false){
        let sendData={
            id:0,
            fname:fname,
            lname:lname,
            email:email,
            enquiry:enquiry,
            message:message
        }
    }
    } catch (error) {
        console.log(error);
    }
    
}

clearForm(){
this.setState({id:0,fname:'',lname:'',email:'',enquiry:'',message:''});
}
  render () {
    return (
      <div>
        <Header />
        <MenuComponent />
        {/* Slider */}
    <section id="contact-us" className="container" >
        <div className="title">
            <h1>Contact Us</h1><hr/>
        </div>
    <div className="container p-0">
    <div className="row">
        <div className="col-md-8">
            <div className="ct-wrapper shadow p-3 mb-5 rounded">
               <div className="row">
                    <div className="col-md-6">
                        <div class="form-group">
                            <label for="name">First Name <span className="mandatory">*</span></label>
                            <input type="text" className="form-control" id="name" onChange={this.txtFNameOnChange.bind(this)} value={this.state.fname} placeholder="Enter first name" required="required" />
                            <div className="error-messag">{this.state.fnameErrorMsg}</div>
                        </div>
                        <div class="form-group">
                            <label for="name">Last Name <span className="mandatory">*</span></label>
                            <input type="text" className="form-control" id="name" onChange={this.txtLNameOnChange.bind(this)} value={this.state.lname} placeholder="Enter last name" required="required" />
                            <div className="error-messag">{this.state.lnameErrorMsg}</div>
                        </div>
                        <div className="form-group">
                            <label for="email">Email Address <span className="mandatory">*</span></label>
                            <input type="email" class="form-control" id="email" onChange={this.txtEmailOnChange.bind(this)} value={this.state.email} placeholder="Enter email" required="required" />
                            <div className="error-messag">{this.state.emailErrorMsg}</div>
                        </div>
                        <div class="form-group">
                            <label for="subject">Type of Enquiry</label>
                            <select id="subject" name="enquirt-type" onChange={this.txtEnquiryOnChange.bind(this)} value={this.state.enquiry} class="form-control" required="required">
                                <option value="na" selected="">Choose One:</option>
                                <option value="Architect">Architect</option>
                                <option value="Developer">Developer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="name">Message <span className="mandatory">*</span></label>
                            <textarea name="message" id="message" onChange={this.txtMessageOnChange.bind(this)} value={this.state.message} class="form-control" rows="10" cols="25" required="required"
                                placeholder="Message"></textarea>
                                <div className="error-messag">{this.state.messageErrorMsg}</div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary custom-btn" onClick={this.handleClickSave.bind(this)} id="btnContactUs">Send Message <i className="fa fa-paper-plane"></i></button>
                    </div>
                </div>
              
            </div>
        </div>
        <div class="col-md-4">
            <form>
            <legend><span class="glyphicon glyphicon-globe"></span> Our office</legend>
            <address>
                <strong>Twitter, Inc.</strong><br />
                795 Folsom Ave, Suite 600<br />
                San Francisco, CA 94107<br />
                <abbr title="Phone">
                    P:</abbr>
                (123) 456-7890
            </address>
            <address>
                <strong>Full Name</strong><br />
                <a href="mailto:#">first.last@example.com</a>
            </address>
            </form>
        </div>
    </div>
</div>

    </section>
     
      <footer>
			<div className="container">
			<div className="useful-link">
					<a href="#">About<span id="vh">|</span></a> 
					<a href="#">Terms of Service<span id="vh">|</span></a>  
					<a href="#">Privacy Policy<span id="vh">|</span></a>  
					<a href="#">Contact</a>
				</div>
				<img src={footerLogo} alt=""/>
				<div className="social">
					<a href="#"><i className="fab fa-facebook-f"></i></a>
					<a href="#"><i className="fab fa-instagram"></i></a>
					<a href="#"><i className="fab fa-twitter"></i></a>
					<a href="#"><i className="fab fa-linkedin-in"></i></a>
				</div>
				<p>EveryUrban 2020. All rights reserved.</p>
			</div>
		</footer>

      </div>
      );
  }
}

// Home.propTypes = {
//   user: PropTypes.object.isRequired
// };
// function mapStateToProps(state) {
//     return {
//       user: state.users.user
//     };
//   }
export default ContactUs;