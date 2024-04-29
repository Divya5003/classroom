import React from "react";
import axios from "axios";
import { getToken } from "@/utils/sessions";
import { useRouter } from "next/router";
import { useState } from "react";
const submission = () => {
  const username = getToken();
  const router = useRouter();
  const assignment_id = router.query.id;
  console.log("assginmentid", assignment_id);
  // const [file, setFile] = useState(null);
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
    <div>
      <div className="p-8 flex justify-center border-2 shadow-xl rounded-lg">
        <form className="w-1/2" >
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
  );
};

export default submission;
