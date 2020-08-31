import React from 'react'

const Notes = ({fetchedNotes}) => {

  let id = 0;

  const notes = fetchedNotes.map((note) => {
    id += 1;
    return (
      <React.Fragment key={id}>
        <div className="rounded overflow-hidden shadow bg-gray-200 mb-3" onClick={() => {console.log('zxcvzxcvz')}}>
          <div className="px-6 py-4"> 
            <div className="font-bold text-xl mb-2">{note.title}</div>
            <p className ="text-gray-700 text-base">
              {note.content}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  })

  return(
    <React.Fragment>
      {notes}
    </React.Fragment>
  );
}

export default Notes;