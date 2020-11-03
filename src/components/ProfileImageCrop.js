import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import PropTypes, { array, node } from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ProfileImadeCrop extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
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
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  renderPhotoEditor(){
	const { crop, croppedImageUrl, src } = this.state;
	return(
		<div className="modal fade" id="PhotoEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="nameEditorLabel">Add Image</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
							<div className="form-group">
							<label htmlFor="upload_multi_photo" className="col-form-label">Image :</label>
							<input type="file" accept="image/*" onChange={this.onSelectFile} />
							</div>
							
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
								{croppedImageUrl && (
								<img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
								)}
						
					</div>
					<div className="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button onClick={this.clickPhotoSaveHandler} type="button" class="btn btn-primary">{(this.state.isUploading==true) && <i class="fa fa-spinner fa-spin"></i>} Update</button>
					</div>
				</div>
			</div>
		</div>
	)
}

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="App">
        <div>
		<a href="#" data-toggle="modal" data-target="#PhotoEditor" data-whatever="@mdo" class="text-center"  ><i class="fas fa-plus"></i><span class="span"> Add Image</span></a>}
        </div>
        {/* {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )} */}
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )}
		{this.renderPhotoEditor()}
      </div>
    );
  }
}

ProfileImadeCrop.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	
    return {
	  user: state.users.user,
	  profile:state.profile.profile,
	  editProfile:state.profile.editProfile,
	  experience:state.experience,
	  education:state.education,
	  language:state.language,
	  isLoading:state.profile.isLoading,
	  media:state.media,
	  portfollo:state.portfollo,
	  specialties:state.specialties,
	  progress:state.progress,
	  about:state.about
    };
  }

export default connect(mapStateToProps)(ProfileImadeCrop);

