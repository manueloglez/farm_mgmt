import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const AuthRoute = ({isAuthenticated, component: Component, ...routeProps}) => {
  if(isAuthenticated){
    return <Route {...routeProps} component={Component}/>
  } else {
    return <Redirect to='/sign_in'/>
  }
}

export default AuthRoute