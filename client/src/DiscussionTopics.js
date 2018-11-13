import React, { Component } from "react";
import { Header, Grid, Form, TextArea, Button } from 'semantic-ui-react'
import { Mutation, Query } from "react-apollo";
import { GET_PEOPLE, GET_TOPICS, MAKE_TOPIC } from './apollo/queries';
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
        <Query
          query={GET_PEOPLE}
        >
          {
            ({ loading, data }) => {
              const people = loading ? [] : data.apps['User_Profiles'].atoms.map(rec => ({ id: rec.id, name: rec.properties.name }));
              return (
                <Grid columns={2} stackable>
                  <Grid.Row>
                    <Grid.Column>
                      <DiscussionTopicList people={people} />
                    </Grid.Column>
                    <Grid.Column>
                      <Mutation
                        mutation={MAKE_TOPIC}
                      >
                      {
                        (makeTopic, { loading }) => (
                          <Form
                            onSubmit={(ev) => {
                              ev.preventDefault();
                              const { topic, participants } = this.state;
                              makeTopic({ variables: { topicInput: { topic, participants } }, refetchQueries: [{ query: GET_TOPICS }] }).then(() => {
                                this.setState({ topic: "", participants: [] });
                              });
                            }}
                          >
                            <PersonSelector people={people} value={this.state.participants} onChange={(emails) => {this.setState({participants: emails });}}/>
                            <TextArea placeholder="Topic" value={this.state.topic} onChange={(ev, { value }) => { this.setState({ topic: value }); }}/>
                            <Button type="submit" content={ loading ? 'Submiting...' : 'Submit' } primary disabled={loading} />
                          </Form>
                        )
                      }
                      </Mutation>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
            }
          }
        </Query>
      </>
    );
  }
}

export default DiscussionTopics;