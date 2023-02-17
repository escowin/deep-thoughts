// Type definitions: involves defining every piece of data that the client can expect to work with through a query or mutation. Every GraphQL API starts with defining this data, as this type of strict type definition gives the client clarity as to what they ask for and what they can expect in return. Defines not only the API endpoint, but also defines the exact data and parameters tied to the endpoint.

// imports gql tagged template function
const { gql } = require('apollo-server-express');

// creates typeDefs | all type definitions go into the tagged template function
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

// exports typeDefs
module.exports = typeDefs;