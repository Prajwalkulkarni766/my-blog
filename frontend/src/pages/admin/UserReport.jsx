import UserGrowthChart from "../../components/admin/UserGrowthChart";
import ActiveUsersChart from "../../components/admin/ActiveUsersChart";
import AdminNavbar from "../../components/admin/AdminNavbar";

export default function UserReport() {
  return (
    <>
      <AdminNavbar />
      <div className="container my-container mt-5">
        <UserGrowthChart />
        <div className="mt-5"></div>
        <ActiveUsersChart />
      </div>
    </>
  );
}
