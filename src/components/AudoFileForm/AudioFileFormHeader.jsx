import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Audiotrack from "@mui/icons-material/Audiotrack";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function AudioFileFormHeader() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' variant='dense'>
                <Toolbar>
                    <Stack direction='row' alignItems='center'>
                        <Audiotrack fontSize='large' />
                        <Typography
                            variant='h4'
                            style={{ marginLeft: "0.5rem" }}>
                                Upload file and make your note in any timestamp of audio
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AudioFileFormHeader;
