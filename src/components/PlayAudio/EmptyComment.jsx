import React from "react";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Audiotrack from "@mui/icons-material/Audiotrack";
import Typography from "@mui/material/Typography";

function EmptyComment() {
    return (
        <Box
            sx={{
                padding: "2rem 1rem",
                backgroundColor: "white",
                boxShadow: "0 0 15px -10px rgba(0, 0, 0, 0.75)",
                marginTop: "5rem",
                minHeight: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <IconButton>
                <Audiotrack fontSize="large" />
                {" "}
                <Typography variant='h5'>Empty Note.</Typography>
            </IconButton>
            </Box>
    );
}

export default EmptyComment;
