import React, { useState } from "react";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Sharukh",
      designation: "Frontend Developer",
      age: 25,
      salary: 50000,
    },
    {
      id: 2,
      name: "Amit",
      designation: "Backend Developer",
      age: 30,
      salary: 60000,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    age: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);

//   submit button functionality
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, designation, age, salary } = formData;

    if (!name || !designation || !age || !salary) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId !== null) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingId
            ? { ...emp, name, designation, age: Number(age), salary: Number(salary) }
            : emp
        )
      );
      setEditingId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        name,
        designation,
        age: Number(age),
        salary: Number(salary),
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    setFormData({ name: "", designation: "", age: "", salary: "" });
  };
// delete functionality
  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  //edit functionality
  const handleEdit = (emp) => {
    setFormData({
      name: emp.name,
      designation: emp.designation,
      age: emp.age,
      salary: emp.salary,
    });
    setEditingId(emp.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Manager</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Designation"
          value={formData.designation}
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) =>
            setFormData({ ...formData, salary: e.target.value })
          }
        />
        <button type="submit">{editingId ? "Update" : "Add"} Employee</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.designation}</td>
              <td>{emp.age}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManager;
