import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation';
import Modal from './Modal';

const Navbar = () => {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='sticky px-10 py-6 bg-white shadow-2xl w-full flex justify-between items-end'>
            <h2 className='text-xl text-pink-700 font-semibold w-fit'>
                Classroom
            </h2>
            <div className='flex items-center gap-8'>
                <div>
                    <Icon
                        className='cursor-pointer'
                        icon="material-symbols:add"
                        height={30}
                        width={30}
                        onClick={() => setShowModal(true)}
                    />
                </div>
                <div className='rounded-full w-fit border-2 border-black p-1'>
                    <Icon
                        className='cursor-pointer'
                        icon="material-symbols:person"
                        height={25}
                        width={25}
                    />
                </div>
            </div>
            {showModal &&
                <Modal
                    user={`${pathname.includes('/student') ? 'student' : 'teacher'}`}
                />
            }
        </div>
    )
}

export default Navbar