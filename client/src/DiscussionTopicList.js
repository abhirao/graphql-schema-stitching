import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Segment, List, Loader } from 'semantic-ui-react'

const DiscussionTopicList = () => (
  <Segment>
    <Query
      query={gql`
        {
          listDiscussionTopics {
            items {
              id
              topic
              participants
            }
          }
        }
      `}
    >
      {({loading, data}) => (
        <List>
          {
            loading ? <Loader content='Loading' /> : 
              data.listDiscussionTopics.items.length === 0 ? 'No discussion topics' : data.listDiscussionTopics.items.map(item => (
                <List.Item key={item.id}>
                  <List.Content>
                    <List.Header as="a">
                      {item.participants.join(', ')}
                    </List.Header>
                    <List.Description>
                      {item.topic}
                    </List.Description>
                  </List.Content>
                </List.Item>
            ))
          }
        </List>
      )}
    </Query>
  </Segment>
);

export default DiscussionTopicList;