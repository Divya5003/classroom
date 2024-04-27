import Navbar from '@/components/Navbar'
import React from 'react'

const assignment = () => {
    return (
        <>
            <Navbar />
            <div className='main m-10 gap-4'>
                <div className='p-4'>
                    <h1 className='text-lg font-semibold'>assignment name</h1>
                </div>
                <div className='grid grid-cols-2'>
                    <div className='p-4'>
                        <h2>assignment pdf</h2>
                    </div>
                    <div className='p-8 flex justify-center border-2 shadow-xl rounded-lg'>
                        <form className='w-1/2'>
                            <div className='relative'>
                                <input
                                    id='name'
                                    type='file'
                                    className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                                    placeholder=''
                                />
                                <label
                                    htmlFor='code'
                                    className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                                >
                                    Upload assignment
                                </label>
                            </div>
                            <br />
                            <button
                                className='bg-pink-700 text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none'
                                type="submit"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                    <div className='p-4'>
                        <h2>Checked assignment</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default assignment