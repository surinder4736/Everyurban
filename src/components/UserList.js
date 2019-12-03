import React, { Component } from 'react';

import { ScaleLoader } from 'react-spinners';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import PropTypes, { array } from 'prop-types';
import userAction from '../actions/user';
import Header from './Header';
import MenuComponent from './MenuComponent';
import ProfileFooter from './ProfileFooter';
import 'sweetalert2/src/sweetalert2.scss';
import DataTable from 'react-data-table-component';

const{logout} = userAction;

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '1991',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },
{ id: 1, title: 'Anish', year: '1992',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '1993',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },
{ id: 1, title: 'Anish', year: '1994',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '1995',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },
{ id: 1, title: 'Anish', year: '1996',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '1997',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },
{ id: 1, title: 'Anish', year: '1998',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '1999',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' }
,{ id: 1, title: 'Anish', year: '2000',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '2001',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },
{ id: 1, title: 'Anish', year: '2002',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '2003',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },
{ id: 1, title: 'Anish', year: '2004',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' },{ id: 1, title: 'Anish', year: '2005',profile:'http://localhost:3000/profile/12021938/HNyTm4FSpmVPEBN' }];

class UserList extends Component {
    constructor(props) {
        super(props);
		this.state = {}
	}
	componentDidMount(){
		const{dispatch}=this.props;
	}
	
    componentWillReceiveProps(nextProps){
	}
	
	render() {
        const columns = [
            {
              name: 'Date',
              selector: 'title',
              sortable: true,
            },
            {
              name: 'User ID',
              selector: 'year',
              sortable: true,
            },
            {
                name: 'First',
                selector: 'year',
                sortable: true,
              },
              {
                name: 'Last',
                selector: 'year',
                sortable: true,
              },
              {
                name: 'Country',
                selector: 'year',
                sortable: true,
              },
              {
                name: 'Email',
                selector: 'year',
                sortable: true,
              },
              {
                name: 'verified',
                selector: 'year',
                sortable: true,
              },
              {
                name: 'Profile',
                selector: 'year',
                sortable: true,
              },
              {
                name: 'Link',
                selector: 'year',
                cell: row => <div><a href={row.profile} target='_blank'>View</a></div>,
              },
          ];
          const mySweetTheme = {
            rows: {
              height: '30px'
            }
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
                <DataTable
                    title="User List"
                    columns={columns}
                    data={data}
                    striped={true}
                    pagination
                    customTheme={mySweetTheme}
                /> 
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
	  isLoading:state.profile.isLoading
    };
  }

export default connect(mapStateToProps)(UserList);