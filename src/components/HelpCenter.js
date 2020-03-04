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
    
}
componentDidMount() {
  
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
<div id="content-wrapper" className="container p-0 content-wrapper">

<div id="accordion">
    {Array(10).fill().map((it,i)=>{
        let item=i+1;
        let collapseId='collapse-'+item;
        let headingId='heading-'+item;
        return(
    <div class="card">
    <div class="card-header" id={headingId}>
    <h5 className='arrow-icon'>   
        <a role="button" data-toggle="collapse" href={"#"+collapseId} aria-expanded="false" aria-controls={collapseId}>
          Item {item}
        </a>
    </h5> 
    </div>
    <div id={collapseId} class={item==1 ? "collapse": "collapse hide"} data-parent="#accordion" aria-labelledby={headingId}>
      <div class="card-body">
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  </div>
  
        )
    })}
  {/* <div class="card">
    <div class="card-header" id="heading-2">
      <h5 class="arrow-icon">
        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
          Item 2
        </a>
      </h5>
    </div>
    <div id="collapse-2" class="collapse" data-parent="#accordion" aria-labelledby="heading-2">
      <div class="card-body">
        Text 2
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="heading-3">
      <h5 class="arrow-icon">
        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
         Item 3
        </a>
      </h5>
    </div>
    <div id="collapse-3" class="collapse" data-parent="#accordion" aria-labelledby="heading-3">
      <div class="card-body">
        Text 3
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="heading-4">
      <h5 class="arrow-icon">
        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
         Item 4
        </a>
      </h5>
    </div>
    <div id="collapse-4" class="collapse" data-parent="#accordion" aria-labelledby="heading-4">
      <div class="card-body">
        Text 3
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="heading-5">
      <h5 class="arrow-icon">
        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
         Item 3
        </a>
      </h5>
    </div>
    <div id="collapse-5" class="collapse" data-parent="#accordion" aria-labelledby="heading-5">
      <div class="card-body">
        Text 3
      </div>
    </div>
  </div> */}

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