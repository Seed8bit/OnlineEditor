const express = require('express');
const {graphqlHTTP} = require("express-graphql");

const {buildSchema} = require('graphql');
const app = express();

// Create dummy data
const data = [
  {id: 1, firstname: "tim", lastname:"allen", favColor: ["blue", "pink", "teal"]},
  {id: 2, firstname: "band", lastname:"dave", favColor: ["yellow", "pink", "teal"]},
  {id: 3, firstname: "carry", lastname:"fred", favColor: ["white", "red", "brown"]}
];

// Build Schema
const ourSchema = buildSchema(`
type Query {
  people: [Person]
}

type Person {
  id: ID,
  firstname: String,
  lastname: String
}

input personInput {
  firstname: String,
  lastname: String
}

type Mutation {
  AddPerson(input: personInput): [Person]
}
`)

// Create resolvers
const resolver = {
  people: () => data,
  AddPerson: ({input}) => {
    const person = {
      id: data.length,
      firstname: input.firstname,
      lastname: input.lastname
    };
    data.push(person);
    return data;
  }
};

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