"use client";
import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { BookOpen } from "lucide-react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import WestIcon from "@mui/icons-material/West";

import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/StoryOverviewPage.css";

const StoryOverviewPage = ({ story }) => {
  const {
    id,
    title,
    synopsis,
    authorName = "Auteur inconnu",
    authorId,
    startNodeId,
  } = story ?? {};

  const readHref = startNodeId
    ? `/storyvisualizer/${id}/${startNodeId}`
    : `/storyvisualizer/${id}`;
  const authorHref = authorId
    ? `/profiles/user/${authorId}`
    : "/profiles/user/unknown";

  return (
    <div className="overview-page-container">
      <img className="bg" src="../../../img/Background_3.jpg" alt="" />
      <Nav />
      <div className="overview-flex-1">
        <Link href="/#stories">
          <button className="btn btn-back">
            <WestIcon />
            Retour
          </button>
        </Link>
        <div className="story-card-container">
          <div className="story-card">
            <div className="overview-flex-2">
              <div className="img-container">
                <img
                  src="../../../img/placeholder.png"
                  className="overview-img"
                  alt=""
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
