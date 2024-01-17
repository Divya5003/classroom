import Classes from '@/components/Classes'
import Navbar from '@/components/Navbar'
import React from 'react'

const Dashboard = () => {
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