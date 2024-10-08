import React, { useEffect } from "react";

export default function Button({ onClick, tooltip, icon, label }) {
  // useEffect(() => {
  //   const tooltipTriggerList = document.querySelectorAll(
  //     '[data-bs-toggle="tooltip"]',
  //   );
  //   const tooltipList = [...tooltipTriggerList].map(
  //     (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
  //   );
  // }, []);

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
