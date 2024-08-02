import { getUsers, deleteAdmin } from "@/pages/api/admin";
import { getRoles } from "@/pages/api/role";
import styles from "@/styles/users/User.module.scss";
import Layout from "@/components/admin-dashboard/Layout";

const Users = ({ admins, roles }) => {
  const handleEdit = (id) => {
    window.location.href = `/admin/users/edit/${id}`;
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteAdmin(id);
        alert('User deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const roleMapping = (roles || []).reduce((acc, role) => {
    acc[role.id] = role.name;
    return acc;
  }, {});

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Users</h1>
        <button
          className={styles.createUserButton}
          onClick={() => window.location.href = '/admin/users/create-user'}
        >
          Create User
        </button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.firstName}</td>
                <td>{admin.lastName}</td>
                <td>{admin.email}</td>
                <td>{roleMapping[admin.roleId] || 'Unknown'}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.buttonEdit}
                    onClick={() => handleEdit(admin.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const admins = await getUsers();
  const roles = await getRoles();
  return {
    props: { admins, roles },
  };
}

export default Users;
