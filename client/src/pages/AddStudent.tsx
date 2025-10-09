import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudentInfo } = useStudentStore();
  const [studentInfo, setStudentInfo] = useState({
    studentId: "",
    studentName: "",
    stream: "",
    dob: "",
    contactInfo: "",
  });

  const fieldOnChange = (fieldName: string, Value: string) => {
    setStudentInfo({ ...studentInfo, [fieldName]: Value });
  };

  const addStudent = () => {
    debugger
    addStudentInfo(studentInfo);
    navigate("/");
  };
  return (
    <div>
      <div>
        <label>Student Id</label>
        <input
          maxLength={10}
          value={studentInfo.studentId}
          onChange={(e) => fieldOnChange("studentId", e.target.value)}
        />
      </div>
      <div>
        <label>Student Name</label>
        <input
          value={studentInfo.studentName}
          onChange={(e) => fieldOnChange("studentName", e.target.value)}
        />
      </div>
      <div>
        <label>Stream</label>
        <input
          value={studentInfo.stream}
          onChange={(e) => fieldOnChange("stream", e.target.value)}
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          value={studentInfo.dob}
          onChange={(e) => fieldOnChange("dob", e.target.value)}
        />
      </div>
      <div>
        <label>Contact Info</label>
        <input
          type="number"
          value={studentInfo.contactInfo}
          onChange={(e) => fieldOnChange("contactInfo", e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => navigate("/")}>Cancel</button>
        <button onClick={addStudent}>Add</button>
      </div>
    </div>
  );
};

export default AddStudent;
