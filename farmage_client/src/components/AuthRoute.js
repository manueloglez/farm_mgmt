import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const AuthRoute=props=>{
  const {isAuthenticated, component:Component, ...restProps}=props
    return (
      <Route {...restProps}
      render={ (routeProps)=>{
        if (isAuthenticated){
          return <Component {...routeProps} currentUser={isAuthenticated}/>
        }
        else {
          return <Redirect to="/sign_in"/>
        }}
    }/>
    )
}
export default AuthRoute