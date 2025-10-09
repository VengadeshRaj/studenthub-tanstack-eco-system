import React from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <label>Student Id</label>
        <input maxLength={10} />
      </div>
      <div>
        <label>Student Name</label>
        <input />
      </div>
      <div>
        <label>Stream</label>
        <input />
      </div>
      <div>
        <label>Date of Birth</label>
        <input type="date" />
      </div>
      <div>
        <label>Contact Info</label>
        <input type="number" />
      </div>
      <div>
        <button onClick={() => navigate("/")}>Cancel</button>
        <button onClick={() => navigate("/")}>Add</button>
      </div>
    </div>
  );
};

export default AddStudent;
