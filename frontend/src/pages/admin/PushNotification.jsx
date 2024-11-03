import AdminNavbar from "../../components/admin/AdminNavbar";
import PushNotificationForm from "../../forms/PushNotificationForm";

export default function PushNotification() {
  return (
    <>
      <AdminNavbar />
      <div className="container my-container mt-5">
        <PushNotificationForm />
      </div>
    </>
  );
}
