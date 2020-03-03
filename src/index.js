import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// Apollo
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";

// Stitch
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";

// Instantiate a StitchClient
const APP_ID = "sports-app-fyhai";

const app = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID);

// Get the logged in user's access token from the StitchAuth interface
export async function getAccessToken(credential) {
    await app.auth.loginWithCredential(credential);
    const { accessToken } = app.auth.activeUserAuthInfo;
    return accessToken;
}

// Add an Authorization header with a valid user access token to all requests
// NOTE: You can use a credential for any enabled authentication provider
const credential = new AnonymousCredential();
const authorizationHeaderLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken(credential);
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,

        },
    };
});

// Construct a new Apollo HttpLink that connects to your app's GraphQL endpoint
const graphql_url = `https://stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url });

// Construct a new Apollo client with the links we just defined
const client = new ApolloClient({
    link: authorizationHeaderLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
