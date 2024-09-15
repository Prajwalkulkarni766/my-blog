import React, { useEffect } from "react";
import profile_photo from "../assets/profile_photo.jpg"
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";
import listen from "../assets/listen.svg";

export default function Blog() {

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, []);

    return (
        <div className="container mt-5 my-container" style={{ textAlign: "justify" }}>

            {/* primary-heading */}
            <h1>The AI Popularity contest</h1>

            {/* secondary-heading  */}
            <h4 className="text-secondary">Analyzing the brand strategies of ChatGPT, Gemini, Claude, and Perplexity</h4>

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
                        <span className="follow-btn text-secondary cursor-pointer">Follow</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="time-required-to-read-blog text-secondary">7 Min</span>
                        <span className="dot"></span>
                        <span className="blog-post-date text-secondary">01/01/2000</span>
                    </div>
                </div>
            </div>

            <hr />

            {/* actions buttons for post */}
            <div className="d-flex">
                <div className="me-auto">
                    {/* like button */}
                    <button className="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Like">
                        <img src={like} alt="like logo" title="Like" />
                    </button>

                    {/* comment button */}
                    <button className="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Comment">
                        <img src={comment} alt="comment logo" />
                    </button>
                </div>

                <div className="ms-auto">
                    {/* save to read later button */}
                    <button className="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Read Later">
                        <img src={readLater} alt="Read later logo" />
                    </button>

                    {/* share button */}
                    <button className="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Share">
                        <img src={share} alt="Share logo" />
                    </button>

                    {/* listen button */}
                    <button className="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Listen">
                        <img src={listen} alt="Listen logo" />
                    </button>
                </div>
            </div>

            <hr />

            <div className="mt-4">
                <p>
                    In the 1990s, Sony was preparing to launch a household robot. Their technology was impressive but imperfect: the robot could mishear commands or simply get them wrong. So, instead of launching the product as a robot (think block-y design, 3CPO-like interface, computer-like voice), the team launched it as a dog.
                </p>
            </div>

            {/* // TODO: profile card of user */}
            {/* // todo: same section to like comment and share  */}
            {/* // todo: more blog suggestions */}
        </div>
    )
}