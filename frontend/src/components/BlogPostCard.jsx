import React, { useState } from "react";
import ButtonGroup from "./ButtonGroup";
import { NavLink } from "react-router-dom";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";
import { handleClap, handleReadLater } from "../utils/api.js";
import ShareModal from "./ShareModal.jsx";
import CommentModal from "./CommentModal.jsx";

export default function BlogPostCard({
  cardId,
  cardTitle,
  cardText,
  cardImage,
  postDate,
  clapCount,
  commentCount,
}) {
  const [shareModalVisiable, setShareModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const buttons = [
    {
      label: "Clap",
      icon: like,
      onClick: () => handleClap(cardId),
      tooltip: "Clap",
      position: "left",
      count: clapCount,
    },
    {
      label: "Comment",
      icon: comment,
      onClick: () => setCommentModalVisible(true),
      tooltip: "Comment",
      position: "left",
      count: commentCount,
    },
    {
      label: "Read Later",
      icon: readLater,
      onClick: () => handleReadLater(cardId),
      tooltip: "Read Later",
      position: "right",
    },
    {
      label: "Share",
      icon: share,
      onClick: () => setShareModalVisible(true),
      tooltip: "Share",
      position: "right",
    },
  ];

  return (
    <>
      <div className="card mb-3 shadow-sm p-3 mb-2 bg-body-tertiary rounded">
        <NavLink
          className="row g-0 cursor-pointer text-decoration-none text-body"
          to={`/blog?id=${cardId}`}
        >
          <div className="d-flex justify-content-end align-items-center mb-lg-2">
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                <p className="card-text">{cardText}</p>
                <p className="card-text">
                  <small className="text-body-secondary">Posted {postDate}</small>
                </p>
              </div>
            </div>
            <div className="col-4">
              {cardImage && (
                <img src={`http://localhost:8000/${cardImage}`} className="img-fluid rounded" alt="Blog image" style={{objectFit: "cover"}} />
              )}
            </div>
          </div>
        </NavLink>
        <div className="card-footer bg-transparent ">
          <ButtonGroup buttons={buttons} />
        </div>

        {shareModalVisiable && (
          <ShareModal
            setShareModalVisible={setShareModalVisible}
            blogId={cardId}
          />
        )}
        {commentModalVisible && (
          <CommentModal
            setCommentModalVisible={setCommentModalVisible}
            blogId={cardId}
          />
        )}
      </div>
    </>
  );
}
