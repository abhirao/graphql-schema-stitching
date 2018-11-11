import React, { Component } from "react";
import { Grid, Divider, Form, TextArea, Button } from 'semantic-ui-react'
import PersonSelector from './PersonSelector';
import DiscussionTopicList from './DiscussionTopicList';

class DiscussionTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      message: "",
    };
  }
  render() {
    return (
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical />
        <Grid.Row>
          <Grid.Column>
            <DiscussionTopicList />
          </Grid.Column>
          <Grid.Column>
            <Form>
              <PersonSelector onChange={(emails) => {this.setState({participants: emails });}}/>
              <TextArea placeHolder="Topic" onChange={(ev, { value }) => { this.setState({ message: value }); }}/>
              <Button content='Submit' primary onClick={() => { console.log("SUBMIT", this.state) }}/>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default DiscussionTopics;