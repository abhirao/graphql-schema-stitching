import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apollo/client";
import 'semantic-ui-css/semantic.min.css';
import DiscussionTopics from './DiscussionTopics';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={apolloClient}>
          <DiscussionTopics />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
