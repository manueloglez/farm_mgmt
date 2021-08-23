import React, { useState } from 'react'
import { Input, Menu, Image, Header } from 'semantic-ui-react'
import {Session} from '../api'
import { Link, useHistory } from 'react-router-dom'

const Navbar = ({currentUser, onSignOut}) =>  {
  const history = useHistory()
  const handleSignOut = () => {
    Session.destroy().then(() => {
      onSignOut()
      history.push('/')
    })
  }

  if (currentUser) {
    return (
      <Menu
      style={{marginBottom:0}}>
        <Menu.Item>
          <Link to="/fields">
            <Header as='h1' style={{margin:0}}> 
              Farmage
            </Header>
          </Link>
        </Menu.Item>
        
        <Menu.Menu position='right'>
          <Menu.Item>
            <Header as='h3'>
              {currentUser["full_name"]}
            </Header>
          </Menu.Item>
          <Menu.Item
          name='logout'
          onClick={handleSignOut}
          />
        </Menu.Menu>
      </Menu>
    )
  } else {
    return ("")
  }
}

export default Navbar