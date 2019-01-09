import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import connection from '../Helpers/data/connection';
import authRequests from '../Helpers/data/authRequests';
import Auth from '../Components/Pages/Auth/Auth';
import Home from '../Components/Pages/Home/Home';
import MyNavbar from '../Components/MyNavbar/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: './home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: './auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    currentUid: '',
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUid = authRequests.getCurrentUid();
        this.setState({ authed: true, currentUid });
      } else {
        this.setState({ authed: false, currentUid: '' });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false, currentUid: '' });
  }


  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={this.logoutClickEvent}/>
            <div className="row">
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={authed} />
                <PrivateRoute path='/home' component={Home} authed={authed} />
                <PublicRoute path='/auth' component={Auth} authed={authed} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
