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
    error
  } = useQuery({
    queryKey: ["studentList"],
    queryFn: getStudentList,
  });

  const buildStudentTable = () =>
    studentList.map((student: any, index: string) => (
      <tr key={index}>
        <td onClick={() => navigate(`student/${student.studentId}/info`)}>
          {student.studentId}
        </td>
        <td>{student.studentName}</td>
        <td>{student.domainName}</td>
        <td>{student.dateOfBirth}</td>
        <td>{student.contactInfo}</td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <th>Student Id</th>
          <th>Student name</th>
          <th>Domain</th>
          <th>Date of birth</th>
          <th>contact info</th>
        </thead>
        <tbody>{isLoading ? <h1>Loading... </h1> : buildStudentTable()}</tbody>
      </table>
      <button onClick={() => navigate("/student/add")}>Add new student</button>
    </div>
  );
};

export default StudentList;
