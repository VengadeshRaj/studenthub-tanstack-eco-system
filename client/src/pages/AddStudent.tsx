import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../constants/constant";
import { AnyFieldApi, useForm } from "@tanstack/react-form";

const AddStudent = () => {
  const studentForm = useForm({
    defaultValues: {
      studentName: "",
      domainRef: "",
      dob: "",
      contactInfo: "",
      email: "",
      fatherName: "",
      motherName: "",
      noOfSibling: "",
      dateOfJoining: "",
    },
    onSubmit: (formData) => createStudentMutate(formData.value),
  });
  const studentFormValidators = {
    studentName: () => ({
      onChange: ({ value }: any) =>
        !value
          ? "Please provide student name"
          : value.length < 3
          ? "student name must be at least 3 characters"
          : undefined,
    }),
    domainRef: () => ({
      onChange: ({ value }: any) =>
        !value ? "Please select a domain" : undefined,
    }),
    dob: () => ({
      onChange: ({ value }: any) =>
        !value ? "please provide date of birth" : undefined,
    }),
    contactInfo: () => ({
      onChange: ({ value }: any) =>
        !value
          ? "please provide contact info"
          : value.length != 10 
          ? "contact info must be 10 characters"
          : undefined,
    }),
    email: () => ({
      onChange: ({ value }: any) =>
        !value ? "please provide email" : value.split('').includes('@') == false 
          ? "please provide valid email"
          : undefined,
    }),
    fatherName: () => ({
      onChange: ({ value }: any) =>
        !value
          ? "Please provide father name"
          : value.length < 3
          ? "father name must be at least 3 characters"
          : undefined,
    }),
    motherName: () => ({
      onChange: ({ value }: any) =>
        !value
          ? "Please provide mother name"
          : value.length < 3
          ? "mother name must be at least 3 characters"
          : undefined,
    }),
    noOfSibling: () => ({
      onChange: ({ value }: any) =>
        !value ? "Please provide no of sibiling" : undefined,
    }),
    dateOfJoining: () => ({
      onChange: ({ value }: any) =>
        !value ? "Please provide date of joining" : undefined,
    }),
  };
  const StudentField = studentForm.Field as unknown as React.FC<{
    name: string;
    children: (field: any) => React.ReactNode;
    validators?: any;
  }>;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: domains } = useQuery({
    queryFn: getDomains,
    queryKey: ["studentDomains"],
  });
  const { mutate: createStudentMutate } = useMutation({
    mutationFn: createStudent,
    mutationKey: ["createStudent"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentList"] });
      navigate("/");
    },
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

  const buildDomainDropdown = () =>
    domains?.data?.map((domain: { domainName: string; domainRef: string }) => (
      <option value={domain.domainRef}>{domain.domainName}</option>
    ));


  function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
      <>
        {field.state.meta.isTouched && !field.state.meta.isValid ? (
          <em className={`text-red-500`}>
            {field.state.meta.errors.join(", ")}
          </em>
        ) : null}
        {field.state.meta.isValidating ? "Validating..." : null}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Student
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            studentForm.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StudentField name="studentName" validators={studentFormValidators.studentName()}>
              {(field: any) => (
                <div className="flex flex-col gap-1">
                  <label
                    className="text-gray-700 font-medium"
                    htmlFor={field.name}
                  >
                    Student Name : *
                  </label>
                  <div className="flex flex-col">
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </StudentField>

            <StudentField name="domainRef"  validators={studentFormValidators.domainRef()}>
              {(field: any) => (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 font-medium">
                    Domain : *
                  </label>
                  <div className="flex flex-col">
                    <select
                      defaultValue={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option disabled value={""}>
                        Select Domain
                      </option>
                      {buildDomainDropdown()}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </StudentField>
            <StudentField name="dob" validators={studentFormValidators.dob()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Date of Birth * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        type="date"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>
            <StudentField name="contactInfo" validators={studentFormValidators.contactInfo()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Contact Info * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>
            <StudentField name="email" validators={studentFormValidators.email()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Email * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>
            <StudentField name="fatherName" validators={studentFormValidators.fatherName()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Father Name * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>
            <StudentField name="motherName" validators={studentFormValidators.motherName()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Mother Name * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>

            <StudentField name="noOfSibling" validators={studentFormValidators.noOfSibling()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      No of Sibiling * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        min={0}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>

            <StudentField name="dateOfJoining" validators={studentFormValidators.dateOfJoining()}>
              {(field) => {
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Date of Joining * :
                    </label>
                    <div className="flex flex-col">
                      <input
                        type="date"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </StudentField>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
              type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
