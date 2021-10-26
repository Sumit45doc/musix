import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
// import formatTime from "../utils/formatTime";
import formatTime from "../utils/formatTime"
import NotesList from "./NotesList";
import style from "./PlayAudio.module.css";

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
    const [currentAudioTime, setCurrentAudioTime] = useState(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [audioInterval, setAudioInterval] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes.length]);

    const displayTimer = (val, def = "Loading ...") => {
        if (typeof val === "undefined" || isNaN(val)) {
            return def;
        }
        return formatTime(val);
    };

    const wavesurferRef = React.useRef();

    useEffect(() => {
        wavesurferRef.current = WaveSurfer.create({
            container: "#waveform",
            waveColor: "violet",
            progressColor: "purple",
        });
        wavesurferRef.current.loadBlob(audioBuffer);

        wavesurferRef.current.on("ready", () => {
            setCurrentAudioTime(0);
            setAudioDuration(wavesurferRef.current.getDuration());

            wavesurferRef.current.on("seek", () => {
                setCurrentAudioTime(wavesurferRef.current.getCurrentTime());
                addNote();
            });
        });
    }, []);

    const addNote = () => {
        const comment = prompt("Enter the note");
        if (comment === "" || comment === null) return;

        setNotes((notes) => [
            ...notes,
            {
                audioName: fileName,
                time: wavesurferRef.current.getCurrentTime(),
                comment,
            },
        ]);
    };

    const toggleAudio = () => {
        wavesurferRef.current.playPause();

        if (wavesurferRef.current.isPlaying()) {
            setIsPlaying(true);
            setAudioInterval(
                setInterval(() => {
                    setCurrentAudioTime(wavesurferRef.current.getCurrentTime());
                }, 500)
            );
        } else {
            setIsPlaying(false);
            clearInterval(audioInterval);
        }
    };

    const noteList = notes.length !== 0 ? <NotesList notes={notes} fileName={fileName} /> : "";

    return (
        <div className={style.container}>
            <div className={style.waveForm}>
                <div id='waveform'></div>
            </div>
            <div className={style.timer}>
                <div>00:00</div>
                <div>
                    {currentAudioTime == null
                        ? "Loading ..."
                        : displayTimer(currentAudioTime)}
                </div>
                <div>{displayTimer(audioDuration, "00:00")}</div>
            </div>
            <div className={style.uiControls}>
                <div>
                    <button
                        type='button'
                        onClick={toggleAudio}
                        className={style.btn}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            </div>
            {noteList}
        </div>
    );
}

export default PlayAudio;
