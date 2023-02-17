const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
// creates new apollo server, passes in the schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// creates new instance of an apollo server w/ the graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // intergrates apllo server with express app as middleware
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // logs where to test gql api
      console.log(
        `use graphql at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// calls async function to start server
startApolloServer(typeDefs, resolvers);
