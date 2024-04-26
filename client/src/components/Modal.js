// import { getToken } from '@/utils/sessions';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'

const Modal = ({ user }) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    // const token = getToken();
    // const username = jwtDecode(token).username;
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (user === 'teacher') {
            try {
                const response = await axios.post('http://localhost:8000/create', {
                    name,
                    username,
                })

                if (response.status === 200) {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error.response?.data.error);
                setMessage(error.response?.data.error);
            }
        }
        else {
            try {
                const response = await axios.post('http://localhost:8000/join', {
                    code,
                    username,
                })
            } catch (error) {
                console.log(error.response?.data.error);
                setMessage(error.response?.data.error);
            }
        }
    }
    return (
        <div className="fixed w-full h-full bg-black bg-opacity-60 flex z-50 items-center justify-center top-0 left-0">
            <div className="flex flex-col items-center bg-white rounded-md p-10">
                <div className=''>
                    <h4 className='text-lg text-pink-700 font-semibold w-fit'>
                        {user === 'student' ? 'Join a class' : 'Create a class'}
                    </h4>
                    <br />
                    <form onSubmit={handleFormSubmit}>
                        <p
                            className='italic text-pink-700'
                        >
                            {message}
                        </p>
                        <div className='relative'>
                            <input
                                id='name'
                                type='text'
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                                value={user === 'teacher' ? name : code}
                                placeholder=''
                                onChange={(e) => { user === 'teacher' ? setName(e.target.value) : setCode(e.target.value) }}

                            />
                            <label
                                htmlFor='code'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                {user === 'student' ? 'Enter class code' : 'Enter class name'}
                            </label>
                        </div>
                        <br />
                        <button
                            className='bg-pink-700 text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none'
                            type="submit"
                        >
                            {user === 'student' ? 'Join' : 'Create'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal