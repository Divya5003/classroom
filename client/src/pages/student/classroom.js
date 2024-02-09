import Navbar from '@/components/Navbar'
import Sheets from '@/components/Sheets'
import { getToken } from '@/utils/sessions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const Classroom = () => {
    const token = getToken();
    const router = useRouter();

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

    return (
        <>
            <Navbar />
            <div className='main m-10 gap-4'>
                <div className='p-4'>
                    <h1 className='text-lg font-semibold'>standard/subject</h1>
                </div>
                <div className='p-4'>
                    <h2>teacher</h2>
                </div>
                <Sheets />
                <Sheets />
                <Sheets />
            </div>
        </>
    )
}

export default Classroom