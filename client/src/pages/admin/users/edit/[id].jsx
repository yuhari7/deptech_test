import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserById, updateAdmin } from '@/pages/api/admin';
import Layout from '@/components/admin-dashboard/Layout';
import styles from '@/styles/users/EditUser.module.scss'; // Import SCSS module

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const data = await getUserById(id);
          setUser(data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setError('Failed to load user data');
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAdmin(id, user);
      setSuccess('User updated successfully');
      // Redirect or reload after successful update
      setTimeout(() => {
        router.push('/admin/users');
      }, 1000);
    } catch (error) {
      console.error('Update User Error:', error);
      setError('Failed to update user');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.header}>Edit User</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </label>
          
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </label>
          
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Birth Date:
            <input
              type="date"
              name="birthDate"
              value={user.birthDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
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
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Role:
            <select
              name="roleId"
              value={user.roleId}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              <option value="2">Customer</option>
              <option value="3">Admin</option>
            </select>
          </label>
          
          <button type="submit" className={styles.submitButton}>Update User</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditUser;
