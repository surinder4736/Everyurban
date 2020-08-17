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
import ViewProfile from './components/ViewProfile';
import DeveloperMessage from './components/DeveloperMessage';
import ContactUs from './components/Contactus';
import HelpCenter from './components/HelpCenter';
import HowItWork from './components/HowItWork';
import AboutUs from './components/AboutUs';
// import PrivacyPolicy from './components/Privacypolicy';
export default class App extends Component {
 // static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route  path='/login' component={Login} />
        <Route  path='/signup' component={Signup} />
        <Route  path='/ForgetPassword' component={ForgetPassword} />
        <Route exact path='/resetpassword/:unique_userid' component={ChangePassword} />
        <Route exact path='/users/verifysuccess/:email' component={VerifySuccess} />
        <Route exact path='/passwordchange' component={SuccessPasswordChange} />
        <Route exact path='/admin' component={UserList} />
        <Route exact path='/developer' component={DeveloperMessage} />
        <Route  path='/profile/:profileUrl/:random' component={Profile} />
        <Route  path='/profileview/:profileUrl/:random' component={ViewProfile} />
        <Route exact path='/contactus' component={ContactUs} />
        <Route exact path='/helpcentre' component={HelpCenter} />
        <Route  path='/howitworks' component={HowItWork} />
        <Route  path='/aboutus' component={AboutUs} />
        {/* <Route  path='/privacypolicy' component={PrivacyPolicy} /> */}
        <Route exact path='*'  />

      </Layout>
    );
  }
}
