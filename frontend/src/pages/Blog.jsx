import React, { useEffect, useState } from "react";
import user from "../assets/user.webp";
import BlogPostButtons from "../components/BlogPostButtons";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import ButtonGroup from "../components/ButtonGroup";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";
import listen from "../assets/listen.svg";
import stop from "../assets/stop.svg";
import {
  handleClap,
  handleComment,
  handleListen,
  handleReadLater,
  handleShare,
} from "../utils/api.js";
import { getBlog } from "../utils/api.js";

export default function Blog() {
  const [isBlogListening, setIsBlogListening] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    sub_title: "",
    content: "",
    clap_count: 0,
    comment_count: 0,
  });

  function readBlog() {
    setIsBlogListening(true)
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${blog.content} 
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum pariatur, excepturi sed ipsum dolores, ipsa vitae odio quidem rem quam quisquam eveniet laborum facere! Accusantium, eaque eum dolor illo tempora minima odit illum. Explicabo saepe numquam dolore dolores ipsam maiores ad ullam, iste, architecto, doloribus ipsum? Debitis quibusdam fugit aperiam ut omnis non nobis harum.`;
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setIsBlogListening(false);
    };
  
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
      onClick: handleClap,
      tooltip: "Clap",
      position: "left",
      count: blog.clap_count,
    },
    {
      label: "Comment",
      icon: comment,
      onClick: handleComment,
      tooltip: "Comment",
      position: "left",
      count: blog.comment_count,
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
    {
      label: "Listen",
      icon: isBlogListening ? stop :  listen,
      onClick: readBlog,
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
          <div className="d-flex flex-column">
            <div className="d-flex gap-3">
              <span className="user-name cursor-pointer">Radha</span>
              <span className="follow-btn text-secondary cursor-pointer">
                Follow
              </span>
            </div>
            <div className="d-flex align-items-center">
              <span className="time-required-to-read-blog text-secondary">
                7 Min
              </span>
              <span className="dot"></span>
              <span className="blog-post-date text-secondary">01/01/2000</span>
            </div>
          </div>
        </div>

        <hr />

        {/* actions buttons for post */}
        <ButtonGroup buttons={buttons} />

        <hr />

        <div className="mt-4">{blog.content}</div>

        <hr />

        {/* user profile card */}
        <div className="mt-4 mb-4">
          <div className="d-flex flex-column">
            <div className="d-flex gap-3 mb-2 justify-content-center align-item-center">
              <div className="d-flex flex-column">
                <span className="user-name cursor-pointer fs-3 fw-bold">
                  Radha
                </span>
                <span className="time-required-to-read-blog text-secondary mb-2">
                  43k Followers
                </span>
              </div>
              <button
                className=" follow-btn btn my-btn ms-auto"
                style={{ height: "39px" }}
              >
                Follow
              </button>
            </div>
            <div className="d-flex flex-column">
              <span className="blog-post-date text-secondary">
                Medicine, science, statistics. Associate Professor of Medicine
                and Public Health at Yale. New book “How Medicine Works and When
                it Doesn’t” available now.
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
    </>
  );
}
