import React, { useEffect, useState } from "react";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";
import listen from "../assets/listen.svg";
import stop from "../assets/stop.svg";

export default function BlogPostButtons() {
  const [isListening, setIsListening] = useState(false);

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

  const handleListen = () => {
    if (isListening) {
      speechSynthesis.cancel();
    } else {
      readBlog();
    }
    setIsListening((prev) => !prev);
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
    );
  }, []);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="d-flex">
      <div className="me-auto">
        {/* like button */}
        <button className="btn">
          <img
            src={like}
            alt="like logo"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Like"
          />
        </button>

        {/* comment button */}
        <button className="btn">
          <img
            src={comment}
            alt="comment logo"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Comment"
          />
        </button>
      </div>

      <div className="ms-auto">
        {/* save to read later button */}
        <button className="btn">
          <img
            src={readLater}
            alt="Read later logo"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Read Later"
          />
        </button>

        {/* share button */}
        <button className="btn">
          <img
            src={share}
            alt="Share logo"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Share"
          />
        </button>

        {/* listen button */}
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={isListening ? "Stop" : "Listen"}
          onClick={handleListen}
        >
          <img src={isListening ? stop : listen} alt="Listen logo" />
        </button>
      </div>
    </div>
  );
}
