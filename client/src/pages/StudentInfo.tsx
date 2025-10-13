import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import { useQuery } from "@tanstack/react-query";

const StudentInfo = () => {
  const { studentid } = useParams();

  const getStudentInfo = async () => {
    const response = await fetch(`${BASE_URL}/student/info/${studentid}`);
    const result = await response.json();
    return result.data;
  };
  const { data: studentInfo, isLoading } = useQuery({
    queryFn: getStudentInfo,
    queryKey: ["studentinfo", studentid],
  });

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>Student Id</h1>
          <h3>{studentInfo.studentId}</h3>
          <h1>Student Name</h1>
          <h3>{studentInfo.studentName}</h3>
          <h1>Domain</h1>
          <h3>{studentInfo.domainName}</h3>
          <h1>Date of Birth</h1>
          <h3>{studentInfo.dateOfBirth}</h3>
          <h1>Email</h1>
          <h3>{studentInfo.email}</h3>
          <h1>Contact Info</h1>
          <h3>{studentInfo.contactInfo}</h3>
          <h1>Native</h1>
          <h3>{studentInfo.nativePlace}</h3>
          <h1>Father Name</h1>
          <h3>{studentInfo.fatherName}</h3>
          <h1>Mother Name</h1>
          <h3>{studentInfo.motherName}</h3>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
