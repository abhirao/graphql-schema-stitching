import React, { Component } from "react";
import { Form, TextArea, Button } from 'semantic-ui-react'
import PersonSelector from './PersonSelector';

class DiscussionTopicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      message: "",
    };
  }
  render() {
    return (
      <Form>
        <PersonSelector onChange={(emails) => {this.setState({participants: emails });}}/>
        <TextArea placeHolder="Topic" onChange={(ev, { value }) => { this.setState({ message: value }); }}/>
        <Button content='Submit' primary onClick={() => { console.log("SUBMIT", this.state) }}/>
      </Form>
    );
  }
}

export default DiscussionTopicForm;