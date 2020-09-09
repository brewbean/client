import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createClient, Provider } from 'urql';
// import { config } from './constants';
import config from './constants';
import App from './App';
import './tailwind.generated.css';
const jwtToken = config.token;

const client = createClient({
  url: config.GQL_URL,
  fetchOptions: () => {
    const token = jwtToken;
    return {
      headers: { authorization: token ? `Bearer ${jwtToken}` : ''},
    };
  },
});
ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
    <Provider value={client}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* </ApolloProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);


