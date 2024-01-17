import React from 'react'
import { useRouter } from 'next/router';

const Classes = ({ standard, subject, teacher }) => {
    const router = useRouter();
    return (
        <div className='m-4 bg-white shadow-xl rounded-lg cursor-pointer' onClick={() => router.push('/student/classroom')}>
            <div className=''>
                <img
                    className='w-fill'
                    src='/images/classroom.jpg'
                    alt='classroom'
                    width={400}
                    height={55}
                />
            </div>
            <div className='p-4'>
                <h1 className='text-lg font-semibold'>{`${standard}/${subject}`}</h1>
            </div>
            <div className='p-4'>
                <h2>{teacher}</h2>
            </div>
        </div>
    )
}

export default Classes