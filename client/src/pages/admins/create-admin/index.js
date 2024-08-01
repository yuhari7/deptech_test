import { useState } from "react";
import { createAdmin } from "../../api/hello.js";

const CreateAdmin = () => {
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(admin);
      // Optionally redirect or show success message
    } catch (err) {
      setError("Failed to create admin");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={admin.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={admin.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="email"
          value={admin.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="birthDate"
          type="date"
          value={admin.birthDate}
          onChange={handleChange}
          placeholder="Birth Date"
        />
        <select name="gender" value={admin.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="password"
          type="password"
          value={admin.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Create Admin</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateAdmin;
