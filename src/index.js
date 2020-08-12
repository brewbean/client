import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, concat } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
// import { config } from './constants';
import { URI, token } from './constants';
import App from './App';
import './tailwind.generated.css';

const httpLink = createHttpLink({
  uri: URI // config.GQL_URL
});

const jwtToken = token;

const authMiddleWare= new ApolloLink((operation, forward)=>{
  operation.setContext({
    headers: {
      authorization: `Bearer ${jwtToken}`
    } 
  });
  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleWare, httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


