import React, {useState} from 'react' 
import {Session} from '../api'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignInPage = (props) => {
  const [errors, setErrors] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault()
    const {currentTarget: form} = event
    const formData = new FormData(form)
    const params = {
      email: formData.get('email'),
      password: formData.get('password')
    }
    Session.create(params).then(data => {
      if(data.status === 404) {
        setErrors([...errors, {message: 'Wrong email or Password'}])
      } else {
        props.history.push('/fields')
        if(typeof props.onSignIn === 'function'){
          props.onSignIn()
        }
      }
    })
  }
  return(
    <main>
      <Grid columns={2} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
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
            New to us? <Link to='/sign_up'>Sign Up</Link>
          </Message>
        </Grid.Column>
        <Grid.Column >
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
      </Grid>
    </main>
  )
}


export default SignInPage;