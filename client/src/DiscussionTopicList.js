import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { Segment, List, Loader, Button, Icon } from 'semantic-ui-react'
import { GET_TOPICS, DELETE_TOPIC } from "./apollo/queries";
import "./DiscussionTopicList.css"

class DiscussionTopicList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedId: "" };
  }
  render() {
    const { people } = this.props;
    const { selectedId } = this.state;
    return (
      <Query
        query={GET_TOPICS}
      >
        {({loading, data}) => (
          <Segment>
            <List selection>
              {
                (loading || people.length === 0) ? <Loader content='Loading' /> : 
                  data.listDiscussionTopics.items.length === 0 ? 'No discussion topics' : data.listDiscussionTopics.items.map((item) => (
                    <List.Item key={item.id} className={item.id === selectedId ? 'selected' : ''} onClick={() => {this.setState({ selectedId: item.id });}}>
                      <List.Content>
                        <List.Header as="a">
                          {item.participants.map(id => (people.find(person => person.id === id).name)).join(', ')}
                        </List.Header>
                        <List.Description>
                          {item.topic}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                ))
              }
            </List>
            {
              selectedId.length > 0 && <Mutation mutation={DELETE_TOPIC}>
                {
                  (deleteTopic, { loading }) => (
                    <Button icon labelPosition={ loading && "left" } type="button" disabled={loading} onClick={() => { deleteTopic({ variables: { topicInput: { id: selectedId } }, refetchQueries: [{ query: GET_TOPICS }] }).then(() => { this.setState({ selectedId: "" }) }); }}>
                      {loading ? "..." : null}
                      <Icon name='delete' />
                    </Button>
                  ) 
                }
              </Mutation>
            }
          </Segment>
        )}
      </Query>
    );
  }
}

export default DiscussionTopicList;