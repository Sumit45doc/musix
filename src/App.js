import AudioFileForm from "./components/AudioFileForm";
import PlayAudio from "./components/PlayAudio";
import React, { useState } from 'react';

function App() {
  const [audioBuffer, setAudioBuffer] = useState(null);

  return (
    <div className="App">
      <AudioFileForm setAudioBuffer={setAudioBuffer} />
      <PlayAudio audioBuffer={audioBuffer} />
    </div>
  );
}

export default App;
