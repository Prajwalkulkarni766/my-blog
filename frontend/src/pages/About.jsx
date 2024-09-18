import React from "react";
import Navbar from "../components/Navbar";
import { TypeAnimation } from "react-type-animation";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import { NavLink } from "react-router-dom";

export default function About() {
  // todo: add coursel of images present in assets folder
  return (
    <>
      <Navbar />

      <div className="container mt-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide "
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={image1}
                    className="d-block w-100 carousel-image"
                    alt="images"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={image2}
                    className="d-block w-100 carousel-image"
                    alt="images"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={image3}
                    className="d-block w-100 carousel-image"
                    alt="images"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <h1 className="text-center display-4">Welcome to My Blog</h1>
            <p className="text-center">
              Discover insightful articles and thought-provoking discussions on
              a variety of topics.
            </p>

            <div className=" mt-5 row justify-content-center align-items-center text-center">
              <div className="mt-5">
                <h2 className="">About This Blog</h2>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore, non eaque, quos repudiandae possimus facilis velit
                  voluptas autem, architecto quod quia omnis perferendis illo
                  exercitationem explicabo quis veritatis modi. Placeat
                  nesciunt, odio temporibus pariatur voluptate quas
                  necessitatibus facere iure animi doloribus, esse earum, qui
                  officia ad iste debitis libero! Blanditiis praesentium dolore
                  ab natus nostrum, sapiente iure saepe ad fuga deserunt illo
                  eos modi aperiam accusantium, nesciunt asperiores totam? Vitae
                  assumenda necessitatibus architecto repellat repellendus nihil
                  quidem? Sit consequatur reprehenderit, blanditiis ab expedita
                  ratione minus iusto eligendi modi eveniet dolores doloremque
                  commodi ducimus tenetur quisquam repellat fugit ea pariatur
                  officiis ad sunt, debitis repudiandae dolorum. Dignissimos
                  dolor dolores molestiae libero itaque facilis neque fugit
                  voluptatem, corrupti beatae quis quibusdam ab optio explicabo
                  vero impedit perspiciatis aut quae, consequatur error, quos
                  debitis ipsa ipsam! Consectetur, eius reprehenderit dolores
                  adipisci ipsa eligendi repellendus nesciunt quae molestiae at
                  libero. Voluptatem sit alias ab, magnam delectus, corrupti,
                  officia modi quasi tenetur vitae libero at ducimus temporibus
                  in voluptatum architecto. Distinctio in culpa animi adipisci
                  unde, ut cupiditate quam mollitia quod deleniti minima porro
                  sequi, accusamus eveniet aspernatur dolorum eos. Nesciunt
                  fugit quo omnis id nihil, error sapiente numquam, beatae vel,
                  harum molestias! Eos, aliquid tenetur. Corporis optio, tenetur
                  magni modi nostrum quas accusamus corrupti ducimus laudantium
                  voluptate? Enim ut nostrum delectus repudiandae? Nostrum
                  consequuntur necessitatibus magni, ex dolorum reiciendis,
                  voluptate laudantium cumque saepe repudiandae doloribus enim!
                  Iusto veritatis dolor maxime eius dolorem? Doloribus nostrum
                  voluptatum totam labore tempora culpa placeat deserunt,
                  adipisci odit iure nam dolorum exercitationem laudantium minus
                  ducimus harum. Nemo hic, sed cum, autem deserunt a pariatur
                  nihil voluptas eveniet vel ex rem itaque culpa eaque soluta,
                  accusantium quae tempore officia voluptate? Minima fuga,
                  repellat doloremque distinctio necessitatibus veniam numquam
                  labore ex ut laudantium expedita inventore enim beatae a nemo
                  perspiciatis rerum aperiam quaerat? Natus a sint placeat quo
                  consectetur rem dolore, dicta earum perferendis modi
                  voluptatem eius amet. Est rem molestiae aliquam?
                </p>
              </div>
              <div className="mt-5">
                <h2 className="">Key Features</h2>
                <ul className="list-unstyled">
                  <TypeAnimation
                    sequence={[
                      " User-friendly interface",
                      2000,
                      "Easy to read articles",
                      2000,
                      "Engaging discussions",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </ul>
              </div>
            </div>

            <div className="text-center mt-4 mb-4">
              <NavLink to={"/login"}>
                <button className="btn my-btn">Start Exploring</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
