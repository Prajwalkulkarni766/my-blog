import React, { useEffect, useState } from "react";
import user from "../assets/user.webp";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import ButtonGroup from "../components/ButtonGroup";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";
import listen from "../assets/listen.svg";
import stop from "../assets/stop.svg";
import { handleClap, handleReadLater, follow, unfollow } from "../utils/api.js";
import { getBlog } from "../utils/api.js";
import ShareModal from "../components/ShareModal.jsx";
import CommentModal from "../components/CommentModal.jsx";
import draftToHtml from "draftjs-to-html";

export default function Blog() {
  const [isBlogListening, setIsBlogListening] = useState(false);
  const [shareModalVisiable, setShareModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState(null);
  // const  = draftToHtml(JSON.parse(rawContent));

  const [blog, setBlog] = useState({
    id: "",
    title: "",
    sub_title: "",
    content: "",
    image: "",
    clap_count: 0,
    comment_count: 0,
    created_at: "",
    user_id: "",
    user_name: "",
    user_about: "",
    user_follwer: 0,
    is_following: false,
  });

  function readBlog() {
    setIsBlogListening(true);
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${blog.content}`;
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setIsBlogListening(false);
    };
  }

  function stopReadingBlog() {
    speechSynthesis.cancel();
  }

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");
    getBlog(blogId, setBlog);
  }, []);

  const buttons = [
    {
      label: "Clap",
      icon: like,
      onClick: () => handleClap(blog.id),
      tooltip: "Clap",
      position: "left",
      count: blog.clap_count,
    },
    {
      label: "Comment",
      icon: comment,
      onClick: () => setCommentModalVisible(true),
      tooltip: "Comment",
      position: "left",
      count: blog.comment_count,
    },
    {
      label: "Read Later",
      icon: readLater,
      onClick: () => handleReadLater(blog.id),
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
    {
      label: "Listen",
      icon: isBlogListening ? stop : listen,
      onClick: isBlogListening ? stopReadingBlog : readBlog,
      tooltip: "Listen",
      position: "right",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-5 my-container text-justify">
        {/* primary-heading */}
        <h1>{blog.title}</h1>

        {/* secondary-heading  */}
        <h4 className="text-secondary">{blog.sub_title}</h4>

        {/* user info display section */}
        <div className="d-flex gap-3 mt-5 mb-4">
          <img
            src={user}
            alt="User"
            className="user-photo img-fluid rounded-circle"
            style={{ height: "57px" }}
          />
          <div className="d-flex flex-column w-100">
            <div className="d-flex w-100 align-items-center justify-content-between gap-3">
              <span className="user-name cursor-pointer">{blog.user_name}</span>
              {blog.is_following ? (
                <button
                  className="btn my-btn ms-0"
                  onClick={() => unfollow(blog.user_id, setBlog)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn my-btn ms-0"
                  onClick={() => follow(blog.user_id, setBlog)}
                >
                  Follow
                </button>
              )}
            </div>
            <div className="d-flex align-items-center">
              <span className="blog-post-date text-secondary">
                {blog.created_at}
              </span>
            </div>
          </div>
        </div>

        <hr />

        {/* actions buttons for post */}
        <ButtonGroup buttons={buttons} />

        <hr />

        {blog.image && <img src={`http://localhost:8000/${blog.image}`} className="img-fluid rounded" alt="Blog Image" />}

        <div className="mt-4" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <hr />

        {/* user profile card */}
        <div className="mt-4 mb-4">
          <div className="d-flex flex-column">
            <div className="d-flex gap-3 mb-2 justify-content-center align-items-center">
              <div className="d-flex flex-column">
                <span className="user-name cursor-pointer fs-3 fw-bold">
                  {blog.user_name}
                </span>
                <span className="time-required-to-read-blog text-secondary mb-2">
                  {blog.user_follwer} Followers
                </span>
              </div>
              {blog.is_following ? (
                <button
                  className=" follow-btn btn my-btn ms-auto"
                  style={{ height: "39px" }}
                  onClick={() => unfollow(blog.user_id, setBlog)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className=" follow-btn btn my-btn ms-auto"
                  style={{ height: "39px" }}
                  onClick={() => follow(blog.user_id, setBlog)}
                >
                  Follow
                </button>
              )}
            </div>
            <div className="d-flex flex-column">
              <span className="blog-post-date text-secondary">
                {blog.user_about}
              </span>
            </div>
          </div>
        </div>

        <hr />

        <h2 className="mt-4 mb-4">Suggested</h2>

        {/* blogs that we are going to suggest */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <BlogCard
              title={
                "Covid 19 got mad in Japan and India Covid 19 got mad in Japan and India Covid 19 got mad in Japan and India"
              }
              subtitle={
                "This is article about covid 19 of japan and india Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus architecto odit minus neque assumenda, cupiditate maxime illum debitis ullam facere reiciendis tenetur, praesentium provident fuga natus delectus maiores! Vitae quibusdam ab blanditiis nostrum necessitatibus. "
              }
              author={"Prajwal"}
            />
            <BlogCard
              title={"Covid 19 got mad in Japan and India"}
              subtitle={"This is article about covid 19 of japan and india"}
              author={"Prajwal"}
            />
          </div>
          <div className="col">
            <BlogCard
              title={"Covid 19 got mad in Japan and India"}
              subtitle={"This is article about covid 19 of japan and india"}
              author={"Prajwal"}
            />
            <BlogCard
              title={"Covid 19 got mad in Japan and India"}
              subtitle={"This is article about covid 19 of japan and india"}
              author={"Prajwal"}
            />
          </div>
        </div>
      </div>

      {shareModalVisiable && (
        <ShareModal
          setShareModalVisible={setShareModalVisible}
          blogId={blog.id}
        />
      )}
      {commentModalVisible && (
        <CommentModal
          setCommentModalVisible={setCommentModalVisible}
          blogId={blog.id}
        />
      )}
    </>
  );
}
