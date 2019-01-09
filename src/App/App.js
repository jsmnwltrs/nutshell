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
import Friends from '../Components/Pages/Friends/Friends';
import Articles from '../Components/Pages/Articles/Articles';
import Weather from '../Components/Pages/Weather/Weather';
import Events from '../Components/Pages/Events/Events';
import Messages from '../Components/Pages/Messages/Messages';
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
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUid = authRequests.getCurrentUid();
        this.setState({ authed: true, currentUid, pendingUser: false });
      } else {
        this.setState({ authed: false, currentUid: '', pendingUser: false });
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
    const { authed, pendingUser } = this.state;
    if (pendingUser) {
      return null;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={this.logoutClickEvent}/>
            <div className="container">
              <div className="row">
                <Switch>
                  <PrivateRoute path='/friends' component={Friends} authed={authed} />
                  <PrivateRoute path='/articles' component={Articles} authed={authed} />
                  <PrivateRoute path='/weather' component={Weather} authed={authed} />
                  <PrivateRoute path='/events' component={Events} authed={authed} />
                  <PrivateRoute path='/messages' component={Messages} authed={authed} />
                  <PrivateRoute path='/' exact component={Home} authed={authed} />
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PublicRoute path='/auth' component={Auth} authed={authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
