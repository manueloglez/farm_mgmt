import React, {useEffect} from 'react' 
import {User} from '../api'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignUpPage = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const {currentTarget: form} = event
    const formData = new FormData(form)
    const params = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }
    User.create(params).then(data => {
      if(data.id) {
        props.onSignUp()
        props.history.push('/fields')
      }
    })
  }

  useEffect(() => {
    User.current().then(user => {
      if (user.id) {
        props.history.push('/fields')
      }
    })
  }, [])

  return(
    <main>
      <Grid style={{ height: '100vh' }} verticalAlign='middle' >
        <Grid.Column width={6} style={{padding: '0 50px'}} textAlign='center'>
            <Header as='h2' color='teal' textAlign='center'>
              Create a new account
            </Header>
            <Form onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name' name= 'first_name' id='first_name' type='text'/>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name' name= 'last_name' id='last_name' type='text'/>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name= 'email' id='email' type='email'/>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  id='password'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password Confirmation'
                  type='password'
                  name='password_confirmation'
                  id='password_confirmation'
                />
                <Button color='teal' fluid size='large'>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already a user? <Link to='/sign_in'>Log-in</Link>          
            </Message>
        </Grid.Column>
        <Grid.Column width={10} style={{height: '100%'}}  >
          <Image style={{height: '100%'}} src='https://images.unsplash.com/photo-1558871585-4c3574a1b7cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmllbGRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' />
        </Grid.Column>
      </Grid>
    </main>
  )
}


export default SignUpPage;