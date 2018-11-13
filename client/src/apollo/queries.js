import gql from "graphql-tag";

export const GET_PEOPLE = gql`
  query getPeople {
    apps {
      User_Profiles {
        atoms {
          id
          properties {
            name
            user_email
          }
        }
      }
    }
  }
`;
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

export const DELETE_TOPIC = gql`
  mutation deleteTopic($topicInput: DeleteDiscussionTopicInput!) {
    deleteDiscussionTopic(input: $topicInput) {
      id
    }
  }
`;