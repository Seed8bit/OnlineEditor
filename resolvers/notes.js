const Note = require('../models/notes');
const User = require('../models/users');

const getUser = async(userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      return {...user._doc, 
        createdNotes: getNotes(user._doc.createdNotes)}
    }
  } catch (err) {
    throw err;
  }
};

const getNotes = async(noteid) => {
  try {
    const notes = await Note.find({
      _id: {$in: noteid}
    });
    return notes.map((note) => {
      return {...note._doc};
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  notes: async({id}) => {      // id is objectId for user
    try {
      const notes = await Note.find((err) => {
        if (err) {
          throw err;
        }
      });
      
      const userNotes = notes.filter(note=>{
        return (id === (note._doc.userCreator._id + "")); 
      }).map(note => {
          return {...note._doc, userCreator: getUser(note.userCreator)}
      });
      return userNotes;
    } catch (err) {
      throw err;
    }
  },
  note: async ({id}) => {
    try {
      const findNote = await Note.findById(id)
      return {
        ...findNote._doc
      }
    } catch (err) {
      throw err;
    }
  },
  deleteNote: async({_id}, req) => {

    if (!req.authUser) {
      throw new Error('Not Authorized');
    }

    try {
      const note = await Note.findByIdAndRemove({_id: _id})
      return {...note._doc};
    } catch (err) {
      throw err;
    }
  },
  createNote: async({noteInput}, req) => {

    if (!req.authUser) {
      throw new Error('Not Authorized');
    }

    const note = new Note({
      title: noteInput.title,
      content: noteInput.content,
      image: noteInput.image,
      userCreator: req.userId
    });

    let notes;
    try {
      const result = await note.save();
      const findUser = await User.findById(req.userId);
      if (!findUser) {
        return new Error('User not found!');
      } else {
        findUser.createdNotes.push(note);
        notes = {
          ...result._doc
        };
        await findUser.save();
        return notes;
      }
      
    } catch (err) {
      return new Error(err);
    }
  }
}