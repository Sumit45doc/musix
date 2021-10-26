import React, { useState, useEffect } from "react";
import Waveform from "waveform-react";

function PlayAudio({ audioBuffer }) {
  const [timestampMarker, setTimestampMarker] = useState(0);

  const changeMarkerPosition = (pos) => {
    setTimestampMarker(pos);
  };

  useEffect(() => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();

    const timer1 = setTimeout(() => {
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
      console.log("Audio started");
    }, 2000);

    const timer2 = setTimeout(() => {
      audioCtx.suspend().then(() => {});
      audioCtx.close().then(() => {});
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [audioBuffer]);

  console.log({ audioBuffer });
  return (
    <div>
      <Waveform
        buffer={audioBuffer}
        height={150}
        markerStyle={{
          color: "red",
          width: 4,
        }}
        onPositionChange={(pos) => changeMarkerPosition(pos)}
        plot='bar'
        position={timestampMarker}
        responsive={false}
        showPosition={true}
        waveStyle={{
          animate: true,
          color: "blue",
          pointWidth: 1,
        }}
        width={window.screen.availWidth - 100}
      />
    </div>
  );
}

export default PlayAudio;
