const { User, Thought } = require("../models");
// Resolvers: functions connected to each query or mutation type definition that perform the CRUD actions that each query or mutation is expected to perform.
// analogous to controller files
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments

const resolvers = {
  Query: {
    // placeholder paramater (parent) needed to able to access second parameter (username)
    // ternary operates checks if username exists.
    // - if so, sets params to an object with user key-value.
    // - if not, returns an empty string.
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
