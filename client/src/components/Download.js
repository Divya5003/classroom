import axios from 'axios';
import React from 'react'

const Download = ({ file_id }) => {
    return (
        <>
            <div className='width-[50%]'>
                <a
                    href={`http://localhost:8000/download/${file_id}`}
                    className='bg-pink-700 text-white rounded-md px-6 py-2 text-lg focus:outline-none'
                >
                    Download
                </a>
            </div>
        </>
    )
}

export default Download