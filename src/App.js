import AudioFileForm from "./components/AudioFileForm";
import PlayAudio from "./components/PlayAudio";
import React, { useState } from 'react';

function App() {
  const [audioData, setAudioData] = useState(null);

  return (
    <div className="App">
      <AudioFileForm setAudioData={setAudioData} />
      <PlayAudio audioData={audioData} />
    </div>
  );
}

export default App;
