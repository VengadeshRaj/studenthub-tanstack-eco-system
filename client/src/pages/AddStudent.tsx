import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../constants/constant";

const AddStudent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    noOfSibling: false,
    dateOfJoining: false,
  });
  const { data: domains } = useQuery({
    queryFn: getDomains,
    queryKey: ["studentDomains"],
  });
  const { mutate: createStudentMutate } = useMutation({
    mutationFn: createStudent,
    mutationKey: ["createStudent"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentList'] });
      navigate("/")},
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
    const inValidStudentInfo = Object.entries(studentInfo)
      .filter(([_, value]) => !value)
      .reduce((acc: any, [key]) => {
        acc[key] = true;
        return acc;
      }, {});

    if (JSON.stringify(inValidStudentInfo) === "{}")
      createStudentMutate(studentInfo);
    else setStudentInfoError({ ...studentInfoError, ...inValidStudentInfo });
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Student
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              {" "}
              Student Name : *
            </label>
            <div className="flex flex-col">
              <input
                value={studentInfo.studentName}
                onChange={(e) => fieldOnChange("studentName", e.target.value)}
                onBlur={(e) => fieldOnblur("studentName", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {
                <span
                  className={`text-red-500 ${
                    studentInfoError.studentName ? "visible" : "invisible"
                  }`}
                >
                  Please enter Student Name
                </span>
              }
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Domain : *</label>
            <div className="flex flex-col">
              <select
                defaultValue={studentInfo.domainRef}
                onChange={(e) => fieldOnChange("domainRef", e.target.value)}
                onBlur={(e) => fieldOnblur("domainRef", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option disabled value={""}>
                  Select Domain
                </option>
                {buildDomainDropdown()}
              </select>
              <span
                className={`text-red-500 ${
                  studentInfoError.domainRef ? "visible" : "invisible"
                }`}
              >
                Please select Domain
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              Date of Birth * :
            </label>
            <div className="flex flex-col">
              <input
                type="date"
                value={studentInfo.dob}
                onChange={(e) => fieldOnChange("dob", e.target.value)}
                onBlur={(e) => fieldOnblur("dob", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.dob ? "visible" : "invisible"
                }`}
              >
                Please enter date of birth
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              Contact Info * :
            </label>
            <div className="flex flex-col">
              <input
                type="number"
                value={studentInfo.contactInfo}
                onChange={(e) => fieldOnChange("contactInfo", e.target.value)}
                onBlur={(e) => fieldOnblur("contactInfo", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.contactInfo ? "visible" : "invisible"
                }`}
              >
                Please enter Contact Info
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Email * :</label>
            <div className="flex flex-col">
              <input
                value={studentInfo.email}
                onChange={(e) => fieldOnChange("email", e.target.value)}
                onBlur={(e) => fieldOnblur("email", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.email ? "visible" : "invisible"
                }`}
              >
                Please enter Email
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Father Name * :</label>
            <div className="flex flex-col">
              <input
                value={studentInfo.fatherName}
                onChange={(e) => fieldOnChange("fatherName", e.target.value)}
                onBlur={(e) => fieldOnblur("fatherName", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.fatherName ? "visible" : "invisible"
                }`}
              >
                Please enter Father name
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Mother Name * :</label>
            <div className="flex flex-col">
              <input
                value={studentInfo.motherName}
                onChange={(e) => fieldOnChange("motherName", e.target.value)}
                onBlur={(e) => fieldOnblur("motherName", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.motherName ? "visible" : "invisible"
                }`}
              >
                Please enter Mother name
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              No of Sibiling * :
            </label>
            <div className="flex flex-col">
              <input
                type="number"
                min={0}
                value={studentInfo.noOfSibling}
                onChange={(e) => fieldOnChange("noOfSibling", e.target.value)}
                onBlur={(e) => fieldOnblur("noOfSibling", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.noOfSibling ? "visible" : "invisible"
                }`}
              >
                Please enter No of Sibling
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              Date of Joining * :
            </label>
            <div className="flex flex-col">
              <input
                type="date"
                value={studentInfo.dateOfJoining}
                onChange={(e) => fieldOnChange("dateOfJoining", e.target.value)}
                onBlur={(e) => fieldOnblur("dateOfJoining", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className={`text-red-500 ${
                  studentInfoError.dateOfJoining ? "visible" : "invisible"
                }`}
              >
                Please enter Date of Joining
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={addStudent}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
