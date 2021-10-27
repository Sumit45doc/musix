import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoteCard from "./NoteCard";
import Grid from "@mui/material/Grid";

function NotesList({ notes, fileName,setNotes }) {
    const notesList = notes.filter((note) => note.audioName === fileName);


    const removeNote = (noteData) => {
        const newNotes =notes.filter(note => {
            if (note.audioName === noteData.audioName && note.time === noteData.time) {
                return false;
            }
            return true;
        });

        setNotes(newNotes);

        window.localStorage.setItem('notes', JSON.stringify(newNotes));
    }
    return (
        <Box
            sx={{
                padding: "2rem 1rem",
                backgroundColor: "white",
                boxShadow: "0 0 15px -10px rgba(0, 0, 0, 0.75)",
                marginTop: "5rem",
                minHeight: "20vh",
            }}>
            <Typography
                variant='h4'
                style={{
                    marginLeft: "0.5rem",
                    textTransform: "uppercase",
                    borderBottom: "1px solid black",
                    paddingBottom: "0.8rem",
                    marginBottom: "1.5rem",
                }}>
                Your audio notes ({fileName})
            </Typography>
            <Grid
                container
                display='flex'
                alignItems='center'
                rowSpacing={{ xs: 2 }}
                columnSpacing={{ xs: 4 }}>
                {notesList.map((note) => (
                    <NoteCard note={note} key={note.time} removeNote={removeNote} />
                ))}
            </Grid>
        </Box>
    );
}

export default NotesList;
