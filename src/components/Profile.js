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
import Gallery from 'react-grid-gallery';
import jQuery from 'jquery';
import ReactTooltip from 'react-tooltip';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
import profileAction from '../actions/profile';
import mediaAction from '../actions/media';
import specialtiesAction from '../actions/specialties';
import progressAction from '../actions/progress';
import userPortfolloAction from '../actions/visualport';
import languageAction from '../actions/language';
import experienceAction from '../actions/experience';
import educationAction from '../actions/education';
import aboutAction from '../actions/about';
import socialConfig from '../Config/socialLink';
import visualPortfolloConfig from '../Config/visualPortfollo';
import NoImage from '../Images/Ulogosquare.png';
// import facebook from '../Images/media/facebook.png';
// import linkedin from '../Images/media/linkedin.png';
// import twitter from '../Images/media/twitter.png';
// import instagram from '../Images/media/instagram.png';
// import website from '../Images/media/world.png';
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
			socialList:socialConfig.social,
			portfolloList:visualPortfolloConfig.portfollo,
			portfolloOther:false,
			tabactiveid:1,
			imageFormData:null,
			progressList:visualPortfolloConfig.postion,
			yearList:null,
			monthList:null,
			selectedcategoryid:0,
			categoryUploadImageItem:null,
			isUploading:false,
			isProfileUploading:false,
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
			mediaEditForm:{
				id:null,
				socialid:0,
				link:""
			},
			portfolloEditForm:{
				id:null,
				folloid:0,
				other:"",
				caption:""
			},
			aboutEditForm:{
				id:null,
				university:"",
				month:"",
				year:"",
				status:""
			},
			SpecialtiesEditForm:{
				id:null,
				name:"",
			},
			progressEditForm:{
				id:null,
				position:"",
				establishment:""
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
		},
		multifile: [null]
		}
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)

	}

	
	uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ multifile: this.fileArray })
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
			jQuery("#upload_multi_link").on('click',function(e){
				e.preventDefault();
					jQuery("#multiupload:hidden").trigger('click');
			});
			jQuery("#upload_multi_photo").on('click',function(e){
				e.preventDefault();
					jQuery("#multiuploadphoto:hidden").trigger('click');
			});

		});
		let currentYear = new Date().getFullYear(), years = [];
		let startYear =  1970;  
		for(var i=startYear; i<= currentYear; i++){
			years.push(startYear++);
		}
		var month = new Array();
		// month[0] = "N/A";
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
		this.setState({yearList:years,monthList:month});

	}	
    clickLogoutHandle(e){
        const{dispatch}=this.props;
        e.preventDefault();
        dispatch(logout());
	}
	clickLanguageSaveHandler=(e)=>{
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
		
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		let university=this.state.aboutEditForm.university;
		let status=this.state.aboutEditForm.status;
		let month =this.state.aboutEditForm.month;
		let year =this.state.aboutEditForm.year;
		let id=this.state.aboutEditForm.id;
		curObj.setState({AboutValidateMessage:''});
		if(validator.isEmpty(university)===true){
			curObj.setState({AboutValidateMessage:'Please enter university'});
		}
		if(validator.isEmpty(status)===true){
			curObj.setState({AboutValidateMessage:'Please select status'});
		}
		// if(validator.isEmpty(month)===true){
		// 	curObj.setState({AboutValidateMessage:'Please select month'});
		// }
		if(validator.isEmpty(year)===true){
			curObj.setState({AboutValidateMessage:'Please select year'});
		}
		
		if(validator.isEmpty(university)===false && validator.isEmpty(status)===false && validator.isEmpty(year)===false)
		if(id>0){
			dispatch(aboutAction.editabout({userId:this.props.user.id,about:this.state.aboutEditForm}))
		}
		else{
			dispatch(aboutAction.addabout({userId:this.props.user.id,about:this.state.aboutEditForm}))
		}
		
	}
	deleteLanguage=(e)=>
	{
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
	deleteSpecialties=(e)=>
	{
		const{dispatch}=this.props;
		e.preventDefault();
		let specialId=e.currentTarget.getAttribute('data-id');
		if(specialId>0)
		{
			let conf=window.confirm('Are you sure to delete the Specialties entry?');
			if(conf)
			{
				//dispatch language delete element
				dispatch(specialtiesAction.removeSpecialties({userId:this.props.user.id,id:specialId}));
			}
		}
	}

	deleteProgress=(e)=>
	{
		const{dispatch}=this.props;
		e.preventDefault();
		let specialId=e.currentTarget.getAttribute('data-id');
		if(specialId>0)
		{
			let conf=window.confirm('Are you sure to delete In progress entry?');
			if(conf)
			{
				//dispatch language delete element
				dispatch(progressAction.removeProgress({userId:this.props.user.id,progressid:specialId}));
			}
		}
	}

	editProgress=(e)=>{
		const{dispatch}=this.props;
		e.preventDefault();
		let progressId=e.currentTarget.getAttribute('data-id');
		if(progressId>0)
		{
			let progressEditForm=Object.assign({},this.state.progressEditForm);
			let progressResult=this.state.userData.progress.filter(function (e) {
				return e.id == progressId;
			});
			progressEditForm.position=progressResult[0].position;
			progressEditForm.establishment=progressResult[0].establishment;
			progressEditForm.id=progressId;
			this.setState({progressEditForm:progressEditForm});
		}
	}

	clickPortfolioSaveHandler=(e)=>{
		
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
	// 	if(this.state.userData.profile.about=='' || this.state.userData.profile.about==null)
	// 	{
	// 		profileComplete=false;
	// 	}
    //  if(this.state.userData.profile.isStudent==false && this.state.userData.experiances.length<=0)
	// 	{
	// 		profileComplete=false;
	// 	}
	// 	if(this.state.userData.languages.length<1)
	// 	{
	// 		profileComplete=false;
	// 	}
	// 	if(this.state.userData.educations.length<1)
	// 	{
	// 		profileComplete=false;
	// 	}
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

	clickMediaSaveHandler=(e)=>
	{
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		let socialid=this.state.mediaEditForm.socialid.toString();
		let link=this.state.mediaEditForm.link;
		let id=this.state.mediaEditForm.id;
		curObj.setState({FistNameValidateMessage:'',LastNameValidateMessage:'',AddressValidateMessage:'',CountryValidateMessage:''});
		if(validator.isEmpty(socialid)===true){
			curObj.setState({FistNameValidateMessage:'Please select media type'});
		}
		if(validator.isEmpty(link)===true){
			curObj.setState({LastNameValidateMessage:'Please enter url Name'});
		}
		if(validator.isEmpty(socialid)===false && validator.isEmpty(link)===false)
		if(id>0)
		{
			dispatch(mediaAction.editMedia({userId:this.props.user.id,media:this.state.mediaEditForm}))
		}
		else
		{
			dispatch(mediaAction.addMedia({userId:this.props.user.id,media:this.state.mediaEditForm}))
		}
	}

	clickFolloSaveHandler=(e)=>{
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		let portfolloid=this.state.portfolloEditForm.folloid.toString();
		let other=this.state.portfolloEditForm.other;
		let caption=this.state.portfolloEditForm.caption;
		let id=this.state.portfolloEditForm.id;
		curObj.setState({FistNameValidateMessage:'',LastNameValidateMessage:'',AddressValidateMessage:'',CountryValidateMessage:'',isUploading:true});
		if(validator.isEmpty(portfolloid)===true){
			curObj.setState({FistNameValidateMessage:'Please select category'});
		}
		if(validator.isEmpty(other)===true){
			curObj.setState({LastNameValidateMessage:'Please enter category Name'});
		}
		if(validator.isEmpty(caption)===true){
			curObj.setState({LastNameValidateMessage:'Please enter caption'});
		}
		if(validator.isEmpty(portfolloid)===false)
		if(id>0)
		{
			dispatch(userPortfolloAction.editPortfollo({userId:this.props.user.id,Portfollo:this.state.portfolloEditForm}))
		}
		else
		{
			dispatch(userPortfolloAction.addPortfollo({userId:this.props.user.id,Portfollo:this.state.portfolloEditForm}))
		}
	}

	clickSpecialtiesSaveHandler=(e)=>{
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		if(this.state.userData.specialties.length==3){
			Swal.fire({
				title: 'Error!',
				text: 'You can add upto 3 Specialties',
				icon: 'error',
				confirmButtonText: 'OK'		
			});
			return;
		}
		let name=this.state.SpecialtiesEditForm.name.toString();
		let id=this.state.SpecialtiesEditForm.id;
		curObj.setState({FistNameValidateMessage:'',LastNameValidateMessage:'',AddressValidateMessage:'',CountryValidateMessage:''});
		if(validator.isEmpty(name)===true){
			curObj.setState({FistNameValidateMessage:'Please enter Specialties'});
		}
		if(validator.isEmpty(name)===false)
		if(id>0)
		{
			dispatch(specialtiesAction.editSpecialties({userId:this.props.user.id,specialties:this.state.SpecialtiesEditForm}))
		}
		else
		{
			dispatch(specialtiesAction.addSpecialties({userId:this.props.user.id,specialties:this.state.SpecialtiesEditForm}))
		}
	}


    componentWillReceiveProps(nextProps){
        if(nextProps.user!=this.props.user){
            window.location.href="/Login";
		}
		if(nextProps.profile!=this.props.profile){
			//debugger;
			if(nextProps.profile!=null && nextProps.profile!=undefined)
			{
				let corobj=this;
				let categoryActiveId=1;
				if(nextProps.profile.portfollo!=undefined && nextProps.profile.portfollo.length>0){
					categoryActiveId=nextProps.profile.portfollo[0].id;
					nextProps.profile.portfollo.map(item=>{
						if(corobj.state.tabactiveid==item.id){
							categoryActiveId=item.id;
						}
					});
				}
				this.setState({userData:nextProps.profile,tabactiveid:nextProps.profile.portfollo[0]!=undefined?categoryActiveId:1},()=>{
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
		if(nextProps.media!=this.props.media)
		{
			if(nextProps.media.message!==null && nextProps.media.message!=undefined &&  nextProps.media.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'Media has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				Swal.fire({
					title: 'Success!',
					text: 'Media has been saved successfully.',
					icon: 'success',
					confirmButtonText: 'OK'		
				});
				const{dispatch}=this.props;//debugger
				dispatch(profileAction.getProfile({userId:this.props.user.id}));
				let mediaEditForm= Object.assign({},this.state.mediaEditForm);
				mediaEditForm.id=null;
				mediaEditForm.socialid=0;
				mediaEditForm.link="";
				this.setState({mediaEditForm:mediaEditForm});
			}
		}
		if(nextProps.portfollo!=this.props.portfollo)
		{
			if(nextProps.portfollo.message!==null && nextProps.portfollo.message!=undefined &&  nextProps.portfollo.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'Portfollo has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				const config = {
					headers: {
						'content-type': 'multipart/form-data',
					}
				}
				const{profile:{profile}}=this.props;
				let caption=this.state.portfolloEditForm.caption;
				let formData = new FormData();
				formData.set('caption',caption);
				formData.append("file",this.state.categoryUploadImageItem);
				if(this.state.categoryUploadImageItem!=null){
					axios.post(`${APIURL}users/${profile.userId}/${nextProps.portfollo.media.id}/multiupload`,formData,config)
					.then((response) => {
						this.setState({imageFormData:null,isUploading:false});
						Swal.fire({
							title: 'Success!',
							text: 'Portfollo has been saved successfully.',
							icon: 'success',
							confirmButtonText: 'OK'		
						});
						const{dispatch}=this.props;//debugger
						dispatch(profileAction.getProfile({userId:this.props.user.id}));
						let portfolloEditForm= Object.assign({},this.state.portfolloEditForm);
						portfolloEditForm.id=null;
						// portfolloEditForm.folloid=0;
						portfolloEditForm.other="";
						portfolloEditForm.caption="";
						this.setState({portfolloEditForm:portfolloEditForm,categoryUploadImageItem:null});
					}).catch((error) => {
						console.log(error);
						return error;
					});
				}
				else{
					Swal.fire({
						title: 'Success!',
						text: 'Portfollo has been saved successfully.',
						icon: 'success',
						confirmButtonText: 'OK'		
					});
					const{dispatch}=this.props;//debugger
					dispatch(profileAction.getProfile({userId:this.props.user.id}));
					let portfolloEditForm= Object.assign({},this.state.portfolloEditForm);
					portfolloEditForm.id=null;
					portfolloEditForm.folloid=0;
					portfolloEditForm.other="";
					portfolloEditForm.caption="";
					this.setState({portfolloEditForm:portfolloEditForm});
				}
			}
		}

		if(nextProps.specialties!=this.props.specialties)
		{
			if(nextProps.specialties.message!==null && nextProps.specialties.message!=undefined &&  nextProps.specialties.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'Media has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				Swal.fire({
					title: 'Success!',
					text: 'Specialties has been saved successfully.',
					icon: 'success',
					confirmButtonText: 'OK'		
				});
				const{dispatch}=this.props;//debugger
				dispatch(profileAction.getProfile({userId:this.props.user.id}));
				let SpecialtiesEditForm= Object.assign({},this.state.SpecialtiesEditForm);
				SpecialtiesEditForm.id=null;
				SpecialtiesEditForm.name="";
				this.setState({SpecialtiesEditForm:SpecialtiesEditForm});
			}
		}
		if(nextProps.progress!=this.props.progress)
		{
			if(nextProps.progress.message!==null && nextProps.progress.message!=undefined &&  nextProps.progress.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'Progress has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				Swal.fire({
					title: 'Success!',
					text: 'Progress has been saved successfully.',
					icon: 'success',
					confirmButtonText: 'OK'		
				});
				const{dispatch}=this.props;//debugger
				dispatch(profileAction.getProfile({userId:this.props.user.id}));
				let progressEditForm= Object.assign({},this.state.progressEditForm);
				progressEditForm.id=null;
				progressEditForm.position="";
				progressEditForm.establishment="";
				this.setState({progressEditForm:progressEditForm});
			}
		}
		if(nextProps.about!=this.props.about)
		{
			if(nextProps.about.message!==null && nextProps.about.message!=undefined &&  nextProps.about.message.original!=null){
				Swal.fire({
					title: 'Error!',
					text: 'About has not save successfully.',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
			else{
				Swal.fire({
					title: 'Success!',
					text: 'About has been saved successfully.',
					icon: 'success',
					confirmButtonText: 'OK'		
				});
				const{dispatch}=this.props;//debugger
				dispatch(profileAction.getProfile({userId:this.props.user.id}));
				let aboutEditForm= Object.assign({},this.state.aboutEditForm);
				aboutEditForm.id=null;
				aboutEditForm.university="";
				aboutEditForm.status="";
				aboutEditForm.month="";
				aboutEditForm.year="";
				this.setState({aboutEditForm:aboutEditForm});
			}
		}
	}

	selectImages(e){
		//this.setState({file:});
		let curobj=this;
		const{profile:{profile}}=this.props;
		let formData = new FormData();
		formData.append("file",e.target.files[0]);
		const config = {
				headers: {
					'content-type': 'multipart/form-data',
				}
		}
		this.setState({isProfileUploading:true});
		axios.post(`${APIURL}users/${profile.userId}/${profile.id}/upload`,formData,config)
				.then((response) => {
					let userData=Object.assign({},this.state.userData);
					userData.profile.photo=response.data.data.photo;
					curobj.setState({userData,isProfileUploading:false});
				  
				}).catch((error) => {
				 console.log(error);
					return error;
		});
	}

	selectMultiImages(e){
		if(e.target.files.length>0){
			// if(e.target.files.length>10){
			// 	Swal.fire({
			// 		title: 'Success!',
			// 		text: 'Please select maximum 10 photos.',
			// 		icon: 'success',
			// 		confirmButtonText: 'OK'		
			// 	});
			// 	return;
			// }
			// else{
			// 	for(let i=0;i<e.target.files.length;i++){
			// 		formData.append("file",e.target.files[i]);		
			// 	}
			// 	this.setState({imageFormData:formData});
			// }
			if(e.target.files.length>0){
				for(let i=0;i<e.target.files.length;i++){
					this.setState({categoryUploadImageItem:e.target.files[i]});
				}
				
			}
		}
		
	}

	showCategoryPhotoModal(id,e){
		e.preventDefault();
		this.setState({selectedcategoryid:id});
	}

	selectMultiPhoto(e){
		const{profile:{profile}}=this.props;
		// let formData = new FormData();
		let images=[];
		let curobj=this;
		
		this.state.userData.images.map(element=>{
			if(element.folloid==curobj.state.selectedcategoryid){
				images.push(element);
			}
		});
		let totalImages=images.length+e.target.files.length;
		if(totalImages>=10){
			Swal.fire({
				title: 'Error!',
				text: 'Please select maximum 10 photos.',
				icon: 'error',
				confirmButtonText: 'OK'		
			});
			return;
		}
		if(e.target.files.length>0){
			for(let i=0;i<e.target.files.length;i++){
				this.setState({categoryUploadImageItem:e.target.files[i]});
			}
			
		}
		// this.setState({imageFormData:formData});
	}

	clickPhotoSaveHandler=(e)=>{
		try{
			let curobj=this;
			const{profile:{profile}}=this.props;
			let caption=this.state.portfolloEditForm.caption;
			let formData = new FormData();
			formData.set('caption',caption);
			formData.append("file",this.state.categoryUploadImageItem);
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				}
			}
			if(this.state.categoryUploadImageItem!=null){
				this.setState({isUploading:true});
				axios.post(`${APIURL}users/${profile.userId}/${this.state.selectedcategoryid}/multiupload`,formData,config)
				.then((response) => {
					this.setState({imageFormData:null,isUploading:false});
					Swal.fire({
						title: 'Success!',
						text: 'Photo has been saved successfully.',
						icon: 'success',
						confirmButtonText: 'OK'		
					});
					let formData = new FormData();
					const{dispatch}=this.props;//debugger
					let portfolloEditForm=Object.assign({},curobj.state.portfolloEditForm);
					portfolloEditForm.caption="";
					curobj.setState({portfolloEditForm:portfolloEditForm,categoryUploadImageItem:null});
					dispatch(profileAction.getProfile({userId:this.props.user.id}));
				}).catch((error) => {
					console.log(error);
					return error;
				});
			}
			else{
				Swal.fire({
					title: 'Error!',
					text: 'No image selected. Please select image',
					icon: 'error',
					confirmButtonText: 'OK'		
				});
			}
		}
		catch(e){
			console.log(e);
		}
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
			<textarea placeholder="Enter City" onChange={this.changeAddress} className="form-control" id="address-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.address:null}></textarea>
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
        <h5 className="modal-title" id="exampleModalLabel">Education</h5>
				
        <div className="tooltp" style={{textAlign:'right',width:'100%'}}>
        	<span id="questionMark" data-tip={this.state.blurbTex.about} className="fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>
				<ReactTooltip place="bottom" />
				</div>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
		<div>{this.state.aboutValidateMessage}</div>
          <div className="form-group">
		  	<label htmlFor="university-text" className="col-form-label">University:</label>
			<input placeholder="Enter University" onChange={this.changeUniversityName} type="text" className="form-control" id="university-text" value={this.state.aboutEditForm!=null?this.state.aboutEditForm.university:null}/>
			<div className="errorMsg">{this.state.FistNameValidateMessage}</div>
            {/* <label htmlFor="popup-text" className="col-form-label">Content</label>
			<textarea placeholder="Enter atleast 100 characters about yourself" required onChange={this.changeAbout} className="form-control" rows="10" id="popup-text" value={this.state.profileEditForm!=null?this.state.profileEditForm.about:null}></textarea>
			<div className="small">Atleast 100 characters is required to save About. Currently you have enter {this.state.profileEditForm.about.length} characters</div> */}
    
		  </div>
		  <div className="form-group">
            <label htmlFor="status-text" className="col-form-label">Status</label>
			<div className="radios about-radios">
				<label for="Student">
					<input type="radio" checked={this.state.aboutEditForm.status=="Student"} onChange={this.checkStatusHandle.bind(this)} name="type" id="Attending" value="Student"  />
					<div class="checkmark"></div>
					Student
				</label>
				<label for="Graduate" style={{marginBottom:'-3px'}}>
					<input type="radio" checked={this.state.aboutEditForm.status=="Graduate"} onChange={this.checkStatusHandle.bind(this)}  name="type" id="Graduate" value="Graduate" />
					<div className="checkmark"></div>
					Graduate
				</label>
				{/* <label for="architect" style={{marginBottom:'-3px'}}>
					<input type="radio" checked={this.state.aboutEditForm.status=="Architect"} onChange={this.checkStatusHandle.bind(this)}  name="type" id="architect" value="Architect" />
					<div className="checkmark"></div>
					Architect
				</label> */}
				<div className="errorMsg" style={{height:'3px'}}>{this.state.roleValidate}</div>
			</div>
		  </div>
		  <div className="form-group">
            <label htmlFor="month-text" className="col-form-label">Month</label>
			<select placeholder="Choose a month..." onChange={this.changeMonth} className="form-control"  id="month-text" value={this.state.aboutEditForm.month}>
				<option value=""> Select Month</option>
				{this.state.monthList!=null && this.state.monthList.map(element=>{
					return <option value={element}>{element}</option>
				})
				}
			</select>
		  </div>
		  <div className="form-group">
            <label htmlFor="year-text" className="col-form-label">Year</label>
			<select placeholder="Choose a year..." onChange={this.changeYear} className="form-control"  id="year-text" value={this.state.aboutEditForm.year}>
				<option value=""> Select Year</option>
				{this.state.yearList!=null && this.state.yearList.map(element=>{
					return <option value={element}>{element}</option>
				})
					
				}
				
			</select>
		  </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.clickAboutSaveHandler}type="button"  class="btn btn-primary">Update</button>
		</div>
	</div>
  </div>
