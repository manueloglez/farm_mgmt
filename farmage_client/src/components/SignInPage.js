import React, {useState, useEffect} from 'react' 
import {Session, User} from '../api'
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
              Log-in to your account
            </Header>
            <Form onSubmit={handleSubmit}>
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
        <Grid.Column width={10} style={{height: '100%'}}  >
          <Image style={{height: '100%'}} src='https://images.unsplash.com/photo-1558871585-4c3574a1b7cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmllbGRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' />
        </Grid.Column>
      </Grid>
    </main>
  )
}


export default SignInPage;