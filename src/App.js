import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import { auth, createUserProfile } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { selectCurrentUser, selectIsLoadingUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

import Axios from 'axios';
import { createStructuredSelector } from 'reselect';
import Loader from './pages/Loader/Loader';

class App extends React.Component {

  unsubscribeFromAuth = null;


  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {

      if (userAuth) {
        createUserProfile(userAuth)
          .then(data => {
            console.log({ userData: data });

            if (!data.exists) {
              Axios
                .post('https://smart-shop-api.herokuapp.com/createUser', {
                  userId: userAuth.uid,
                  name: userAuth.displayName,
                  email: userAuth.email,
                  profilePicUrl: userAuth.photoURL
                })
                .then(res2 => res2.data)
                .then(recievedData => {
                  setCurrentUser(recievedData);
                  console.log({ createdUser: recievedData });
                })
                .catch(err => {
                  setCurrentUser(null);
                  console.log({ errorCreatingUser: err });
                })
            } else {

              // console.log({data: data.data[0]})
              setCurrentUser(data.data[0]);

            }
          })
          .catch(err => {
            setCurrentUser(null);
            console.log({ error: err })
          })
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
            path="/home"
            render={() => (
              !isLoadingUser
              ? (
                currentUser
                ? <Home />
                : <Redirect to="/sign-in" />
              ): <Redirect to="/" />
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
              ): <Redirect to="/" />
                
            )}
          />
           <Route
            exact
            path="/"
            render={() => (
              isLoadingUser
              ? <Loader/>
              : <Redirect to="/home" />
                
            )}
          />
         
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoadingUser: selectIsLoadingUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
