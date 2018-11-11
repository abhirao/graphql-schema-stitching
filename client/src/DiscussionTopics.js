import React, { Component } from "react";
import { Header, Grid, Form, TextArea, Button } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import PersonSelector from './PersonSelector';
import DiscussionTopicList from './DiscussionTopicList';

class DiscussionTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      topic: "",
    };
  }
  render() {
    return (
      <>
        <Header size='huge'>GraphQL Schema Stitching Demo</Header>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <DiscussionTopicList />
            </Grid.Column>
            <Grid.Column>
              <Mutation
                mutation={gql`
                  mutation makeTopic($topicInput: CreateDiscussionTopicInput!) {
                    createDiscussionTopic(input: $topicInput) {
                      id
                      topic
                      participants
                    }
                  }
                `}
              >
              {
                (makeTopic) => (
                  <Form
                    onSubmit={(ev) => {
                      ev.preventDefault();
                      const { topic, participants } = this.state;
                      makeTopic({ variables: { topicInput: { topic, participants } } }).then(() => {
                        this.setState({ topic: "", participants: [] });
                      });
                    }}
                  >
                    <PersonSelector value={this.state.participants} onChange={(emails) => {this.setState({participants: emails });}}/>
                    <TextArea placeholder="Topic" value={this.state.topic} onChange={(ev, { value }) => { this.setState({ topic: value }); }}/>
                    <Button type="submit" content='Submit' primary/>
                  </Form>
                )
              }
              </Mutation>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default DiscussionTopics;