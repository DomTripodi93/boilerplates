import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import { checkUser } from './reducers/user/user.actions';
import Header from './shared/header/header';
import Loading from './shared/elements/loading/loading';


const Home = lazy(() => import('./containers/home/home'));

const Register = lazy(() => import('./containers/registration/registration'));
const Signin = lazy(() => import('./containers/registration/signin'));
const Signout = lazy(() => import('./containers/registration/signout'));


const App = (props) => {
  const [authValue, setAuthValue] = useState(props.isAuthenticated);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    if (!props.isAuthenticated) {
      props.checkUser(userId, token);
    }
    setAuthValue(props.isAuthenticated);
  }, [props]);


  return (
    <div id="page">
      <Header />
      <div>
        {authValue ?
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signout' component={Signout} />
            </Switch>
          </Suspense>
          :
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/signin' component={Signin} />
            </Switch>
          </Suspense>
        }
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: (userId, token) => dispatch(checkUser(userId, token)),
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
