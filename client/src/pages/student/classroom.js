import Navbar from '@/components/Navbar'
import Sheets from '@/components/Sheets'
import { getToken } from '@/utils/sessions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Classroom = () => {
    const token = getToken();
    const router = useRouter();

    useEffect(() => {
        // Check for the presence of the token
        if (!token) {
            // Redirect to the login page if the token is not present
            router.push('/login');
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