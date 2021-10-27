import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Audiotrack from "@mui/icons-material/Audiotrack";
import FileUpload from "@mui/icons-material/FileUpload";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function AudioFileForm(props) {
    const { setAudioBuffer, setFileName } = props;
    const history = useHistory();
    const [fileData, setFileData] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFile = (e) => {
        setFileData(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setFileName(fileData.name);
        setAudioBuffer(fileData);
        if (fileData === null) {
            handleClick();
        }
        history.push("/play-audio");
    };

    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}>
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f9fafb",
            }}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message='Select audio file again.Something went wrong!!'
                action={action}
            />
            <Box
                sx={{
                    boxShadow: "0 0 15px -10px rgba(0, 0, 0, 0.75)",
                    padding: "10rem",
                    disppay: "flex",
                }}>
                <form onSubmit={onSubmit}>
                    <Stack direction='column' alignItems='center' spacing={2}>
                        <label htmlFor='contained-button-file'>
                            <input
                                accept='.mp3, .wav, .aac, .wma, .m4a'
                                id='contained-button-file'
                                type='file'
                                style={{ display: "none" }}
                                onChange={handleFile}
                            />
                            <Button
                                variant='contained'
                                startIcon={<Audiotrack />}
                                sx={{ fontSize: "1.6rem" }}
                                size='large'
                                color='secondary'
                                component='span'>
                                Select audio file
                            </Button>
                        </label>
                        <div>
                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                size='large'
                                sx={{ fontSize: "1.4rem" }}
                                startIcon={<FileUpload />}
                                disabled={fileData === null ? true : false}>
                                Upload Audio
                            </Button>
                        </div>
                    </Stack>
                </form>
                {fileData?.name && (
                    <Box
                        sx={{
                            marginTop: "2rem",
                            fontSize: "1.4rem",
                            textAlign: "center",
                        }}>
                        <Typography
                            variant='h5'
                            style={{
                                marginLeft: "0.5rem",
                                marginBottom: "1.5rem",
                            }}>
                            File Name: <span style={{fontWeight: "600"}} >{fileData.name}</span>
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default AudioFileForm;
