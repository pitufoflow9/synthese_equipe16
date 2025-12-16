"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";

const truncate = (value, max = 180) => {
  if (!value) return "Pas de synopsis pour le moment.";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}.`;
};

const resolveImage = (theme) => {
  if (!theme) return "../../../img/placeholder.png";
  if (theme.startsWith("http") || theme.startsWith("/") || theme.startsWith("./")) {
    return theme;
  }
  return `../../../img/${theme}`;
};

const RecemmentPubliees = ({ stories = [] }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!stories.length) {
      swiperRef.current?.destroy?.(true, true);
      swiperRef.current = null;
      return undefined;
    }

    const el = document.querySelector(".recently-published-swiper");
    if (!el) return undefined;

    swiperRef.current?.destroy?.(true, true);
    swiperRef.current = new Swiper(el, {
      slidesPerView: 2.5,
      spaceBetween: 30,
      speed: 400,
      grabCursor: true,
      slidesOffsetAfter: 200,
    });

    return () => {
      swiperRef.current?.destroy?.(true, true);
      swiperRef.current = null;
    };
  }, [stories.length]);

  if (!stories.length) {
    return (
      <section>
        <h2 className="section-title recently-published-h2" id="stories">Récemment publiées</h2>
        <p className="placeholder-text">
          Aucune histoire publique n'est disponible pour l'instant. Parcourez les
          créations dès qu'elles seront publiées - même en mode invité.
        </p>
      </section>
    );
  }

  return (
    <section className="recentlypublished-section" >
      <h2 className="section-title recently-published-h2" id="stories">Récemment publiées</h2>
      <div className="swiper-container">
        <div className="swiper recently-swiper">
          <div className="swiper-wrapper">
            {stories.map((story, index) => (
              <div
                className={`swiper-slide ${index === 0 ? "swiper-first-slide" : ""
                  } ${index === stories.length - 1 ? "swiper-last-slide" : ""}`}
                key={story.id}
              >
                <Link href={`/storyoverview/${story.id}`} className="swiper-link">
                  <div className="card">
                    <div className="img-container">
                      <img
                        src={resolveImage(story.theme)}
                        className="slide-img"
                        alt={story.title || "Illustration de l'histoire"}
                      />
                      <div className="swiper-buttons-flex-container">
                        <button className="read-button">
                          <p>Lire</p>
                          <BookOpen className="read-icon" />
                        </button>
                      </div>
                    </div>
                    <h3>{story.title}</h3>
                    <p className="swiper-synopsis">{truncate(story.synopsis)}</p>
                    <p className='swiper-author'>{story.authorName || 'Auteur inconnu'}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecemmentPubliees;
