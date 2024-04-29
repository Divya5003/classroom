import React from "react";

const submission = () => {
  const uploadfile = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://wsfda4sktc.execute-api.eu-west-2.amazonaws.com/v1/create",
      {}
    );
  };

  return (
    <div>
      <div className="p-8 flex justify-center border-2 shadow-xl rounded-lg">
        <form className="w-1/2">
          <div className="relative">
            <input
              id="name"
              type="file"
              className="rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-pink-700 bg-zinc-200 peer"
              placeholder=""
            />
            <label
              htmlFor="code"
              className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              onClick={uploadfile}
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
