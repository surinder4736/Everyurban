import React, { Component } from 'react';
import Header from './ProfileHeader';
import MenuComponent from './MenuComponent';
import Footer from './Footer';
import NewPost from './newPost';
import 'bootstrap/dist/css/bootstrap.min.css'
import { APIURL, BASE_URL } from '../Config/config';
const axios = require("axios");

export class EditProject extends Component {
  //static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state={
      keywords:'',
        errorMessage: '',
        edit_data: {},
        edit_url: ''
    }    
  }
    componentWillMount() {
        const projectid = this.props.match.params.posturl;
                console.log(projectid);

        this.getOnePost(projectid);
//   this.setState({})
}
//   getOnePost(posturl) {
//   try {
//       const post = axios.get(`${APIURL}blog/get/${posturl}`);
//     //    this.setState({edit_data:post});
//     return post;
//   } catch (err) {
//     return err.message;
//   }
//     }
    
    getOnePost(posturl) {
        const post = axios.get(`${APIURL}blog/get/${posturl}`).then(response => {
           this.setState({edit_data:response.data.blog});
            }).catch((error) => {
                  console.log(error);
            });
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
 const { AdminUserList, user, dispatch } = this.props;
    console.log(this.state)

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
              Edit Projects
            </p>
          </div>
        </section>
         {this.renderCodMangeSection()}
        <NewPost setData={this.state.edit_data}/>
        <Footer />
      </div>
    );
  }
}



export default EditProject;
