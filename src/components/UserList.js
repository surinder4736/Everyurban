import React, { Component } from 'react';

import { ScaleLoader } from 'react-spinners';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import PropTypes, { array } from 'prop-types';
import userAction from '../actions/user';
import { confirmAlert } from 'react-confirm-alert';
import codeAction from '../actions/code';
import $ from 'jquery';
import Header from './ProfileHeader';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import DataTable from 'react-data-table-component';
import { push } from 'react-router-redux';
import Moment from 'moment';

const{logout,removeUser} = userAction;
const{getCodeList,addNewCode,removeCode}=codeAction;

class UserList extends Component {
    constructor(props) {
        super(props);
		    this.state = {id:0,code:'',label:'',type:'',codeErrorMsg:'',labelErrorMsg:'',typeErrorMsg:'',modalTitle: ''}
	  }
    componentDidMount(){
          const{dispatch}=this.props;
          dispatch(userAction.getAdminuserList());
          dispatch(codeAction.getCodeList());
    }
    txtHandleCode(e){
      e.preventDefault();
      this.setState({ code:e.target.value,codeErrorMsg:'' });
    }

    txtHandleLabel(e){
      e.preventDefault();
      this.setState({ label:e.target.value,labelErrorMsg:''  });
    }

    txtHandleType(e){
      e.preventDefault();
      this.setState({ type: e.target.value,typeErrorMsg:'' });
    }
    
    handleClickSave(e){
      //alert("Hello"+this.state.code);
      const{dispatch}=this.props;
      const{id,code,label,type}=this.state;
      if(code=="" && code.length<=0){
        this.setState({codeErrorMsg :'Sorry please enter the code'});
      }
      if(label=="" && label.length<=0){
        this.setState({labelErrorMsg :'Sorry please enter the label'});
      }
      if(type=="" && type.length<=0){
        this.setState({typeErrorMsg :'Sorry please enter the type'});
      }
      if(code!="" && label!="" && type!=""){
        let data={
          id:id,
          code:code,
          label:label,
          type:type
        }
       
        dispatch(addNewCode(data));
      }

    }
    clearHandle(e){
      this.clearFormCode();
    }
    clearFormCode(){
      this.setState({ id:0,code:'',label:'',type:'',labelErrorMsg:'',codeErrorMsg:'',typeErrorMsg:'' });
    }

    componentWillReceiveProps(nextProps){
      const{dispatch,user}=this.props;
      const{tableCode}=nextProps;
      // if(nextProps.user!=user){
      //   if(nextProps.user==null){
      //     window.location.href='/Login';
      //   } 
      // }
      if(tableCode!=this.props.tableCode){
        if(tableCode!=null && tableCode.codeExecute=="Save" || tableCode.codeExecute=="Update" || tableCode.codeExecute=="Delete"){
          Swal.fire({
            title: 'Good Job!',
            text: tableCode.successMessage,
            icon: 'success',
            confirmButtonText: 'OK'		
          });
          dispatch(codeAction.getCodeList());
          this.clearFormCode(); 
        }
        if(tableCode.message!=null && tableCode.message.codeExecute=="Denied"){
          const{message:{errorMessage}}=tableCode;
          Swal.fire({
            title: 'Oh No!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Cancel'		
          });
        }
        if(tableCode.message!=null && tableCode.message.status==501){
          const{message:{errorMessage}}=tableCode;
          Swal.fire({
            title: 'Oh No!',
            text: tableCode.message.errorMessage.parent!=undefined?tableCode.message.errorMessage.parent.detail:tableCode.message.errorMessage,
            icon: 'error',
            confirmButtonText: 'Cancel'		
          });
        }
      }
    }


    handleEditClick(id,e){
     e.preventDefault();
     //Get Particular record by id
     const{getCodeList:{codeList}}=this.props;
     if(codeList!=null){
      let getdata= codeList.filter(item=>item.id==id);
      let fillForm={
        id:getdata[0].id,
        code:getdata[0].code,
        label:getdata[0].label,
        type:getdata[0].type
      }
     this.setState(fillForm);
     }
    }

