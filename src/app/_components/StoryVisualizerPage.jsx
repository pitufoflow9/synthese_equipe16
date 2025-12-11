"use client";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useAudio } from "../_context/AudioContext.jsx";
import { useRouter } from "next/navigation";

import Nav from "@/app/_components/Nav.jsx";
import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';
import StoryCustomization from "@/app/_components/StoryCustomisation";

import "@/app/_components/Nav.css"
import "@/app/_components/StoryVisualizerPage.css"

gsap.registerPlugin(useGSAP, SplitText);

let hasAudioStarted = false;

const StoryVisualizerPage = ({
    story,
    current,
    edges,
    storyId,
    textEffect,
    ambiance,
    isStoryEnd,
    isChoiceAsked,
    isFirstNode,
}) => {
    const [choiceIsOpen, setChoiceIsOpen] = useState(false);
    const [choiceConfirmationIsOpen, setChoiceConfirmationIsOpen] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const clonedRef = useRef(null);
    const choiceRefs = useRef({});
    const choicePopupRef = useRef();
    const storyTextRef = useRef();
    const backgroundRef = useRef();
    const timelineRef = useRef(null);
    const { changeSource, play, isReady, changeVolume } = useAudio(false);
    const router = useRouter();

    useEffect(() => {
        if (!isFirstNode) return;
        if (hasAudioStarted) return;

        hasAudioStarted = true;

        const fichierAudio =
            ambiance === "1" ? "/audio/horror_ambiance.mp3" :
                ambiance === "2" ? "/audio/magic_ambiance.mp3" :
                    ambiance === "3" ? "/audio/medieval_ambiance.mp3" :
                        null;

        if (fichierAudio) {
            changeSource(fichierAudio, false);
            console.log("Loading audio once:", fichierAudio);
        }
    }, [isFirstNode, ambiance, changeSource]);

    useEffect(() => {
        if (isReady) {
            changeVolume(0.1);
        }
    }, [isReady, changeVolume]);

    useEffect(() => {
        if (!isReady) return;
        if (!isFirstNode) return;

        play();
        console.log("Playing audio");
    }, [isReady, isFirstNode, play]);

    useEffect(() => {
        if (storyTextRef.current && backgroundRef.current) {
            StoryCustomization(
                storyTextRef.current,
                backgroundRef.current,
                null,
                textEffect,
                ambiance,
                false,
                false,
                null
            );
        }
    }, [textEffect, current?.id, ambiance]);



    const openChoiceConfirmation = (e, edgeId) => {
        if (selectedChoice === edgeId) {

            return;
        }

        const clickedElement = choiceRefs.current[edgeId];
        const allChoices = edges.map(edge => choiceRefs.current[edge.id]);
        const clone = clickedElement.cloneNode(true);


        e.preventDefault();
        setSelectedChoice(edgeId);
        setChoiceConfirmationIsOpen(true);


        if (clonedRef.current) {
            clonedRef.current.remove();
            clonedRef.current = null;
        }

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

    const closeChoiceConfirmation = () => {
        setChoiceConfirmationIsOpen(false);

        const allChoices = edges.map(edge => choiceRefs.current[edge.id]);
        const reverseTl = gsap.timeline({
            onComplete: () => {
                if (clonedRef.current) {
                    clonedRef.current.remove();
                    clonedRef.current = null;
                }
                timelineRef.current = null;
                setSelectedChoice(null);
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
    };

    const closeChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(false);
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
                className={"storyvisualizer-choices-container " + (choiceIsOpen ? "opened " : "") + "choice-" + edges.length}

                ref={choicePopupRef}>
                {edges.map((edge) => (
                    <Link
                        className={`storyvisualizer-choices ${selectedChoice === edge.id ? 'selected' : ''}`}
                        key={edge.id}
                        ref={(e) => (choiceRefs.current[edge.id] = e
                        )}
                        onClick={(e) => openChoiceConfirmation(e, edge.id)}
                        href={"/storyvisualizer/" + storyId + "/" + edge.target}>
                        {edge.texte || "Choix"}
                    </Link>
                ))}
                {edges.length < 3 && <hr className="storyvisualizer-hr" />
                }
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

