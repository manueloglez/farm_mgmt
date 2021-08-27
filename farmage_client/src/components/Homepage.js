
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

const Homepage = (props) => {
  useEffect(() => {
    console.log(props)
  }, [])
  return (
  <>
  <Segment inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical>
    <Container text>
      <Header
        as='h1'
        content='Farmage'
        inverted
        style={{
          fontSize: '6em',
          fontWeight: 600,
          marginBottom: 0,
          marginTop: '2em',
        }}
      />
      <Header
        as='h2'
        content='Keeping your fields organized.'
        inverted
        style={{
          fontSize: '2em',
          fontWeight: 'normal',
          marginTop: '1em',
          marginBottom: '1em'
        }}
      />
      { props.user ? 
        <Link>
          <Link to='/fields'>
            <Button color='teal' size='huge'>
              Go to your fields
            </Button>
          </Link>
        </Link> : 
        <> 
          <Link to='/sign_in'>
            <Button color='teal' size='huge'>
              Log in
            </Button>
          </Link>
          <Link to='/sign_up'>
            <Button color='teal' size='huge'>
              Get Started
              <Icon name='right arrow' />
            </Button>
          </Link>
        </>
      }
    </Container>
  </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Header as='h4' inverted>
          About this project
        </Header>
        <p>
          Extra space for a call to action inside the footer that could help re-engage users.
        </p>
      </Container>
    </Segment>
  </>
)}

export default Homepage