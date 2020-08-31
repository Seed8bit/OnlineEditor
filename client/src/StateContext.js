import React, { createContext, useState } from 'react';
import {EditorState} from 'draft-js';

export const StateContext = createContext();

export const StateProvider = ({children}) => {
  const [state, setState] = useState({
    loginToggle: false,
    registerToggle: false,
    editorState: EditorState.createEmpty(),
    contentState: null,
    uploadImages: [],
    loginError: "",
    registerSuccess: "",
    registerError: "",
    username: "",
    userid: "",
    authToken: "",
    userDocs: [],
  });
  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  )
}