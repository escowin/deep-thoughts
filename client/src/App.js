import {
  ApolloProvider, // provider component, provides data to all other components
  ApolloClient, // constructor function, initializes graphql api server connection
  InMemoryCache, // enables apollo client instance to cache api response data. more efficient performance requests
  createHttpLink, // controls how apollo client makes requests. outbound network request middleware
} from "@apollo/client";

import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const httpLink = createHttpLink({ // establishes a new graphql server link
  // uri | avoids absolute paths (proxy key-value added to package.json to handle development & production env)
  uri: '/graphql',
});

// instantiates apollo client & creates the api endpoint connection
const client = new ApolloClient({
  link: httpLink,
  // instantiates cache object
  cache: new InMemoryCache(),
});

function App() {
  return (
    // enables application to interact with apollo client instance. client variable passed as client prop value allows everything inside oto have access to the server's api data.
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
