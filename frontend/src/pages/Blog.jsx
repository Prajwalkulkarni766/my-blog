import React, { useEffect } from "react";
import profile_photo from "../assets/profile_photo.jpg";
import BlogPostButtons from "../components/BlogPostButtons";
import Navbar from "../components/Navbar";

export default function Blog() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 my-container text-justify">
        {/* primary-heading */}
        <h1>The AI Popularity contest</h1>

        {/* secondary-heading  */}
        <h4 className="text-secondary">
          Analyzing the brand strategies of ChatGPT, Gemini, Claude, and
          Perplexity
        </h4>

        {/* user info display section */}
        <div className="d-flex gap-3 mt-5 mb-4">
          <img
            src={profile_photo}
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
        <BlogPostButtons />

        <hr />

        <div className="mt-4">
          <p>
            In the 1990s, Sony was preparing to launch a household robot. Their
            technology was impressive but imperfect: the robot could mishear
            commands or simply get them wrong. So, instead of launching the
            product as a robot (think block-y design, 3CPO-like interface,
            computer-like voice), the team launched it as a dog.
          </p>
        </div>

        {/* // TODO: profile card of user */}
        {/* // todo: same section to like comment and share  */}
        {/* // todo: more blog suggestions */}
      </div>
    </>
  );
}
