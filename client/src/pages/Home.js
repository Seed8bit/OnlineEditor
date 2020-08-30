import React, { useContext } from 'react';
import CodeEditor from '../components/CodeEditor';
import Sidebar from '../components/SideBar';
import './Home.css';
import {StateContext} from '../StateContext';
import { useHistory  } from "react-router-dom";

const Home = () => {
  const [state] = useContext(StateContext);
  const username = state.username;
  const history = useHistory();

  if (username === "") {
    history.push("/login");
  }

  return(
    <React.Fragment>
      <div className="home-container">
        <div className="sidebar">
          <Sidebar/>
        </div>
        <div className="editor">
          <CodeEditor/>
        </div>
      </div>
    </React.Fragment>
    
  )
}

export default Home;