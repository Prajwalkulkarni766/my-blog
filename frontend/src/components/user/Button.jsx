import React, { useEffect } from "react";

export default function Button({ onClick, tooltip, icon, label }) {
  return (
    <button
      className="btn"
      onClick={onClick}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={tooltip}
    >
      <img src={icon} alt={label} />
    </button>
  );
}
