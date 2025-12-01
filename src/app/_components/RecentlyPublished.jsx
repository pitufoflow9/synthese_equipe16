"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const truncate = (value, max = 180) => {
  if (!value) return "Pas de synopsis pour le moment.";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}…`;
};

const RecemmentPubliees = ({ stories = [] }) => {
  if (!stories.length) {
    return (
      <section>
        <h2 className="section-title">Récemment publiées</h2>
        <p style={{ padding: "0 24px" }}>
          Aucune histoire publique n'est disponible pour l'instant. Parcourez les
          créations dès qu'elles seront publiées — même en mode invité.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">Récemment publiées</h2>
      <div className="swiper-container">
        <div className="swiper">
          <div className="swiper-wrapper">
            {stories.map((story, index) => (
              <div
                className={`swiper-slide ${
                  index === 0 ? "swiper-first-slide" : ""
                } ${index === stories.length - 1 ? "swiper-last-slide" : ""}`}
                key={story.id}
              >
                <div className="card">
                  <div className="img-container">
                    <img
                      src="../../../img/placeholder.png"
                      className="slide-img"
                      alt=""
                    />
                    <Link
                      href={`/storyVisualizer/${story.id}`}
                      className="read-button"
                      aria-label={`Lire ${story.title}`}
                    >
                      <BookOpen className="read-icon" />
                    </Link>
                  </div>
                  <div className="tags">
                    <span>{story.theme || "Public"}</span>
                  </div>
                  <h3>{story.title}</h3>
                  <p>{truncate(story.synopsis)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecemmentPubliees;
