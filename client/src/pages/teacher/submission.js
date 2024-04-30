import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "@/utils/sessions";
import { useRouter } from "next/router";
import { useState } from "react";
import Download from "@/components/Download";
const submission = () => {
  const username = getToken();
  const router = useRouter();
  const assignment_id = router.query.id;
  const student = router.query.student;
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetchData = async (id) => {
      getSubmissions(id);
    };

    const getSubmissions = async (id) => {
      try {
        const response = await axios.post(
          "https://wsfda4sktc.execute-api.eu-west-2.amazonaws.com/v1/get-assignment-details",
          {
            assignment_id: id,
          }
        );
        if (response.data.statusCode == 200) {
          setAssignments(response.data.assignment);
          console.log(response.data);
          setSubmissions(response.data.assignment.submissions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(assignment_id);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file === null) {
      console.log("file not found");
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('username', username);
      formData.append('assignment_id', assignment_id);
      const response = await axios.post('http://localhost:8000/upload-checked', formData)

      console.log(response.json);
    } catch (error) {
      console.log(error.response?.data.error)
    }
  }


  return (
    <div className="m-8">
      <div className="flex justify-center">
        <div className="p-8 border-2 shadow-xl rounded-lg">
          <form className="" >
            <div className="relative">
              <input
                id='file'
                name="file"
                type='file'
                onChange={handleSubmit}
                className="rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer"
                placeholder=""

              />
              <label
                htmlFor="code"
                className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"

              >
                Upload assignment
              </label>
            </div>
            <br />
            <button
              className="bg-pink-700 text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        {submissions?.map((item) => {
          console.log(item.student_name);
          console.log(student);
          if (item.student_name === student) {
            return (
              <div className='p-4'>
                <h2>Checked assignment</h2>
                <br />
                <Download file_id={item.file_id} />
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default submission;
