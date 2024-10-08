import React, { useState } from "react";
import Button from "./Button";
import copy from "../assets/copy.svg";

export default function ShareModal({ setShareModalVisible, blogId }) {
  const [msg, setMsg] = useState("");

  const url = `http://localhost:5173/blog?id=${blogId}`;

  const hideModal = () => {
    setShareModalVisible(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setMsg("Link copied to clipboard!");
      })
      .catch((err) => {
        setMsg("Failed to copy: ");
      });
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      aria-labelledby="shareModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="shareModalLabel">
              Share This Blog
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={hideModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Share this blog with your friends!</p>

            <div className="d-flex gap-3">
              <input
                className="form-control"
                type="text"
                value={url}
                aria-label="Blog url"
                readOnly
              />
              <Button
                onClick={copyToClipboard}
                tooltip={"Copy"}
                icon={copy}
                label={"copy"}
              />
            </div>
            <p className="p-1">{msg}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={hideModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
