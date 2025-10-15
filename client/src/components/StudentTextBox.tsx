import React from "react";

interface StudentTextboxProps {
  field: any;
  label: string;
  type?: string;
}

const StudentTextbox: React.FC<StudentTextboxProps> = ({ field, label, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {field.state.meta.errors?.[0] && (
        <span className="text-red-500 text-sm">{field.state.meta.errors[0]}</span>
      )}
    </div>
  );
};

export default StudentTextbox;
