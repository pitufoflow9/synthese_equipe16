"use client";
import { useEffect, useRef, useState } from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Swiper from "swiper";
import "swiper/css";
import "@/app/_components/KeepReading.css";

const resolveImage = (theme) => {
  if (!theme) return "../../../img/placeholder.png";
  if (theme.startsWith("http") || theme.startsWith("/") || theme.startsWith("./")) {
    return theme;
  }
  return `../../../img/${theme}`;
};

const truncate = (value, max = 180) => {
  if (!value) return "Pas de synopsis pour le moment.";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
};

const KeepReading = () => {
  const [items, setItems] = useState([]);
  console.log("items lenght"+items.length)

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(localStorage.getItem("inkveil-recent") || "[]");
      setItems(Array.isArray(stored) ? stored : []);
    } catch (err) {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (!items.length) {
      swiperRef.current?.destroy?.(true, true);
      swiperRef.current = null;
      return undefined;
    }
    const el = document.querySelector(".keep-reading-swiper");
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
  }, [items.length]);

  if (!items.length) {
    return (
      <section>
        <h2 className="section-title keep-reading-h2" id="stories-1">
          Reprenez votre aventure
        </h2>
        <p className="placeholder-text">
          Aucune lecture récente pour l’instant. Lancez une histoire pour la retrouver ici.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title keep-reading-h2" id="stories-1">Reprenez votre aventure</h2>
      <div className="swiper-container">
        <div className="swiper keep-reading-swiper">
          <div className="swiper-wrapper">
            {items.map((story, index) => {
              const href = `/storyvisualizer/${story.storyId}/${story.nodeId}`;
              const slideClass =
                index === 0
                  ? "swiper-slide swiper-first-slide"
                  : index === items.length - 1
                    ? "swiper-slide swiper-last-slide"
                    : "swiper-slide";
              return (
                <div className={slideClass} key={`${story.storyId}-${story.nodeId}`}>
                  <Link href={href} className="swiper-link">
                    <div className="card">
                      <div className="img-container">
                        <img
                          src={resolveImage(story.image || story.theme)}
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

                      <h3>{story.title || "Titre inconnu"}</h3>
                      <p className="swiper-synopsis">{truncate(story.synopsis)}</p>
                      <p className="swiper-author">{story.authorName || "Auteur inconnu"}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeepReading;
