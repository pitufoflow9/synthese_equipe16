"use client";
import Link from "next/link";
import Nav from "./Nav.jsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

import "../_components/Nav.css";
import "../_components/MainPageClient.css";
import "../_components/StoryVisualizerPage.css";

gsap.registerPlugin(useGSAP, SplitText);

const StoryVisualizerPage = ({
  storyTitle,
  storyId,
  nodeTitle,
  nodeContent,
  branches = [],
  isEnding = false,
}) => {
  const storyTextRef = useRef();
  const backgroundRef = useRef();
  const [theme, setTheme] = useState(1);
  const contentToDisplay =
    nodeContent?.trim() ||
    nodeTitle?.trim() ||
    "Aucun texte n'est disponible pour ce noeud.";

  useEffect(() => {
    if (storyTextRef.current) {
      storyTextRef.current.textContent = contentToDisplay;
    }
  }, [contentToDisplay]);

  useGSAP(() => {
    if (!storyTextRef.current || !backgroundRef.current) return;

    // Reset any previous SplitText spans before applying a new effect
    storyTextRef.current.textContent = contentToDisplay;

    if (theme === 1) {
      gsap.to(backgroundRef.current, {
        background: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
        duration: 1,
        ease: "power2.inOut",
      });

      const split = new SplitText(storyTextRef.current, { type: "lines" });
      const lines = split.lines;

      gsap.set(lines, { opacity: 0, y: 50, color: "#ffffff" });

      gsap.to(lines, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.5,
        ease: "power2.out",
      });

      gsap.to(lines, {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    } else if (theme === 2) {
      gsap.to(backgroundRef.current, {
        background: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
        duration: 1.5,
        ease: "power2.inOut",
      });

      const split = new SplitText(storyTextRef.current, { type: "chars" });
      gsap.from(split.chars, {
        opacity: 0,
        duration: 0.6,
        stagger: 0.01,
        filter: "blur(4px)",
      });
    } else if (theme === 3) {
      gsap.to(backgroundRef.current, {
        background: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
        duration: 1,
        ease: "power2.inOut",
      });

      const split = new SplitText(storyTextRef.current, { type: "chars" });

      gsap.set(split.chars, { opacity: 0, scale: 0 });

      gsap.set(split.chars, {
        opacity: 1,
        scale: 1,
        y: () => gsap.utils.random(-3, 3),
        x: () => gsap.utils.random(-1, 1),
        rotation: () => gsap.utils.random(-1, 1),
        duration: 0.1,
        stagger: gsap.utils.random(0.01, 0.04),
      });
    }
  }, [theme, contentToDisplay]);

  const changeTheme = () => {
    setTheme((previousTheme) => (previousTheme === 3 ? 1 : previousTheme + 1));
  };

  const choiceLabel = (branch) =>
    branch?.texte?.trim() ||
    branch?.targetTitle?.trim() ||
    (branch?.isTargetEnding ? "Fin" : "Choix");

  return (
    <div className="page-background-visualizer" ref={backgroundRef}>
      <Nav />

      <div className="visualizer-header">
        <div>
          <p className="story-label">Histoire</p>
          <h1 className="story-title">{storyTitle}</h1>
          <p className="node-label">{nodeTitle || "Etape"}</p>
        </div>
        <button onClick={changeTheme} className="theme-btn">
          Thème ({theme})
        </button>
      </div>

      <p className="story-text" ref={storyTextRef} />

      <div className="choices-container">
        {branches.length === 0 ? (
          <div className="end-of-story">
            {isEnding ? "Fin de l'histoire." : "Aucun autre choix disponible."}
          </div>
        ) : (
          branches.map((branch) => (
            <Link
              key={branch.id}
              href={`/storyvisualizer/${storyId}/${branch.target}`}
              className="choice-link"
            >
              <button className="choice-btn">
                <span>{choiceLabel(branch)}</span>
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StoryVisualizerPage;
