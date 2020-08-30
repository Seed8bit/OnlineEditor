import React, { useContext, useEffect } from 'react';
import './Sidebar.css';
import Notes from "../components/Notes";
import {StateContext} from "../StateContext";

const Sidebar = () => {
  const [state] = useContext(StateContext);

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
          <Notes/>
        </div>
      </section>

    </React.Fragment>
  )
}

export default Sidebar