    //Delete 
    handleDeleteClick(id,e){
      const{dispatch}=this.props;
      e.preventDefault();
      confirmAlert({
				title: 'Remove Promotion code',
				message: 'Are you sure to remove promotion code',
				buttons: [
				  {
          label: 'Yes',
          onClick:()=>dispatch(removeCode(id))
				   },
				  {
					label: 'No'
				  }
				]
			  });

      
    }

    handleCloseModal(){
      this.clearFormCode();
    }
    renderTableBody(){
      const{getCodeList}=this.props;
      if(getCodeList!=undefined){
        const{getCodeList:{codeList}}=this.props;
        console.log(codeList);
        if(codeList!=null){
         return codeList.map((item,i)=>{
            return(
              <tr key={i}> 
                <td>{i+1}</td>
                <td>{item.code}</td>
                <td>{item.label}</td>
                <td>{item.type}</td>
                <td>
                  <a className="btn-sm" style={{border:'none'}} onClick={this.handleEditClick.bind(this,item.id)} data-toggle="modal" data-target="#exampleModal" ><i className="fa fa-edit"></i></a>
                  <a className="" style={{border:'none'}}  onClick={this.handleDeleteClick.bind(this,item.id)} ><i className="fa fa-trash"></i></a>
                </td>
              </tr>
            )
          })
        }
      }
    }
    renderTable(){
        return(
          <div>
            <div className="tableFixHead">
            <table className="table table-bordered">
                   <thead>
                     <th style={{width:'20px'}}>S.No</th>
                     <th>Code</th>
                     <th>Label</th>
                     <th>Type</th>
                     <th style={{width:'100px'}}>Action</th>
                   </thead>
                   <tbody>
                     {this.renderTableBody()}
                   </tbody>
                 </table>
              </div>
          </div>
        )
    }
    renderCodMangeSection(){
      
      return(
        <div className="container">
        <div class="btn-group" role="group" aria-label="Basic example">
         <button type="button" class="btn btn-link p-0" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" >View <i className="fa fa-eye"></i></button>
        </div>
       
        <div class="row">
           <div class="col-md-8">
             <div class="collapse multi-collapse" id="multiCollapseExample1">
               <div class="card card-body">
                <div className="bt-style">
                <button  className="btn btn-link p-0" data-toggle="modal" data-target="#exampleModal" >Add New Code <i className="fa fa-plus"></i></button>
                </div>
                 {this.renderTable()}
                 </div>
             </div>
           </div>
        </div>
        </div>
      )
    }
  
