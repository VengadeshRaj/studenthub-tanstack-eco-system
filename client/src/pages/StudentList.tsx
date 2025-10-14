import React from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constants/constant";

const StudentList = () => {
  const navigate = useNavigate();
  const { addStudentInfo } = useStudentStore();

  const getStudentList = async () => {
    const response = await fetch(`${BASE_URL}/student/list`);
    const result = await response.json();
    return result.data;
  };

  const {
    data: studentList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["studentList"],
    queryFn: getStudentList,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const buildStudentTable = () =>
    studentList.map((student: any, index: string) => (
      <tr
        key={index}
        className="border-b hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <td
          onClick={() => navigate(`student/${student.studentId}/info`)}
          className="px-4 py-2 text-blue-600 font-medium hover:underline"
        >
          {student.studentId}
        </td>
        <td className="px-4 py-2">{student.studentName}</td>
        <td className="px-4 py-2">{student.domainName}</td>
        <td className="px-4 py-2">{student.dateOfBirth}</td>
        <td className="px-4 py-2">{student.contactInfo}</td>
      </tr>
    ));

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Student Id
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Student Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Domain
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Date of Birth
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Contact Info
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-500">
                  {error?.message || "Error fetching students"}
                </td>
              </tr>
            ) : (
              buildStudentTable()
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/student/add")}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Add New Student
      </button>
    </div>
  );
};

export default StudentList;
