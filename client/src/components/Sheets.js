import { useRouter } from 'next/router'
import React from 'react'

const Sheets = () => {
    const router = useRouter();
    
    return (
        <div className='m-4 p-4 bg-white shadow-xl rounded-lg cursor-pointer' onClick={() => router.push(`/student/assignment`)}>
            <h1 className='text-lg font-semibold'>Answer sheet</h1>
        </div>
    )
}

export default Sheets