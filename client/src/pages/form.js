import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        // e.preventDefault();

        // const formData = new FormData();
        // formData.append('file', file);

        // try {
        //     const response = await axios.post('http://localhost:8080/upload', formData);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        // }
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default Form

