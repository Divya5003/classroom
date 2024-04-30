import Assignment from "@/components/Assignment";
import Download from "@/components/Download";
import Navbar from "@/components/Navbar";
import { getToken } from "@/utils/sessions";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const assignment = () => {
  const router = useRouter();
  const id = router.query.id;
  const token = getToken();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
          <h1 className="text-lg font-semibold text-pink-700">Assignment</h1>
        </div>
        <div className="p-4">
          <Download file_id={assignments.file_id?.$oid} />
        </div>
        <div className="p-4">
          <h2><strong>Instructions</strong>: {assignments.description}</h2>
        </div>
        {submissions?.map((item) => (
          <Assignment key={item.file_id} student={item.student_name} />
        ))}
      </div>
    </>
  );
};

export default assignment;
