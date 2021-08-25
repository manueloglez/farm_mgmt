import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import { Field } from '../api'
import { useHistory } from 'react-router-dom'


const FieldForm = (props) => {
  const history = useHistory()
  const handleSubmit = event => {
    const { currentTarget } = event
    event.preventDefault()

    const formData = new FormData(currentTarget)
    const params = {
      name: formData.get('name'),
      location: formData.get('location'),
      crop_type: formData.get('crop_type'),
      user: props.user.id
    }
    Field.create(params).then(res => {
      if (res?.id) {
        history.push(`/fields/${res.id}`)
      } else {
        console.log(res)
      } 
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Field Name</label>
        <input placeholder='Field Name' name='name'/>
      </Form.Field>
      <Form.Field>
        <label>Location</label>
        <input placeholder='Last Name' name='location'/>
      </Form.Field>
      <Form.Field>
        <label>Crop Type</label>
        <input placeholder='Crop Type' name='crop_type'/>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default FieldForm;