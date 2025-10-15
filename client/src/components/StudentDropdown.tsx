import React from "react";

interface StudentDropdownProps {
  field: any;
  label: string;
  options: { label: string; value: string }[];
}

const StudentDropdown: React.FC<StudentDropdownProps> = ({ field, label, options }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-700 font-medium">{label}</label>
      <select
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {field.state.meta.errors?.[0] && (
        <span className="text-red-500 text-sm">{field.state.meta.errors[0]}</span>
      )}
    </div>
  );
};

export default StudentDropdown;
