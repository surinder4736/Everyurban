import React, { Component } from 'react';

import Jquery from 'jquery';
import blogAction from '../actions/blog';
import validator from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import CKEditorold from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
// import ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SunEditor,{buttonList} from 'suneditor-react';

import ImageCropper from './imagecrop';
import ReactDOM from 'react-dom';
import CKEditor from 'ckeditor4-react';
import './css/postDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';
// import katex from 'katex'
// import 'katex/dist/katex.min.css'
import 'sweetalert2/src/sweetalert2.scss';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import './bodyStyle.css';
import { APIURL, BASE_URL } from '../Config/config';
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
      images_: '',
      updateproject: false,
      edit_data_projectLisingcontent: '',
      edit_data_projectContent: '',
      old_image: '',
      seno:''

    };
  }

  
  componentDidMount() {
    let curobj = this;
    console.log(this.props);
    //  const { profileUrl } = this.props.match.params;



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
        publisher,
      images_
    } = this.state;

    let shouldSubmit = (projectTitle !== '' &&
      projectLisingcontent !== '' &&
      projectContent !== '' &&
      backendUrl !== '' &&
      backendMeta !== '' &&
      keywords !== '' &&
      publisher !== '')
      ? true
      : false;


    if (shouldSubmit) {
      const { dispatch } = this.props;
      console.log(this.state);
      const data = {
        postlistcontent: projectLisingcontent,
        posttitle: projectTitle,
        postcontent: projectContent,
        posturlextension: 'projects-'+this.toSeoUrl(backendUrl),
        imagefile: imagefile,
        postmetaextension: backendMeta,
        keywords: keywords,
        publisher: publisher,
        imagepath: "imagepath"
      }
      // dispatch(addNewBlog(data));
      console.log(data);
        let formData = new FormData();
        formData.set('postlistcontent', data.postlistcontent);
        formData.set('posttitle', data.posttitle);
        formData.set('postcontent', data.postcontent);
        formData.set('posturlextension', data.posturlextension);
        formData.set('postmetaextension',data.postmetaextension);
        formData.set('keywords', data.keywords);
        formData.set('publisher',data.publisher);
        formData.set('imagepath', data.imagepath);        
      if (images_!='') {
		    formData.append("file",images_);
      }
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				}
			}
      if (this.state.updateproject === true) {
        var url = axios.put(`${APIURL}blog/${this.state.seno}`, formData, config);

      } else {
          var url=axios.post(`${APIURL}blog/save`, formData, config);
      }
      
        url.then((response) => {
                console.log(response.data);
                if (response.data.success_msg == "OK") {
                  window.location.href = `/project`;

      // Swal.fire({
      //   title: 'A Project Post Sucess.',
      //   text: 'Your project save sucess.',
      //   icon: 'success',
      //   confirmButtonText: 'OK'
      // });
      // this.clearForm();
                }
                else {
                  Swal.fire({
                    title: 'Error!',
                    // text: message.errorMessage,
                    text: "Some thing went wrong",
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                  });
    }}).catch((error) => {
						console.log(error);
						return error;
					  });
       
     
        }
  }

   toSeoUrl(url) {
    return url.toString()               // Convert to string
        .normalize('NFD')               // Change diacritics
        .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
        .replace(/\s+/g,'-')            // Change whitespace to dashes
        .toLowerCase()                  // Change to lowercase
        .replace(/&/g,'-and-')          // Replace ampersand
        .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
        .replace(/-+/g,'-')             // Remove duplicate dashes
        .replace(/^-*/,'')              // Remove starting dashes
        .replace(/-*$/,'');             // Remove trailing dashes
}

  clearForm = () => {
    this.setState({ projectLisingcontent: '', projectTitle: '', projectContent: '', backendUrl: '', imagefile: '', backendMeta: '', keywords: '', publisher: '', imagepath: '' });
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    console.log(nextProps.setData);
    const data_ = nextProps.setData;
    let extenstion_url=data_.posturlextension.split('projects-')[1];
        this.setState({ edit_data_projectLisingcontent: data_.postlistcontent, projectTitle: data_.posttitle, edit_data_projectContent: data_.postcontent, backendUrl: extenstion_url, imagefile: data_.image, backendMeta: data_.postmetaextension, keywords: data_.keywords, publisher: data_.publisher, imagepath: '',old_image: `${BASE_URL}/images/${data_.image}`,updateproject:true,seno:data_.seno});

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

  setImage = (file) => {

    this.setState({
      images_: file
    })
  };
  handlePasswordEnter(e) {
    //e.preventDefault();
    if (e.keyCode == 13) {
      this.signUpClickHandle(e);
    }
  }
  
  handleChangeContentDetail(content){
    this.setState({
      projectContent: content
    });
  }

  handleChangeListingContent(content){
    this.setState({
      projectLisingcontent: content
    });
  }


  render() {
    return (
      <div className="container">
        <hr />
        <div className="card-body">
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
               <h5> Project Title: <span className="mandatory">*</span></h5>
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
               <label>
               <h5> Project Preview <span className="mandatory">*</span></h5>
              </label>
              <ImageCropper getImage={this.getImage} setImage={this.setImage} old_image={this.state.old_image}/>
            </div>
            <div className="col-sm-8 setMobilemaring">
              <SunEditor setContents={this.state.edit_data_projectLisingcontent} setOptions={{
                    height: 200,
                    // katex: katex,
                    buttonList: [
                      ['undo', 'redo'],
                      ['font', 'fontSize', 'formatBlock'],
                       ['paragraphStyle', 'blockquote'],
                      ['bold', 'underline', 'italic', 'strike'],
                      // [ 'subscript', 'superscript']
                      ['fontColor', 'hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      ['outdent', 'indent'],
                      ['align', 'horizontalRule', 'list', 'lineHeight'],
                       ['table', 'link', 'image'], 
                      //  ['table', 'link', 'image', 'video', 'math'], // You must add the 'katex' library at options to use the 'math' plugin.
                      // ['imageGallery'], // You must add the "imageGalleryUrl".
                      ['fullScreen'],
                      // ['showBlocks', 'codeView']
                      ['preview', 'print'],
                    ] // Or Array of button list, eg. [['font', 'align'], ['image']]
              }}
              onChange={this.handleChangeListingContent.bind(this)}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
               <h5> Project Content <span className="mandatory">*</span></h5>
              </label>
              <SunEditor setContents={this.state.edit_data_projectContent} setOptions={{
                    height: 200,
                    // katex: katex,
                    buttonList: [
                      ['undo', 'redo'],
                      ['font', 'fontSize', 'formatBlock'],
                       ['paragraphStyle', 'blockquote'],
                      ['bold', 'underline', 'italic', 'strike'],
                      // [ 'subscript', 'superscript']
                      ['fontColor', 'hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      ['outdent', 'indent'],
                      ['align', 'horizontalRule', 'list', 'lineHeight'],
                       ['table', 'link', 'image'], 
                      //  ['table', 'link', 'image', 'video', 'math'], // You must add the 'katex' library at options to use the 'math' plugin.
                      // ['imageGallery'], // You must add the "imageGalleryUrl".
                      ['fullScreen'],
                      // ['showBlocks', 'codeView']
                      ['preview', 'print'],
                    ] // Or Array of button list, eg. [['font', 'align'], ['image']]
              }}
              onChange={this.handleChangeContentDetail.bind(this)}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
                <h5>Backend Labels </h5>
              </label>
              <br />
              <label>
                Url Extension : <span className="mandatory">*</span>
              </label>
              <input type="text"
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
    user: state.users.user,
    blog: state.blog.blogs,
  };
}

export default connect(mapStateToProps)(NewPost);