import React from "react";
import { Dropdown, Form, Loader } from 'semantic-ui-react'

const PersonSelector = ({ people, value, onChange }) => (
  people.length === 0 ? 
    <Loader content='Loading' /> : 
    <Form.Field>
      <Dropdown 
        placeholder='Participants' 
        fluid multiple selection 
        value={value}
        options={people.map((person) => ({ key: person.id, text: person.name, value: person.id }))} 
        onChange={(ev, { value }) => { onChange(value); }}
      />
    </Form.Field>
);

export default PersonSelector;