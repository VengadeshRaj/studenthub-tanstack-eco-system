import React from "react";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
    const navigate = useNavigate();
  const studentList = [
    {
      studentId: 1234,
      studentName: "john",
      stream: "Computer science",
      dob: "01/02/2000",
      contactInfo: "123465789",
    },
    {
      studentId: 2345,
      studentName: "mike",
      stream: "ECE",
      dob: "01/02/2001",
      contactInfo: "999999999",
    },
    {
      studentId: 5698,
      studentName: "kate",
      stream: "Computer science",
      dob: "01/03/2000",
      contactInfo: "987456123",
    },
    {
      studentId: 8888,
      studentName: "loius",
      stream: "Data science",
      dob: "01/02/1999",
      contactInfo: "12457898",
    },
    {
      studentId: 1111,
      studentName: "yolo",
      stream: "Mathematics",
      dob: "01/02/1998",
      contactInfo: "65498732",
    },
  ];

  const buildStudentTable = () =>
    studentList.map((student) => (
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
      <button onClick={()=> navigate('/student/add')}>Add new student</button>
    </div>
  );
};

export default StudentList;
