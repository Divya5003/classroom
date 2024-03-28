import Classes from '@/components/Classes'
import Navbar from '@/components/Navbar'
import { getToken } from '@/utils/sessions';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [classes, setClasses] = useState([]);

    // useEffect(() => {
    //     const token = getToken();
    //     setUsername(jwtDecode(token).username);
    //     // Check for the presence of the token
    //     if (!token) {
    //         // Redirect to the login page if the token is not present
    //         router.push('/login');
    //     }
    //     else if (jwtDecode(token).user_type === 'teacher') {
    //         router.push('/teacher');
    //     }
    // }, [router]);

    // const getClasses = async (username) => {
    //     try {
    //         console.log(username);
    //         const response = await axios.get(`http://localhost:8000/classes/${username}`)
    //         // if (response.status === 200) {
    //         console.log(response);
    //         setClasses(response);
    //         // }
    //     } catch (error) {
    //         console.log(error.response?.data.error);
    //     }
    // }
    // getClasses(username);

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
            // Check for the presence of the token
            if (!token) {
                // Redirect to the login page if the token is not present
                router.push('/login');
            } else if (jwtDecode(token).user_type === 'teacher') {
                router.push('/teacher');
            } else {
                getClasses(jwtDecode(token).username);
            }
        };

        const getClasses = async (username) => {
            try {

                const response = await axios.get(`http://localhost:8000/classes/${username}`);
                // Check if response.data is an array or an object
                setClasses(response.data.classes);
                console.log(response.data.classes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [router]);

    return (
        <>
            <Navbar />
            <div className='main m-10 grid grid-cols-4 gap-4'>
                {classes.map((classItem) => (
                    <Classes
                        key={classItem}
                        id={classItem.id}
                        subject={classItem.name}
                        teacher={classItem.teacher}
                    />
                ))}
            </div>

        </>
    )
}

export default Dashboard