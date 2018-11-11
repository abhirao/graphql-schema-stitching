import React from "react";
import { Query } from "react-apollo";
import { Segment, List, Loader } from 'semantic-ui-react'
import { GET_TOPICS } from "./apollo/queries";

const DiscussionTopicList = () => (
  <Segment>
    <Query
      query={GET_TOPICS}
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