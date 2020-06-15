import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import jsonConfig from '../Config/helpCenterJson';
import Footer from './Footer';
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
      <section id="help-center">
        <div className="help-center-body">
          <h1>Help Center</h1>
          <p>
            These are some answers to commonly asked questions.<br/>If you do not see your question in the Help Center,<br/>E-mail us at <u>assist@everyurban.com</u>.  
          </p>
        </div>
        
        <div className="search-bar container">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input type="text" class="form-control" placeholder="Search" onChange={this.txtKeywordHandleChange.bind(this)} type="text"  />
            <div style={{color:'red',fontSize:'13px'}}>{this.state.errorMessage}</div>
          </div>
        </div>
        <div id="content-wrapper" className="container p-0 content-wrapper">
        <div id="accordion">
          {this.state.Items.map((it,i)=>{
              let item=i+1;
              let collapseId='collapse-'+item;
              let headingId='heading-'+item;
              let contentLine=it.body.split('[EMAILADDRESS]');
						  return(
              <div class="card">
                <div class="card-header" id={headingId}>
                  <h5 className='arrow-icon'>   
                      <a role="button" data-toggle="collapse" href={"#"+collapseId} aria-expanded="false" aria-controls={collapseId}>
                      {it.title}
                      </a>
                  </h5> 
                </div>
                <div id={collapseId} class={item==1 ? "collapse": "collapse hide"} data-parent="#accordion" aria-labelledby={headingId}>
                  <div class="card-body">
                    <p>
                    {contentLine[0]}
                    {contentLine.length>1 &&
                      <u>assist@everyurban.com</u>
                    }
                    {contentLine[1]}
                    </p>
                    <p>
                      {it.body2}
                    </p>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
	    </section>	
      <Footer />
      </div>
    );
  }
}

export default HelpCenter;