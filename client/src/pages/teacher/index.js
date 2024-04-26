import Classes from '@/components/Classes'
import Navbar from '@/components/Navbar'
import { getToken } from '@/utils/sessions';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const router = useRouter();
    const username = getToken();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("username", username);
            // Check for the presence of the token
            // if (!username) {
            //     // Redirect to the login page if the token is not present
            //     router.push('/login');
            // } else {
                getClasses(username);
            // }
        };

        const getClasses = async (username) => {
            try {

                const response = await axios.post('https://wsfda4sktc.execute-api.eu-west-2.amazonaws.com/v1/get-classes', {
                    "username": username
                });
                // Check if response.data is an array or an object
                setClasses(response.data.body.classes);
                console.log(response);
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
                        teacher={classItem.class_code}
                    />
                ))}
            </div>

        </>
    )
}

export default Dashboard