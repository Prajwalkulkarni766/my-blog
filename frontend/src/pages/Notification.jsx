import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import Toast from "../helper/Toast";
import axiosInstance from "../axios/axiosInstance";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClose = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get("/v1/notifications");

      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

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
            <p className="text-center">No notifications to display.</p>
          ) : (
            notifications.map((notification, index) => (
              <Notification
                key={index}
                notification_title={notification.notification_title}
                notification_body={notification.notification_body}
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
