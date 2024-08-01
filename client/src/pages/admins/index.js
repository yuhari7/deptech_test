import { getAdmins } from "../api/hello.js";

const AdminsPage = ({ admins }) => {
  return (
    <div>
      <h1>Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.firstName} {admin.lastName} ({admin.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const admins = await getAdmins();
  return {
    props: { admins },
  };
}

export default AdminsPage;
