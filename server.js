const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const app = express();
const {ourSchema} = require('./schema');
const allResolver = require('./resolvers/index');
const authmiddleware = require('./middleware');

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://new_user_0123:Seattle1234@cluster0.9xbld.azure.mongodb.net/test?
retryWrites=true&w=majority`, {useNewUrlParser : true, useUnifiedTopology: true}, (err) => {
  if (err) return console.log(err);
  console.log('Connected to mongodb');
});

app.use(authmiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: ourSchema,
    rootValue: allResolver,
    graphiql: true
  })
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("server is running");
});