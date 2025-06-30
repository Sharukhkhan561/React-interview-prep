import React, { useState } from "react";

const EmployeeData = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Sharukh", designation: "Frontend Developer" },
    { id: 2, name: "Amit", designation: "Backend Developer" },
    { id: 2, name: "Amit", designation: "Backend Developer" },
    { id: 2, name: "Amit", designation: "Backend Developer" },
  ]);

  const [formData, setFormData] = useState({ name: "", designation: "" });
  const [editingId, setEditingId] = useState(null);

  // Add or update employee
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) return;

    if (editingId !== null) {
      // Edit existing
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingId ? { ...emp, ...formData } : emp
        )
      );
      setEditingId(null);
    } else {
      // Add new
      const newEmployee = {
        id: Date.now(),
        name: formData.name,
        designation: formData.designation,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    setFormData({ name: "", designation: "" });
  };

  // Delete employee
  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // Edit button clicked
  const handleEdit = (emp) => {
    setFormData({ name: emp.name, designation: emp.designation });
    setEditingId(emp.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Designation"
          value={formData.designation}
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
        />
        <button type="submit">{editingId ? "Update" : "Add"} Employee</button>
      </form>

      <ul>
        {employees.map((emp) => (
          <li>
            <b>{emp.name}</b> - {emp.designation}
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeData;
