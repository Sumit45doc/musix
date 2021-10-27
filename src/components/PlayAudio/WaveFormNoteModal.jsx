import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function WaveFormNoteModal({openNoteModal,handleNoteModalClose,comment,setComment,onSubmitModalNote}) {
    return (
        <Dialog open={openNoteModal} onClose={handleNoteModalClose}>
                <DialogTitle sx={{fontSize: "1.8rem"}} >Note</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Comment'
                        type='text'
                        fullWidth
                        variant='standard'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{fontSize: "1.6rem"}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleNoteModalClose()} sx={{fontSize: "1.4rem"}}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmitModalNote} sx={{fontSize: "1.4rem"}} >Add to Note</Button>
                </DialogActions>
            </Dialog>
    )
}

export default WaveFormNoteModal
