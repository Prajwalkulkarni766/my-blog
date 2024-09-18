import React, { useEffect } from "react";
import profile_photo from "../assets/profile_photo.jpg";
import BlogPostButtons from "../components/BlogPostButtons";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

export default function Blog() {
  function readBlog() {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `In the 1990s, Sony was preparing to launch a household robot. Their
    technology was impressive but imperfect: the robot could mishear
    commands or simply get them wrong. So, instead of launching the
    product as a robot (think block-y design, 3CPO-like interface,
    computer-like voice), the team launched it as a dog.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
    distinctio odit tempora? Nihil earum dolorem, aperiam vitae debitis,
    cum laudantium quaerat ipsa praesentium dolore omnis atque
    aspernatur alias sint aliquid ipsum! Corporis quidem nemo maxime.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
    laboriosam aperiam velit in maiores fugiat iusto excepturi
    blanditiis? Reiciendis tenetur at ea eaque! Enim sequi quod
    deleniti, soluta excepturi doloribus, blanditiis molestias, officiis
    sapiente dolorem unde labore ducimus id! Ad libero totam beatae?
    Itaque delectus repellendus laudantium, nemo excepturi numquam
    ratione temporibus vero cumque veniam velit a blanditiis sunt,
    inventore veritatis commodi nobis fugit. Totam quo illum enim
    impedit! Atque, sapiente doloribus ratione, omnis exercitationem
    odit libero aspernatur totam possimus deserunt eaque! Ut,
    repellendus laborum.
    `;
    speechSynthesis.speak(utterance);
  }

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
        <BlogPostButtons listenOnclick={readBlog} />

        <hr />

        <div className="mt-4">
          <p>
            In the 1990s, Sony was preparing to launch a household robot. Their
            technology was impressive but imperfect: the robot could mishear
            commands or simply get them wrong. So, instead of launching the
            product as a robot (think block-y design, 3CPO-like interface,
            computer-like voice), the team launched it as a dog.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            distinctio odit tempora? Nihil earum dolorem, aperiam vitae debitis,
            cum laudantium quaerat ipsa praesentium dolore omnis atque
            aspernatur alias sint aliquid ipsum! Corporis quidem nemo maxime.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            laboriosam aperiam velit in maiores fugiat iusto excepturi
            blanditiis? Reiciendis tenetur at ea eaque! Enim sequi quod
            deleniti, soluta excepturi doloribus, blanditiis molestias, officiis
            sapiente dolorem unde labore ducimus id! Ad libero totam beatae?
            Itaque delectus repellendus laudantium, nemo excepturi numquam
            ratione temporibus vero cumque veniam velit a blanditiis sunt,
            inventore veritatis commodi nobis fugit. Totam quo illum enim
            impedit! Atque, sapiente doloribus ratione, omnis exercitationem
            odit libero aspernatur totam possimus deserunt eaque! Ut,
            repellendus laborum.
          </p>
        </div>

        <hr />

        {/* user profile card */}
        <div className="mt-4 mb-4">
          <img
            src={profile_photo}
            alt="User"
            className="user-photo img-fluid rounded-circle"
          />
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