</div>
		)
	}

	changeUniversityName=(e)=>{
		let aboutEditForm=Object.assign({},this.state.aboutEditForm);
		aboutEditForm.university=e.target.value;
		this.setState({aboutEditForm:aboutEditForm});
	}
	checkStatusHandle(e){
		let aboutEditForm=Object.assign({},this.state.aboutEditForm);
		aboutEditForm.status=e.target.value;
		this.setState({aboutEditForm:aboutEditForm});
	}
	changeMonth=(e)=>{
		let aboutEditForm=Object.assign({},this.state.aboutEditForm);
		aboutEditForm.month=e.target.value;
		this.setState({aboutEditForm:aboutEditForm});
	}
	changeYear=(e)=>{
		let aboutEditForm=Object.assign({},this.state.aboutEditForm);
		aboutEditForm.year=e.target.value;
		this.setState({aboutEditForm:aboutEditForm});
	}

	renderLanguageModal(){
		// alert(this.state.modelContent);
		return(
			<div className="modal fade" id="languageEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="languageEditorLabel">Language</h5>
				<div className="tooltp" style={{textAlign:'right',width:'100%'}}>
        	<span id="questionMark" data-tip={this.state.blurbTex.language} className="fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>
				<ReactTooltip place="bottom" />
				</div>
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
			<div className="tooltp" style={{textAlign:'right',width:'100%'}}>
        <sapn style={{marginTop:'5px',marginLeft:'5px'}} id="questionMark" data-tip={this.state.blurbTex.experience} className="fas fa-question">
				</sapn>
				<ReactTooltip place="bottom" />
				</div>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          
          <div className="form-group">
            <label htmlFor="experience-title-text" className="col-form-label">Job/Event</label>
			<input placeholder="Enter Job/Event" type="text" onChange={this.changeExperienceTitle} className="form-control"  id="experience-title-text" value={this.state.experienceEditForm.title}/>
			<div className="errorMsg">{this.state.ExpTitleMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-Program-text" className="col-form-label">Position</label>
			<input placeholder="Enter Position" type="text" onChange={this.changeExperienceProgram} className="form-control"  id="experience-program-text" value={this.state.experienceEditForm.program}/>
			<div className="errorMsg">{this.state.ExpProgramMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-location-text" className="col-form-label">Location</label>
			<input placeholder="Enter Location" type="text" onChange={this.changeExperienceLocation} className="form-control"  id="experience-location-text" value={this.state.experienceEditForm.location}/>
			<div className="errorMsg">{this.state.ExpLocationMessage}</div>
          </div>
		  <div className="form-group">
            <label htmlFor="experience-description-text" className="col-form-label">Description</label>
			<textarea placeholder="Enter Description" onChange={this.changeExperienceDescription} className="form-control"  id="experience-description-text" rows="3" value={this.state.experienceEditForm.description}/>
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
				
      <div className="tooltp" style={{textAlign:'right',width:'100%'}}>
        <span id="questionMark" data-tip={this.state.blurbTex.education} className=" fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>
				<ReactTooltip place="bottom" />
				</div>
			  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          
          <div className="form-group">
            <label htmlFor="education-title-text" className="col-form-label">School/University</label>
			<input placeholder="Enter School/University" type="text" onChange={this.changeEducationTitle} className="form-control"  id="education-title-text" value={this.state.educationEditForm.title}/>
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
			<textarea placeholder="Enter Description" onChange={this.changeEducationDescription} className="form-control"  id="experience-description-text" rows="3" value={this.state.educationEditForm.description}/>
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
				<div className="tooltp" style={{textAlign:'right',width:'100%'}}>
        	<span id="questionMark" data-tip={this.state.blurbTex.portfolio} className="fas fa-question" style={{marginTop:'5px',marginLeft:'5px'}}></span>
				<ReactTooltip place="bottom" />
				</div>
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

	renderMediaEditor(){
		return(
			<div className="modal fade" id="mediaEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="nameEditorLabel">Media</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="media-text" className="col-form-label">Media Type:</label>
									<select onChange={this.changeMediaType} type="text" className="form-control" id="media-text" value={this.state.mediaEditForm!=null?this.state.mediaEditForm.socialid:null}>
										<option value="0">Please select media type</option>
										{this.state.socialList.map(element => {
											return <option value={element.id}>{element.name}</option>	
										})}
									</select>
									<div className="errorMsg">{this.state.CountryValidateMessage}</div>
								</div>
								<div className="form-group">
									<label htmlFor="meidalink-text" className="col-form-label">Url:</label>
									<input placeholder="Enter URL" onChange={this.changeMeidaUrl} type="text" className="form-control" id="meidalink-text" value={this.state.mediaEditForm!=null?this.state.mediaEditForm.link:null}/>
									<div className="errorMsg">{this.state.FistNameValidateMessage}</div>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button onClick={this.clickMediaSaveHandler} type="button" class="btn btn-primary">Update</button>
						</div>
						<div className="row">
							<div className=" col-md-12 social-list">
								{this.state.userData.media!=null && this.state.userData.media.length>0 &&
									this.state.userData.media.map(element=>{
										return <div><article>
										<div class="clearfix">
											<h6 class="float-left">{element.link}</h6>
											{this.state.mode=='edit'&& <div><a onClick={this.removeMedia} href="#" data-whatever="@mdo" data-id={element.id} class="float-right" style={{marginLeft:'5px'}}><i class="fas fa-trash"></i><span class="span">Delete</span></a><a  onClick={this.editMedia}  data-id={element.id} href="#" class="float-right"  ><i class="fas fa-edit"></i><span class="span"> Edit</span></a></div>}
												</div>
											</article>
											<hr/>
										</div>		
									})
								}
								
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	changeMediaType=(e)=>{
		let mediaEditForm= Object.assign({},this.state.mediaEditForm);
		mediaEditForm.socialid=e.target.value;
		this.setState({mediaEditForm:mediaEditForm});
	}
	changeMeidaUrl=(e)=>{
		let mediaEditForm= Object.assign({},this.state.mediaEditForm);
		mediaEditForm.link=e.target.value;
		this.setState({mediaEditForm:mediaEditForm});
	}

	editMedia=(e)=>{
		e.preventDefault();
		let curobj=this;
		let media_id=e.currentTarget.getAttribute('data-id');
		if(media_id!=null){
			let mediaEditForm= Object.assign({},this.state.mediaEditForm);
			this.state.userData.media.map(element=>{
				if(element.id==media_id){
					mediaEditForm.socialid=element.socialid;
					mediaEditForm.link=element.link;
					mediaEditForm.id=element.id;
					curobj.setState({mediaEditForm:mediaEditForm});
				}	
			})
		}
	}

	removeMedia=(e)=>
	{
		e.preventDefault();
		let exp_id=e.currentTarget.getAttribute('data-id');
		let curobj=this;
		if(exp_id!=null)
		{
			confirmAlert({
				title: 'Remove Media',
				message: 'Are you sure to remove media',
				buttons: [
				  {
					label: 'Yes',
					onClick: () => curobj.removeMediaById(curobj.props.user.id,exp_id)
				  },
				  {
					label: 'No',
					onClick: () => curobj.removeConfirmpopup(exp_id)
				  }
				]
			  });
			
		}
	}
	removeMediaById(userid,exp_id){
		const{dispatch}=this.props;
		dispatch(mediaAction.removeMedia({userId:userid,mediaid:exp_id}));
	}

	// Visual Portfollo
	renderProtfolloEditor(){
		return(
			<div className="modal fade" id="ProtfolloEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="nameEditorLabel">Visual Portfolio</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="category-text" className="col-form-label">Category:</label>
									<select onChange={this.changePortfollo} type="text" className="form-control" id="category-text" value={this.state.portfolloEditForm!=null?this.state.portfolloEditForm.folloid:null}>
										<option value="0">Please select portfolio</option>
										{this.state.portfolloList.map(element => {
											return <option value={element.id}>{element.name}</option>	
										})}
									</select>
									<div className="errorMsg">{this.state.CountryValidateMessage}</div>
								</div>
								
								{this.state.portfolloOther==true && 
									<div className="form-group">
										<label htmlFor="meidalink-text" className="col-form-label">Category Name:</label>
										<input placeholder="Enter Category Name" onChange={this.changePortfolloOther} type="text" className="form-control" id="meidalink-text" maxlength="25" value={this.state.portfolloEditForm!=null?this.state.portfolloEditForm.other:null}/>
										<div className="errorMsg">{this.state.FistNameValidateMessage}</div>
									</div>
								}

								<div className="form-group">
									<label htmlFor="upload_multi_link" className="col-form-label">Image:</label>
									<input type="file" name="file"  id="multiupload" onChange={this.selectMultiImages.bind(this)}  style={{display:'none'}} />
									<a href=""  id="upload_multi_link" > Upload </a>
								</div>
								<div className="form-group">
							<label>{this.state.categoryUploadImageItem!=null?this.state.categoryUploadImageItem.name:''} {this.state.categoryUploadImageItem!=null && <i class="fa fa-check text-success" aria-hidden="true"></i>}</label>
								</div>
								<div className="form-group">
									<label htmlFor="caption-text" className="col-form-label">Caption</label>
									<textarea placeholder="Enter upto 100 characters about the photo you are uploading" required onChange={this.changeCaption} className="form-control" rows="5" maxLength="100" id="caption-text" value={this.state.portfolloEditForm!=null?this.state.portfolloEditForm.caption:null}></textarea>
									<div className="small">added  {this.state.portfolloEditForm.caption.length} characters</div>
    
								</div>
								
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button onClick={this.clickFolloSaveHandler} type="button" class="btn btn-primary">{(this.state.isUploading==true) && <i class="fa fa-spinner fa-spin"></i>}Update</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	changeCaption=(e)=>{
		let portfolloEditForm=Object.assign({},this.state.portfolloEditForm);
		portfolloEditForm.caption=e.target.value;
		this.setState({portfolloEditForm:portfolloEditForm});
	}
	changePortfollo=(e)=>{
		let portfolloEditForm= Object.assign({},this.state.portfolloEditForm);
		portfolloEditForm.folloid=e.target.value;
		if(e.target.value==8){
			this.setState({portfolloOther:true});
		}
		else{
			this.setState({portfolloOther:false});
		}
		this.setState({portfolloEditForm:portfolloEditForm});
	}
	changePortfolloOther=(e)=>{
		let portfolloEditForm= Object.assign({},this.state.portfolloEditForm);
		portfolloEditForm.other=e.target.value;
		this.setState({portfolloEditForm:portfolloEditForm});
	}

	// Visual Portfollo
	renderSpecialtiesEditor(){
		return(
			<div className="modal fade" id="SpecialtiesEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="nameEditorLabel">My Specialties</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="Specialties-text" className="col-form-label">Specialties:</label>
									<input placeholder="Enter Specialties" onChange={this.changeSpecialties} type="text" className="form-control" id="Specialties-text" value={this.state.SpecialtiesEditForm!=null?this.state.SpecialtiesEditForm.name:null}/>
								</div>
								
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button onClick={this.clickSpecialtiesSaveHandler} type="button" class="btn btn-primary">Update</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	changeSpecialties=(e)=>{
		let SpecialtiesEditForm= Object.assign({},this.state.SpecialtiesEditForm);
		SpecialtiesEditForm.name=e.target.value;
		this.setState({SpecialtiesEditForm:SpecialtiesEditForm});
	}

	renderProgressEditor(){
		
		return(
			<div className="modal fade" id="progressEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="nameEditorLabel">Current</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="position-text" className="col-form-label">Position:</label>
									{/* <select onChange={this.changePosition} type="text" className="form-control" id="position-text" value={this.state.progressEditForm!=null?this.state.progressEditForm.progressid:null}>
										<option value="0">Please select Position</option>
										{this.state.progressList.map(element => {
											return <option value={element.id}>{element.name}</option>	
										})}
									</select> */}
									<input placeholder="Enter Position" onChange={this.changePosition} type="text" className="form-control" id="position-text" value={this.state.progressEditForm!=null?this.state.progressEditForm.position:null}/>
									<div className="errorMsg">{this.state.CountryValidateMessage}</div>
								</div>
								<div className="form-group">
									<label htmlFor="Establishment-text" className="col-form-label">Establishment:</label>
									<input placeholder="Enter name of Establishment" onChange={this.changeEstablishment} type="text" className="form-control" id="Establishment-text" value={this.state.progressEditForm!=null?this.state.progressEditForm.establishment:null}/>
								</div>
								
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button onClick={this.clickProgressSaveHandler} type="button" class="btn btn-primary">Update</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
	changePosition=(e)=>{
		let progressEditForm=Object.assign({},this.state.progressEditForm);
		progressEditForm.position=e.target.value;
		this.setState({progressEditForm:progressEditForm});
	}
	changeEstablishment=(e)=>{
		let progressEditForm=Object.assign({},this.state.progressEditForm);
		progressEditForm.establishment=e.target.value;
		this.setState({progressEditForm:progressEditForm});
	}

	clickProgressSaveHandler=(e)=>{
		const{dispatch}=this.props;
		e.preventDefault();
		let curObj=this;
		
		let establishment=this.state.progressEditForm.establishment.toString();
		let position=this.state.progressEditForm.position;
		let id=this.state.progressEditForm.id;
		curObj.setState({FistNameValidateMessage:'',LastNameValidateMessage:'',AddressValidateMessage:'',CountryValidateMessage:''});
		if(validator.isEmpty(position)===true){
			curObj.setState({FistNameValidateMessage:'Please enter position'});
		}
		if(validator.isEmpty(establishment)===true){
			curObj.setState({FistNameValidateMessage:'Please enter Establishment'});
		}
		if(validator.isEmpty(establishment)===false && validator.isEmpty(position)===false)
		if(id>0)
		{
			dispatch(progressAction.editProgress({userId:this.props.user.id,progress:this.state.progressEditForm}))
		}
		else
		{
			dispatch(progressAction.addProgress({userId:this.props.user.id,progress:this.state.progressEditForm}))
		}
	}

	// Visual Portfollo
	renderPhotoEditor(){
		return(
			<div className="modal fade" id="PhotoEditor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="nameEditorLabel">Add Photo</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
								<label htmlFor="upload_multi_photo" className="col-form-label">Image :</label>
								<input type="file" name="file"  id="multiuploadphoto" onChange={this.selectMultiPhoto.bind(this)}  style={{display:'none'}} />
								<a href="" id="upload_multi_photo" > Upload </a>
								</div>
								<div className="form-group">
									<label>{this.state.categoryUploadImageItem!=null?this.state.categoryUploadImageItem.name:''} {this.state.categoryUploadImageItem!=null && <i class="fa fa-check text-success" aria-hidden="true"></i>}</label>
								</div>
								<div className="form-group">
									<label htmlFor="caption-text" className="col-form-label">Caption</label>
									<textarea placeholder="Enter upto 100 characters about the photo you are uploading" required onChange={this.changeCaption} className="form-control" rows="5" maxLength="100" id="caption-text" value={this.state.portfolloEditForm!=null?this.state.portfolloEditForm.caption:null}></textarea>
									<div className="small">Added  {this.state.portfolloEditForm.caption.length} characters</div>
    
								</div>
							</form>
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
		e.preventDefault();
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
		const{dispatch}=this.props;
		e.preventDefault();
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
		let curobj=this;
		if(this.state.userData.about!=null && this.state.userData.about!=undefined){
			let aboutEditForm=Object.assign({},this.state.aboutEditForm);
			this.state.userData.about.map(element=>{
				aboutEditForm.university=element.university;
				aboutEditForm.status=element.status;
				aboutEditForm.month=element.month;
				aboutEditForm.year=element.year;
				aboutEditForm.id=element.id;
				curobj.setState({aboutEditForm:aboutEditForm});	
			})
		}
	}
	showEditNameAddressCountry=(e)=>{
		this.setState({mode:'edit',profileEditForm:this.state.userData.profile});
		e.preventDefault();
	}
	changeStudent=(e)=>{
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

	showActivePanel=(id,e)=>{
		e.preventDefault();
		this.setState({tabactiveid:id});
	}

    render() {
			let curobj=this;
			const{profile:{profile},user}=this.props;
			const { profileUrl } = this.props.match.params;
			let countryName=this.state.userData.profile.country;
			let imageUrl=null;
			if(profile!=null && profile!=undefined && profile.photo!==""){
				imageUrl=`${BASE_URL}/images/${profile.photo}`;
			}else{
				imageUrl=this.state.initailImage;
			}
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
					<div class="col-lg-3 col-md-3 col-xs-12">
						<div class="dp" >
							{this.state.isProfileUploading==false && 
								<img src={imageUrl}  alt=""/>
							}
							{this.state.isProfileUploading==true &&
								<ScaleLoader
								width={25}
								sizeUnit={"px"}
								size={150}
								color={'#123abc'}
								loading={this.state.isProfileUploading}
								/>
							}
							<input type="file" name="file"  id="upload" onChange={this.selectImages.bind(this)}  style={{display:'none'}} />
							{user.unique_userid==profileUrl && <a href=""  id="upload_link" ><i class="fas fa-pencil-alt"></i> Change Picture</a> }
						</div>
					</div>
					<div class="col-lg-9 col-md-9 col-xs-12">
						<div class="right row">
							<div>
								<h3>{this.state.userData.profile!=null && this.state.userData.profile.firstName!=""?this.state.userData.profile.firstName:'N/A'} {this.state.userData.profile!=null && this.state.userData.profile.lastName!=""?this.state.userData.profile.lastName:' N/A'} <span className="flag">{countryName!=null && countryName!='' && <img src={ require(`../Images/flags/${countryName.toLocaleLowerCase()}.png`) } />} </span> </h3>
								<h4>{this.state.userData.profile!=null && this.state.userData.profile.address!=""?this.state.userData.profile.address+', ':''} {this.state.userData.profile!=null && this.state.userData.profile.country!=""?this.state.userData.profile.country:''} </h4>
								<sapn>&nbsp;</sapn>{this.state.mode=='edit'&& 
								<a onClick={this.showEditNameAddressCountry} data-toggle="modal" data-target="#nameEditor" data-whatever="@mdo"  href="#" class="float-right aligned-edit"  ><i class="fas fa-edit"></i><span> Edit</span></a>}
							</div>
							{user.unique_userid==profileUrl &&
								<div>
									<div class="button">
										<a onClick={(e)=>{this.setState({mode:'edit'});e.preventDefault();}} href="#" class="profile-edit"><i class="fas fa-edit"></i><span class="span"> Edit Profile</span></a>
										<span> | </span>
										<a href="#" onClick={this.clickFinalSave.bind(this)} class="profile-save"><i class="far fa-save"></i><span class="span">Save</span> </a>
									</div>
								</div>
							}
						</div>
						<div className="row media">
							<div className="social">
								{this.state.userData.media!=null && this.state.userData.media.length>0 &&
									this.state.userData.media.map(element=>{
										if(element.socialid==1){
											return <a href={element.link} target="_blank" title={element.link}><i className="fab fa-facebook-f"></i></a>
										}else if(element.socialid==2){
											return <a href={element.link} target="_blank" title={element.link}><i className="fab fa-twitter"></i></a>	
										}else if(element.socialid==3){
											return <a href={element.link} target="_blank" title={element.link}><i className="fab fa-linkedin-in"></i></a>	
										}else if(element.socialid==4){
											return <a href={element.link} target="_blank" title={element.link}><i className="fab fa-instagram"></i></a>	
										}else{
											return <a href={element.link} target="_blank" title={element.link}><i class="fas fa-globe"></i></a>	
										}
									})
								}
								{this.state.userData.media==null && this.state.userData.media==undefined &&
									 <h5 style={{color:'#fff'}}>N/A</h5>
								}
								<sapn>&nbsp;</sapn>{this.state.mode=='edit'&& 
								<a onClick={this.media} data-toggle="modal" data-target="#mediaEditor" data-whatever="@mdo"  href="#" class="float-right aligned-edit" ><i class="fas fa-plus"></i></a>}
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
					<div class="col-lg-3 col-md-3 col-xs-12">
						<div class="about">
							<div class="clearfix">
								<h5 class="float-left" style={{fontSize:'23px'}}>{this.state.userData.about!=null && this.state.userData.about[0]!=undefined?this.state.userData.about[0].status+'-'+(this.state.userData.about[0].month!=""?this.state.userData.about[0].month:'N/A')+' '+this.state.userData.about[0].year:'About you'}</h5>
								{this.state.mode=='edit'&& 
								<a onClick={this.showEditAbout} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"  href="#" class="float-right"  ><i class="fas fa-edit"></i><span class="span"> Edit</span></a>}
							</div>
							{/* <h4 style={{wordBreak:'break-word'}}>{this.state.userData.about!=null && this.state.userData.about[0]!=undefined?this.state.userData.about[0].status+'-'+this.state.userData.about[0].month+' '+this.state.userData.about[0].year:null}</h4> */}
							<p style={{wordBreak:'break-word'}}>{this.state.userData.about!=null && this.state.userData.about[0]!=undefined?this.state.userData.about[0].university:null}</p>
							<hr/>
							<div className="clearfix">
								<h5 class="float-left lang" style={{fontSize:'23px'}}>
								Current</h5> 
								{/* <div class="float-left ml-4" style={{marginTop:'2px'}} ><input className="" id="chkStudent" type="checkbox" onChange={this.state.mode=='edit'?this.changeStudent:''}  checked={this.state.userData.profile.isStudent}   />&nbsp;Student</div> */}
								{this.state.mode=='edit' && this.state.userData.progress !=undefined && this.state.userData.progress.length==0 && <a href="#" data-toggle="modal" data-target="#progressEditor" data-whatever="@mdo"><i class=" float-right fas fa-plus-circle"></i></a>}
							</div>
							{this.state.userData.progress !=undefined &&
							<ul style={{listStyle:'none', padding:'0px'}}>
								
							{this.state.userData.progress.map(element => {
								// let progressResult=this.state.progressList.filter(function (e) {
								// 	return e.id == element.progressid;
								// });
								return <li>
									<div className="row">
										<div style={{overflowWrap:'break-word'}} className="float-left col-md-9">
											{element.position+' - '+element.establishment}
										</div> 
										<div className="float-right col-md-3" style={{padding:'0px'}}>
											{this.state.mode=='edit'&& 
												<div style={{display:'flex'}}>
													<a data-id={element.id} onClick={this.editProgress} href="#" data-toggle="modal" data-target="#progressEditor" data-whatever="@mdo" class="float-left"  ><i class="fas fa-edit"></i></a>
													<a data-id={element.id} onClick={this.deleteProgress} href="#" class="float-right"  >&nbsp;&nbsp;<i class="fas fa-trash"></i></a>
												</div>
											}
										</div>
									</div>
									</li>	
							})}
							</ul>
							}
							
							<hr/>
							<div className="clearfix">
								<h5 class="float-left lang" style={{fontSize:'23px'}}>
								My Specialties</h5>
								{this.state.mode=='edit'&& <a href="#" data-toggle="modal" data-target="#SpecialtiesEditor" data-whatever="@mdo"><i class=" float-right fas fa-plus-circle"></i></a>}
							</div>
							{this.state.userData.specialties !=undefined &&
							<ul style={{listStyle:'none', padding:'0px'}}>
								
							{this.state.userData.specialties.map(element => {
							return <li>
								<div className="row">
									<div style={{overflowWrap:'break-word'}} className="float-left col-md-9">
										{ element.name}
									</div>
									<div className="float-right col-md-3">
										{this.state.mode=='edit'&& <a data-id={element.id} onClick={this.deleteSpecialties} href="#" class="float-right"  >&nbsp;&nbsp;<i class="fas fa-trash"></i></a>}
									</div>
								</div>
								 </li>	
							})}
							</ul>
							}
							
							<hr/>
							
							<div className="clearfix">
								<h5 class="float-left lang" style={{fontSize:'23px'}}>
								Language</h5>
								{this.state.mode=='edit'&& <a href="#" onClick={this.showLanguageEditor} data-toggle="modal" data-target="#languageEditor" data-whatever="@mdo"><i class=" float-right fas fa-plus-circle"></i></a>}
							</div>
							{this.state.userData.languages!=undefined &&
							<ul className="languageList">
								
							{this.state.userData.languages.map(element => {
							return <li>{ element.name+' | '+element.proficiency} {this.state.mode=='edit'&& <a data-id={element.id} onClick={this.deleteLanguage} href="#" class="float-right"  >&nbsp;&nbsp;<i class="fas fa-trash"></i></a>}</li>	
							})}
							</ul>
							}
							<hr/>
							{/* <div class="clearfix">
							<h5 class="float-left" style={{fontSize:'23px'}}>Portfolio</h5>
							</div>
							{user.unique_userid==profileUrl && <p>Type your portfolio link below</p> }
							{user.unique_userid==profileUrl && <form action="#">
								<input type="text" placeholder="https://portfolio-link.xyz" value={this.state.userData.profile!=null?this.state.userData.profile.portfolio:null}/>
								{this.state.mode=='edit'&&<button data-toggle="modal" data-target="#profileEditor" data-whatever="@mdo" onClick={this.showEditPortfolio}><i class="fas fa-link"></i></button>}
							</form>}
							{user.unique_userid!=profileUrl && 
								<a href={this.state.userData.profile!=null?this.state.userData.profile.portfolio:null}>{this.state.userData.profile!=null?this.state.userData.profile.portfolio:''}</a>
							} */}
						</div>
					</div>
					<div class="col-lg-9 col-md-9 col-xs-12">
						<div class="spacer"></div>
						{(this.state.mode=='edit') &&
						<div class="row" style={{flexDirection:'initial'}}>
							<div className="col-md-7">
								<h3>Visual Portfolio</h3>
							</div>
							<div class="clearfix col-md-3">
								{(this.state.mode=='edit') &&<a href="#" onClick={this.showExperience} data-toggle="modal" data-target="#ProtfolloEditor" data-whatever="@mdo" class="float-right"  ><i class="fas fa-plus"></i><span class="span"> Add/Edit Tabs</span></a>}
							</div>	
						</div>
						}
						{this.state.userData.portfollo!=null && this.state.userData.portfollo.length>0 &&
						<div className="card">
							<div className="clearfix mb-3">
								<ul className="nav nav-tabs justify-content-center">
								{this.state.userData.portfollo!=null && this.state.userData.portfollo.length>0 &&
									this.state.userData.portfollo.map((element,i)=>{
										let obj="#"+element.id;
										let categoryclass="nav-link"
										let folloResult=this.state.portfolloList.filter(function (e) {
											return e.id == element.folloid;
										});
										if(element.id==this.state.tabactiveid){
											categoryclass="nav-link active";
										}
										return <li className="nav-item">
										  <a className={categoryclass} onClick={this.showActivePanel.bind(this,element.id)} data-toggle="tab" href={obj}>{folloResult[0].name=="Other"?element.other:folloResult[0].name}</a>
										</li>
										// if(i==0){
										// 	return <li className="nav-item">
										// 	<a className="nav-link active" onClick={this.showActivePanel.bind(this,element.id)} data-toggle="tab" href={obj}>{folloResult[0].name=="Other"?element.other:folloResult[0].name}</a>
										//   </li>
										// }
										// else{
										// 	return <li className="nav-item">
										//   <a className="nav-link" onClick={this.showActivePanel.bind(this,element.id)} data-toggle="tab" href={obj}>{folloResult[0].name=="Other"?element.other:folloResult[0].name}</a>
										// </li>
										// }
									})
								}
								</ul>
								<div className="tab-content">
								{this.state.userData.portfollo!=null && this.state.userData.portfollo.length>0 &&
									this.state.userData.portfollo.map((element,j)=>{
										let classname="container tab-pane";
										let folloResult=this.state.portfolloList.filter(function (e) {
											return e.id == element.folloid;
										});
										if(element.id==this.state.tabactiveid){
											classname="container tab-pane active";
										}
										let imageArray=[];
										
										this.state.userData.images.map(item=>{
											if(item.folloid==element.id){
												let imageUrl=`${BASE_URL}/images/${item.imageurl}`;
												let img={
													src:imageUrl,
													thumbnail:imageUrl,
													thumbnailWidth: 150,
													thumbnailHeight: 130,
													caption: item.caption,
													// customOverlay:item.caption
												}
												imageArray.push(img);
												//  <img src={imageUrl}></img>
											}
										})
										return <div id={element.id} className={classname}><br/>
											{/* {images}; */}
											{imageArray.length<10 && (this.state.mode=='edit') && 
												<div className="row">
													<div class="clearfix mb-3">
														{(this.state.mode=='edit') &&<a href="#" onClick={this.showCategoryPhotoModal.bind(this,element.id)} data-toggle="modal" data-target="#PhotoEditor" data-whatever="@mdo" class="float-right"  ><i class="fas fa-plus"></i><span class="span"> Add/Edit Images</span></a>}
													</div>
													{/* <input type="file" name="file" style={{padding:'15px'}}  id="multiuploadphoto" onChange={this.selectMultiPhoto.bind(this,element.id)} /> */}
												</div>
											}
											{imageArray.length>0 && 
												<Gallery images={imageArray} enableImageSelection={false}/>
											}
											{imageArray.length==0 &&
											<form>
												<div className="form-group">
													<h3 className="text-danger text-center">Coming Soon...</h3>
													{/* {(this.state.mode=='edit') &&
														<input type="file" name="file"  id="multiuploadphoto" multiple onChange={this.selectMultiPhoto.bind(this,element.id)} />
													} */}
													 {/* <a href="" id="upload_multi_photo" > Upload Photos</a> */}
												</div>
											</form>
											}
										</div>
									})
								}
								</div>
							</div>	
						</div>}
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
		{this.renderMediaEditor()}
		{this.renderProtfolloEditor()}
		{this.renderSpecialtiesEditor()}
		{this.renderProgressEditor()}
		{this.renderPhotoEditor()}
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
	  isLoading:state.profile.isLoading,
	  media:state.media,
	  portfollo:state.portfollo,
	  specialties:state.specialties,
	  progress:state.progress,
	  about:state.about
    };
  }

export default connect(mapStateToProps)(Profile);