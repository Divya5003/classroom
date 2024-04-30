import Download from '@/components/Download';
import Navbar from '@/components/Navbar'
import { getToken } from '@/utils/sessions';
import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const assignment = () => {
    const username = getToken();
    const router = useRouter();
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const assignment_id = router.query.id;

    useEffect(() => {
        const fetchData = async (id) => {
            getAssignments(id);
        };

        const getAssignments = async (id) => {
            try {
                const response = await axios.post(
                    "https://wsfda4sktc.execute-api.eu-west-2.amazonaws.com/v1/get-assignment-details",
                    {
                        assignment_id: id,
                    }
                );
                if (response.data.statusCode == 200) {
                    setAssignments(response.data.assignment);
                    setSubmissions(response.data.assignment.submissions);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(assignment_id);
    }, [router]);

    const handleSubmit = async (e) => {
        const file = e.target.files[0];
        if (file === null) {
            console.log("jndjnd");
        }
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('username', username);
            formData.append('assignment_id', assignment_id);
            const response = await axios.post('http://localhost:8000/upload', formData)

            console.log(response);
        } catch (error) {
            console.log(error.response?.data.error)
        }
    }
    return (
        <>
            <Navbar />
            <div className='main m-10 gap-4'>
                <div className='p-4'>
                    <h1 className='text-lg font-semibold text-pink-700'>Assignment</h1>
                </div>
                <div className='p-4'>
                    <h2>Instructions: {assignments.description}</h2>
                </div>
                <div className="p-4">
                    <Download file_id={assignments.file_id?.$oid} />
                </div>
                <div className='grid grid-cols-2'>
                    <div className='p-8 flex justify-center border-2 shadow-xl rounded-lg'>
                        <form className='w-1/2'>
                            <div className='relative'>
                                <input
                                    id='name'
                                    type='file'
                                    className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                                    placeholder=''
                                    onChange={handleSubmit}
                                />
                                <label
                                    htmlFor='code'
                                    className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                                >
                                    Upload assignment
                                </label>
                            </div>
                            <br />
                            <button
                                className='bg-pink-700 text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none'
                                type="submit"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                    {submissions?.map((item) => {
                        if (item.student_name === username) {
                            return (
                                <div className='p-4'>
                                    <h2>Checked assignment</h2>
                                    <br />
                                    <Download file_id={item.checked_file_id.$oid} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default assignment