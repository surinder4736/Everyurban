import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import MenuComponent from './MenuComponent';
import footerLogo from '../Images/logo-footer.png';
import jsonConfig from '../Config/helpCenterJson';
import Footer from './Footer';
export class HelpCenter extends Component {
  //static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      errorMessage: '',
      initialCollapse: jsonConfig.question,
      Items: [],
    };
  }
  componentWillMount() {
    this.setState({Items: this.state.initialCollapse});
  }

  txtKeywordHandleChange(e) {
    e.preventDefault();
    let getInitialList = this.state.initialCollapse;
    getInitialList = getInitialList.filter((items) => {
      return (
        items.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1 ||
        items.body.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({Items: getInitialList});
  }

  render() {
    return (
      <div>
        <Header />
        <MenuComponent />
        <section id="help-center">
          <div className="help-center-body">
            <h1>Help Centre</h1>
            <p>
              These are some answers to commonly asked questions.
              <br />
              If you do not see your question in the Help Centre,
              <br />
              E-mail us at <u>assist@everyurban.com</u>.
            </p>
          </div>

          <div id="content-wrapper" className="container p-0 content-wrapper">
            <div id="accordion"></div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default HelpCenter;
