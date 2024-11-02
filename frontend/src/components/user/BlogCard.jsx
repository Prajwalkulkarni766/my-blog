import React from "react";
import profile_photo from "../../assets/profile_photo.jpg";

export default function BlogCard({ title, subtitle, author }) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedTitle = truncateText(title, 72);
  const truncatedSubtitle = truncateText(subtitle, 85);

  return (
    <div className="card border-0 mb-2" style={{ height: "26rem" }}>
      <img
        src="https://miro.medium.com/v2/resize:fit:849/1*0EgFxTEq7S7Py1P5bAWrCg.jpeg"
        className="card-img img-thumbnail border-0 rounded mb-3"
        alt="Blog thumnail"
      />
      <div className="card-body p-0">
        <div className="d-flex gap-2 mb-2">
          <img
            src={profile_photo}
            alt="Profile photo"
            className="img-fluid rounded-circle"
            style={{ height: "23px" }}
          />
          <p className="card-text fw-light">{author}</p>
        </div>
        <p className="card-title fw-bold">{truncatedTitle}</p>
        <p className="card-subtitle text-justify text-secondary">
          {truncatedSubtitle}
        </p>
      </div>
    </div>
  );
}
