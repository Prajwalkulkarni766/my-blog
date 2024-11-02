import React from "react";
import HistoryBlogCard from "./HistoryBlogCard";

export default function History({
  history = [],
  getHistory,
  clearParticularHistory,
  dispatch,
  historyPage,
}) {
  return (
    <div>
      {history.length === 0 ? (
        <p className="text-center mt-3">No History available</p>
      ) : (
        <div
          className="custom-scrollbar p-2"
          style={{ maxHeight: "60vh", overflowY: "scroll" }}
        >
          {history.map((histroyCard, index) => (
            <HistoryBlogCard
              key={index}
              cardTitle={histroyCard.blog_title}
              cardText={histroyCard.blog_sub_title}
              readDate={histroyCard.created_at}
              onClick={() => clearParticularHistory(dispatch, histroyCard.id)}
            />
          ))}
          <div className="d-grid">
            <button
              className="btn btn-light"
              onClick={() => getHistory(dispatch, historyPage)}
            >
              Load more
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
