import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AudioFileForm from "./components/AudioFileForm";
import PlayAudio from "./components/PlayAudio";

function Navigator() {
    const [audioBuffer, setAudioBuffer] = useState(null);

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/upload-file">
                        <AudioFileForm setAudioBuffer={setAudioBuffer} />
                    </Route>
                    <Route path="/play-audio">
                        <PlayAudio audioBuffer={audioBuffer} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Navigator
