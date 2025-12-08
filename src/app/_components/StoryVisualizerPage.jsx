"use client";
import Link from "next/link";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useAudio } from "../_context/AudioContext.jsx";

import Nav from "@/app/_components/Nav.jsx";
import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';

import "@/app/_components/Nav.css"
import "@/app/_components/StoryVisualizerPage.css"
gsap.registerPlugin(useGSAP, SplitText);

export default function storyvisualizerclient({ story, current, edges, storyId, textEffect = "2", ambiance = "2", isStoryEnd, isChoiceAsked }) {
    const [choiceIsOpen, setChoiceIsOpen] = useState(false);
    const choicePopupRef = useRef();
    const storyTextRef = useRef();
    const backgroundRef = useRef();
    const { changeSource } = useAudio(true);
    const ambiancePresets = {
        "ambiance-horror": {
            audio: "/audio/horror_ambiance.mp3",
            background: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
        },
        "ambiance-magic": {
            audio: "/audio/magic_ambiance.mp3",
            background: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
        },
        "ambiance-medieval": {
            audio: "/audio/medieval_ambiance.mp3",
            background: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
        },
        "1": {
            audio: "/audio/horror_ambiance.mp3",
            background: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
        },
        "2": {
            audio: "/audio/magic_ambiance.mp3",
            background: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
        },
        "3": {
            audio: "/audio/medieval_ambiance.mp3",
            background: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
        },
    };
    const textEffectMap = {
        "effect-rise": "rise",
        "effect-blur": "blur",
        "effect-typewriter": "typewriter",
        "1": "rise",
        "2": "blur",
        "3": "typewriter",
    };

    useGSAP(() => {
        const ambianceConfig = ambiancePresets[ambiance] || ambiancePresets["ambiance-magic"];
        const resolvedEffect = textEffectMap[textEffect] || "blur";

        if (backgroundRef.current) {
            gsap.set(backgroundRef.current, {
                background: ambianceConfig.background,
            });
        }
        changeSource(ambianceConfig.audio, true);

        if (!storyTextRef.current) return;
        storyTextRef.current.innerHTML = storyTextRef.current.textContent;

        if (resolvedEffect === "rise") {
            const split = new SplitText(storyTextRef.current, {
                type: "lines",
                wordsClass: "word"
            });
            const lines = split.lines;

            gsap.set(lines, { opacity: 0, y: 50, color: "#ffffff" });

            gsap.to(lines, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.5,
                ease: "power2.out",
            });
        }

        else if (resolvedEffect === "blur") {
            const split = new SplitText(storyTextRef.current, {
                type: "words,chars",
                wordsClass: "word"
            });

            gsap.from(split.chars, {
                opacity: 0,
                duration: 0.6,
                stagger: 0.01,
                filter: "blur(4px)",
            });
        }

        else {
            const split = new SplitText(storyTextRef.current, {
                type: "words,chars",
                wordsClass: "word"
            });

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
    }, { dependencies: [ambiance, textEffect, current?.id] });

    const openChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(true);
        console.log("Choice opened");
    };

    const closeChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(false);
        console.log("Choice closed");
    };

    return (
        <div className="storyvisualizer-page" ref={backgroundRef}>
            <Nav />
            <Link href="/#stories">
                <button className="storyvisualizer-btn-back ">
                    <WestIcon />Retour
                </button>
            </Link>
            <h1 className="storyvisualizer-title">{story.title}</h1>
            <p className="storyvisualizer-text" ref={storyTextRef}>{current.contenu || "Contenu du nœud"}</p>
            <div
                className={choiceIsOpen ? "storyvisualizer-choices-container opened" : "storyvisualizer-choices-container"}
                ref={choicePopupRef}>
                {edges.map((edge) => (
                    <a
                        className="storyvisualizer-choices"
                        key={edge.id}
                        href={"/StoryVisualizer/" + storyId + "/" + edge.target}
                    >
                        {edge.texte || "Choix"}
                    </a>
                ))}
                <hr className="storyvisualizer-hr" />
            </div>
            {isStoryEnd ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + (edges[0]?.target || "")}>
                        <button className="storyvisualizer-continue-btn">
                            Relire
                        </button>
                    </Link>
                    <Link href={"/#stories" + storyId + "/" + (edges[0]?.target || "")}>

                        <button className="storyvisualizer-continue-btn">
                            Retourner aux publications
                        </button>
                    </Link>
                </div>
            ) : isChoiceAsked ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + edges[0].target}>
                        <button className="storyvisualizer-continue-btn">
                            Continuer
                        </button>
                    </Link>
                </div>
            ) : (
                choiceIsOpen ? (
                    <div className="storyvisualizer-flex-container">
                        <button className="storyvisualizer-close-btn" onClick={closeChoicePopup}>
                            <CloseIcon />
                        </button>
                    </div>
                ) : (
                    <div className="storyvisualizer-flex-container">
                        <button className="storyvisualizer-continue-btn" onClick={openChoicePopup}>
                            Continuer
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
