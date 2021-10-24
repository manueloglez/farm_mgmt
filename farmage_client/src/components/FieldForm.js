import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import { Field, Polygon } from '../api'
import { useHistory } from 'react-router-dom'
import KmlBase from './KmlBase';



const FieldForm = ({user, geometry, setGeometry}) => {
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    const { currentTarget } = e
    const formData = new FormData(currentTarget)
    const fieldParams = {
      name: formData.get('name'),
      location: formData.get('location'),
      crop_type: formData.get('crop_type'),
      user: user.id,
    }
    const polygonParams = {
      classification: 'base',
      geom: JSON.stringify(geometry),
      user: user.id,
    }
    Field.create(fieldParams).then(field => {
      Polygon.create(field.id, polygonParams).then(data => {
        console.log(data)
        history.push(`/fields/${field.id}`)
      }).catch(err => {
        console.log(err)
      })
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
      <Form.Field >
        <label>Crop Type</label>
        <input placeholder='Crop Type' name='crop_type'/>
      </Form.Field>
      <KmlBase setGeometry={setGeometry}/>
      <Button.Group style={{marginTop: '30px', width: '100%'}}>
          <Button onClick={() => {history.push('/fields')}}>Cancel</Button>
          <Button.Or />
          <Button positive type='submit'>Create</Button>
      </Button.Group>
    </Form>
  )
}

export default FieldForm;