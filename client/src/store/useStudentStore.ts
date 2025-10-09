import { create } from "zustand";

const defaultStudentList = [
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
export const useStudentStore = create<any>((set) => ({
  studentList: defaultStudentList,
  addStudentInfo: (newStudentInfo: any) => {
    set((state: any) => ({
      studentList: [...state.studentList, newStudentInfo],
    }));
  },
}));
