import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setToken } from '@/utils/sessions';

const AuthForm = ({ type }) => {
    const [userType, setUserType] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (type === 'register' && password !== confirmPassword) {
            console.log("Passwords do not match");
            setMessage("Passwords do not match");
            return;
        }
        else {
            setMessage("");
        }

        try {
            const response = await axios.post(`http://localhost:8000/${type}/${userType}`, {
                username,
                password,
            });

            if (type === 'login') {
                setToken(response.data.token);
            }

            // router.push(`/${userType === 'student' ? 'student' : 'teacher'}/${type === 'register' ? 'login' : 'dashboard'}/${response.data.token}`);
            router.push(type === 'login' ? `${userType === 'student' ? 'student' : 'teacher'}` : '/login');

        } catch (error) {
            setMessage(error.response?.data.error);
            console.log(error.response?.data.error);
        }
    };

    return (
        <div>
            <div className='fixed flex items-center justify-center -z-10'>
                <img
                    className='h-screen w-screen'
                    src='/images/classroom.jpg'
                    alt='classroom'
                />
            </div>
            <div className='bg-black bg-opacity-60 h-screen flex items-center justify-center'>
                <h2 className='absolute top-4 left-4 text-3xl text-pink-700 font-semibold w-fit'>
                    Classroom
                </h2>
                <div className='bg-white p-12 rounded-lg shadow-xl w-1/3'>
                    <h2 className='text-3xl text-pink-700 font-semibold mb-10'>{type === 'register' ? 'Register' : 'Login'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className='relative'>
                            <div className="flex gap-1 w-full">
                                <label className={`w-1/2 text-center p-2 cursor-pointer ${userType === 'student' ? "bg-pink-700 text-white" : "border-2"} rounded-md`} >
                                    <input
                                        type="radio"
                                        value="student"
                                        checked={userType === 'student'}
                                        onChange={() => setUserType('student')}
                                        className="mr-2 leading-tight appearance-none "
                                    />
                                    <span className="text-lg">Student</span>
                                </label>
                                <label className={`w-1/2 text-center p-2 cursor-pointer ${userType === 'teacher' ? "bg-pink-700 text-white" : "border-2"} rounded-md`} >
                                    <input
                                        type="radio"
                                        value="teacher"
                                        checked={userType === 'teacher'}
                                        onChange={() => setUserType('teacher')}
                                        className="mr-2 leading-tight appearance-none"
                                    />
                                    <span className="text-lg">Teacher</span>
                                </label>
                            </div>
                        </div>
                        <br />
                        {type === 'login' &&
                            <p
                                className='italic text-pink-700'
                            >
                                {message}
                            </p>
                        }
                        <div className='relative'>
                            <input
                                id='username'
                                type='text'
                                value={username}
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                                placeholder=' '
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label
                                htmlFor='username'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                Username
                            </label>
                        </div>
                        <br />
                        <div className='relative'>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                                placeholder=' '
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor='password'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                Password
                            </label>
                        </div>
                        {type === 'register' && (<>
                            <br />
                            <div className='relative'>
                                <input
                                    id='confirmPassword'
                                    type='password'
                                    value={confirmPassword}
                                    className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                                    placeholder=' '
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label
                                    htmlFor='confirmPassword'
                                    className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <p
                                className='italic text-pink-700'
                            >
                                {message}
                            </p>
                        </>)}
                        <br />
                        <button
                            className='bg-pink-700 text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none'
                            type="submit"
                        >
                            {type === 'register' ? 'Register' : 'Login'}
                        </button>
                    </form>
                    <br />
                    <h2>
                        {type === 'register' ? 'Already a user? ' : "Don't have an account? "}
                        <span
                            className='text-pink-700 underline cursor-pointer'
                            onClick={() => router.push(`/${type === 'register' ? 'login' : 'register'}`)}
                        >
                            Click here
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
