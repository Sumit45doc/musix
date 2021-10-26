import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

function AudioFileForm(props) {
    const { setAudioBuffer, setFileName } = props;
    const history = useHistory();
    const [fileData, setFileData] = useState(null);

    const handleFile = (e) => {
        setFileData(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setFileName(fileData.name);
        setAudioBuffer(fileData);
        history.push("/play-audio");
    };

    return (
        <div>
             <form onSubmit={onSubmit}>
                <input type='file' onChange={handleFile} />
                <button type='submit'>Upload Audio</button>
            </form>
        </div>
    )
}

export default AudioFileForm
