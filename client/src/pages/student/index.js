import Classes from '@/components/Classes'
import Navbar from '@/components/Navbar'
import { getToken } from '@/utils/sessions';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const router = useRouter();
    const token = getToken();
    const username = jwtDecode(token).username;
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Check for the presence of the token
        if (!token) {
            // Redirect to the login page if the token is not present
            router.push('/login');
        }
        else if (jwtDecode(token).user_type === 'teacher') {
            router.push('/teacher');
        }
    }, [token, router]);

    const getClasses = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/classes/${username}`)
            if (response.status === 200) {
                setClasses(response.data.classes);
                console.log(response.data.classes);
            }
        } catch (error) {
            console.log(error.response?.data.error);
        }
    }

    getClasses();

    return (
        <>
            <Navbar />
            <div className='main m-10 grid grid-cols-4 gap-4'>
                <Classes
                    standard='10A'
                    subject='Maths'
                    teacher='ABC'
                />
                <Classes
                    standard='10A'
                    subject='Physics'
                    teacher='XYZ'
                />
                <Classes
                    standard='9B'
                    subject='Chemistry'
                    teacher='John Doe'
                />
                <Classes
                    standard='9A'
                    subject='Biology'
                    teacher='Sia Lenn'
                />
            </div>

        </>
    )
}

export default Dashboard