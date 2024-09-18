import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "This is a success notification!", type: "success" },
    { id: 2, message: "This is a warning notification!", type: "warning" },
    { id: 3, message: "This is an error notification!", type: "danger" },
    { id: 1, message: "This is a success notification!", type: "success" },
    { id: 2, message: "This is a warning notification!", type: "warning" },
    { id: 3, message: "This is an error notification!", type: "danger" },
    { id: 1, message: "This is a success notification!", type: "success" },
    { id: 2, message: "This is a warning notification!", type: "warning" },
    { id: 3, message: "This is an error notification!", type: "danger" },
    { id: 1, message: "This is a success notification!", type: "success" },
    { id: 2, message: "This is a warning notification!", type: "warning" },
    { id: 3, message: "This is an error notification!", type: "danger" },
    { id: 1, message: "This is a success notification!", type: "success" },
    { id: 2, message: "This is a warning notification!", type: "warning" },
    { id: 3, message: "This is an error notification!", type: "danger" },
  ]);

  const handleNotificationClose = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-container mt-5">
        <h1>Notifications</h1>
        <div
          className="custom-scrollbar p-2 mt-4"
          style={{ maxHeight: "74vh", overflowY: "scroll" }}
        >
          {notifications.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No notifications to display.
            </div>
          ) : (
            notifications.map((notification) => (
              <Notification
                key={notification.id}
                message={notification.message}
                type={notification.type}
                dismissible={true}
                onClose={() => handleNotificationClose(notification.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
