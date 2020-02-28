import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from "react-router-dom";

import { auth, createUserProfile } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { selectCurrentUser, selectIsLoadingUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

// import Axios from 'axios';
import { createStructuredSelector } from 'reselect';


import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Loader from './pages/Loader/Loader';
import Register from './pages/Register/Register';
import { selectRegisterUserName, selectRegisterUserProfilePic } from './redux/registerUser/registerUser.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;


  componentDidMount() {

    const { setCurrentUser, registerUserName, registerUserProfilePic } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

     
      if (userAuth) {

        console.log('Auth state changed!! ', userAuth);
        
        const userData = await createUserProfile(userAuth, { name: registerUserName, profilePic: registerUserProfilePic }, 'app');
        
        setCurrentUser(userData.data);
      }
      else {
        setCurrentUser(null);
      }


    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {

    const { currentUser, isLoadingUser } = this.props;
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              isLoadingUser
                ? <Loader />
                : <Redirect to="/home" />

            )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              !isLoadingUser
                ? (
                  currentUser
                    ? <Home />
                    : <Redirect to="/sign-in" />
                ) : <Redirect to="/" />
            )}
          />
          <Route
            exact
            path="/sign-in"
            render={() => (
              !isLoadingUser
                ? (
                  currentUser
                    ? <Redirect to="/home" />
                    : <Login />
                ) : <Redirect to="/" />

            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoadingUser: selectIsLoadingUser,
  registerUserName: selectRegisterUserName,
  registerUserProfilePic: selectRegisterUserProfilePic,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
