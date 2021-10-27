import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import formatTime from "../../utils/formatTime";
import NotesList from "../NotesList/NotesList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    useEffect(() => {
        if (currentAudioTime === null) {
            handleOpen();
        } else {
            handleClose();
        }
    }, [currentAudioTime]);

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

    const noteList =
        notes.length !== 0 ? (
            <NotesList notes={notes} fileName={fileName} />
        ) : (
            ""
        );

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 10,
        // bgcolor: "background.paper",
        // border: "2px solid #000",
        // boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <CircularProgress color="secondary" />
                </Box>
            </Modal>
            <Box>
                <div id='waveform'></div>
            </Box>
            <div>
                <div>00:00</div>
                <div>
                    {currentAudioTime == null
                        ? "Loading ..."
                        : displayTimer(currentAudioTime)}
                </div>
                <div>{displayTimer(audioDuration, "00:00")}</div>
            </div>
            <div>
                <div>
                    <button type='button' onClick={toggleAudio}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            </div>
            {noteList}
        </div>
    );
}

export default PlayAudio;
