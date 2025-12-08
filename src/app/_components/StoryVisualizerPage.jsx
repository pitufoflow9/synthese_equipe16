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

const StoryVisualizerPage = ({ story, current, edges, storyId, textEffect = "2", ambiance = "2", isStoryEnd, isChoiceAsked }) => {
    const [choiceIsOpen, setChoiceIsOpen] = useState(false);
    const [choiceConfirmationIsOpen, setChoiceConfirmationIsOpen] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(null);
    const [clonedElement, setClonedElement] = useState(null);
    const clonedRef = useRef(null);
    const choiceRefs = useRef({});
    const choicePopupRef = useRef();
    const storyTextRef = useRef();
    const backgroundRef = useRef();
    const { changeSource } = useAudio(true);
    const timelineRef = useRef(null);

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



    const openChoiceConfirmation = (e, edgeId) => {
        const clickedElement = choiceRefs.current[edgeId];
        const allChoices = edges.map(edge => choiceRefs.current[edge.id]);
        const clone = clickedElement.cloneNode(true);

        //Suprimme l'ancien clone (pour eviter le bug de voir l'autre choix si on fait plusieur sélections)
        if (clonedRef.current) {
            clonedRef.current.remove();
            clonedRef.current = null;
        }

        e.preventDefault();
        setChoiceConfirmationIsOpen(true);

        choicePopupRef.current.appendChild(clone);
        clone.classList.add("clone")
        clonedRef.current = clone;

        let tl = gsap.timeline();
        timelineRef.current = tl;
        tl.set(clonedRef.current, {
            opacity: 0,
            filter: "blur(15px)"
        })
        tl.set(".choice-confirmation-indication", {
            opacity: 0,
            filter: "blur(15px)"
        })
        tl.to(allChoices, {
            opacity: 0,
            duration: 0.2,
            filter: "blur(15px)",
            ease: "none"
        });
        tl.to(".storyvisualizer-hr", {
            opacity: 0,
            duration: 0.2,
            filter: "blur(15px)",
            ease: "none"
        }, "<");
        tl.to(".choice-confirmation-indication", {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power4.in"
        }, "<")
        tl.to(clonedRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power4.in"
        }, "<")
        tl.to(".choice-confirmation-indication", {
            scale: 1.3,
            duration: 0.8,
            ease: "power3.out"
        }, "<")
        tl.to(clonedRef.current, {
            scale: 1.3,
            duration: 0.8,
            ease: "power3.out"
        }, "<")
    }

    const closeChoiceConfirmation = (e) => {
        // e.preventDefault();
        setChoiceConfirmationIsOpen(false);

        const allChoices = edges.map(edge => choiceRefs.current[edge.id]);

        const reverseTl = gsap.timeline({
            onComplete: () => {
                if (clonedRef.current) {
                    clonedRef.current.remove();
                    clonedRef.current = null;
                }
                timelineRef.current = null;
                setSelectedChoice(false);
            }
        });

        reverseTl.to(clonedRef.current, {
            opacity: 0,
            filter: "blur(15px)",
            duration: 0.2,
            ease: "none"
        }, "<+0.1")
        reverseTl.to(".choice-confirmation-indication", {
            opacity: 0,
            filter: "blur(15px)",
            duration: 0.2,
            ease: "none"
        }, "<")
        reverseTl.to(allChoices, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.2,
            ease: "none"
        }, "-=0.1")
        reverseTl.to(".storyvisualizer-hr", {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.2,
            ease: "none"
        }, "<");
        reverseTl.set(clonedRef.current, {
            scale: 1,
        })
        reverseTl.set(".choice-confirmation-indication", {
            scale: 1,
        })

    };




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

            <div className={choiceIsOpen ? "backdrop-blur open" : "backdrop-blur"} />


            <div
                className={choiceIsOpen ? "storyvisualizer-choices-container opened" : "storyvisualizer-choices-container"}
                ref={choicePopupRef}>
                {edges.map((edge) => (
                    <a
                        className={`storyvisualizer-choices ${selectedChoice === edge.id ? 'selected' : ''}`}
                        key={edge.id}
                        ref={(e) => (choiceRefs.current[edge.id] = e
                        )}
                        onClick={(e) => openChoiceConfirmation(e, edge.id)}
                        href={"/storyvisualizer/" + storyId + "/" + edge.target}
                    >
                        {edge.texte || "Choix"}
                    </a>
                ))}
                <hr className="storyvisualizer-hr" />
            </div>
            <p className="choice-confirmation-indication">Appuyez à nouveau pour confirmer votre choix</p>
            {isStoryEnd ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + (edges[0]?.target || "")}>
                        <button className="storyvisualizer-continue-btn">
                            Relire
                        </button>
                    </Link>
                    <Link href="/#stories">
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

                choiceIsOpen && choiceConfirmationIsOpen ? (
                    <div>
                        <div className="storyvisualizer-flex-container">
                            <button className="storyvisualizer-close-btn confirmation" onClick={closeChoiceConfirmation}>
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                ) : choiceIsOpen ? (
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

export default StoryVisualizerPage;

