import React from "react";

export default function RadioOptions({ options, timeframe, onChange }) {
  return (
    <>
      <div className="d-flex gap-5 mt-4 mb-4">
        {options.map((option) => (
          <div className="form-check" key={option.id}>
            <input
              className="form-check-input"
              type="radio"
              value={option.value}
              name={option.id}
              id={option.id}
              checked={timeframe === option.value}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor={option.id}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
