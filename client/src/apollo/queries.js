import gql from "graphql-tag";

export const GET_TOPICS = gql`
  query getTopics {
    listDiscussionTopics {
      items {
        id
        topic
        participants
      }
    }
  }
`;

export const MAKE_TOPIC = gql`
  mutation makeTopic($topicInput: CreateDiscussionTopicInput!) {
    createDiscussionTopic(input: $topicInput) {
      id
      topic
      participants
    }
  }
`;