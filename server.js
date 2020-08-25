const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const app = express();
const {ourSchema, resolver} = require('./schema');

app.use(
  "/graphql",
  graphqlHTTP({
    schema: ourSchema,
    rootValue: resolver,
    graphiql: true
  })
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("server is running");
});