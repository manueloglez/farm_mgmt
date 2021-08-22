import React from 'react'
import { User } from '../api'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignUpPage = (props) => {
  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const params = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }
    console.log(params)
    User.create(params).then(res => {
      if(res?.id) {
        props.onSignUp()
        props.history.push('/questions')
      } else { 
        console.log(res)
      }
    })
  }
  return(
    <main>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create a new account
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name= 'email' id='email' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                id='password'
              />
              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to='/sign_in'>Log-in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </main>
  )
}

export default SignUpPage