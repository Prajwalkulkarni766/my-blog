import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getComments, handleComment } from "../../utils/api";

export default function CommentModal({ setCommentModalVisible, blogId }) {
  const [commentContent, setCommentContent] = useState(null);
  const [comments, setComments] = useState([]);

  const hideModal = () => {
    setCommentModalVisible(false);
  };

  const addComment = async () => {
    if (!commentContent) return;

    const newComment = await handleComment(blogId, commentContent);

    if (newComment) {
      setComments((prevComments) => [
        ...prevComments,
        {
          user_name: newComment.user_name,
          created_at: newComment.created_at,
          content: newComment.content,
        },
      ]);
      setCommentContent("");
    }
  };

  useEffect(() => {
    getComments(blogId, setComments);
  }, []);

  return (
    <div
      className="modal show fade "
      id="exampleModal"
      tabIndex="-1"
      style={{ display: "block" }}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="shareModalLabel">
              Comments
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={hideModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {comments.length > 0 &&
              comments.map((comment) => (
                <CommentCard
                  userName={comment.user_name}
                  date={comment.created_at}
                  comment={comment.content}
                />
              ))}
            {comments.length <= 0 && (
              <p className="text-center">No comments found</p>
            )}
          </div>
          <div className="modal-footer">
            <input
              type="text"
              className="form-control"
              id="commentInput"
              placeholder="Add a comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button type="button" className="btn my-btn" onClick={addComment}>
              Add comment
            </button>

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
