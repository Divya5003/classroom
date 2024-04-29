import { useRouter } from "next/router";
import React from "react";

const Assignment = ({ student }) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div
      className="m-4 p-4 bg-white shadow-xl rounded-lg cursor-pointer"
      onClick={() =>
        router.push(`${pathname.slice(0, 8)}/submission?id=${student}`)
      }
    >
      <h1 className="text-lg font-semibold">{student}</h1>
    </div>
  );
};

export default Assignment;
