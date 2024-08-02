// pages/admin/users/create.js
import { useState } from 'react';
import { createAdmin } from '@/pages/api/admin';
import Layout from '@/components/admin-dashboard/Layout';
import styles from "@/styles/users/CreateUser.module.scss"; // Import SCSS module

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { firstName, lastName, email, birthDate, gender, password, roleId };
      await createAdmin(newUser);
      setSuccess('User created successfully');
      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setBirthDate('');
      setGender('');
      setPassword('');
      setRoleId('');
    } catch (error) {
      console.error('Create User Error:', error);
      setError('Failed to create user');
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.header}>Create User</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Birth Date:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </label>

          <label>
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Role:
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="2">Customer</option>
              <option value="3">Admin</option>
            </select>
          </label>
          
          <button type="submit" className={styles.submitButton}>Create User</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateUser;
