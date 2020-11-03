import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
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

  render () {
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
        <NewPost />
        <Footer />
      </div>
    );
  }
}

export default HelpCenter;