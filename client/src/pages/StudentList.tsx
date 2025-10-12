import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";

const StudentList = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const { addStudentInfo } = useStudentStore();
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = async () => {
    const response = await fetch(`${baseUrl}/student/list`);
    if (response.ok) {
      const result = await response.json();
      console.log("data", result.data);
      setStudentList(result.data);
    }
  };

  const buildStudentTable = () =>
    studentList.map((student: any, index) => (
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
        <tbody>{buildStudentTable()}</tbody>
      </table>
      <button onClick={() => navigate("/student/add")}>Add new student</button>
    </div>
  );
};

export default StudentList;
