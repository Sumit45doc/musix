import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AudioFileForm from '../components/AudoFileForm/AudioFileForm';
import AudioFileFormHeader from '../components/AudoFileForm/AudioFileFormHeader';
import PlayAudio from '../components/PlayAudio/PlayAudio';
import PlayAudioHeader from '../components/PlayAudio/PlayAudioHeader';

function Navigator() {
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [fileName, setFileName] = useState(null);

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <AudioFileFormHeader />
                        <AudioFileForm setFileName={setFileName} setAudioBuffer={setAudioBuffer} />
                    </Route>
                    <Route path="/play-audio">
                        <>
                            <PlayAudioHeader fileName={fileName}  />
                            <PlayAudio fileName={fileName} audioBuffer={audioBuffer} />
                        </>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Navigator
