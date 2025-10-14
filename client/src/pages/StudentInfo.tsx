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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        Student Information
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-sm font-medium">Student ID</p>
          <p className="text-gray-800 font-semibold">{studentInfo.studentId}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Student Name</p>
          <p className="text-gray-800 font-semibold">{studentInfo.studentName}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Domain</p>
          <p className="text-gray-800 font-semibold">{studentInfo.domainName}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Date of Birth</p>
          <p className="text-gray-800 font-semibold">{studentInfo.dateOfBirth}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Email</p>
          <p className="text-gray-800 font-semibold">{studentInfo.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Contact Info</p>
          <p className="text-gray-800 font-semibold">{studentInfo.contactInfo}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Native Place</p>
          <p className="text-gray-800 font-semibold">{studentInfo.nativePlace}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Father Name</p>
          <p className="text-gray-800 font-semibold">{studentInfo.fatherName}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium">Mother Name</p>
          <p className="text-gray-800 font-semibold">{studentInfo.motherName}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
