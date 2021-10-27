import React,{useState} from "react";
import NotesList from "../NotesList/NotesList";
import EmptyComment from "./EmptyComment";

import PlayAudioWaveForm from "./PlayAudioWaveForm";

const getLocalItems = () => {
    const list = localStorage.getItem("notes");
    if (list) {
        const tmp = JSON.parse(list);
        console.log("Init", tmp, Date.now());
        return tmp;
    } else {
        return [];
    }
};

function PlayAudio({ audioBuffer, fileName }) {
    const [notes, setNotes] = useState(getLocalItems());
    const noteList =
    notes.length !== 0 ? (
        <NotesList notes={notes} fileName={fileName} setNotes={setNotes} />
    ) : (
        <EmptyComment />
    );
    return (
        <div  style={{
            backgroundColor: "#f9fafb",
            paddingTop: "1px",
            minHeight: "91vh",
            padding:"1rem 5rem"
        }}>
            <PlayAudioWaveForm audioBuffer={audioBuffer} fileName={fileName} notes={notes} setNotes={setNotes} />
            {noteList}
        </div>
    );
}

export default PlayAudio;
