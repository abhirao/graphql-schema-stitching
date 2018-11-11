import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apollo/client";
import 'semantic-ui-css/semantic.min.css';
import DiscussionTopicForm from './DiscussionTopicForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={apolloClient}>
          <DiscussionTopicForm />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
