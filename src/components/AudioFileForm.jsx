import React,{useState} from 'react'

function AudioFileForm(props) {
    const { setAudioData } = props;

    const [fileData, setFileData] = useState(null);

    const handleFile = (e) => {
        e.preventDefault();
        setFileData(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        reader.readAsArrayBuffer(fileData);

        reader.onload = function () {
            const audioCtx = new AudioContext();
            audioCtx
                .decodeAudioData(reader.result)
                .then((data) => {
                    setAudioData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    };

    return (
        <div>
             <form onSubmit={onSubmit}>
                <input type='file' onChange={handleFile} />
                <button type='submit'>Upload audio</button>
            </form>
        </div>
    )
}

export default AudioFileForm
