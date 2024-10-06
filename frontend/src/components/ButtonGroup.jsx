import React,{ useEffect } from "react";

export default function ButtonGroup({ buttons }) {
    const leftButtons = buttons.filter((button) => button.position === "left");
    const rightButtons = buttons.filter((button) => button.position === "right");

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll(
          '[data-bs-toggle="tooltip"]',
        );
        const tooltipList = [...tooltipTriggerList].map(
          (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
        );
      }, []);
    

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
                {leftButtons.map((button, index) => (
                    <div className="d-flex align-items-center me-2" key={index}>
                        <button
                            className="btn"
                            onClick={button.onClick}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={button.tooltip}
                        >
                            <img src={button.icon} alt={button.label} />
                        </button>
                        {button.count !== undefined && (
                            <span className="count">{button.count}</span>
                        )}
                    </div>
                ))}
            </div>
            <div className="d-flex">
                {rightButtons.map((button, index) => (
                    <div className="d-flex align-items-center ms-2" key={index}>
                        <button
                            className="btn"
                            onClick={button.onClick}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={button.tooltip}
                        >
                            <img src={button.icon} alt={button.label} />
                        </button>
                        {button.count !== undefined && (
                            <span className="count">{button.count}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
