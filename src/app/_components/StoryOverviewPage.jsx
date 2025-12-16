"use client";
import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { BookOpen } from "lucide-react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import WestIcon from "@mui/icons-material/West";
import { useAudio } from "@/app/_context/AudioContext";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [likeCount, setLikeCount] = useState(story?.likes ?? 0);
  const [dislikeCount, setDislikeCount] = useState(story?.dislikes ?? 0);
  const [pendingReaction, setPendingReaction] = useState(null);
  const [reactionError, setReactionError] = useState(null);
  const [user, setUser] = useState(null);
  const [hasReacted, setHasReacted] = useState(false);
  const [savedReaction, setSavedReaction] = useState(null);

  const readHref = startNodeId
    ? `/storyvisualizer/${id}/${startNodeId}`
    : `/storyvisualizer/${id}`;
  const router = useRouter();
  const authorHref = authorId
    ? `/profiles/user/${authorId}`
    : "/profiles/user/unknown";
  const reactionStorageKey = useMemo(() => id ? `inkveil-reaction-${id}` : null, [id]);
  const imageSrc = (() => {
    const theme = story?.theme;
    if (!theme) return "../../../img/placeholder.png";
    if (theme.startsWith("http") || theme.startsWith("/") || theme.startsWith("./")) {
      return theme;
    }
    return `../../../img/${theme}`;
  })();

  useEffect(() => {
    pause();
  }, []);

  // Fetch session to know whether to allow reactions or redirect.
  useEffect(() => {
    let active = true;
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Session fetch failed");
        const data = await res.json();
        if (!active) return;
        setUser(data?.user ?? null);
      } catch (error) {
        if (active) setUser(null);
      }
    };
    fetchSession();
    return () => {
      active = false;
    };
  }, []);

  // Restore previous reaction (local-only) to block further likes/dislikes.
  useEffect(() => {
    if (!reactionStorageKey || typeof window === "undefined") return;
    const existing = localStorage.getItem(reactionStorageKey);
    if (existing) {
      setHasReacted(true);
      setSavedReaction(existing);
    } else {
      setHasReacted(false);
      setSavedReaction(null);
    }
  }, [reactionStorageKey]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/#stories");
  };

  const handleReaction = useCallback(
    async (reactionType) => {
      if (!id || pendingReaction || hasReacted) return;

      // If guest, push to auth then stop.
      if (!user) {
        const destination =
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search + window.location.hash
            : `/storyoverview/${id}`;
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(destination)}`);
        return;
      }

      setReactionError(null);
      setPendingReaction(reactionType);

      const prevLikes = likeCount;
      const prevDislikes = dislikeCount;

      if (reactionType === "like") {
        setLikeCount((current) => current + 1);
      } else {
        setDislikeCount((current) => current + 1);
      }

      try {
        const response = await fetch(`/api/stories/${id}/${reactionType}`, {
          method: "POST",
        });

        if (!response.ok) {
          if (response.status === 401) {
            const destination =
              typeof window !== "undefined"
                ? window.location.pathname + window.location.search + window.location.hash
                : `/storyoverview/${id}`;
            router.push(`/auth/signin?callbackUrl=${encodeURIComponent(destination)}`);
          }
          throw new Error("La r\u00e9ponse du serveur est invalide.");
        }

        const payload = await response.json();
        setLikeCount(payload.likes ?? prevLikes + (reactionType === "like" ? 1 : 0));
        setDislikeCount(
          payload.dislikes ?? prevDislikes + (reactionType === "dislike" ? 1 : 0)
        );

        if (reactionStorageKey && typeof window !== "undefined") {
          localStorage.setItem(reactionStorageKey, reactionType);
          setHasReacted(true);
          setSavedReaction(reactionType);
        }
      } catch (error) {
        console.error("Erreur lors de la r\u00e9action :", error);
        setLikeCount(prevLikes);
        setDislikeCount(prevDislikes);
        setReactionError("Impossible d'enregistrer ta r\u00e9action pour le moment.");
      } finally {
        setPendingReaction(null);
      }
    },
    [dislikeCount, hasReacted, id, likeCount, pendingReaction, reactionStorageKey, router, user]
  );

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
                <button
                  type="button"
                  className="like-container reaction-button"
                  onClick={() => handleReaction("like")}
                  disabled={pendingReaction === "like" || hasReacted}
                  aria-label="Aimer cette histoire"
                >
                  <p className="like-counter">{likeCount}</p>
                  <ThumbUpAltIcon
                    sx={{ color: pendingReaction === "like" || hasReacted ? "#9a9a9a" : "#656565", fontSize: "30px" }}
                  />
                </button>
                <button
                  type="button"
                  className="dislike-container reaction-button"
                  onClick={() => handleReaction("dislike")}
                  disabled={pendingReaction === "dislike" || hasReacted}
                  aria-label="Ne pas aimer cette histoire"
                >
                  <p className="like-counter">{dislikeCount}</p>
                  <ThumbDownAltIcon
                    sx={{ color: pendingReaction === "dislike" || hasReacted ? "#9a9a9a" : "#656565", fontSize: "30px" }}
                  />
                </button>
              </div>
              <Link href={authorHref}>
                <p className="author">{authorName}</p>
              </Link>
            </div>
            <div className="overview-flex-3">
              <div>
                <h3 className="overview-h3">{title}</h3>
                {reactionError ? (
                  <p className="reaction-error">{reactionError}</p>
                ) : null}
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
