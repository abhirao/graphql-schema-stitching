import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List, Loader } from 'semantic-ui-react'
import { list } from "../node_modules/postcss";

const DiscussionTopicList = () => (
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
              <List.Content key={item.id}>
                <List.Header as="a">
                  {item.participants.join(', ')}
                </List.Header>
                <List.Description>
                  {list.topic}
                </List.Description>
              </List.Content>
          ))
        }
      </List>
    )}
  </Query>
);

export default DiscussionTopicList;