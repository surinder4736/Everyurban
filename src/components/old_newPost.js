import React, { Component } from 'react';

import Jquery from 'jquery';
import blogAction from '../actions/blog';
import validator from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CKEditorold from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageCropper from './imagecrop';
import ReactDOM from 'react-dom';
import CKEditor from 'ckeditor4-react';
import './css/postDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './bodyStyle.css';
import {APIURL, BASE_URL} from '../Config/config'
const axios = require("axios");

//const Swal = require('sweetalert2');

const { addNewBlog } = blogAction;
class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTitle: '',
      imagepath: '',
      imagefile: '',
      projectLisingcontent: '',
      projectContent: '',
      backendUrl: '',
      backendMeta: '',
      keywords: '',
      publisher: '',

    };
  }

  componentDidMount() {
    let curobj = this;


  }
  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //SignUp Button click Handle
  handleSubmit = async (e) => {
    e.preventDefault();
    let curObj = this;
    const {
      projectTitle,
      imagepath,
      imagefile,
      projectLisingcontent,
      projectContent,
      backendUrl,
      backendMeta,
      keywords,
      publisher
    } = this.state;

    let shouldSubmit = (projectTitle !== '' &&
      projectLisingcontent !== '' &&
      projectContent !== '' &&
      backendUrl !== '' &&
      imagepath !== '' &&
      imagefile !== '' &&
      backendMeta !== '' &&
      keywords !== '' &&
      publisher !== '')
      ? true
      : false;


    if (shouldSubmit) {
      const { dispatch } = this.props;
      console.log(this);
      const data = {
        postlistcontent: projectLisingcontent,
        posttitle: projectTitle,
        postcontent: projectContent,
        posturlextension: backendUrl,
        imagefile: imagefile,
        postmetaextension: backendMeta,
        keywords: keywords,
        publisher: publisher,
        imagepath: "imagepath"
      }
      console.log(data);
      // dispatch(addNewBlog(data));
      let formData = new FormData();
			formData.append("file",this.state);
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				}
			}
      axios.post(`${APIURL}users/1/1/upload`, formData, config);
    }
  }

  clearForm = () => {
    this.setState({ projectLisingcontent: '', projectTitle: '', projectContent: '', backendUrl: '', imagefile: '', backendMeta: '', keywords: '', publisher: '', imagepath: '' });
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    console.log(nextProps);
    if (nextProps.blog.success_msg == "OK") {

      Swal.fire({
        title: 'A Blog Post Sucess.',
        text: 'Please verify your email to complete your registration.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.clearForm();
    }
    else {
      Swal.fire({
        title: 'Error!',
        // text: message.errorMessage,
        text: "Some thing went wrong",
        icon: 'error',
        confirmButtonText: 'Cancel'
      });
    }
  }
  onimageChange = (event) => {
    this.setState({
      imagepath: event.target.files[0],
    });
  };

  getImage = (file, filepath) => {

    this.setState({
      imagefile: file,
      imagepath: filepath
    })
  };
  handlePasswordEnter(e) {
    //e.preventDefault();
    if (e.keyCode == 13) {
      this.signUpClickHandle(e);
    }
  }

  render() {
    console.log(this.state.profileUploadImageItem);

    return (
      <div className="container">
        {/* <form id="contact-form" method="POST" encType="multipart/form-data"> */}
        <hr />
        <div className="card-body">
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                Project Title: <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="projectTitle"
                onChange={this.onValueChange}
                value={this.state.projectTitle}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4">
              <ImageCropper getImage={this.getImage} />
            </div>
            <div className="col-sm-8 setMobilemaring">
              <label>
                Project Story <span className="mandatory">*</span>
              </label>
              <CKEditorold
                editor={ClassicEditor}
                onInit={(editor) => { }}
                onChange={(event, editor) => {
                  this.setState({
                    projectLisingcontent: editor.getData(),
                  });
                }}
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                Project Content <span className="mandatory">*</span>
              </label>
              <CKEditorold
                editor={ClassicEditor}
                onInit={(editor) => { }}
                onChange={(event, editor) => {
                  this.setState({
                    projectContent: editor.getData(),
                  });
                }}
                className={'projectContent'}
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
              />{' '}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                <h3>Backend Labels </h3>
              </label>
              <br />
              <label>
                Url Extension : <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Url Extension"
                name="backendUrl"
                onChange={this.onValueChange}
                value={this.state.backendUrl}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                Meta Tags : <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Meta Tags"
                name="backendMeta"
                onChange={this.onValueChange}
                value={this.state.backendMeta}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                Key Words : <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Key Words"
                name="keywords"
                onChange={this.onValueChange}
                value={this.state.keywords}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                Publisher : <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Publisher"
                name="publisher"
                onChange={this.onValueChange}
                value={this.state.publisher}
              />
            </div>
          </div>

          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary custom-btn"
              // style={{float: 'right'}}
              onClick={this.handleSubmit} id="btnContactUs"
            >
              Upload Post <i className="fa fa-paper-plane"></i>
            </button>
          </div>
          <div className="col-md-12">&nbsp;</div>
        </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  blogs: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    blog: state.blog.blogs,
  };
}

export default connect(mapStateToProps)(NewPost);