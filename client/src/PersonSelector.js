import React from "react";
import { Dropdown, Form, Loader } from 'semantic-ui-react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PersonSelector = ({ onChange }) => (
  <Query
    query={gql`
      {
        apps {
          User_Profiles {
            atoms {
              properties {
                name
                user_email
              }
            }
          }
        }
      }
    `}>
    {
      ({ loading, data }) => (
        loading ? <Loader content='Loading' /> : <Form.Field><Dropdown 
          placeholder='Participants' 
          fluid multiple selection 
          options={data.apps['User_Profiles'].atoms.map(rec => rec.properties).map((person) => ({ key: person.user_email, text: person.name, value: person.user_email }))} 
          onChange={(ev, { value }) => { onChange(value); }}
        /></Form.Field>
      )
    }
  </Query>
);

export default PersonSelector;