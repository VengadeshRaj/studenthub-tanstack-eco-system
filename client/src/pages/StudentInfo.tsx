import React from "react";
import { useParams } from "react-router-dom";

const StudentInfo = () => {
  const { studentid } = useParams();

  return (
    <div>
      <h1>zstudent {studentid}</h1>
    </div>
  );
};

export default StudentInfo;
