const {buildSchema} = require('graphql');

// Create dummy data
const notes = [
  {
    id: 1, 
    title: "tim", 
    content:"allen"
  },
]

// Build Schema
const ourSchema = buildSchema(`
type Query {
  notes: [Note],
  note(id: ID): Note
}

type Note {
  id: ID,
  title: String,
  content: String,
  image: String
}

input noteInput {
  title: String,
  content: String,
  image: String
}

type Mutation {
  createNote(noteInput: noteInput): Note,
  deleteNote(id: ID): Note
}
`);

// Create resolvers
const resolver = {
  note: ({ id }) => notes[id - 1],
  notes: () => notes,
  createNote: ({noteInput}) => {
    const note = {
      id: notes.length + 1,
      title: noteInput.title,
      content: noteInput.content,
      image: noteInput.image
    };
    notes.push(note);
    return note;
  }
};

module.exports = {ourSchema, resolver};