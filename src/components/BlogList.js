import React, { Component } from 'react';

import { ScaleLoader } from 'react-spinners';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import PropTypes, { array } from 'prop-types';
import blogAction from '../actions/blog';
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

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = { id: 0, code: '', label: '', type: '', codeErrorMsg: '', labelErrorMsg: '', typeErrorMsg: '', modalTitle: '' }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(blogAction.getBlogList());
    }
    txtHandleCode(e) {
        e.preventDefault();
        this.setState({ code: e.target.value, codeErrorMsg: '' });
    }

    txtHandleLabel(e) {
        e.preventDefault();
        this.setState({ label: e.target.value, labelErrorMsg: '' });
    }

    txtHandleType(e) {
        e.preventDefault();
        this.setState({ type: e.target.value, typeErrorMsg: '' });
    }

    text_truncate = function (str, length, ending) {
        if (length == null) {
            length = 100;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    };


    componentWillReceiveProps(nextProps) {
        const { dispatch, user } = this.props;
        const { tableCode } = nextProps;
        // if(nextProps.user!=user){
        //   if(nextProps.user==null){
        //     window.location.href='/Login';
        //   } 
        // }
        if (tableCode != this.props.tableCode) {
            if (tableCode != null && tableCode.codeExecute == "Save" || tableCode.codeExecute == "Update" || tableCode.codeExecute == "Delete") {
                Swal.fire({
                    title: 'Good Job!',
                    text: tableCode.successMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            if (tableCode.message != null && tableCode.message.codeExecute == "Denied") {
                const { message: { errorMessage } } = tableCode;
                Swal.fire({
                    title: 'Oh No!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                });
            }
            if (tableCode.message != null && tableCode.message.status == 501) {
                const { message: { errorMessage } } = tableCode;
                Swal.fire({
                    title: 'Oh No!',
                    text: tableCode.message.errorMessage.parent != undefined ? tableCode.message.errorMessage.parent.detail : tableCode.message.errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                });
            }
        }
    }

 renderCodMangeSection() {

    return (
      <div className="container">
        <div class="row">
           <div class="col-md-6" >
           <div class="btn-group" role="group" aria-label="Basic example" >
              <a  class="btn btn-link p-0"  href={`/newproject`}  > New Project <i className="fa fa-plus"></i></a>
              </div></div> 
          <div class="col-md-6" >
           <div class="btn-group" role="group" aria-label="Basic example" style={{float: 'right'}}>
              <a  class="btn btn-link p-0"  href={`/admin`}  >Manage Users <i className="fa fa-eye"></i></a>
              </div></div>           
        </div>
      </div>
    )
  }



    handleDeleteUser(userid, e) {
        const { dispatch } = this.props;
        e.preventDefault();
        confirmAlert({
            title: 'Remove Record',
            message: 'Are you sure you want to delete this record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert("Delete is Pending")
                },
                {
                    label: 'Cancel'
                }
            ]
        });
    }

    render() {
        
        const { AdminUserList, user, dispatch } = this.props;
                console.log(user);

        if (user != null) {
            if (user.auth === undefined || user.isadmin === false) {
                window.location.href = `/`;
                return (<div></div>);
            }
        }
        let columndata = [];
        var data;
        if (AdminUserList != null) {

            let userData = AdminUserList.user;
            if (userData != null)
                userData.forEach(item => {
                    if (item != null && item.seno != null) {
                        let Objdata = {
                            postdate: Moment(item.postdate).format('MM/DD/YYYY'),
                            seno: item.seno,
                            posttitle: this.text_truncate(item.posttitle, 25),
                            postlistcontent: this.text_truncate(item.postlistcontent, 25),
                            postcontent: item.postcontent,
                            keywords: item.keywords,
                            publisher: item.publisher
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
        let curobj = this;
        if (columndata != null && columndata.length > 0) {
            data = <DataTable
                title="Projects List"
                columns={[
                    {
                        name: 'Date',
                        selector: 'postdate',
                        sortable: true,
                    },
                    {
                        name: 'ID',
                        selector: 'seno',
                        sortable: true,
                    },
                    {
                        name: 'Title',
                        selector: 'posttitle',
                        sortable: true,
                    },
                    // {
                    //     name: 'Content',
                    //     selector: 'postlistcontent',
                    //     sortable: true,
                    // },
                    // {
                    //     name: 'Post Content',
                    //     selector: 'postcontent',
                    //     sortable: true,
                    // },
                    {
                        name: 'Keywords',
                        selector: 'keywords',
                        sortable: true,
                    },
                    {
                        name: 'Publisher',
                        selector: 'publisher',
                        sortable: true,
                    },
                    {
                        name: 'Action',
                        cell: row => <div>
                            <a onClick={curobj.handleDeleteUser.bind(curobj, row.userid)} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></a>
                        </div>,
                    },
                ]}
                data={columndata}
                striped={true}
                pagination
                customTheme={mySweetTheme}
            />
        }
        else {
            data = <div style={{ color: "red", textAlign: "center", height: "100px", verticalAlign: "middle" }}>No Record Exist!!!</div>
        }
        return (
            <div>
                <Header />
                <MenuComponent />
                {this.renderCodMangeSection()}
                {data}
                <ProfileFooter />
            </div>
        );
    }
}

BlogList.propTypes = {
    user: PropTypes.object.isRequired
};
function mapStateToProps(state) {

    return {
        user: state.users.user,
        profile: state.profile.profile,
        isLoading: state.profile.isLoading,
        AdminUserList: state.users.AdminUserList,
    };
}

export default connect(mapStateToProps)(BlogList);