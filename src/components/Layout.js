import React, { Component } from 'react';
//import { Container } from 'reactstrap';

export class Layout extends Component {
  // static displayName = Layout.name;

  render () {
    
    return (
      <div>
       {this.props.children}
      </div>
    );
  }
}
