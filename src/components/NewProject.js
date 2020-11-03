import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import  Header from './Header';
import Header from './ProfileHeader';

import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import jsonConfig from '../Config/helpCenterJson';
import Footer from './Footer';
import NewPost from './newPost';
import 'bootstrap/dist/css/bootstrap.min.css'

export class HelpCenter extends Component {
  //static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state={
      keywords:'',
      errorMessage:'',
      initialCollapse:jsonConfig.question,
      Items:[]
    }    
  }
  componentWillMount() {
  // if(nextProps.user!=){
    //         window.location.href="/Login";
		// }
  this.setState({Items:this.state.initialCollapse})
}

txtKeywordHandleChange(e){
  e.preventDefault();
  let getInitialList=this.state.initialCollapse;
  getInitialList=getInitialList.filter(items=>{
    return items.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1 || items.body.toLowerCase().search(e.target.value.toLowerCase()) !== -1
  })
   this.setState({Items:getInitialList});
  }
  
   renderCodMangeSection() {

    return (
      <div className="container">
        <div class="row">
           <div class="col-md-6">
        </div>
          <div class="col-md-6" >
           <div class="btn-group" role="group" aria-label="Basic example" style={{float: 'right'}}>
              <a  class="btn btn-link p-0"  href={`/project`}  >Go Back <i className="fa fa-arrow"></i></a>
              </div></div>           
        </div>
      </div>
    )
  }

  render() {
      console.log(this.props);
 const { AdminUserList, user, dispatch } = this.props;
                console.log(user);

        if (user != null) {
            if (user.auth === undefined || user.isadmin === false) {
                window.location.href = `/`;
                return (<div></div>);
            }
        }
    return (
      <div>
        <Header />
        <MenuComponent />
        <section id="howitwork">
          <div className="howitwork-body" style={{padding:"0%"}}>
            <h1>Project RFPs</h1>
            <p>
              Add New Projects
            </p>
          </div>
        </section>
         {this.renderCodMangeSection()}
        <NewPost />
        <Footer />
      </div>
    );
  }
}



HelpCenter.propTypes = {
  blogs: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    user: state.users.user,
  };
}
export default connect(mapStateToProps)(HelpCenter);
// export default HelpCenter;