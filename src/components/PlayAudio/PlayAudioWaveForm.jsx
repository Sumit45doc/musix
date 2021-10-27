import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import formatTime from "../../utils/formatTime";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PlayArrow from "@mui/icons-material/PlayArrowSharp";
import Pause from "@mui/icons-material/PauseSharp";
import Fab from "@mui/material/Fab";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WaveFormNoteModal from "./WaveFormNoteModal";

function PlayAudioWaveForm({ fileName, audioBuffer, notes, setNotes }) {
    const [currentAudioTime, setCurrentAudioTime] = useState(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalAudioTime, setModalAudioTime] = useState(0);
    const [audioValue, setAudioValue] = React.useState({
        volume: 3,
        duration: 0,
        isPlaying: false,
        currentTime: null,
        isMute: false,
    });
    const [openNoteModal, setNoteModal] = useState(false);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);

    const wavesurferRef = React.useRef();
    const audioRef = React.useRef();

    // loading modal open and close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // note modal open and close function
    const handleNoteModalClose = () => setNoteModal(false);
    const handleNoteModalOpen = () => {
        setModalAudioTime(wavesurferRef.current.getCurrentTime());
        setNoteModal(true);
    };


    // save note in local storage
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes.length]);

    const displayTimer = (val, def = "Loading ...") => {
        if (typeof val === "undefined" || isNaN(val)) {
            return def;
        }
        return formatTime(val);
    };

    // waveform functionality
    useEffect(() => {
        wavesurferRef.current = WaveSurfer.create({
            container: "#waveform",
            waveColor: "violet",
            progressColor: "purple",
        });

        if (typeof audioBuffer?.name !== "string") {
            return;
        }

        wavesurferRef.current.loadBlob(audioBuffer);

        wavesurferRef.current.on("ready", () => {
            setCurrentAudioTime(0);
            setAudioDuration(wavesurferRef.current.getDuration());
        });

        wavesurferRef.current.on("error", () => {
            console.log("wavesurfer error");
        });

        wavesurferRef.current.on("seek", () => {
            setCurrentAudioTime(wavesurferRef.current.getCurrentTime());
            handleNoteModalOpen();
        });

        wavesurferRef.current.on("finish", () => {
            setCurrentAudioTime(0);
            setIsPlaying(false);
        });

        return () => {
            clearInterval(audioRef.current);
            wavesurferRef.current.destroy();
        };
    }, []);

    // modal spinner for loading
    useEffect(() => {
        if (currentAudioTime === null) {
            handleOpen();
        } else {
            handleClose();
        }
    }, [currentAudioTime]);

    // toggle between play and pause button
    const toggleAudio = () => {
        wavesurferRef.current.playPause();

        if (wavesurferRef.current.isPlaying()) {
            setIsPlaying(true);
            audioRef.current = setInterval(() => {
                setCurrentAudioTime(wavesurferRef.current.getCurrentTime());
            }, 500);
        } else {
            setIsPlaying(false);
            clearInterval(audioRef.current);
        }
    };

    // volume step
    const maxVolumeStep = 10;
    // function to change the volume slider
    const handleSliderChange = (event, value) => {
        if (wavesurferRef.current === null) {
            return;
        }

        if (value instanceof Array) {
            value = value.length > 0 ? value[0] : 0;
        }

        wavesurferRef.current.setVolume(value / maxVolumeStep);
        wavesurferRef.current.setMute(false);

        setAudioValue((prevAudioValue) => {
            return { ...prevAudioValue, volume: value, isMute: false };
        });
    };

    // function to toggle between mute and unmute
    const toggleVolume = () => {
        if (wavesurferRef.current === null) {
            return;
        }
        let mute = true;
        if (wavesurferRef.current.getMute()) {
            mute = false;
        }
        wavesurferRef.current.setMute(mute);
        setAudioValue((prevAudioValue) => {
            return { ...prevAudioValue, isMute: mute };
        });
    };

    // submit modal for writing notes
    const onSubmitModalNote = () => {
        if (comment === "") return;

        setNotes((notes) => [
            ...notes,
            {
                audioName: fileName,
                time: modalAudioTime,
                comment,
            },
        ]);
        handleNoteModalClose();
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 4,
    };

    return (
        <div
            style={{
                paddingTop: "1px",
            }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <CircularProgress color='secondary' />
                </Box>
            </Modal>
            <WaveFormNoteModal
                openNoteModal={openNoteModal}
                handleNoteModalClose={handleNoteModalClose}
                comment={comment}
                setComment={setComment}
                onSubmitModalNote={onSubmitModalNote}
            />
            <Box
                sx={{
                    padding: "2rem 1rem",
                    backgroundColor: "white",
                    boxShadow: "0 0 15px -10px rgba(0, 0, 0, 0.75)",
                }}>
                <Box
                    sx={{
                        padding: "2rem 2rem 0",
                        borderBottom: "1px solid",
                    }}>
                    <div id='waveform'></div>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1.2rem",
                        marginTop: "0.5rem",
                    }}>
                    <Typography variant='h6'>00:00</Typography>
                    <Typography variant='h6'>
                        {currentAudioTime == null
                            ? "Loading ..."
                            : displayTimer(currentAudioTime)}
                    </Typography>
                    <Typography variant='h6'>
                        {displayTimer(audioDuration, "00:00")}
                    </Typography>
                </Box>

                <Grid
                    container
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Grid item>
                        <Fab
                            size='medium'
                            color='secondary'
                            aria-label='add'
                            onClick={toggleAudio}>
                            {isPlaying ? (
                                <Pause fontSize='large' />
                            ) : (
                                <PlayArrow fontSize='large' />
                            )}
                        </Fab>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={{ lg: 2 }}>
                            <IconButton onClick={toggleVolume}>
                                {audioValue.isMute ? (
                                    <VolumeOff fontSize='large' />
                                ) : (
                                    <VolumeUp fontSize='large' />
                                )}
                            </IconButton>
                            <Slider
                                min={0}
                                max={10}
                                value={audioValue.volume}
                                onChange={handleSliderChange}
                                aria-labelledby='input-slider'
                                valueLabelDisplay='auto'
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default PlayAudioWaveForm;
