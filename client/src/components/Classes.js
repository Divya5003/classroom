import React from "react";
import { useRouter } from "next/router";

const Classes = ({ subject, code }) => {
  const router = useRouter();
  return (
    <div
      className="m-4 bg-white shadow-xl rounded-lg"
    >
      <div className="">
        <img
          className="w-fill cursor-pointer"
          src="/images/classroom.jpg"
          alt="classroom"
          width={400}
          height={55}
          onClick={() => router.push(`${router.pathname}/classroom?code=${code}`)}
        />
      </div>
      <div className="p-4">
        <h1 className="text-lg font-semibold">{subject}</h1>
      </div>
      <div className="p-4">
        <h2><strong>Class code:</strong> {code}</h2>
      </div>
    </div>
  );
};

export default Classes;
