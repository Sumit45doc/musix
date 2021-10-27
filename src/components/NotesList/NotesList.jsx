import React from "react";
import formatTime from "../../utils/formatTime";
function NotesList({ notes, fileName }) {
    const notesList = notes.filter((note) => note.audioName === fileName);
    return (
        <div>
            {notesList.map((note) => {
                return (
                    <div key={note.time}>
                        {formatTime(note.time)} - {note.comment}
                    </div>
                );
            })}
        </div>
    );
}

export default NotesList;
