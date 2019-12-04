import React, { Component } from 'react';

import { ScaleLoader } from 'react-spinners';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import PropTypes, { array } from 'prop-types';
import userAction from '../actions/user';
import Header from './ProfileHeader';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
import 'sweetalert2/src/sweetalert2.scss';
import DataTable from 'react-data-table-component';
import { push } from 'react-router-redux';
import Moment from 'moment';

const{logout} = userAction;

class UserList extends Component {
    constructor(props) {
        super(props);
		    this.state = {}
	  }
    componentDidMount(){
          const{dispatch}=this.props;
          dispatch(userAction.getAdminuserList());
    }
	
	render() {
        const{AdminUserList,user,dispatch}=this.props;
        if(user.auth===undefined || user.isadmin===false){
          window.location.href=`/`;
          return(<div></div>);
        }
        // else if(user.isadmin==false){
        //   window.location.href=`/`;
        //   return(<div></div>);
        // }
        let columndata=[];
        var data;
        if(AdminUserList!=null){
          let userData=AdminUserList.user;
          if(userData!=null)
          userData.forEach(item => {
                  if(item!=null && item.UserProfile!=null){
                      let Objdata={id:item.id,first:item.UserProfile.firstName,last:item.UserProfile.lastName,
                          country:item.UserProfile.country,
                          date:Moment(item.UserProfile.createdAt).format('MM/DD/YYYY'),
                          userid:item.unique_userid,
                          email:item.email,
                          verified:item.is_email_verified,
                          profileStatus:item.UserProfile.isCompleted==true?'true':'false',
                          link:"profile/"+item.unique_userid+"/"+item.random_id    
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
                  name: 'Link',
                  cell: row => <div><a href={row.link} target='_blank'>Profile View</a></div>,
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
			          <div className='sweet-loading'>
                    <ScaleLoader
                    width={25}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.props.isLoading}
                    />
                </div>
                 {data}
		            <ProfileFooter />
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
      AdminUserList:state.users.AdminUserList
    };
  }

export default connect(mapStateToProps)(UserList);