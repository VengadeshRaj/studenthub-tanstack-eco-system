import React from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";

const StudentList = () => {
  const navigate = useNavigate();

  const { studentList } = useStudentStore();

  const buildStudentTable = () =>
    studentList.map((student:any) => (
      <tr>
        <td>
          <a href={`student/${student.studentId}/info`}>{student.studentId}</a>
        </td>
        <td>{student.studentName}</td>
        <td>{student.stream}</td>
        <td>{student.dob}</td>
        <td>{student.contactInfo}</td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <th>Student Id</th>
          <th>Student name</th>
          <th>Stream</th>
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
