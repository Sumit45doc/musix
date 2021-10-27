import React from "react";
import formatTime from "../../utils/formatTime";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

function NoteCard({ note,removeNote  }) {
    return (
        <Grid item xs={3}>
            <Paper
                elevation={4}
                sx={{
                    position: "relative",
                    minHeight: "10vh",
                    padding: "1.5rem",
                }}>
                <IconButton
                    sx={{ position: "absolute", right: "5%", top: "5%" }}
                    onClick={() => removeNote(note) }
                >
                    <Close fontSize='large' />
                </IconButton>
                <Box>
                    <Typography variant='h5'>Comment:</Typography>
                    <Typography variant='h5'>{note.comment}</Typography>
                </Box>
                <Typography variant='h6' sx={{ marginTop: "1rem" }}>
                    Audio timestamp:
                    <span style={{fontWeight: "600"}} >{formatTime(note.time)}</span>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default NoteCard;
