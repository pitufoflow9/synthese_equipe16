"use client";
import Link from "next/link";
import Nav from "./Nav.jsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useAudio } from "../_context/AudioContext.jsx";

import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';

import "../_components/Nav.css"
import "../_components/StoryVisualizerPage.css"
gsap.registerPlugin(useGSAP, SplitText);

export default function StoryVisualizerClient({ story, current, edges, storyId, textEffect = "2", ambiance = "2", isStoryEnd, isChoiceAsked }) {
    const [choiceIsOpen, setChoiceIsOpen] = useState(false);
    const choicePopupRef = useRef();
    const storyTextRef = useRef();
    const backgroundRef = useRef();
    const { changeSource } = useAudio(true);

    useGSAP(() => {
        if (ambiance == "1") {
            changeSource("/audio/horror_ambiance.mp3", true);
            gsap.set(backgroundRef.current, {
                background: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
            });
        }

        else if (ambiance == "2") {
            changeSource("/audio/magic_ambiance.mp3", true);
            gsap.set(backgroundRef.current, {
                background: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
            });
        }
        else {
            changeSource("/audio/medieval_ambiance.mp3", true);
            gsap.set(backgroundRef.current, {
                background: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
            });
        }

        if (textEffect == "1") {
            changeSource("", true);
            const split = new SplitText(storyTextRef.current, {
                type: "lines"
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

            // gsap.to(lines, {
            //     y: -15,
            //     duration: 3,
            //     yoyo: true,
            //     repeat: -1,
            //     ease: "power1.inOut",
            //     stagger: 0.2
            // });
        }

        else if (textEffect == "2") {
            const split = new SplitText(storyTextRef.current, {
                type: "chars"
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
                type: "chars"
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


    }, []);

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
                        href={`/storyvisualizer/${storyId}/${edge.target}`}
                    >
                        {edge.texte || "Choix"}
                    </a>
                ))}
                <hr className="storyvisualizer-hr" />
            </div>
            {isStoryEnd ? (
                <Link href={`/storyvisualizer/${storyId}/${edges[0]?.target || ''}`}>
                    <button className="storyvisualizer-continue-btn">
                        Rejouer
                    </button>
                </Link>
            ) : isChoiceAsked ? (
                <Link href={`/storyvisualizer/${storyId}/${edges[0].target}`}>
                    <button className="storyvisualizer-continue-btn">
                        Continuer
                    </button>
                </Link>
            ) : (
                choiceIsOpen ? (
                    <button className="storyvisualizer-close-btn" onClick={closeChoicePopup}>
                        <CloseIcon />
                    </button>
                ) : (
                    <button className="storyvisualizer-continue-btn" onClick={openChoicePopup}>
                        Continuer
                    </button>
                )
            )}

        </div>
    );
}
