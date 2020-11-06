
import ReactDOM from 'react-dom';
import React, {PureComponent} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from '@material-ui/core/Modal';
import './imagecropper.css';
import {isWidthUp} from '@material-ui/core';

export default class ImageCropper extends PureComponent {
  state = {
    src: null,
    // crop: {
    //   unit: '70%',
    //   width: 80,
    //   aspect: 1,
    //   state: '',
    // },
    crop: {
			unit: '%',
			width: 50,
      aspect: 16 / 16,
      state: '',
			},
    imagepath: '',
    divMaxHeight: '100%',
    divMaxWidth: '100%',
    file: '',
    profileUploadImageItem:null
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        var w = window.innerWidth;
        var h = window.innerHeight;
        console.log(w, h);
        console.log(img.height, img.width);
        let diff = (img.width * 30) / img.height;
        console.log(diff);
        if (w < h) {
        } else if (img.height > img.width) {
          if (diff > 10) {
            this.setState({
              divMaxWidth: `${(img.width * 70) / img.height}%`,
            });
          }
        } else {
          this.setState({
            divMaxWidth: `${(img.height * 80) / img.width}%`,
          });
        }
      };

      reader.addEventListener('load', () =>
        this.setState({src: reader.result})
      );
      reader.readAsDataURL(e.target.files[0]);
      document.getElementById('myModal').style.display = 'block';
    }
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({crop});
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
      this.props.getImage(croppedImageUrl, this.imageRef,);


    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.setState({ profileUploadImageItem: blob });
        this.props.setImage(this.state.profileUploadImageItem);
        resolve(this.fileUrl);
      }, 'image/jpeg');

    });
  }

  //  getCroppedImg(image, crop, fileName) {
	// 	const canvas = document.createElement('canvas');
	// 	const scaleX = image.naturalWidth / image.width;
	// 	const scaleY = image.naturalHeight / image.height;
	// 	canvas.width = crop.width;
	// 	canvas.height = crop.height;
	// 	const ctx = canvas.getContext('2d');
	
	// 	ctx.drawImage(
	// 	  image,
	// 	  crop.x * scaleX,
	// 	  crop.y * scaleY,
	// 	  crop.width * scaleX,
	// 	  crop.height * scaleY,
	// 	  0,
	// 	  0,
	// 	  crop.width,
	// 	  crop.height
	// 	);
	
	// 	return new Promise((resolve, reject) => {
	// 	  canvas.toBlob(blob => {
	// 		if (!blob) {
	// 		  //reject(new Error('Canvas is empty'));
	// 		  console.error('Canvas is empty');
	// 		  return;
	// 		}
	// 		blob.name = fileName;
	// 		window.URL.revokeObjectURL(this.fileUrl);
	// 		this.fileUrl = window.URL.createObjectURL(blob);
	// 		this.setState({categoryUploadImageItem: blob});
	// 		resolve(this.fileUrl);
	// 	  }, 'image/jpeg');
	// 	});
	// }

  render() {
    const { crop, croppedImageUrl, src, profileUploadImageItem } = this.state;

    return (
      <div className="">
        {/* justify-content-center  App */   }
        {croppedImageUrl === undefined ? (
          <div className="upload-img">
            <div className="row">
              <input
                type="file"
                style={{display: 'none'}}
                id="getFile"
                name="imagepath"
                accept="image/*"
                onChange={this.onSelectFile}
                // value={croppedImageUrl}
              />            
              <div className="col-12">
              Image: <label
                className="" style={{cursor: 'pointer', color:'blue',textDecoration: 'underline'}}
                htmlFor="getFile"
              >upload
              </label>
                 </div>
            </div>
          </div>
        ) : (            <div className="row">

           <div className="col-12">
              Image: <label
                className="" style={{cursor: 'pointer', color:'blue',textDecoration: 'underline'}}
                htmlFor="getFile"
              >upload
              </label>
                 </div>
            <img alt="Crop" style={{paddingLeft: '13px'}} className="CroppedImage" src={croppedImageUrl} />
             <input
                type="file"
                style={{display: 'none'}}
                id="getFile"
                name="imagepath"
                accept="image/*"
                onChange={this.onSelectFile}
            />
            {/* <label
                className="image_edit"
                htmlFor="getFile"
                style={{cursor: 'pointer'}}
            >
               <i className="fa fa-camera" aria-hidden="true"></i>
              </label> */}
             
            </div>
          )}
     
        {/* <div id="myModal" className="modal">          
          <div className="modal-content modal-dialog" ><div className="modal-body" > */}

            <div className="modal" id="myModal" >
				<div className="modal-dialog" >
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="">Project Image</h5>
							<button type="button" className="close" onClick={() => {
                  document.getElementById('myModal').style.display = 'none';
                }}>
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
              <div className="modal-body" style={{ minHeight: '350px' }}>
                <form>
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
             </form>
            </div>
             <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={() => {
                  document.getElementById('myModal').style.display = 'none';
                }}>Close</button>
              </div>
              </div>
             </div>
        </div>
      </div>
    );
  }
}
