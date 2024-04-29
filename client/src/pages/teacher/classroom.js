import Navbar from "@/components/Navbar";
import Sheets from "@/components/Sheets";
import { getToken } from "@/utils/sessions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Classroom = () => {
  const token = getToken();
  const router = useRouter();
  const code = router.query.code;
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      getAssignments(code);
    };

    const getAssignments = async (code) => {
      try {
        const response = await axios.post(
          "https://wsfda4sktc.execute-api.eu-west-2.amazonaws.com/v1/get-assignment",
          {
            classroom_id: code,
          }
        );
        // Check if response.data is an array or an object
        setAssignments(response.data.body.assignmentList);
        console.log(response.data.body.assignmentList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [router]);

  const handleSubmit = async (e) => {

    if (file === null) {
      console.log("jndjnd");
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append("classroom_id", code);
      const response = await axios.post('http://localhost:8000/createAssignment', formData)
      console.log(response);
    } catch (error) {
      console.log(error.response?.data.error)
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="main m-10 gap-4">
        <div className=''>
          <h4 className='text-lg text-pink-700 font-semibold w-fit'>
            Create Assignment
          </h4>
          <br />
          <form onSubmit={handleSubmit} >
            <div className='relative'>
              <input
                id='file'
                name="file"
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                placeholder=''
              />
              <label
                htmlFor='file'
                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
              >
                Select File
              </label>
            </div>
            <br />
            <div className="relative">
              <input
                id='title'
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                placeholder=''
              />
              <label
                htmlFor='title'
                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
              >
                Title
              </label>
            </div>
            <br />
            <div className="relative">
              <input
                id='description'
                name="description"
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer'
                placeholder=''

              />
              <label
                htmlFor='description'
                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
              >
                Add Description
              </label>
            </div>
            <br />
            <button
              className='bg-pink-700 text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none'
              type="submit"
            >
              {'Create Assignment'}
            </button>
          </form>
        </div>
        {assignments.map((classItem) => (
          <Sheets key={classItem} id={classItem} />
        ))}
      </div>
    </>
  );
};

export default Classroom;
