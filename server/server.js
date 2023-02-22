const path = require("path");
const express = require("express");

const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
// creates new apollo server, passes in the schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // jwt | every req performs auth check. updated req obj is passed to the resolvers as context
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// creates new instance of an apollo server w/ the graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // intergrates apllo server with express app as middleware
  server.applyMiddleware({ app });

  // production | serves up static assets (react frontend)
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  // production | get wildcard reqs receive the production-ready react frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

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
