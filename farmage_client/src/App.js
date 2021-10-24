import React,{ useState, useEffect } from 'react';
import * as L from 'leaflet';

import 'semantic-ui-css/semantic.min.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import './App.css';
import  {User} from './api'
import HomepageLayout from './components/Homepage';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import NotFoundPage from './components/NotFoundPage';
import FieldsList from './components/FieldsList';
import Navbar from './components/Navbar';
import NewField  from './components/NewField';
import FieldPage from './components/FieldPage';


function App() {
  const [user, setUser] = useState(null);

  
  const getCurrentUser = () => {
    return User.current().then(user => {
      if (user.id) {
        setUser(user);
      }
    });
  }
  
  const onSignOut = () => {
    setUser(null);
  }
  
  useEffect(() => {
    getCurrentUser();
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar currentUser={user} onSignOut={onSignOut} />
        <Switch>
          <Route exact path='/' render={
            (routeProps) => <HomepageLayout {...routeProps} user={user}/>
          }/>
          <Route exact path='/fields' render={
            (routeProps) => <FieldsList {...routeProps} user={user}/>
          }/>
          <Route exact path='/fields/new' render={
            (routeProps) => <NewField {...routeProps} user={user}/>
          }/>
          <Route exact path='/fields/:id' render={
            (routeProps) => <FieldPage {...routeProps} user={user}/>
          }/>
          <Route exact path='/sign_in' render={
            (routeProps) => <SignInPage {...routeProps} onSignIn={getCurrentUser}/>
          }/>
          <Route exact path='/sign_up' render={
            (routeProps) => <SignUpPage {...routeProps} onSignUp={getCurrentUser}/> 
          }/>
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
