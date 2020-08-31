import React, { useContext, useEffect } from 'react';
import './Sidebar.css';
import Notes from "../components/Notes";
import {StateContext} from "../StateContext";

const Sidebar = () => {
  const [state, setState] = useContext(StateContext);
  const {userDocs} = state;

  useEffect(() => {
    const {userid} = state;

    const fetchData = async() => {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({query: `{ notes(id: "${userid}"){title,content} }`})
      }).then(r => r.json())
      .then((res) => {
        if (res.data && res.data.notes) {
          if (res.data.notes.length !== state.userDocs.length) {
            setState({...state, userDocs: res.data.notes})
          }
        } else {
          throw new Error('fetching documents failed!');
        }
      });
    }

    fetchData();
  });     // TODO, add dependency list

  return(
    <React.Fragment>
      <section className="sidebar-container">
        <div className="header-container w-full border-gray-500 shadow">
          <div className="header-top mb-12">
            <div className="header-title text-2xl">
              <h3>All Notes</h3>
            </div>
            <div className="header-account">
              <div className="header-login pr-3">
                <p className="text-blue-600">
                  User:{state.username}
                </p>
              </div>
            </div>
          </div>
          <div className="header-below">
            <div className="header-notes">1 notes</div>
            <div className="header-filter">filter option</div>
          </div>
        </div>
        <div className="note-list w-full px-2 mt-8">
          <Notes fetchedNotes={userDocs}/>
        </div>
      </section>

    </React.Fragment>
  )
}

export default Sidebar