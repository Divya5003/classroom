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

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="main m-10 gap-4">
        <div className="p-4">
          <h1 className="text-lg font-semibold">standard/subject</h1>
        </div>
        <div className="p-4">
          <h2>teacher</h2>
        </div>
        {assignments.map((classItem) => (
          <Sheets key={classItem} id={classItem} />
        ))}
      </div>
    </>
  );
};

export default Classroom;
