"use client";
import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";
import "swiper/css";
import { useAudio } from "@/app/_context/AudioContext";

import "@/app/_components/Nav.css";
import "@/app/_components/Footer.css";
import "@/app/_components/MainPageClient.css";
import "@/app/_components/MyProfilePage.css";
import "@/app/_components/Swiper.css";

import Swiper from "swiper";
import EditIcon from "@mui/icons-material/Edit";

const truncate = (value, max = 180) => {
  if (!value) return "Pas de synopsis pour le moment.";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}…`;
};

const resolveImage = (theme) => {
  if (!theme) return "../../../img/placeholder.png";
  if (theme.startsWith("http") || theme.startsWith("/") || theme.startsWith("./")) {
    return theme;
  }
  return `../../../img/${theme}`;
};

const MyProfilePage = ({
  userName = "Mon profil",
  profileImage = "../../../img/account_icon.svg",
  publishedStories = [],
  draftStories = [],
}) => {
  useEffect(() => {
    const swiperElements = Array.from(document.querySelectorAll(".swiper"));
    if (!swiperElements.length) return;

    const swipers = swiperElements.map(
      (el) =>
        new Swiper(el, {
          slidesPerView: 2.5,
          spaceBetween: 30,
          speed: 400,
          grabCursor: true,
          slidesOffsetAfter: 200,
        })
    );

    return () => {
      swipers.forEach((instance) => instance?.destroy?.());
    };
  }, [publishedStories.length, draftStories.length]);

  const { pause } = useAudio(false);

  //Pause la musique si l'utilisateur viens d'une page de visualisation d'histoire.
  useEffect(() => {
    pause();
  }, []);

  return (
    <div className="myprofile-page-container">
      <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
      <Nav />

      <div className="profile-container">
        <img
          className="profile-picture"
          src={profileImage}
          alt={`Profil de ${userName}`}
        />
        <h2 className="profile-name">{userName}</h2>
      </div>

      {/* SECTION Récits Partagé */}
      <div className="swiper-container">
        <h2 className="swiper-h2">Récits partagés</h2>
        {!publishedStories.length ? (
          <p className="placeholder-text">
            Tu n&apos;as pas encore publié de récit. Publie une histoire pour la
            voir ici.
          </p>
        ) : (
          <div className="swiper">
            <div className="swiper-wrapper">
              {publishedStories.map((story, index) => {
                const readHref = `/storyoverview/${story.id}`;
                const editHref = `/storyeditor/${story.id}`;

                return (
                  <div
                    className={`swiper-slide ${index === 0 ? "swiper-first-slide" : ""
                      } ${index === publishedStories.length - 1
                        ? "swiper-last-slide"
                        : ""
                      }`}
                    key={story.id}
                  >
                    <div className="card">
                      <Link
                        href={readHref}
                        className="card-overlay"
                        aria-label={`Lire ${story.title}`}
                      />
                      <div className="img-container">
                        <img
                          src={resolveImage(story.theme)}
                          className="slide-img"
                          alt={story.title || "Illustration du récit"}
                        />
                        <div className="swiper-buttons-flex-container">
                          <Link
                            href={editHref}
                            className="edit-button"
                            aria-label={`Modifier ${story.title}`}
                          >
                            <EditIcon />
                          </Link>
                          <Link
                            href={readHref}
                            className="read-button"
                            aria-label={`Lire ${story.title}`}
                          >
                            <p>Lire</p>
                            <BookOpen className="read-icon" />
                          </Link>
                        </div>
                      </div>
                      <h3>{story.title}</h3>
                      <p className="swiper-synopsis">
                        {truncate(story.synopsis)}
                      </p>
                      <p className="swiper-author">{userName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <hr className="profil-hr" />

      {/* SECTION Mes brouillons */}
      <div className="swiper-container">
        <h2 className="swiper-h2">Mes brouillons</h2>
        {!draftStories.length ? (
          <p className="placeholder-text">
            Aucun brouillon pour le moment. Crée un nouveau récit pour le
            compléter plus tard.
          </p>
        ) : (
          <div className="swiper">
            <div className="swiper-wrapper">
              {draftStories.map((story, index) => {
                const editHref = `/storyeditor/${story.id}`;
                return (
                  <div
                    className={`swiper-slide ${index === 0 ? "swiper-first-slide" : ""
                      } ${index === draftStories.length - 1
                        ? "swiper-last-slide"
                        : ""
                      }`}
                    key={story.id}
                  >
                    <div className="card">
                      <div className="img-container">
                        <img
                          src={resolveImage(story.theme)}
                          className="slide-img"
                          alt={story.title || "Illustration du brouillon"}
                        />
                        <div className="swiper-buttons-flex-container">
                          <Link
                            href={editHref}
                            className="edit-button"
                            aria-label={`Modifier ${story.title}`}
                          >
                            <EditIcon />
                          </Link>
                        </div>
                      </div>
                      <h3>{story.title}</h3>
                      <p className="swiper-synopsis">
                        {truncate(story.synopsis)}
                      </p>
                      <p className="swiper-author">{userName}</p>
                    </div>
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

export default MyProfilePage;
