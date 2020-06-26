import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import contactUsAction from '../actions/contactus';
import validator from 'validator';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import Footer from './Footer';
const{addContactUs}=contactUsAction;
export class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state={id:0,fname:'',lname:'',email:'',enquiry:'',message:'',fnameErrorMsg:'',lnameErrorMsg:'',emailErrorMsg:'',messageErrorMsg:''}
    
}
componentDidMount() {
    const{dispatch}=this.props;
}

componentWillReceiveProps(nextProps){
    const{dispatch}=this.props;
    debugger
    const{contactus}=nextProps;
    if(contactus!=this.props.contactus){
        if(contactus!=null && contactus.codeExecute=="Save"){
            Swal.fire({
                title: 'Success!',
                text: contactus.successMessage,
                icon: 'success',
                confirmButtonText: 'OK'		
              });
              this.clearForm();
        }if(contactus.message!=null && contactus.message.errorMessage!=null){
            Swal.fire({
                title: 'Oh No!',
                text: contactus.message.errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'		
              });
        }
    }
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
    const{dispatch}=this.props;
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
            enquiry_type:enquiry,
            message:message
        }
        dispatch(addContactUs(sendData));
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
        <section id="contact-us">
            <div className="contact-us-body">
                <h1>Contact Us</h1>
                <p>
                We would love to hear from you.
                </p>
            </div>
            <div className="contact-us-content p-0">
                <div className="row">
                    <div className="col-md-12">
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
                                        <label for="subject">Type of Inquiry</label>
                                        <select id="subject" name="enquirt-type" onChange={this.txtEnquiryOnChange.bind(this)} value={this.state.enquiry} class="form-control" required="required">
                                            <option value="" selected="">Choose One:</option>
                                            <option value="Architect">Architect</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name">Message <span className="mandatory">*</span></label>
                                        <textarea name="message" id="message" style={{boxShadow:'none'}} onChange={this.txtMessageOnChange.bind(this)} value={this.state.message} class="form-control" rows="10" cols="25" required="required"
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
                    {/* <div class="col-md-4">
                        <form>
                        <legend><span class="glyphicon glyphicon-globe"></span> Our office</legend>
                        <address>
                            <strong>EveryUrban Inc</strong><br />
                            795 Folsom Ave, Suite 600<br />
                            San Francisco, CA 94107<br />
                            <abbr title="Phone">
                                P:</abbr>
                            (123) 456-7890
                        </address>
                        <address>
                            <strong>Contact Email</strong><br />
                            <a href="mailto:#"> assist@everyurban.com</a>
                        </address>
                        </form>
                    </div> */}
                </div>
            </div>
        </section>
        <Footer />
        </div>
    );
  }
}

ContactUs.propTypes = {
    contactus: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
        contactus: state.contactUs.contactus
    };
  }
export default connect(mapStateToProps)(ContactUs);