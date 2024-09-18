import React from "react";

export default function Notification({ type }) {
  return (
    <div class={`alert alert-${type}`} role="alert">
      A simple light alert—check it out!
    </div>
  );
}
