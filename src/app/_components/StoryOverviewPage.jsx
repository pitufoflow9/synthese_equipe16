"use client";
import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { BookOpen } from "lucide-react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import WestIcon from "@mui/icons-material/West";
import { useAudio } from "@/app/_context/AudioContext";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

import "@/app/_components/Nav.css";
import "@/app/_components/Footer.css";
import "@/app/_components/MainPageClient.css";
import "@/app/_components/StoryOverviewPage.css";

const StoryOverviewPage = ({ story }) => {
  const {
    id,
    title,
    synopsis,
    authorName = "Auteur inconnu",
    authorId,
    startNodeId,
    theme
  } = story ?? {};
  const { pause } = useAudio(false);

  const readHref = startNodeId
    ? `/storyvisualizer/${id}/${startNodeId}`
    : `/storyvisualizer/${id}`;
  const router = useRouter();
  const authorHref = authorId
    ? `/profiles/user/${authorId}`
    : "/profiles/user/unknown";
  const imageSrc = (() => {
    const theme = story?.theme;
    if (!theme) return "../../../img/placeholder.png";
    if (theme.startsWith("http") || theme.startsWith("/") || theme.startsWith("./")) {
      return theme;
    }
    return `../../../img/${theme}`;
  })();


  //Pause la musique si l'utilisateur viens d'une page de visualisation d'histoire.
  useEffect(() => {
    pause();
  }, []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/#stories");
  };

  return (
    <div className="overview-page-container">
      <img className="bg" src="../../../img/Background_3.jpg" alt="" />
      <Nav />
      <div className="overview-flex-1">
        <button className="btn btn-back" type="button" onClick={handleBack}>
          <WestIcon />
          Retour
        </button>
        <div className="story-card-container">
          <div className="story-card">
            <div className="overview-flex-2">
              <div className="img-container">
                <img
                  src={imageSrc}
                  className="overview-img"
                  alt={title || "Illustration de l'histoire"}
                />
              </div>
              <div className="like-dislike-container">
                <div className="like-container">
                  <p className="like-counter">0</p>
                  <ThumbUpAltIcon sx={{ color: "#656565", fontSize: "30px" }} />
                </div>
                <div className="dislike-container">
                  <p className="like-counter">0</p>
                  <ThumbDownAltIcon
                    sx={{ color: "#656565", fontSize: "30px" }}
                  />
                </div>
              </div>
              <Link href={authorHref}>
                <p className="author">{authorName}</p>
              </Link>
            </div>
            <div className="overview-flex-3">
              <div>
                <h3 className="overview-h3">{title}</h3>
                <p className="overview-synopsis">
                  {synopsis || "Aucun synopsis fourni pour cette histoire."}
                </p>
              </div>
              <Link
                href={readHref}
                aria-disabled={!startNodeId}
                tabIndex={!startNodeId ? -1 : 0}
              >
                <button className="read-button" disabled={!startNodeId}>
                  Lire
                  <BookOpen className="read-icon" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoryOverviewPage;
