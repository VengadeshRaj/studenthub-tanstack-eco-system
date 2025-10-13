import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constants/constant";
import "../styles/AddStudent.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudentInfo } = useStudentStore();
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    domainRef: "",
    dob: "",
    contactInfo: "",
    email: "",
    fatherName: "",
    motherName: "",
    noOfSibling: "",
    dateOfJoining: "",
  });
  const [studentInfoError, setStudentInfoError] = useState({
    studentName: false,
    domainRef: false,
    dob: false,
    contactInfo: false,
    email: false,
    fatherName: false,
    motherName: false,
    noOfSibiling: false,
    dateOfJoining: false,
  });
  const { data: domains, isLoading } = useQuery({
    queryFn: getDomains,
    queryKey: ["studentDomains"],
  });
  const mutation = useMutation({
    mutationFn: createStudent,
    mutationKey: ["createstudent"],
    onSuccess: () => navigate("/"),
  });

  async function getDomains() {
    try {
      const response = await fetch(`${BASE_URL}/student/domains`);
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      throw Error;
    }
  }

  async function createStudent(newStudent: any) {
    try {
      const response = await fetch(`${BASE_URL}/student/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) {
        throw new Error("Failed to create student");
      }
    } catch (err) {
      throw err;
    }
  }

  const fieldOnblur = (fieldName: string, Value: string) => {
    if (!Value) {
      setStudentInfoError({ ...studentInfoError, [fieldName]: true });
    } else {
      setStudentInfoError({ ...studentInfoError, [fieldName]: false });
    }
  };

  const fieldOnChange = (fieldName: string, Value: string) => {
    setStudentInfo({ ...studentInfo, [fieldName]: Value });
  };
  const buildDomainDropdown = () =>
    domains?.data?.map((domain: { domainName: string; domainRef: string }) => (
      <option value={domain.domainRef}>{domain.domainName}</option>
    ));

  const addStudent = () => {
    const isValidStudentInfo = Object.values(studentInfo).every(
      (field) => field
    );
    if (isValidStudentInfo) mutation.mutate(studentInfo);
  };
  return (
    <div className="add-student-container">
      <div className="field">
        <label>Student Name * :</label>
        <div className="input-field">
          <input
            value={studentInfo.studentName}
            onChange={(e) => fieldOnChange("studentName", e.target.value)}
            onBlur={(e) => fieldOnblur("studentName", e.target.value)}
          />
          {
            <span
              style={{
                color: "red",
                visibility: studentInfoError.studentName ? "visible" : "hidden",
              }}
            >
              Please enter Student Name
            </span>
          }
        </div>
      </div>

      <div className="field">
        <label>Domain * :</label>
        <div className="input-field">
          <select
            defaultValue={studentInfo.domainRef}
            onChange={(e) => fieldOnChange("domainRef", e.target.value)}
            onBlur={(e) => fieldOnblur("domainRef", e.target.value)}
          >
            <option disabled value={""}>
              Select Domain
            </option>
            {buildDomainDropdown()}
          </select>
          <span
            style={{
              color: "red",
              visibility: studentInfoError.domainRef ? "visible" : "hidden",
            }}
          >
            Please select Domain
          </span>
        </div>
      </div>
      <div className="field">
        <label>Date of Birth * :</label>
        <div className="input-field">
          <input
            type="date"
            value={studentInfo.dob}
            onChange={(e) => fieldOnChange("dob", e.target.value)}
            onBlur={(e) => fieldOnblur("dob", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.dob ? "visible" : "hidden",
            }}
          >
            Please enter date of birth
          </span>
        </div>
      </div>
      <div className="field">
        <label>Contact Info * :</label>
        <div className="input-field">
          <input
            type="number"
            value={studentInfo.contactInfo}
            onChange={(e) => fieldOnChange("contactInfo", e.target.value)}
            onBlur={(e) => fieldOnblur("contactInfo", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.contactInfo ? "visible" : "hidden",
            }}
          >
            Please enter Contact Info
          </span>
        </div>
      </div>
      <div className="field">
        <label>Email * :</label>
        <div className="input-field">
          <input
            value={studentInfo.email}
            onChange={(e) => fieldOnChange("email", e.target.value)}
            onBlur={(e) => fieldOnblur("email", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.email ? "visible" : "hidden",
            }}
          >
            Please enter Email
          </span>
        </div>
      </div>
      <div className="field">
        <label>Father Name * :</label>
        <div className="input-field">
          <input
            value={studentInfo.fatherName}
            onChange={(e) => fieldOnChange("fatherName", e.target.value)}
            onBlur={(e) => fieldOnblur("fatherName", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.fatherName ? "visible" : "hidden",
            }}
          >
            Please enter Father name
          </span>
        </div>
      </div>
      <div className="field">
        <label>Mother Name * :</label>
        <div className="input-field">
          <input
            value={studentInfo.motherName}
            onChange={(e) => fieldOnChange("motherName", e.target.value)}
            onBlur={(e) => fieldOnblur("motherName", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.motherName ? "visible" : "hidden",
            }}
          >
            Please enter Mother name
          </span>
        </div>
      </div>
      <div className="field">
        <label>No of Sibiling * :</label>
        <div className="input-field">
          <input
            type="number"
            min={0}
            value={studentInfo.noOfSibling}
            onChange={(e) => fieldOnChange("noOfSibling", e.target.value)}
            onBlur={(e) => fieldOnblur("noOfSibling", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.noOfSibiling ? "visible" : "hidden",
            }}
          >
            Please enter No of Sibling
          </span>
        </div>
      </div>
      <div className="field">
        <label>Date of Joining * :</label>
        <div className="input-field">
          <input
            type="date"
            value={studentInfo.dateOfJoining}
            onChange={(e) => fieldOnChange("dateOfJoining", e.target.value)}
            onBlur={(e) => fieldOnblur("dateOfJoining", e.target.value)}
          />
          <span
            style={{
              color: "red",
              visibility: studentInfoError.dateOfJoining ? "visible" : "hidden",
            }}
          >
            Please enter Date of Joining
          </span>
        </div>
      </div>
      <div className="footer">
        <button onClick={() => navigate("/")}>Cancel</button>
        <button onClick={addStudent}>Add</button>
      </div>
    </div>
  );
};

export default AddStudent;
