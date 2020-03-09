import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  Header from './Header';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import Footer from './Footer';
export class HelpCenter extends Component {
  //static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state={
      keywords:'',
      errorMessage:'',
      initialCollapse:[{
      title:'Management',
      body:`This is Mananagemen and Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
      },
      {
        title:'Abstract',
        body:`This is Abstract and Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
        },
        {
          title:'Project',
          body:`This is Project and Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
          }
    ],
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
        {/* Slider */}
    <section id="help-center"  className="container">
        <div className="titles" >
            <h1>Help Center</h1><hr></hr>
        </div>
      <div className="search-bar">
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
        {it.body}
        </p>
      </div>
    </div>
  </div>
  
        )
    })}
 
</div>
        </div>
	</section>	
      {/* Footer Section */}
      <Footer />
      </div>
      );
  }
}

export default HelpCenter;