import React, { Component } from 'react';

import Jquery from 'jquery';
import blogAction from '../actions/blog';
import validator from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CKEditorold from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import ImageCropper from './imagecrop';
import ReactDOM from 'react-dom';
import CKEditor from 'ckeditor4-react';
import './css/postDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
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
        this.setState({ edit_data_projectLisingcontent: data_.postlistcontent, projectTitle: data_.posttitle, edit_data_projectContent: data_.postcontent, backendUrl: data_.posturlextension, imagefile: data_.image, backendMeta: data_.postmetaextension, keywords: data_.keywords, publisher: data_.publisher, imagepath: '',old_image: `${BASE_URL}/images/${data_.image}`,updateproject:true,seno:data_.seno});

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
  MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    console.log(new MyUploadAdapter(loader))
    return new MyUploadAdapter(loader)
    
  }
  } 


  render() {
        const custom_config = {
          extraPlugins: [this.MyCustomUploadAdapterPlugin],
          // plugins: [ Font ],
           fontFamily: {
            options: [
                'default',
                'Ubuntu, Arial, sans-serif',
                'Ubuntu Mono, Courier New, Courier, monospace'
            ]
        },
      // toolbar: {
      //   items: [
      //     'heading',
      //     '|',
      //     'bold',
      //     'italic',
      //     'Alignment',
      //     'List',
      //     'ListUI',
      //     'link',
      //     'bulletedList',
      //     'numberedList',
      //     '|',
      //     'blockQuote',
      //     'insertTable',
      //     '|',
      //     'imageUpload',
      //     'undo',
      //     'redo',
      //     'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor'
      //   ]
      //     }
          toolbar: {
        items: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'highlight',
          '|',
          'alignment',
          '|',
          'numberedList',
          'bulletedList',
          '|',
          'indent',
          'outdent',
          '|',
          'todoList',
          'link',
          'blockQuote',
          'imageUpload',
          'insertTable',
          '|',
          'undo',
           'redo',
          'Paragraph'
        ]
      },
      language: 'en',
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:full',
          'imageStyle:side'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
      licenseKey: '',
      wordCount: {
        onUpdate: stats => {
          this.charactersLength = stats.characters
        }
      }
          ,
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      }
    }
    return (
      <div className="container">
        {/* <form id="contact-form" method="POST" encType="multipart/form-data"> */}
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
             
              <CKEditorold
                editor={ClassicEditor}
                onInit={(editor) => { ClassicEditor }}
                onChange={(event, editor) => {
                  this.setState({
                    projectLisingcontent: editor.getData(),
                  });
                }}
                data={this.state.edit_data_projectLisingcontent}
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <label>
               <h5> Project Content <span className="mandatory">*</span></h5>
              </label>
              <CKEditorold
                editor={ClassicEditor}
                 config={custom_config}
                onInit={(editor) => { }}
                onChange={(event, editor) => {
                  this.setState({
                    projectContent: editor.getData(),
                  });
                }}
                data={this.state.edit_data_projectContent}
                className={'projectContent'}
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
              />{' '}
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

class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            } ) );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        xhr.open( 'POST', `${APIURL}image_upload`, true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve( {
                default: response.url
            } );
        } );

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest( file ) {
        // Prepare the form data.
        const data = new FormData();

        data.append( 'upload', file );

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send( data );
    }
}


export default connect(mapStateToProps)(NewPost);