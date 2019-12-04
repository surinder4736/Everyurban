import React, { Component } from 'react';

import { ScaleLoader } from 'react-spinners';
import 'react-date-picker/dist/entry.nostyle';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
import profileAction from '../actions/profile';
import Swal from 'sweetalert2';
import {APIURL,BASE_URL} from '../Config/config'
import 'sweetalert2/src/sweetalert2.scss';
import ProfileHeader from './ProfileHeader';
const axios = require("axios");

class ViewProfile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            userData:
		  {
				profile:{
			id:1,
			firstName:"",
			lastName:"",
			about:"",
			photo:"",
			country:"",
			address:"",
			portfolio:"",
			isCompleted:null,
			isStudent:false,
			userId:1,
			createdAt:"",
			message:"",
			updatedAt:""
		},
			educations:
			[
				
			],
			experiances:
			[
				
			],
			languages:
			[
				
			]
		}
        }
    }
    
	componentDidMount(){
        const{dispatch}=this.props;
        const { profileUrl } = this.props.match.params;
		dispatch(profileAction.getProfile({userId:profileUrl}));
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.user!=this.props.user){
            window.location.href="/Login";
		}
		console.log(nextProps)
		if(nextProps.profile!=this.props.profile){
			//debugger;
			if(nextProps.profile!=null && nextProps.profile!=undefined)
			{
				console.log(nextProps.profile)
				this.setState({userData:nextProps.profile})
			}
		}
		if(nextProps.editProfile!=this.props.editProfile)
		{
			Swal.fire({
				title: 'Success!',
				text: 'Profile has been saved successfully.',
				icon: 'success',
				confirmButtonText: 'OK'		
			});
			const{dispatch}=this.props;
			setTimeout(() => {
				
			dispatch(profileAction.getProfile({userId:this.props.user.id}));
			}, 500);
		}
		if(nextProps.experience!=this.props.experience)
		{
			Swal.fire({
				title: 'Success!',
				text: 'Experience has been saved successfully.',
				icon: 'success',
				confirmButtonText: 'OK'		
			});
			const{dispatch}=this.props;//debugger
			dispatch(profileAction.getProfile({userId:this.props.user.id}));
		}
		if(nextProps.education!=this.props.education)
		{
			Swal.fire({
				title: 'Success!',
				text: 'Education has been saved successfully.',
				icon: 'success',
				confirmButtonText: 'OK'		
			});
			const{dispatch}=this.props;//debugger
			dispatch(profileAction.getProfile({userId:this.props.user.id}));
		}
		if(nextProps.language!=this.props.language)
		{
			Swal.fire({
				title: 'Success!',
				text: 'Language has been saved successfully.',
				icon: 'success',
				confirmButtonText: 'OK'		
			});
			const{dispatch}=this.props;//debugger
			dispatch(profileAction.getProfile({userId:this.props.user.id}));
		}
		
    }
    
    convertDateStringToMonthYear(strDate){
		let dt=new Date(strDate);
		if(strDate!=null){
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		return month[dt.getMonth()]+" "+dt.getFullYear();
		}
		else
		{
			return "Current";
		}
	}
    
    selectImages(e){
		//this.setState({file:});
		const{profile:{profile}}=this.props;
		let formData = new FormData();
		formData.append("file",e.target.files[0]);
		const config = {
				headers: {
					'content-type': 'multipart/form-data',
				}
		}
		axios.post(`${APIURL}users/${profile.userId}/${profile.id}/upload`,formData,config)
				.then((response) => {
					let userData=Object.assign({},this.state.userData);
					userData.profile.photo=response.data.data.photo;
					this.setState({userData});
				  
				}).catch((error) => {
				 console.log(error);
					return error;
		    });
	}
    
    render() {
			const{profile:{profile}}=this.props;
			const{render}=this.state;
			let imageUrl=null;
			if(profile!=null && profile!=undefined && profile.photo!==""){
				imageUrl=`${BASE_URL}/images/${profile.photo}`;
			}else{
				imageUrl=this.state.initailImage;
			}
		console.log('check state');
		console.log(this.state.userData); 
		if(render===false){
			return( <section class="profile-top" />);
		}
		return ( 
            <div>
            {/* Header components open */}
         <ProfileHeader />
        <MenuComponent />
            {/* Header components end */}
			<div className='sweet-loading'>
        <ScaleLoader
		width={25}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.props.isLoading}
        />
      </div> 
            {/* Profile top section */}
        <section class="profile-top">
			<div class="container">
				<div class="d-md-flex align-items-end">
					<div class="col-lg-3 col-md-4 col-xs-12">
						<div class="dp" >
							<img src={imageUrl}  alt=""/>
							<input type="file" name="file"  id="upload" onChange={this.selectImages.bind(this)}  style={{display:'none'}} />
						</div>
					</div>
					<div class="col-lg-9 col-md-8 col-xs-12">
						<div class="right">
                        <div>
								<h3>{this.state.userData.profile!=null?this.state.userData.profile.firstName +' '+this.state.userData.profile.lastName:null} </h3>
								<h4>{this.state.userData.profile!=null?this.state.userData.profile.address+', '+this.state.userData.profile.country:null} </h4>
								<sapn>&nbsp;</sapn>
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>
		{/* Profile bottom Section */}
        <section class="profile-bot">
			<div class="container">
				<div class="d-md-flex align-items-start">
					<div class="col-lg-3 col-md-4 col-xs-12">
						<div class="about">
							<div class="clearfix">
								<h5 class="float-left">About</h5>
								
							</div>
		<p>{this.state.userData.profile!=null?this.state.userData.profile.about:null}</p>
							<hr/>
							<div className="clearfix">
							<h5 class="float-left lang">
								Language</h5>
							</div>
							<ul className="languageList">
								
							{this.state.userData.languages.map(element => {
							return <li>{ element.name+' | '+element.proficiency} {this.state.mode=='edit'&& <a data-id={element.id} onClick={this.deleteLanguage} href="#" class="float-right"  >&nbsp;&nbsp;<i class="fas fa-trash"></i></a>}</li>	
							})}
							</ul>
							<hr/>
							<div class="clearfix">
							<h5 class="float-left">Portfolio</h5>
							</div>
							<a href={this.state.userData.profile!=null?this.state.userData.profile.portfolio:null}>{this.state.userData.profile!=null?this.state.userData.profile.portfolio:''}</a>
						</div>
					</div>
					<div class="col-lg-9 col-md-8 col-xs-12">
						<div class="spacer"></div>
						{this.state.userData.experiances.length>0 &&
                            <div class="card">
                            <div class="clearfix">
                                <h5 class="float-left">Experience</h5>
                            </div>
                            {this.state.userData.experiances.map(element => {
                            return<div> <article>
                                
                                <div class="clearfix">
                            <h6>{element.title} | {element.location}</h6>
                                </div>
                                <p class="location"><span>{element.location}</span><span>{this.convertDateStringToMonthYear(element.start_date)} - {this.convertDateStringToMonthYear(element.end_date)}</span></p>
                                <p>{element.description}</p>
                                {/*<a class="more" href="#">See more</a>*/}
                            </article>
                            <hr/></div>	
                            })}
                            </div>
                        }
                        
						<div class="card">
							<div class="clearfix">
								<h5 class="float-left">Education</h5>
								
							</div>
							{console.log(this.state.userData.educations)}{this.state.userData.educations.map(element => {
							return <div><article>
								<div class="clearfix">
							<h6 class="float-left">{element.title}</h6>
								</div>
							<p class="location"><span>{element.program}</span><span>{this.convertDateStringToMonthYear(element.start_date)} - {this.convertDateStringToMonthYear(element.end_date)}</span></p>
							</article>
							<hr/>
							</div>
							})}
							{/* <a href="#" class="view">View More</a> */}
						</div>
					</div>
				</div>
			</div>
		</section>
        {/* Profile footer Section */}
        <ProfileFooter />
		
		</div>
         );
    }
}
 
ViewProfile.propTypes = {
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
	  isLoading:state.profile.isLoading
    };
  }

export default connect(mapStateToProps)(ViewProfile);