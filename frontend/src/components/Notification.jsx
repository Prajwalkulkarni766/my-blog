import React from "react";

export default function Notification({
  notification_title,
  notification_body,
}) {
  return (
    <div className={`alert alert-light`} role="alert">
      <h2>{notification_title}</h2>
      <p>{notification_body}</p>
    </div>
  );
}
