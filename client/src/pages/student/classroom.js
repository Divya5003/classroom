import Navbar from '@/components/Navbar'
import Sheets from '@/components/Sheets'
import React from 'react'

const Classroom = () => {
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