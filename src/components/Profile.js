import React, { Component } from 'react';

import { ScaleLoader } from 'react-spinners';

// import DatePicker from "react-datepicker"; 
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-date-picker';
import MonthPickerInput from  'react-month-picker-input';
import 'react-date-picker/dist/entry.nostyle';
import {connect} from 'react-redux';
import PropTypes, { array, node } from 'prop-types';
import userAction from '../actions/user';
import jQuery from 'jquery';
import ReactTooltip from 'react-tooltip';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
import profileAction from '../actions/profile';
import languageAction from '../actions/language';
import experienceAction from '../actions/experience';
import educationAction from '../actions/education';
import NoImage from '../Images/no-image.png'
import validator from 'validator';
import Swal from 'sweetalert2';
import {APIURL, BASE_URL} from '../Config/config'
import 'sweetalert2/src/sweetalert2.scss';
import { confirmAlert } from 'react-confirm-alert';
import { PROFILE_EDIT_SUCCESS } from '../types';
import ProfileHeader from './ProfileHeader';
import ProfileViewHeader from './ProfileViewModeHeader';
require('react-month-picker-input/dist/react-month-picker-input.css');
const axios = require("axios");

const{logout} = userAction;
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = 
		{	file:null,
			dt:new Date(),
			initailImage:NoImage,
			ExpTitleMessage:'',
			ExpLocationMessage:'',
			ExpDescriptionMessage:'',
			ExpProgramMessage:'',
			ExpDateMessage:'',
			EduTitleMessage:'',
			EduProgramMessage:'',
			EduLocationMessage:'',
			EduDescriptionMessage:'',
			EduDateMessage:'',
			FistNameValidateMessage:'',
			LastNameValidateMessage:'',
			AddressValidateMessage:'',
			CountryValidateMessage:'',
			AboutValidateMessage:'',	
			PortfolioValidateMessage:'',
			LanguageNameMessage:'',
			LanguageProficiencyMessage:'',
			LanguageExistsMessage:'', 
			isStudent:false,
			date: new Date(),
			educationEditForm:{
				id:null,
				title:"",
				program:"",
				location:"",
				description:"",
				start_date:null,
				end_date:null
			},
			experienceEditForm:{
				id:null,
				title:"",
				program:"",
				location:"",
				description:"",
				start_date:null,
				end_date:null
			},
			languageEditForm:{
				id:null,
				name:"",
				proficiency:"",
			},
			profileEditForm:
			{
				id:null,
				firstName:"",
				lastName:"",
				about:"",
				photo:"",
				country:"",
				address:"",
				portfolio:"",
				isCompleted:null,
				userId:0,
				isStudent:false

			},
			mode:'view',
			userData:
		  {
				profile:{
			id:1,
			firstName:"Every",
			lastName:"Urban",
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
		},
		blurbTex:{
			about:"Tell us a little about yourself. Your background, hobbies and passions as well as your journey into architecture, what inspires you and what you see for the future of architecture. ",
			language:"In this section it is mandatory to share your level of proﬁciency in English as well as any other languages to help us better our communication with you. ",
			portfolio:"Your portfolio is where you showcase your creativity. This will give a developer an idea of your capabilities outside of just their project and can bring you more prospects.",
			experience:"Showcase your experience as an architect here. List any past projects and events you have taken part relating to architecture. ",
			education:"Outline your education in this section including the name of the institution, graduation year, country and program details."
		}
		}

	}

	

	//function to convert the date string in month year format
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
	validatePortfolio=()=>
	{
		//debugger;
		this.setState({PortfolioValidateMessage:''});
		if(this.state.profileEditForm.portfolio.length<100)
		{
			//debugger;
			this.setState({PortfolioValidateMessage:'Portfolio is not valid!'});
			return false;
		}
		else
		{
			return true;
		}
	}
	componentDidMount(){
		const{dispatch,user}=this.props;
		const { profileUrl } = this.props.match.params;
		dispatch(profileAction.getProfile({userId:profileUrl}));
		//this.nv.addEventListener(PROFILE_EDIT_SUCCESS,(data)=>{console.log('profile edit success captured');console.log(data)})
		jQuery(function(){
			jQuery("#upload_link").on('click', function(e){
					e.preventDefault();
					jQuery("#upload:hidden").trigger('click');
			});

	});
	}	
    clickLogoutHandle(e){
        const{dispatch}=this.props;
        e.preventDefault();
        dispatch(logout());
	}
	clickLanguageSaveHandler=(e)=>{
		console.log('language save handler called');
		console.log(this.state.languageEditForm);
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		this.setState({LanguageNameMessage:'',LanguageExistsMessage:'',LanguageProficiencyMessage:''});
		let language=this.state.languageEditForm.name;
		let proficiency=this.state.languageEditForm.proficiency;
		if(validator.isEmpty(language))
		{
			this.setState({LanguageNameMessage:'Please select name'});
		}
		if(validator.isEmpty(proficiency))
		{
			this.setState({LanguageProficiencyMessage:'Please select proficiency'});
		}
		if(!(validator.isEmpty(language))&& !(validator.isEmpty(proficiency)))
		{
			var saveLanguage=true;
			//loop through language for duplicate
			this.state.userData.languages.map(element => {
			if(element.name==language){
			//return <p>{ element.name+' | '+ element.proficiency} </p>	
				saveLanguage=false;
			this.setState({LanguageExistsMessage:'Language already added in your profile'});
			//alert('Language already exists in your profile');
		}
			});
			if(saveLanguage){
				dispatch(languageAction.addLanguage({userId:this.props.user.id,language:this.state.languageEditForm}))
			}
		}
	}



	clickEducationSaveHandler=(e)=>{
		console.log('Education save handler called');
		console.log(this.state.educationEditForm);
		const{dispatch}=this.props;
		e.preventDefault();
		// debugger;
		let curObj=this;
		let title=this.state.educationEditForm.title;
		let program=this.state.educationEditForm.program;
		let location=this.state.educationEditForm.location;
		let description=this.state.educationEditForm.description;
		let start_date=this.state.educationEditForm.start_date;
		if(this.state.educationEditForm.end_date==null){
			let educationEditForm= Object.assign({},this.state.educationEditForm);
			let dt=new Date();
			educationEditForm.end_date=dt;
			this.setState({educationEditForm:educationEditForm});
		}
		let end_date=this.state.educationEditForm.end_date ;
		
		curObj.setState({EduTitleMessage:'',EduProgramMessage:'',EduDateMessage:''});
		// debugger;
		let allValid=true;
		if(validator.isEmpty(title))
		{
			curObj.setState({EduTitleMessage:'Please enter title'});
			allValid=false;
		}
		if(validator.isEmpty(program))
		{
			curObj.setState({EduProgramMessage:'Please enter program'});
			allValid=false;
		}
		if(validator.isEmpty(location))
		{
			curObj.setState({EduLocationMessage:'Please enter location'});
			allValid=false;
		}
		if(validator.isEmpty(description))
		{
			curObj.setState({EduDescriptionMessage:'Please enter Description'});
			allValid=false;
		}
		
		if(start_date==new Date('01/01/1970')||start_date=="" ||start_date==null)
		{
			curObj.setState({EduDateMessage:'Please enter start date'});
			allValid=false;
		}
		if((end_date!=new Date('01/01/1970'))&& end_date!="" && end_date!=null)
		{
			if(new Date(start_date) > new Date(end_date)){
			curObj.setState({EduDateMessage:'Start Date must be less than End Date'});
			allValid=false;
			}
		}
		if(allValid){
		if(this.state.educationEditForm.id>0)
		{
			dispatch(educationAction.editEducation({userId:this.props.user.id,education:this.state.educationEditForm}))
		}
		else
		{
			dispatch(educationAction.addEducation({userId:this.props.user.id,education:this.state.educationEditForm}))
		}
		}
	}

	clickExperienceSaveHandler=(e)=>{
		console.log('Experience save handler called');
		console.log(this.state.experienceEditForm);
		const{dispatch}=this.props;
		e.preventDefault();
		// debugger;
		let curObj=this;
		let title=this.state.experienceEditForm.title;
		let location=this.state.experienceEditForm.location;
		let description=this.state.experienceEditForm.description;
		let start_date=this.state.experienceEditForm.start_date;
		if(this.state.experienceEditForm.end_date==null){
			let experienceEditForm= Object.assign({},this.state.experienceEditForm);
			let dt=new Date();
			experienceEditForm.end_date=dt;
			this.setState({experienceEditForm:experienceEditForm});
		}
		let end_date=this.state.experienceEditForm.end_date;
		let program=this.state.experienceEditForm.program;
		
		curObj.setState({ExpTitleMessage:'',ExpLocationMessage:'',ExpDescriptionMessage:'',ExpDateMessage:'',ExpProgramMessage:''});
		let allValid=true;
		if(validator.isEmpty(title))
		{
			curObj.setState({ExpTitleMessage:'Please enter title'});
			allValid=false;
		}
		if(validator.isEmpty(location))
		{
			curObj.setState({ExpLocationMessage:'Please enter location'});
			allValid=false;
		}
		if(validator.isEmpty(program))
		{
			curObj.setState({ExpProgramMessage:'Please enter position'});
			allValid=false;
		}
		if(validator.isEmpty(description))
		{
			curObj.setState({ExpDescriptionMessage:'Please enter description'});
			allValid=false;
		}
		// debugger;
		if(start_date==new Date('01/01/1970')||start_date=="" ||start_date==null)
		{
			curObj.setState({ExpDateMessage:'Please enter start date'});
			allValid=false;
		}
		if((end_date!=new Date('01/01/1970')) && end_date!="" && end_date!=null)
		{
			if(new Date(start_date) > new Date(end_date)){
			curObj.setState({ExpDateMessage:'Start Date must be less than End Date'});
			allValid=false;
			}
		}
		if(allValid)
		{
			if(this.state.experienceEditForm.id>0)
			{
				dispatch(experienceAction.editExperience({userId:this.props.user.id,experience:this.state.experienceEditForm}))
			}
			else
			{
				dispatch(experienceAction.addExperience({userId:this.props.user.id,experience:this.state.experienceEditForm}))
			}
		}
	}
	clickProfileSaveHandler=(e)=>
	{
		console.log('Profile save handler called');
		console.log(this.state.profileEditForm);
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		let firstName=this.state.profileEditForm.firstName;
		let lastName=this.state.profileEditForm.lastName;
		let address=this.state.profileEditForm.address;
		let country=this.state.profileEditForm.country;
		curObj.setState({FistNameValidateMessage:'',LastNameValidateMessage:'',AddressValidateMessage:'',CountryValidateMessage:''});
		if(validator.isEmpty(firstName)===true){
			curObj.setState({FistNameValidateMessage:'Please enter First Name'});
		}
		if(validator.isEmpty(lastName)===true){
			curObj.setState({LastNameValidateMessage:'Please enter Last Name'});
		}
		if(validator.isEmpty(address)===true){
			curObj.setState({AddressValidateMessage:'Please enter Address'});
		}
		if(validator.isEmpty(country)===true){
			curObj.setState({CountryValidateMessage:'Please select Country'});
		}
		if(validator.isEmpty(firstName)===false && validator.isEmpty(lastName)===false && validator.isEmpty(address)===false && validator.isEmpty(country)===false)
		dispatch(profileAction.editProfile({userId:this.props.user.id,profile:this.state.profileEditForm}))
	}
	clickAboutSaveHandler=(e)=>{
		console.log('About save handler called');
		console.log(this.state.profileEditForm);
		
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		let about=this.state.profileEditForm.about;
		curObj.setState({AboutValidateMessage:''});
		if(validator.isEmpty(about)===true){
			curObj.setState({AboutValidateMessage:'Please enter portfolio'});
		}
		
		if(validator.isEmpty(about)===false )
		dispatch(profileAction.editProfile({userId:this.props.user.id,profile:this.state.profileEditForm}))
	}
	deleteLanguage=(e)=>
	{
		console.log('Delete Language called');
		const{dispatch}=this.props;
		e.preventDefault();
		let langId=e.currentTarget.getAttribute('data-id');
		if(langId>0)
		{
			let conf=window.confirm('Are you sure to delete the language entry?');
			if(conf)
			{
				//dispatch language delete element
				dispatch(languageAction.deleteLanguage({userId:this.props.user.id,id:langId}));
			}
		}
	}
	clickPortfolioSaveHandler=(e)=>{
		console.log('Portfolio save handler called');
		console.log(this.state.profileEditForm);
		
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		let portfolio=this.state.profileEditForm.portfolio;
		curObj.setState({PortfolioValidateMessage:''});
		if(validator.isEmpty(portfolio)===true){
			curObj.setState({PortfolioValidateMessage:'Please enter portfolio'});
		}
		if(validator.isURL(portfolio)===false)
		{
			curObj.setState({PortfolioValidateMessage:'Please enter a valid url'});	
		}
		if(validator.isEmpty(portfolio)===false && validator.isURL(portfolio)===true)
		dispatch(profileAction.editProfile({userId:this.props.user.id,profile:this.state.profileEditForm}))
	}
    markProfileAsStudent=(student)=>{
		/*if(student==true)
		{*/
			// debugger;
			const{dispatch}=this.props;
			let editdata=this.state.userData.profile
			editdata.isStudent=student;
			this.setState({profileEditForm:editdata.isStudent});
			this.setState({profileEditForm:editdata});
			setTimeout(()=>{dispatch(profileAction.markProfileAsStudent({userId:this.props.user.id,profile:this.state.profileEditForm}));},2000);
			this.completeThisProfile();		
		//}
	}

	completeThisProfile=()=>{
		// debugger;
		//call save profile with is completed
		let profileComplete=true;
		if(this.state.userData.profile.firstName=='' || this.state.userData.profile.firstName==null)
		{
			profileComplete=false;
		}
		if(this.state.userData.profile.lastName=='' || this.state.userData.profile.lastName==null)
		{
			profileComplete=false;
		}
		if(this.state.userData.profile.country=='' || this.state.userData.profile.country==null)
		{
			profileComplete=false;
		}
		if(this.state.userData.profile.about=='' || this.state.userData.profile.about==null)
		{
			profileComplete=false;
		}
     if(this.state.userData.profile.isStudent==false && this.state.userData.experiances.length<=0)
		{
			profileComplete=false;
		}
		if(this.state.userData.languages.length<1)
		{
			profileComplete=false;
		}
		if(this.state.userData.educations.length<1)
		{
			profileComplete=false;
		}
		if(( this.state.userData.profile.isCompleted!=profileComplete))
		{
			const{dispatch}=this.props;
			let editdata=this.state.userData.profile
			editdata.isCompleted=profileComplete;
			this.setState({profileEditForm:editdata},()=>{
				dispatch(profileAction.markProfileAsCompleted({userId:this.props.user.id,profile:this.state.profileEditForm}));
			});
		}

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
				this.setState({userData:nextProps.profile},()=>{
					this.completeThisProfile();	
				});
				//this.setState({userData:{'profile':nextProps.profile}})
					

			}
			
			//const{dispatch}=this.props;
			//dispatch(profileAction.getProfile({userId:this.props.user.id}));
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
			if(nextProps.experience.message!==null && nextProps.experience.message!=undefined && nextProps.experience.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'Experience has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				Swal.fire({
					title: 'Success!',
					text: 'Experience has been saved successfully.',
					icon: 'success',
					confirmButtonText: 'OK'		
				});
				const{dispatch}=this.props;//debugger
				dispatch(profileAction.getProfile({userId:this.props.user.id}));
				let experienceEditForm= Object.assign({},this.state.experienceEditForm);
				experienceEditForm.id=null;
				experienceEditForm.location="";
				experienceEditForm.title="";
				experienceEditForm.description="";
				experienceEditForm.program="";
				experienceEditForm.start_date=null;
				experienceEditForm.end_date=null;
				this.setState({experienceEditForm:experienceEditForm});
			}
			
		}
		if(nextProps.education!=this.props.education)
		{
			if(nextProps.education.message!==null && nextProps.education.message!=undefined &&  nextProps.education.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'Education has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				Swal.fire({
					title: 'Success!',
					text: 'Education has been saved successfully.',
					icon: 'success',
					confirmButtonText: 'OK'		
				});
				const{dispatch}=this.props;//debugger
				dispatch(profileAction.getProfile({userId:this.props.user.id}));
				let educationEditForm= Object.assign({},this.state.educationEditForm);
				educationEditForm.id=null;
				educationEditForm.location="";
				educationEditForm.title="";
				educationEditForm.description="";
				educationEditForm.program="";
				educationEditForm.start_date=null;
				educationEditForm.end_date=null;
				this.setState({educationEditForm:educationEditForm});
			}
			
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


	renderNameEditor(){
		return(
			<div className="modal fade" id="nameEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="nameEditorLabel">Name and Location</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <input type="hidden" value="" id="profileId"/>
          <div className="form-group">
            <label htmlFor="firstName-text" className="col-form-label">First Name:</label>
			<input placeholder="Enter First Name" onChange={this.changeFirstName} type="text" className="form-control" id="firstName-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.firstName:null}/>
			<div className="errorMsg">{this.state.FistNameValidateMessage}</div>
		  </div>
		  <div className="form-group">
            <label htmlFor="lastName-text" className="col-form-label">Last Name:</label>
			<input placeholder="Enter Last Name" onChange={this.changeLastName} type="text" className="form-control" id="lastName-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.lastName:null}/>
			<div className="errorMsg">{this.state.LastNameValidateMessage}</div>
		  </div>
		  <div className="form-group">
            <label htmlFor="address-text" className="col-form-label">City:</label>
			<textarea placeholder="Enter Address" onChange={this.changeAddress} className="form-control" id="address-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.address:null}></textarea>
			<div className="errorMsg">{this.state.AddressValidateMessage}</div>
		  </div>
		  <div className="form-group">
            <label htmlFor="country-text" className="col-form-label">Country:</label>
			<select onChange={this.changeCountry} type="text" className="form-control" id="country-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.country:null}>
				<option value="">Please select country</option>
				<option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea bissau">Guinea Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
		<option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="North Korea">North Korea</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Korea">South Korea</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vatican City">Vatican City</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
			</select>
			<div className="errorMsg">{this.state.CountryValidateMessage}</div>
		  </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.clickProfileSaveHandler} type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
		)
	}
	renderAboutModal(){
		// alert(this.state.modelContent);
		return(
			<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">About</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
		<div>{this.state.aboutValidateMessage}</div>
          <div className="form-group">
            <label htmlFor="popup-text" className="col-form-label">Content</label>
			<textarea placeholder="Enter atleast 100 characters about yourself" required onChange={this.changeAbout} className="form-control" rows="10" id="popup-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.about:null}></textarea>
			<div className="small">Atleast 100 characters is required to save About. Currently you have enter {this.state.profileEditForm.about.length} characters</div>
    
		  </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        {(this.state.profileEditForm.about.length)>99 &&
		<button onClick={this.clickAboutSaveHandler}type="button"  class="btn btn-primary">Update</button>
		}
		</div>
	</div>
  </div>
</div>
		)
	}
	renderLanguageModal(){
		// alert(this.state.modelContent);
		return(
			<div className="modal fade" id="languageEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="languageEditorLabel">Language</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          
          <div className="form-group">
            <label htmlFor="language-name-text" className="col-form-label">Name</label>
			<select placeholder="Choose a Language..." onChange={this.changeLanguageName} className="form-control"  id="language-name-text" value={this.state.languageEditForm.name}>
			<option value=""> Select Name</option>
				<option value="Afrikanns">Afrikanns</option>
  				<option value="Albanian">Albanian</option>
				<option value="Arabic">Arabic</option>
				<option value="Armenian">Armenian</option>
				<option value="Basque">Basque</option>
				<option value="Bengali">Bengali</option>
				<option value="Bulgarian">Bulgarian</option>
				<option value="Catalan">Catalan</option>
				<option value="Cambodian">Cambodian</option>
				<option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
				<option value="Croation">Croation</option>
				<option value="Czech">Czech</option>
				<option value="Danish">Danish</option>
				<option value="Dutch">Dutch</option>
				<option value="English">English</option>
				<option value="Estonian">Estonian</option>
				<option value="Fiji">Fiji</option>
				<option value="Finnish">Finnish</option>
				<option value="French">French</option>
				<option value="Georgian">Georgian</option>
				<option value="German">German</option>
				<option value="Greek">Greek</option>
				<option value="Gujarati">Gujarati</option>
				<option value="Hebrew">Hebrew</option>
				<option value="Hindi">Hindi</option>
				<option value="Hungarian">Hungarian</option>
				<option value="Icelandic">Icelandic</option>
				<option value="Indonesian">Indonesian</option>
				<option value="Irish">Irish</option>
				<option value="Italian">Italian</option>
				<option value="Japanese">Japanese</option>
				<option value="Javanese">Javanese</option>
				<option value="Korean">Korean</option>
				<option value="Latin">Latin</option>
				<option value="Latvian">Latvian</option>
				<option value="Lithuanian">Lithuanian</option>
				<option value="Macedonian">Macedonian</option>
				<option value="Malay">Malay</option>
				<option value="Malayalam">Malayalam</option>
				<option value="Maltese">Maltese</option>
				<option value="Maori">Maori</option>
				<option value="Marathi">Marathi</option>
				<option value="Mongolian">Mongolian</option>
				<option value="Nepali">Nepali</option>
				<option value="Norwegian">Norwegian</option>
				<option value="Persian">Persian</option>
				<option value="Polish">Polish</option>
				<option value="Portuguese">Portuguese</option>
				<option value="Punjabi">Punjabi</option>
				<option value="Quechua">Quechua</option>
				<option value="Romanian">Romanian</option>
				<option value="Russian">Russian</option>
				<option value="Samoan">Samoan</option>
				<option value="Serbian">Serbian</option>
				<option value="Slovak">Slovak</option>
				<option value="Slovenian">Slovenian</option>
				<option value="Spanish">Spanish</option>
				<option value="Swahili">Swahili</option>
				<option value="Swedish ">Swedish </option>
				<option value="Tamil">Tamil</option>
				<option value="Tatar">Tatar</option>
				<option value="Telugu">Telugu</option>
				<option value="Thai">Thai</option>
				<option value="Tibetan">Tibetan</option>
				<option value="Tonga">Tonga</option>
				<option value="Turkish">Turkish</option>
				<option value="Ukranian">Ukranian</option>
				<option value="Urdu">Urdu</option>
				<option value="Uzbek">Uzbek</option>
				<option value="Vietnamese">Vietnamese</option>
				<option value="Welsh">Welsh</option>
				<option value="Xhosa">Xhosa</option>
			</select>
			<div className="errorMsg">{this.state.LanguageNameMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="language-proficiency-text" className="col-form-label">Proficiency</label>
			<select onChange={this.changeLanguageProficiency} className="form-control"  id="language-proficiency-text" value={this.state.languageEditForm.proficiency}>
			<option value=""> Select Proficiency</option>
<option value="Basic"> Basic (write in this language decently)</option>
<option value="Conversational"> Conversational (write and speak language well)</option>
<option value="Fluent"> Fluent (Write and peak language almost perfectly)</option>
<option value="Native"> Native (Mother tongue/first language)</option>
				</select>
			<div className="errorMsg">{this.state.LanguageProficiencyMessage}</div>
			<div className="errorMsg">{this.state.LanguageExistsMessage}</div>
				
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.clickLanguageSaveHandler}type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
		)
	}
	SetEduExpStartEndDate(editForm){
		let objForm= Object.assign({},editForm);
		let dt=new Date(objForm.end_date);
		let obj={}
		obj.endDateMonth=dt.getMonth();
		obj.endDateYear=dt.getFullYear();
		if(objForm.end_date==null){
			obj.endDateMonth=null;
			obj.endDateYear=null;
		}
		let sdt=new Date(objForm.start_date);
		obj.startDateMonth=sdt.getMonth();
		obj.startDateYear=sdt.getFullYear();
		if(objForm.start_date==null){
			obj.startDateMonth=null;
			obj.startDateYear=null;
		}
		return obj;
	}
	renderExperienceModal(){
		let objDate=this.SetEduExpStartEndDate(this.state.experienceEditForm);
		return(
			<div className="modal fade" id="experienceEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="experienceEditorLabel">Experience</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          
          <div className="form-group">
            <label htmlFor="experience-title-text" className="col-form-label">Job/Event</label>
			<input placeholder="Enter Title" type="text" onChange={this.changeExperienceTitle} className="form-control"  id="experience-title-text" value={this.state.experienceEditForm.title}/>
			<div className="errorMsg">{this.state.ExpTitleMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-Program-text" className="col-form-label">Position</label>
			<input placeholder="Enter Program" type="text" onChange={this.changeExperienceProgram} className="form-control"  id="experience-program-text" value={this.state.experienceEditForm.program}/>
			<div className="errorMsg">{this.state.ExpProgramMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-location-text" className="col-form-label">Location</label>
			<input placeholder="Enter Location" type="text" onChange={this.changeExperienceLocation} className="form-control"  id="experience-location-text" value={this.state.experienceEditForm.location}/>
			<div className="errorMsg">{this.state.ExpLocationMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-description-text" className="col-form-label">Description</label>
			<textarea placeholder="Enter Description" onChange={this.changeExperienceDescription} className="form-control"  id="experience-description-text" rows="5" value={this.state.experienceEditForm.description}/>
			<div className="errorMsg">{this.state.ExpDescriptionMessage}</div>
          </div>
		  <div className="form-group">
            <label className="col-form-label">Duration</label>
			{/* <input type="text"  onChange={this.changeExperienceStartDate} className="form-control"  id="experience-start-date" value={this.state.experienceEditForm.start_date}/> */}
			<div className="clearfix">
				<div className="row">
				<div className="col-md-4"><label>Start Date</label></div><div className="col-md-4"> <label>End Date</label>	</div>
				</div>
				<div className="row">
					<div className="col-md-4">
				<MonthPickerInput
					year={objDate.startDateYear}
					month={objDate.startDateMonth}
					closeOnSelect={true}
					popperPlacement='top'
					value={this.state.experienceEditForm.start_date}
					  onChange={this.changeExperienceStartDate}
				/></div>
		{/* <DatePicker placeholderText="Start Date" monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY" format="MM/yyyy" value={this.state.experienceEditForm.start_date}  onChange={this.changeExperienceStartDate} calendarClassName="react-calendar"  clearAriaLabel	clearIcon className="react-date-picker"   id="experience-start-date" /> */}
		<div className="col-md-4"> <MonthPickerInput
					year={objDate.endDateYear}
					month={objDate.endDateMonth}
					closeOnSelect={true}
					popperPlacement='top'
					value={this.state.experienceEditForm.end_date}
					onChange={this.changeExperienceEndDate}
				
				/></div>
		{/* &nbsp;&nbsp;<DatePicker  placeholderText="End Date" monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY" format="MM/yyyy"  value={this.state.experienceEditForm.end_date}  onChange={this.changeExperienceEndDate} calendarClassName="react-calendar"  clearAriaLabel clearIcon className="react-date-picker"  id="experience-end-date"  />  */}
				{/* <DatePicker locale="us"  placeholderText="Start Date" selected={this.state.experienceEditForm.start_date}  onChange={this.changeExperienceStartDate} className="datePicker"   id="experience-start-date"  />
				<DatePicker locale="us" placeholderText="End Date"  selected={this.state.experienceEditForm.end_date}  onChange={this.changeExperienceEndDate} className="datePicker"  id="experience-end-date"  /> */}
				<div className="col-md-4 text-center"> <input  checked={this.state.experienceEditForm.end_date==null} onChange={this.markTillNow} type="checkbox"/>Current</div>
				</div>
				
				<div className="errorMsg">{this.state.ExpDateMessage}</div>
			</div>	
			{/* <input type="text"  onChange={this.changeExperienceEndDate} className="form-control"  id="experience-end-date" value={this.state.experienceEditForm.end_date}/> */}
				
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.clickExperienceSaveHandler}type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
		)
	}
	renderEducationModal(){
		let objDate=this.SetEduExpStartEndDate(this.state.educationEditForm);
		return(
			<div className="modal fade" id="educationEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="experienceEditorLabel">Education</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          
          <div className="form-group">
            <label htmlFor="education-title-text" className="col-form-label">School/University</label>
			<input placeholder="Enter Title" type="text" onChange={this.changeEducationTitle} className="form-control"  id="education-title-text" value={this.state.educationEditForm.title}/>
			<div className="errorMsg">{this.state.EduTitleMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="education-Program-text" className="col-form-label">Program</label>
			<input placeholder="Enter Program" type="text" onChange={this.changeEducationProgram} className="form-control"  id="education-program-text" value={this.state.educationEditForm.program}/>
			<div className="errorMsg">{this.state.EduProgramMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-location-text" className="col-form-label">Location</label>
			<input placeholder="Enter Location" type="text" onChange={this.changeEducationLocation} className="form-control"  id="experience-location-text" value={this.state.educationEditForm.location}/>
			<div className="errorMsg">{this.state.EduLocationMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-description-text" className="col-form-label">Description</label>
			<textarea placeholder="Enter Description" onChange={this.changeEducationDescription} className="form-control"  id="experience-description-text" rows="5" value={this.state.educationEditForm.description}/>
			<div className="errorMsg">{this.state.EduDescriptionMessage}</div>
          </div>
		  <div className="form-group">
            <label className="col-form-label">Duration</label>
			{/* <input type="text"  onChange={this.changeEducationStartDate} className="form-control"  id="education-start-date" value={this.state.educationEditForm.start_date}/> */}
			{/* <input type="text"  onChange={this.changeEducationEndDate} className="form-control"  id="education-end-date" value={this.state.educationEditForm.end_date}/> */}
			<div className="clearfix">
			<div className="row">
				<div className="col-md-4"><label>Start Date</label></div><div className="col-md-4"> <label>End Date</label>	</div>
				</div>
				<div className="row">
				<div className="col-md-4">
				<MonthPickerInput
					year={objDate.startDateYear}
					month={objDate.startDateMonth}
					popperPlacement='top'
					closeOnSelect={true}
					value={this.state.educationEditForm.start_date} 
					 onChange={this.changeEducationStartDate}
				/>
				</div>
		{/* <DatePicker placeholderText="Start Date" monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY" format="MM/yyyy" value={this.state.experienceEditForm.start_date}  onChange={this.changeExperienceStartDate} calendarClassName="react-calendar"  clearAriaLabel	clearIcon className="react-date-picker"   id="experience-start-date" /> */}
		
		<div className="col-md-4">
     <MonthPickerInput
					year={objDate.endDateYear}
					month={objDate.endDateMonth}
					closeOnSelect={true}
					popperPlacement='top'
					value={this.state.educationEditForm.end_date} 
					 onChange={this.changeEducationEndDate}
				/>
				</div>
		{/* &nbsp;&nbsp;<DatePicker  placeholderText="End Date" monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY" format="MM/yyyy"  value={this.state.experienceEditForm.end_date}  onChange={this.changeExperienceEndDate} calendarClassName="react-calendar"  clearAriaLabel clearIcon className="react-date-picker"  id="experience-end-date"  />  */}
				{/* <DatePicker locale="us"  placeholderText="Start Date" selected={this.state.experienceEditForm.start_date}  onChange={this.changeExperienceStartDate} className="datePicker"   id="experience-start-date"  />
				<DatePicker locale="us" placeholderText="End Date"  selected={this.state.experienceEditForm.end_date}  onChange={this.changeExperienceEndDate} className="datePicker"  id="experience-end-date"  /> */}
				<div className="col-md-4 text-center">
				<input className="text-center" defaultChecked={this.state.educationEditForm.end_date=="" || this.state.educationEditForm.end_date==null} checked={this.state.educationEditForm.end_date=="" || this.state.educationEditForm.end_date==null} onChange={this.markEducationTillNow} type="checkbox" />Current
				</div>
				</div>
			{/* <DatePicker placeholderText="Start Date" monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY" format="MM/yyyy" calendarClassName="react-calendar"  clearAriaLabel	clearIcon className="react-date-picker"  value={this.state.educationEditForm.start_date}  onChange={this.changeEducationStartDate}   id="education-start-date"  />
			&nbsp;&nbsp;
				<DatePicker calendarClassName="react-calendar"  clearAriaLabel	clearIcon className="react-date-picker"  monthPlaceholder="MM" dayPlaceholder="DD" yearPlaceholder="YYYY" format="MM/yyyy" placeholderText="End Date" value={this.state.educationEditForm.end_date}  onChange={this.changeEducationEndDate}   id="education-end-date"  />
				&nbsp;&nbsp;<input defaultChecked={this.state.educationEditForm.end_date=="" || this.state.educationEditForm.end_date==null} checked={this.state.educationEditForm.end_date=="" || this.state.educationEditForm.end_date==null} onChange={this.markEducationTillNow} type="checkbox"/>Current */}
				
				<div className="errorMsg">{this.state.EduDateMessage}</div>
			</div>	
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.clickEducationSaveHandler}type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
		)
	}
	renderPortfolioModal(){
		// alert(this.state.modelContent);
		return(
			<div className="modal fade" id="profileEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="profileEditorLabel">Portfolio</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
		
          <div className="form-group">
            <label htmlFor="popup-text" className="col-form-label">Enter full URL of your portfolio</label>
			<input placeholder="Enter full URL of your portfolio" type="text" onChange={this.changePortfolio} className="form-control"  id="popup-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.portfolio:null}/>
			<div className="errorMsg">{this.state.PortfolioValidateMessage}</div>
		  </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.clickPortfolioSaveHandler}type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
		)
	}

	/*education change handlers*/
	changeEducationTitle=(e)=>{
		let educationEditForm= Object.assign({},this.state.educationEditForm);
		educationEditForm.title=e.target.value;
		this.setState({educationEditForm:educationEditForm});
	}
	changeEducationProgram=(e)=>{
		let educationEditForm= Object.assign({},this.state.educationEditForm);
		educationEditForm.program=e.target.value;
		this.setState({educationEditForm:educationEditForm});
	}
	
	changeEducationStartDate=(e)=>{
		let educationEditForm= Object.assign({},this.state.educationEditForm);
		//experienceEditForm.start_date=
		let dt=new Date();//e.getFullYear()+'-'+e.getMonth()+'-'+e.getDate();
		let Month=e.split('/')[0];
		let Year=e.split('/')[1];
		dt.setFullYear(Year);
		dt.setMonth(Month-1);
		educationEditForm.start_date=dt;
		//debugger;
		this.setState({educationEditForm:educationEditForm});

	}
	changeEducationEndDate=(e)=>{
		let educationEditForm= Object.assign({},this.state.educationEditForm);
		let dt=new Date();//e.getFullYear()+'-'+e.getMonth()+'-'+e.getDate();
		let Month=e.split('/')[0];
		let Year=e.split('/')[1];
		dt.setFullYear(Year);
		dt.setMonth(Month);
		educationEditForm.end_date=dt;
		this.setState({educationEditForm:educationEditForm});
	}

	changeEducationLocation=(e)=>{
		let educationEditForm= Object.assign({},this.state.educationEditForm);
		educationEditForm.location=e.target.value;
		this.setState({educationEditForm:educationEditForm});
	}
	changeEducationDescription=(e)=>{
		let educationEditForm= Object.assign({},this.state.educationEditForm);
		educationEditForm.description=e.target.value;
		this.setState({educationEditForm:educationEditForm});
	}
	/*experience change handlers */
	changeExperienceTitle=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);
		experienceEditForm.title=e.target.value;
		this.setState({experienceEditForm:experienceEditForm});
	}
	changeExperienceLocation=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);
		experienceEditForm.location=e.target.value;
		this.setState({experienceEditForm:experienceEditForm});
	}
	changeExperienceDescription=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);
		experienceEditForm.description=e.target.value;
		this.setState({experienceEditForm:experienceEditForm});
	}
	changeExperienceProgram=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);
		experienceEditForm.program=e.target.value;
		this.setState({experienceEditForm:experienceEditForm});
	}
	changeExperienceStartDate=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);
		//experienceEditForm.start_date=
		let dt=new Date();//e.getFullYear()+'-'+e.getMonth()+'-'+e.getDate();
		let Month=e.split('/')[0];
		let Year=e.split('/')[1];
		dt.setFullYear(Year);
		dt.setMonth(Month-1);
		experienceEditForm.start_date=dt;
		//debugger;
		this.setState({experienceEditForm:experienceEditForm});
	}
	changeExperienceEndDate=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);
		let dt=new Date();
		// dt.setDate(e.getDate());
		let Month=e.split('/')[0];
		let Year=e.split('/')[1];
		dt.setFullYear(Year);
		dt.setMonth(Month);
		experienceEditForm.end_date=dt;
		this.setState({experienceEditForm:experienceEditForm});
	}
	changePortfolio=(e)=>{
		let profileEditForm= Object.assign({},this.state.profileEditForm);
		profileEditForm.portfolio=e.target.value;
		this.setState({profileEditForm:profileEditForm});
	}
	changeAbout=(e)=>{
		let profileEditForm= Object.assign({},this.state.profileEditForm);
		profileEditForm.about=e.target.value;
		this.setState({profileEditForm:profileEditForm});
	}
	changeFirstName=(e)=>{
		let profileEditForm= Object.assign({},this.state.profileEditForm);
		profileEditForm.firstName=e.target.value;
		this.setState({profileEditForm:profileEditForm});
	}
	changeLastName=(e)=>{
		let profileEditForm= Object.assign({},this.state.profileEditForm);
		profileEditForm.lastName=e.target.value;
		this.setState({profileEditForm:profileEditForm});
	}
	changeAddress=(e)=>{
		let profileEditForm= Object.assign({},this.state.profileEditForm);
		profileEditForm.address=e.target.value;
		this.setState({profileEditForm:profileEditForm});
	}
	changeCountry=(e)=>{
		console.log('change country called');
		console.log(e.target.value);
		let profileEditForm= Object.assign({},this.state.profileEditForm);
		profileEditForm.country=e.target.value;
		this.setState({profileEditForm:profileEditForm});
	}
	changeLanguageName=(e)=>{
		let languageEditForm= Object.assign({},this.state.languageEditForm);
		languageEditForm.name=e.target.value;
		this.setState({languageEditForm:languageEditForm});
	}
	changeLanguageProficiency=(e)=>{
		let languageEditForm= Object.assign({},this.state.languageEditForm);
		languageEditForm.proficiency=e.target.value;
		this.setState({languageEditForm:languageEditForm});
	}
	//Mark till now function
	markTillNow=(e)=>{
		let experienceEditForm= Object.assign({},this.state.experienceEditForm);

		if(e.currentTarget.checked)
		{
			experienceEditForm.end_date=null;
		}
		else
		{
			experienceEditForm.end_date=new Date();
		}
		this.setState({experienceEditForm:experienceEditForm});
	}


	//Mark till now education function
	markEducationTillNow=(e)=>{

		let educationEditForm= Object.assign({},this.state.educationEditForm);
		if(e.target.checked)
		{
			educationEditForm.end_date=null;
		}
		else
		{
			educationEditForm.end_date=new Date();
		}
		this.setState({educationEditForm:educationEditForm});
	}
	showLanguageEditor=(e)=>
	{
		e.preventDefault();
		let lang_id=e.currentTarget.getAttribute('data-id');
		if(lang_id==null)
		{
			this.setState({mode:'edit',languageEditForm:{
				id:null,
				name:"",
				proficiency:"",
				
			}});
		}
		this.setState({LanguageNameMessage:'',LanguageExistsMessage:'',LanguageProficiencyMessage:''});
	}
	showEditPortfolio=(e)=>{
		
		this.setState({mode:'edit',profileEditForm:this.state.userData.profile});
		e.preventDefault();
	}

	showEducation=(e)=>
	{
		this.setState({EduTitleMessage:'',EduProgramMessage:'',EduDateMessage:'',EduDescriptionMessage:'',EduLocationMessage:''});
		
		console.log(e.currentTarget.getAttribute('data-id'));
		let edu_id=e.currentTarget.getAttribute('data-id');

		if(edu_id!=null)
		{
			let edu_title=e.currentTarget.getAttribute('data-title');
			let edu_program=e.currentTarget.getAttribute('data-program');
			let edu_location=e.currentTarget.getAttribute('data-location');
			let edu_description=e.currentTarget.getAttribute('data-description');
			//debugger;
			let dtStart=new Date(e.currentTarget.getAttribute('data-start_date'));
			let dtStart1=new Date();
			dtStart1.setMonth(dtStart.getMonth());
			dtStart1.setFullYear(dtStart.getFullYear());
			dtStart1.setDate(dtStart.getDate());
			let dtEnd=new Date(e.currentTarget.getAttribute('data-end_date'));
			let edu_start_date=dtStart1;//e.currentTarget.getAttribute('data-start_date');
			let dtEnd1=new Date();
			dtEnd1.setMonth(dtEnd.getMonth());
			dtEnd1.setFullYear(dtEnd.getFullYear());
			dtEnd1.setDate(dtEnd.getDate());
			
			let edu_end_date=e.currentTarget.getAttribute('data-end_date')==null?null:dtEnd1;//e.currentTarget.getAttribute('data-end_date');
			this.setState({mode:'edit',educationEditForm:{
				id:edu_id,
				title:edu_title,
				program:edu_program,
				location:edu_location,
				description:edu_description,
				start_date:edu_start_date,
				end_date:edu_end_date
			}});
		}
		else
		{
			//exp_data={id:exp_id,title:}
			this.setState({mode:'edit',educationEditForm:{
				id:null,
				title:"",
				program:"",
				location:"",
				description:"",
				start_date:null,
				end_date:null
			}});
		}
		//this.setState({mode:'edit',experienceEditForm:this.state.userData.profile});
		//this.setState({mode:'edit'});
		e.preventDefault();
	}

	removeEducation=(e)=>
	{
		console.log('Experience Remove handler called');
		console.log(this.state.educationEditForm);
		e.preventDefault();
		console.log(e.currentTarget.getAttribute('data-id'));
		let exp_id=e.currentTarget.getAttribute('data-id');
		let curobj=this;
		if(exp_id!=null)
		{
			confirmAlert({
				title: 'Remove Education',
				message: 'Are you sure to remove education',
				buttons: [
				  {
					label: 'Yes',
					onClick: () => curobj.removeEducationById(curobj.props.user.id,exp_id)
				  },
				  {
					label: 'No',
					onClick: () => curobj.removeConfirmpopup(exp_id)
				  }
				]
			  });
			
		}
	}

	removeEducationById(userid,exp_id){
		const{dispatch}=this.props;
		dispatch(educationAction.removeEducation({userId:userid,educationid:exp_id}));
	}

	showExperience=(e)=>
	{
		this.setState({ExpTitleMessage:'',ExpLocationMessage:'',ExpDescriptionMessage:'',ExpDateMessage:'',ExpProgramMessage:''});
		
		console.log(e.currentTarget.getAttribute('data-id'));
		let exp_id=e.currentTarget.getAttribute('data-id');

		if(exp_id!=null)
		{
			let exp_title=e.currentTarget.getAttribute('data-title');
			let exp_location=e.currentTarget.getAttribute('data-location');
			let exp_description=e.currentTarget.getAttribute('data-description');
			let exp_program=e.currentTarget.getAttribute('data-program');
			// let exp_start_date=e.currentTarget.getAttribute('data-start_date');
			// let exp_end_date=e.currentTarget.getAttribute('data-end_date');
			let dtStart=new Date(e.currentTarget.getAttribute('data-start_date'));
			let dtStart1=new Date();
			dtStart1.setMonth(dtStart.getMonth());
			dtStart1.setFullYear(dtStart.getFullYear());
			dtStart1.setDate(dtStart.getDate());
			// debugger;
			let dtEnd=new Date(e.currentTarget.getAttribute('data-end_date'));
			let exp_start_date=dtStart1;//e.currentTarget.getAttribute('data-start_date');
			let dtEnd1=new Date();
			dtEnd1.setMonth(dtEnd.getMonth());
			dtEnd1.setFullYear(dtEnd.getFullYear());
			dtEnd1.setDate(dtEnd.getDate());
			
			let exp_end_date=e.currentTarget.getAttribute('data-end_date')==null?null:dtEnd1;//e.currentTarget.getAttribute('data-end_date');
			
			this.setState({mode:'edit',experienceEditForm:{
				id:exp_id,
				title:exp_title,
				location:exp_location,
				program:exp_program,
				description:exp_description,
				start_date:exp_start_date,
				end_date:exp_end_date
			}});
		}
		else
		{
			//exp_data={id:exp_id,title:}
			this.setState({mode:'edit',experienceEditForm:{
				id:null,
				title:"",
				location:"",
				description:"",
				start_date:null,
				end_date:null,
				program:""
			}});
		}
		//this.setState({mode:'edit',experienceEditForm:this.state.userData.profile});
		//this.setState({mode:'edit'});
		e.preventDefault();
	}

	removeExperience=(e)=>
	{
		console.log('Experience Remove handler called');
		console.log(this.state.experienceEditForm);
		const{dispatch}=this.props;
		e.preventDefault();
		console.log(e.currentTarget.getAttribute('data-id'));
		let exp_id=e.currentTarget.getAttribute('data-id');
		let curobj=this;
		if(exp_id!=null)
		{
			confirmAlert({
				title: 'Remove Experience',
				message: 'Are you sure to remove experience',
				buttons: [
				  {
					label: 'Yes',
					onClick: () => curobj.removeExperienceById(curobj.props.user.id,exp_id)
				  },
				  {
					label: 'No',
					onClick: () => curobj.removeConfirmpopup(exp_id)
				  }
				]
			  });
			
		}
	}

	removeExperienceById(userid,exp_id){
		const{dispatch}=this.props;
		dispatch(experienceAction.removeExperience({userId:userid,experienceid:exp_id}));
	}

	removeConfirmpopup(id){
		console.log(id);
	}

	showEditAbout=(e)=>{
		this.setState({mode:'edit',profileEditForm:this.state.userData.profile});
		
		e.preventDefault();
	}
	showEditNameAddressCountry=(e)=>{
		this.setState({mode:'edit',profileEditForm:this.state.userData.profile});
		e.preventDefault();
	}
	changeStudent=(e)=>{
		console.log('checkbox clicked');
		this.setState({isStudent:e.currentTarget.checked});
		this.markProfileAsStudent(e.currentTarget.checked);
	}

	clickFinalSave(e){
		e.preventDefault();
		let curobj=this;
		Swal.fire({
			title: 'Success!',
			text: 'You have successfully saved your profile',
			icon: 'success',
			confirmButtonText: 'Close'		
		}).then(()=>{
		//window.location.reload();
		curobj.setState({mode:'view'})
		});
	}

    render() {
			const{profile:{profile},user}=this.props;
			const { profileUrl } = this.props.match.params;
			let countryName=this.state.userData.profile.country;
			let imageUrl=null;
			if(profile!=null && profile!=undefined && profile.photo!==""){
				imageUrl=`${BASE_URL}/images/${profile.photo}`;
			}else{
				imageUrl=this.state.initailImage;
			}
		console.log('check state');
		console.log(this.state.userData); 
		return ( 
            <div>
            {/* Header components open */}
						{user.unique_userid==profileUrl && <ProfileHeader profileUrl={profileUrl}/>}
						{user.unique_userid!=profileUrl &&
						<ProfileViewHeader /> }
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
		{user.unique_userid==profileUrl && <a href=""  id="upload_link" ><i class="fas fa-pencil-alt"></i> Change Picture</a> }
							</div>
					</div>
					<div class="col-lg-9 col-md-8 col-xs-12">
						<div class="right">
							<div>
								<h3>{this.state.userData.profile!=null && this.state.userData.profile.firstName!=""?this.state.userData.profile.firstName:'N/A'} {this.state.userData.profile!=null && this.state.userData.profile.lastName!=""?this.state.userData.profile.lastName:' N/A'} <span className="flag">{countryName!=null && countryName!='' && <img src={ require(`../Images/flags/${countryName.toLocaleLowerCase()}.png`) } />} </span> </h3>
								<h4>{this.state.userData.profile!=null && this.state.userData.profile.address!=""?this.state.userData.profile.address+', ':''} {this.state.userData.profile!=null && this.state.userData.profile.country!=""?this.state.userData.profile.country:''} </h4>
								<sapn>&nbsp;</sapn>{this.state.mode=='edit'&& 
								<a onClick={this.showEditNameAddressCountry} data-toggle="modal" data-target="#nameEditor" data-whatever="@mdo"  href="#" class="float-right aligned-edit"  ><i class="fas fa-edit"></i><span>Edit</span></a>}
							</div>
							{user.unique_userid==profileUrl &&
								<div>
									<div class="button">
										<a onClick={(e)=>{this.setState({mode:'edit'});e.preventDefault();}} href="#" class="profile-edit"><i class="fas fa-edit"></i><span class="span">Edit Profile</span></a>
										<span> | </span>
										<a href="#" onClick={this.clickFinalSave.bind(this)} class="profile-save"><i class="far fa-save"></i><span class="span">Save</span> </a>
									</div>
								</div>
							}
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
								{user.unique_userid==profileUrl && <span id="questionMark" data-tip={this.state.blurbTex.about} className=" float-left fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>}
							<ReactTooltip/>	
								{this.state.mode=='edit'&& 
								<a onClick={this.showEditAbout} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"  href="#" class="float-right"  ><i class="fas fa-edit"></i><span class="span">Edit</span></a>}
							</div>
						<p style={{wordBreak:'break-word'}}>{this.state.userData.profile!=null?this.state.userData.profile.about:null}</p>
							<hr/>
							{/*<h5>Linked Account</h5>
							<a href="#"><i class="fab fa-facebook"></i> Facebook</a>
							<a href="#"><i class="fab fa-google-plus"></i> Google</a>
							<a href="#"><i class="fab fa-dribbble"></i> Dribbble</a>
							<hr/>*/}
							<div className="clearfix">
							<h5 class="float-left lang">
								Language</h5>
								{this.state.mode=='edit'&& <a href="#" onClick={this.showLanguageEditor} data-toggle="modal" data-target="#languageEditor" data-whatever="@mdo"><i class=" float-right fas fa-plus-circle"></i></a>}
								{user.unique_userid==profileUrl && <span id="questionMark" data-tip={this.state.blurbTex.language} className=" float-left fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>}
							<ReactTooltip/>
							</div>
							<ul className="languageList">
								
							{this.state.userData.languages.map(element => {
							return <li>{ element.name+' | '+element.proficiency} {this.state.mode=='edit'&& <a data-id={element.id} onClick={this.deleteLanguage} href="#" class="float-right"  >&nbsp;&nbsp;<i class="fas fa-trash"></i></a>}</li>	
							})}
							</ul>
							<hr/>
							<div class="clearfix">
							<h5 class="float-left">Portfolio</h5>
							{user.unique_userid==profileUrl && <span id="questionMark" data-tip={this.state.blurbTex.portfolio} className="float-left fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>}
							<ReactTooltip/>
							</div>
							{user.unique_userid==profileUrl && <p>Type your portfolio link below</p> }
							{user.unique_userid==profileUrl && <form action="#">
								<input type="text" placeholder="https://portfolio-link.xyz" value={this.state.userData.profile!=null?this.state.userData.profile.portfolio:null}/>
								{this.state.mode=='edit'&&<button data-toggle="modal" data-target="#profileEditor" data-whatever="@mdo" onClick={this.showEditPortfolio}><i class="fas fa-link"></i></button>}
							</form>}
							{user.unique_userid!=profileUrl && 
								<a href={this.state.userData.profile!=null?this.state.userData.profile.portfolio:null}>{this.state.userData.profile!=null?this.state.userData.profile.portfolio:''}</a>
							}
						</div>
					</div>
					<div class="col-lg-9 col-md-8 col-xs-12">
						<div class="spacer"></div>
						
						<div class="card">
							<div class="clearfix">
								<h6 class="float-left">Experience</h6>
								{console.log('experiances')}{console.log(this.state.userData.experiances)}
								{user.unique_userid!=profileUrl && (this.state.userData.experiances.length<1||this.state.userData.experiances==null || this.state.userData.experiances=='undefined')&&<div class="float-left ml-4" style={{marginTop:'2px'}} ><input className="" id="chkStudent" type="checkbox"  checked={this.state.userData.profile.isStudent}   />&nbsp;Student</div>}
								{(this.state.mode=='edit' && (this.state.userData.experiances.length<1||this.state.userData.experiances==null || this.state.userData.experiances=='undefined'))&&<div class="float-left ml-4" style={{marginTop:'2px'}} ><input onChange={this.changeStudent} className="" id="chkStudent" type="checkbox"  checked={this.state.userData.profile.isStudent}   />&nbsp;Student</div>}
								{(this.state.mode=='edit' && this.state.isStudent==false && this.state.userData.profile.isStudent==false) &&<a href="#" onClick={this.showExperience} data-toggle="modal" data-target="#experienceEditor" data-whatever="@mdo" class="float-right"  ><i class="fas fa-plus"></i><span class="span">Add New</span></a>}
								{user.unique_userid==profileUrl && <span style={{marginTop:'5px',marginLeft:'5px'}} id="questionMark" data-tip={this.state.blurbTex.experience} className=" float-left fas fa-question"></span>}
							<ReactTooltip/>
							</div>
							{this.state.userData.experiances.map(element => {
							return<div> <article>
								
							<div class="clearfix">
							<h6>{element.title} | {element.program}</h6>
							{this.state.mode=='edit'&& <div><a onClick={this.removeExperience} href="#" data-whatever="@mdo" data-id={element.id} class="float-right" style={{marginLeft:'5px'}}><i class="fas fa-trash"></i><span class="span">Delete</span></a> <a onClick={this.showExperience}  href="#" data-toggle="modal" data-target="#experienceEditor" data-whatever="@mdo" data-id={element.id} data-title={element.title} data-program={element.program} data-location={element.location} data-description={element.description} data-start_date={element.start_date} data-end_date={element.end_date} class="float-right"  ><i class="fas fa-edit"></i><span class="span">Edit</span></a></div>}
								</div>
								<p class="location"><span class="experienceDetail">{element.location}</span><span class="experienceDetail">{this.convertDateStringToMonthYear(element.start_date)} - {this.convertDateStringToMonthYear(element.end_date)}</span></p>
								<p class="experienceDetail" style={{whiteSpace:'pre-line'}}>{element.description}</p>
								{/*<a class="more" href="#">See more</a>*/}
							</article>
							<hr/></div>	
							})}
							
							{/* <a href="#" class="view">View More</a> */}
						</div>
						<div class="card">
							<div class="clearfix">
								<h6 class="float-left">Education</h6>
								{this.state.mode=='edit'&&<a onClick={this.showEducation} data-toggle="modal" data-target="#educationEditor" data-whatever="@mdo" href="#" class="float-right"  ><i class="fas fa-plus"></i><span class="span">Add New</span></a>}
								{user.unique_userid==profileUrl && <span id="questionMark" data-tip={this.state.blurbTex.education} className=" float-left fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>}
							<ReactTooltip/>
							</div>
							{console.log(this.state.userData.educations)}{this.state.userData.educations.map(element => {
							return <div><article>
								<div class="clearfix">
							<h6 class="float-left">{element.title} | {element.program}</h6>
							{this.state.mode=='edit'&& <div><a onClick={this.removeEducation} href="#" data-whatever="@mdo" data-id={element.id} class="float-right" style={{marginLeft:'5px'}}><i class="fas fa-trash"></i><span class="span">Delete</span></a><a  onClick={this.showEducation}  data-toggle="modal" data-target="#educationEditor" data-whatever="@mdo" data-id={element.id} data-title={element.title} data-program={element.program} data-location={element.location} data-description={element.description}  data-start_date={element.start_date} data-end_date={element.end_date} href="#" class="float-right"  ><i class="fas fa-edit"></i><span class="span">Edit</span></a></div>}
								</div>
							<p class="location"><span class="educationDetail">{element.location}</span><span class="educationDetail">{this.convertDateStringToMonthYear(element.start_date)} - {this.convertDateStringToMonthYear(element.end_date)}</span></p>
							<p class="educationDetail" style={{whiteSpace:'pre-line'}}>{element.description}</p>
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
		{/* about model render */}
        {this.renderAboutModal()}
		{this.renderNameEditor()}
		{this.renderPortfolioModal()}
		{this.renderLanguageModal()}
		{this.renderExperienceModal()}
		{this.renderEducationModal()}
		
		
		
		</div>
         );
    }
}
 
Profile.propTypes = {
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

export default connect(mapStateToProps)(Profile);