import React from "react";
import ButtonGroup from "./ButtonGroup";
import { NavLink } from "react-router-dom";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";

export default function BlogPostCard({
  cardTitle,
  cardText,
  cardImage,
  postDate,
}) {
  const handleClap = () => {
    /* Handle clap action */
  };
  const handleComment = () => {
    /* Handle comment action */
  };
  const handleReadLater = () => {
    /* Handle read later action */
  };
  const handleShare = () => {
    /* Handle share action */
  };

  const buttons = [
    {
      label: "Clap",
      icon: like,
      onClick: handleClap,
      tooltip: "Clap",
      position: "left",
      count: 10
    },
    {
      label: "Comment",
      icon: comment,
      onClick: handleComment,
      tooltip: "Comment",
      position: "left",
      count: 5
    },
    {
      label: "Read Later",
      icon: readLater,
      onClick: handleReadLater,
      tooltip: "Read Later",
      position: "right",
    },
    {
      label: "Share",
      icon: share,
      onClick: handleShare,
      tooltip: "Share",
      position: "right",
    },
  ];

  return (
    <>
      <div className="card mb-3 shadow-sm p-3 mb-2 bg-body-tertiary rounded">
        <NavLink
          className="row g-0 cursor-pointer text-decoration-none text-body"
          to={"/blog"}
        >
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{cardTitle}</h5>
              <p className="card-text">{cardText}</p>
              <p className="card-text">
                <small className="text-body-secondary">Posted {postDate}</small>
              </p>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            {cardImage && (
              <img src={cardImage} className="img-fluid rounded" alt="abc" />
            )}
          </div>
        </NavLink>
        <div className="card-footer bg-transparent ">
          <ButtonGroup buttons={buttons} />
        </div>
      </div>
    </>
  );
}
