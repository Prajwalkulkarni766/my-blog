import React, { useEffect } from "react";
import Button from "./Button";

export default function ButtonGroup({ buttons }) {
  const leftButtons = buttons.filter((button) => button.position === "left");
  const rightButtons = buttons.filter((button) => button.position === "right");

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex">
        {leftButtons.map((button, index) => (
          <div className="d-flex align-items-center me-2" key={index}>
            <Button
              onClick={button.onClick}
              tooltip={button.tooltip}
              icon={button.icon}
              label={button.label}
            />
            {button.count !== undefined && (
              <span className="count">{button.count}</span>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex">
        {rightButtons.map((button, index) => (
          <div className="d-flex align-items-center ms-2" key={index}>
            <Button
              onClick={button.onClick}
              tooltip={button.tooltip}
              icon={button.icon}
              label={button.label}
            />
            {button.count !== undefined && (
              <span className="count">{button.count}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
