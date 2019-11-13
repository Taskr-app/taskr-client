import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./accessToken";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

interface Definition {
  kind: string;
  operation?: string;
}

const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${process.env.REACT_APP_API_URL}/refresh_token`, {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
});

const authLink = setContext((request, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : ""
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log("GraphQL Error: ", graphQLErrors);
  console.log("Network Error: ", networkError);
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  credentials: 'include',
  fetch
});

const webSocketURI = process.env.REACT_APP_GRAPHQL_URL!.replace(
  /^https?/,
  process.env.NODE_ENV === "production" ? "wss" : "ws"
);
const wsLink = new WebSocketLink({
  uri: webSocketURI,
  options: {
    reconnect: true
  }
})

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink!,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: ApolloLink.from([refreshLink, authLink, errorLink, terminatingLink]),
  cache: new InMemoryCache({})
});
