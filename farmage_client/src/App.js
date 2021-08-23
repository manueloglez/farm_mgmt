import React,{ useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import  {User} from './api'
import HomepageLayout from './components/Homepage';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignInPage from './components/SignInPage';
import AuthRoute from './components/AuthRoute';
import SignUpPage from './components/SignUpPage';
import NotFoundPage from './components/NotFoundPage';
import FieldsList from './components/FieldsList';
import Navbar from './components/Navbar';


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
          <Route exact path="/" component={HomepageLayout}/>
          <Route exact path='/fields' component={FieldsList}/> 
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
