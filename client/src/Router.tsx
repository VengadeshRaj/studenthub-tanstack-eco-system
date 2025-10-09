import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentList from "./pages/StudentList";
import StudentInfo from "./pages/StudentInfo";
import AddStudent from "./pages/AddStudent";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={StudentList} path="/" />
          <Route Component={StudentInfo} path="student/:studentid/info" />
          <Route Component={AddStudent} path="/student/add" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
