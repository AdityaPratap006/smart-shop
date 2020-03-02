import React, { useEffect } from 'react';
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
import UserProfile from './pages/UserProfile/UserProfile';
// import Register from './pages/Register/Register';
import { selectRegisterUserName, selectRegisterUserProfilePic } from './redux/registerUser/registerUser.selectors';
import Checkout from './pages/Checkout/Checkout';
import { setCartItems } from './redux/cart/cart.actions';
import { selectCurrentRoute } from './redux/route/route.selectors';
import { setCurrentRoute } from './redux/route/route.actions';
// import { useHistory } from 'react-router-dom';

const App = ({ currentRoute, setCurrentRoute, currentUser, isLoadingUser, setCurrentUser, setCartItems, registerUserName, registerUserProfilePic }) => {



  useEffect(() => {

    window.onunload = () => {
      setCurrentRoute('/home');
    }
    
    window.scrollTo(0,0);

    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {


      if (userAuth) {

        console.log('Auth state changed!! ', userAuth);

        const userData = await createUserProfile(userAuth, { name: registerUserName, profilePic: registerUserProfilePic }, 'app');

        setCurrentUser(userData.data);
        setCartItems(userData.data.cart);
      }
      else {
        setCurrentUser(null);
      }


    })


    return () => {
      unsubscribeFromAuth()
    }
  }, [registerUserName, registerUserProfilePic, setCurrentUser, setCartItems]);

  

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
              : (
                <Redirect to={currentRoute} />
              )

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
        <Route
          exact
          path="/profile"
          render={() => (
            !isLoadingUser
              ? (
                currentUser
                  ? <UserProfile />
                  : <Redirect to="/sign-in" />
              ) : <Redirect to="/" />

          )}
        />
        <Route
          exact
          path="/checkout"
          render={() => (
            !isLoadingUser
              ? (
                currentUser
                  ? <Checkout/>
                  : <Redirect to="/sign-in" />
              ) : <Redirect to="/" />

          )}
        />
      </Switch>
    </div>
  );

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoadingUser: selectIsLoadingUser,
  registerUserName: selectRegisterUserName,
  registerUserProfilePic: selectRegisterUserProfilePic,
  currentRoute: selectCurrentRoute
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCartItems: cartItems => dispatch(setCartItems(cartItems)),
  setCurrentRoute: route => dispatch(setCurrentRoute(route)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
