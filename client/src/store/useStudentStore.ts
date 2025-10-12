import { create } from "zustand";

export const useStudentStore = create<any>((set) => ({
  studentList: [],
  addStudentInfo: (newStudentInfo: any) => {
    set((state: any) => ({
      studentList: [...state.studentList, newStudentInfo],
    }));
  },
}));
