import React from 'react';
import { useState } from 'react';
import './App.css';

function FileUpload() {
    const [file, setFile] = useState();

    function handleFile(event) {
        setFile(event.target.files[0]);
        // console.log(event.target.files[0].name);
    }

    function handleUpload() {
        const formData = new FormData();
        formData.append('file', file);
        fetch(
            'url',
            {
                method: "POST",
                body: formData
            }
        ).then((response) => response.json())
        .then(
            (result) => {
                console.log('success', result)
            }
        )
        .catch(error => {
            console.error("Error: ", error)
        })
    }

    return (
        <div className="App-header">
            <h2>File Upload:</h2>
            {file && <p>Selected file: {file.name}</p>}
            <form onSubmit={handleUpload}>
                <input type="file" name="file" onChange={handleFile}/>
                <button className="button">Upload</button>
            </form>
        </div>
    )
}

export default FileUpload;