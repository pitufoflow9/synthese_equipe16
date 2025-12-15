"use client";
import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import Swiper from "swiper";
import "swiper/css";
import { BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";

import "@/app/_components/Nav.css";
import "@/app/_components/Footer.css";
import "@/app/_components/MainPageClient.css";
import "@/app/_components/UserPage.css";
import "@/app/_components/Swiper.css";

const truncate = (value, max = 180) => {
  if (!value) return "Pas de synopsis pour le moment.";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
};

const resolveImage = (theme) => {
  if (!theme) return "../../../img/placeholder.png";
  if (theme.startsWith("http") || theme.startsWith("/") || theme.startsWith("./")) {
    return theme;
  }
  return `../../../img/${theme}`;
};

const UserPage = ({
  displayName = "Auteur",
  profileImage = "../../../img/account_icon.svg",
  stories = [],
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!stories.length) {
      swiperRef.current?.destroy?.(true, true);
      swiperRef.current = null;
      return undefined;
    }

    const el = document.querySelector(".user-swiper");
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

  return (
    <div className="page-container">
      <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
      <Nav />

      <div className="profile-container">
        <img
          className="profile-picture"
          src={profileImage}
          alt={`Profil de ${displayName}`}
        />

        <h2 className="profile-name">{displayName}</h2>
      </div>

      <div className="swiper-container">
        <h2 className="swiper-h2">Récits partagés</h2>
        {!stories.length ? (
          <p className="placeholder-text">
            Cet auteur n&apos;a pas encore publié de récit.
          </p>
        ) : (
          <div className="swiper user-swiper">
            <div className="swiper-wrapper">
              {stories.map((story, index) => {
                const href = `/storyoverview/${story.id}`;
                const slideClass =
                  index === 0
                    ? "swiper-slide swiper-first-slide"
                    : index === stories.length - 1
                    ? "swiper-slide swiper-last-slide"
                    : "swiper-slide";
                return (
                  <div className={slideClass} key={story.id}>
                    <Link href={href} className="swiper-link">
                      <div className="card">
                        <div className="img-container">
                          <img
                            src={resolveImage(story.theme)}
                            className="slide-img"
                            alt={story.title || "Illustration du récit"}
                          />
                          <div className="swiper-buttons-flex-container">
                            <button className="read-button">
                              <p>Lire</p>
                              <BookOpen className="read-icon" />
                            </button>
                          </div>
                        </div>

                        <h3>{story.title}</h3>

                        <p className="swiper-synopsis">
                          {truncate(story.synopsis)}
                        </p>
                        <p className="swiper-author">{displayName}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserPage;
