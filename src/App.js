import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home  from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import VerifySuccess from './components/VerifySuccess';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import SuccessPasswordChange from './components/SuccessPasswordChange';
import UserList from './components/UserList';
export default class App extends Component {
 // static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route  path='/login' component={Login} />
        <Route  path='/Signup' component={Signup} />
        <Route  path='/ForgetPassword' component={ForgetPassword} />
        <Route exact path='/resetpassword/:unique_userid' component={ChangePassword} />
        <Route exact path='/users/verifysuccess/:email' component={VerifySuccess} />
        <Route exact path='/passwordchange' component={SuccessPasswordChange} />
        <Route exact path='/admin' component={UserList} />
        <Route  path='/profile/:profileUrl/:random' component={Profile} />
        <Route exact path='*'  />
      </Layout>
    );
  }
}
