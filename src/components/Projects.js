import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './Header'
import ProfileHeader from './ProfileHeader'

import MenuComponent from './MenuComponent'
import Footer from './Footer'
import Postlisting from './postlistingchild/Postlisting'
export class Projects extends Component {
  static displayName = Projects.name

  constructor(props) {
    super(props)
   

  }
  componentDidMount() { }

  render() {
    console.log(sessionStorage.getItem("isUserLogged"));
    return (
      <div>
  {sessionStorage.getItem("isUserLogged")==="true" ? <ProfileHeader/> : <Header/>}        
        <section id="howitwork">
          <div className="howitwork-body" style={{ padding: "1%" }}>
            <h1>Project RFPs</h1>
            <p>
              Explore current and past projects.
            </p>
          </div>
        </section>
        <MenuComponent />

        <Postlisting />

        <Footer />
      </div>
    )
  }
}

Projects.propTypes = {
  user: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    user: state.users.user,
  }
}
export default connect(mapStateToProps)(Projects)
