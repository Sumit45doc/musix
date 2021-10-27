import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Audiotrack from "@mui/icons-material/Audiotrack";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function PlayAudioHeader({fileName}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' variant="dense">
                <Toolbar>
                    <Link to='/' style={{color: "white"}}>
                        <IconButton
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}>
                            <ArrowBack fontSize='large' />
                        </IconButton>
                    </Link>
                    <Stack direction="row" alignItems="center" >
                        <Audiotrack fontSize='large' />
                        
                        <Typography variant='h4' style={{marginLeft: "0.5rem"}} >
                            {fileName}
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default PlayAudioHeader;
