import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Grid from '@material-ui/core/Grid'
import Header from './Header'
import ProfileHeader from './ProfileHeader'
import MenuComponent from './MenuComponent'
import PostList from './postlistingchild/PostList'
import Footer from './Footer'
// import blogAction from '../actions/blog';
// import rightarrow from '../Images/rightarrow.png'
import Postlisting from './postlistingchild/Postlisting'
export class Projects extends Component {
  static displayName = Projects.name

  constructor(props) {
    super(props)
  }
  componentDidMount() { }

  render() {
    return (
      <div>
        {sessionStorage.getItem("isUserLogged")==="true" ? <ProfileHeader/> : <Header/>}        
        <MenuComponent />
        <section id="howitwork">
          <div className="howitwork-body" style={{ padding: "1%" }}>
            <h1>Project RFPs</h1>
            <p>
              Explore current and past projects.
            </p>
          </div>
        </section>
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
