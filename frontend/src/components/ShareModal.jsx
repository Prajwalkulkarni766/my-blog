import React, { useState } from "react";
import Button from "./Button";
import copy from "../assets/copy.svg";
import {
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaReddit,
  FaPinterest,
  FaBlogger,
  FaLinkedinIn,
} from "react-icons/fa";

export default function ShareModal({ setShareModalVisible, blogId }) {
  const [msg, setMsg] = useState("");

  const url = `${window.location.origin}/blog?id=${blogId}`;

  const socialMediaLinks = [
    {
      icons: FaWhatsapp,
      link: `https://api.whatsapp.com/send?text=${url}`,
      fill: "#25D366",
    },
    {
      icons: FaTwitter,
      link: `https://twitter.com/share?url=${url}&text=Check%20this%20out!`,
      fill: "#1DA1F2",
    },
    {
      icons: FaInstagram,
      link: `https://www.instagram.com/`,
      fill: "#C1358E",
    },
    {
      icons: FaFacebook,
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      fill: "#4267B2",
    },
    {
      icons: FaReddit,
      link: `https://www.reddit.com/submit?url=${url}`,
      fill: "#FF4500",
    },
    {
      icons: FaPinterest,
      link: `https://pinterest.com/pin/create/button/?url=${url}`,
      fill: "#E60023",
    },
    {
      icons: FaBlogger,
      link: `https://www.blogger.com/blog-this.g?u=${url}`,
      fill: "#fc7a4e",
    },
    {
      icons: FaLinkedinIn,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
      fill: "#0077B5",
    },
  ];

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
            <div className="d-flex align-items-center justify-content-evenly mt-2 border rounded p-2">
              {socialMediaLinks.map((socialMedia) => (
                <a
                  href={socialMedia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <socialMedia.icons size="35" fill={socialMedia.fill} />
                </a>
              ))}
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