    renderCodeModal(){
      return(
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{this.state.id==0 ? 'Add New Code':'Update Code'}</h5>
        <button type="button" class="close" data-dismiss="modal" onClick={this.handleCloseModal.bind(this)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
  <form>
  <div class="form-row">
    <div class="form-group col-md-12">
      <label for="inputEmail4">Code <span style={{color:'red'}}>*</span></label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Code" onChange={this.txtHandleCode.bind(this)} value={this.state.code} />
      <div style={{color:'red'}}><small>{this.state.codeErrorMsg}</small></div>
    </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-12">
      <label for="inputEmail4">Label <span style={{color:'red'}}>*</span></label>
      <input type="text" class="form-control" onChange={this.txtHandleLabel.bind(this)} value={this.state.label} id="txtLabel" placeholder="Label" />
      <div style={{color:'red'}}><small>{this.state.labelErrorMsg}</small></div>
    </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-12">
      <label for="inputPassword4">Type <span style={{color:'red'}}>*</span></label>
      <input type="text" class="form-control" id="inputPassword4" onChange={this.txtHandleType.bind(this)} value={this.state.type} placeholder="Type"/>
      <div style={{color:'red'}}><small>{this.state.typeErrorMsg}</small></div>
    </div>
  </div>
  
  </form>
     </div>
     <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-round-none" data-dismiss="modal" onClick={this.clearHandle.bind(this)} aria-label="Close" >Cancel <i className="fa fa-times"></i></button>
        <button type="button" class="btn btn-primary btn-round-none" onClick={this.handleClickSave.bind(this)} >Save <i className="fa fa-save"></i></button>
      </div>
    </div>
  </div>
</div>

      )
    }

    handleDeleteUser(userid,e){
      const{dispatch}=this.props;
      e.preventDefault();
      confirmAlert({
				title: 'Remove Promotion code',
				message: 'Are you sure you want to delete this record?',
				buttons: [
				  {
          label: 'Yes',
          onClick:()=>dispatch(removeUser(userid))
				   },
				  {
					label: 'Cancel'
				  }
				]
			});
    }

	render() {
        const{AdminUserList,user,dispatch}=this.props;
        if(user!=null){
          if(user.auth===undefined || user.isadmin===false){
            window.location.href=`/`;
            return(<div></div>);
          }
        }
        let columndata=[];
        var data;
        if(AdminUserList!=null){
          let userData=AdminUserList.user;
          if(userData!=null)
          userData.forEach(item => {
                  if(item!=null && item.UserProfile!=null && item.isadmin===false){
                      let Objdata={id:item.id,first:item.UserProfile.firstName,last:item.UserProfile.lastName,role_type:item.role_type,
                          country:item.UserProfile.country,
                          date:Moment(item.UserProfile.createdAt).format('MM/DD/YYYY'),
                          userid:item.unique_userid,
                          email:item.email,role_type:item.role_type,
                          verified:item.is_email_verified,
                          profileStatus:item.UserProfile.isCompleted==true?'true':'false',
                          code:item.code,
                          link:(item.role_type=="developer") ? "N/A" : "profile/"+item.unique_userid+"/"+item.random_id    
                      }
                      columndata.push(Objdata);	
                  }
          });
        }
        
        const mySweetTheme = {
          rows: {
              height: '30px'
            }
        }
        let curobj=this;
        if(columndata!=null && columndata.length>0){
          data=<DataTable
            title="User List"
            columns={[
              {
                name: 'Date',
                selector: 'date',
                sortable: true,
              },
              {
                name: 'User ID',
                selector: 'userid',
                sortable: true,
              },
              {
                  name: 'First',
                  selector: 'first',
                  sortable: true,
                },
                {
                  name: 'Last',
                  selector: 'last',
                  sortable: true,
                },
                {
                  name: 'Country',
                  selector: 'country',
                  sortable: true,
                },
                {
                  name: 'Email',
                  selector: 'email',
                  sortable: true,
                },
                {
                  name: 'Type',
                  selector: 'role_type',
                  sortable: true,
                },
                {
                  name: 'Verified',
                  selector: 'verified',
                  sortable: true,
                },
                {
                  name: 'Profile Status',
                  selector: 'profileStatus',
                  sortable: true,
                },
                {
                  name: 'Code',
                  selector: 'code',
                  sortable: true,
                },
                {
                  name: 'Link',
                  cell: row => <div>
                    {row.link=="N/A" && 
                    <a href="#" style={{pointerEvents:'none'}}>N/A</a>
                  }
                  {row.link!="N/A" &&
                    <a href={row.link} target='_blank'>Profile View</a>
                  }
                    </div>,
                },
                {
                  name: 'Action',
                  cell: row => <div>
                  <a onClick={curobj.handleDeleteUser.bind(curobj,row.userid)} style={{cursor:'pointer'}}><i className="fa fa-trash"></i></a>
                  </div>,
                },
            ]}
            data={columndata}
            striped={true}
            pagination
            customTheme={mySweetTheme}
          />
        }
        else{
          data= <div style={{color: "red", textAlign: "center", height: "100px", verticalAlign: "middle"}}>No Record Exist!!!</div>
        }
        return ( 
            <div>
                {/* Header components open */}
                <Header />
                <MenuComponent />
                {/* Header components end */}
                 {/* Code Manange Details */}
                  {this.renderCodMangeSection()}
			          {/* <div className='sweet-loading'>
                    <ScaleLoader
                    width={25}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.props.isLoading}
                    />
                </div> */}
                 {data}
		            <ProfileFooter />

                {/* Modal Popup */}
            
                {this.renderCodeModal()}

		    </div>
         );
    }
}
 
UserList.propTypes = {
	user: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	
    return {
	  user: state.users.user,
	  profile:state.profile.profile,
      isLoading:state.profile.isLoading,
      AdminUserList:state.users.AdminUserList,
      tableCode:state.code.tableCode,
      getCodeList:state.code.getCodeList
    };
  }

export default connect(mapStateToProps)(UserList);