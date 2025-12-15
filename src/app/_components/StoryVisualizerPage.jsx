"use client";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useAudio } from "../_context/AudioContext.jsx";

import Nav from "@/app/_components/Nav.jsx";
import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';
import StoryCustomization from "@/app/_components/StoryCustomisation";

import "@/app/_components/Nav.css"
import "@/app/_components/StoryVisualizerPage.css"

gsap.registerPlugin(useGSAP, SplitText);


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
    isNodeImg = true,
    //PLACE HOLDERs (TODO: enlever avant la remise)
    nodeImgUrl = "../../../img/blue-purple_gradient.png",
    isNodeTempCustom = true,
    tempNodeAmbiance = "2",
    tempNodeTextEffect = "2"
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
    const { changeSource, play, isReady, changeVolume, pause } = useAudio(false);


    //Change le background, l'effet de texte et la musique.
    useEffect(() => {
        StoryCustomization(
            storyTextRef.current,
            backgroundRef.current,
            changeSource,
            textEffect,
            ambiance,
            false,
            isFirstNode,
            isNodeTempCustom,
            tempNodeAmbiance,
            tempNodeTextEffect
        );

    }, [textEffect, current?.id, ambiance]);

    //Change le volume de la musique
    useEffect(() => {
        if (isReady) {
            changeVolume(0.03);
        }
    }, [isReady, changeVolume]);


    //Click handlers pour le popup de confirmation de choix
    const openChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(true);
    };

    const closeChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(false);
    };

    //Ouvre le popup de confirmation de choix
    const openChoiceConfirmation = (e, edgeId) => {
        if (selectedChoice === edgeId) return;
        e.preventDefault();

        const clickedElement = choiceRefs.current[edgeId];
        const allChoices = edges.map(edge => choiceRefs.current[edge.id]);
        const clone = clickedElement.cloneNode(true);

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

    //Ferme le popup de confirmation de choix
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

    return (
        <div className="storyvisualizer-page" ref={backgroundRef}>
            <Nav />
            <Link href="/#stories">
                <button className="storyvisualizer-btn-back btn"
                    onClick={() => pause()}>
                    <WestIcon />Retour
                </button>
            </Link>
            <h1 className="storyvisualizer-title">{story.title}</h1>
            {isNodeImg && (
                <img src={nodeImgUrl} className="storyvisualizer-node-img" />
            )}
            <p className="storyvisualizer-text" ref={storyTextRef}>{current.contenu || "Contenu du nœud"}</p>
            <div className={choiceIsOpen ? "backdrop-blur open" : "backdrop-blur"} />
            <div className={"storyvisualizer-choices-container " + (choiceIsOpen ? "opened " : "") + "choice-" + edges.length}
                ref={choicePopupRef}>
                {edges.map((edge) => (
                    <div
                        className={`storyvisualizer-choices ${selectedChoice === edge.id ? 'selected' : ''}`}
                        key={edge.id}
                        ref={(e) => (choiceRefs.current[edge.id] = e
                        )}
                        onClick={(e) => {
                            openChoiceConfirmation(e, edge.id)
                        }}>
                        {edge.texte || "Choix"}
                    </div>
                ))}
                {edges.length < 3 && <hr className="storyvisualizer-hr" />
                }
            </div>
            {choiceIsOpen && choiceConfirmationIsOpen ? (

                <div className="storyvisualizer-flex-container">
                    <button className="storyvisualizer-close-btn confirmation btn" onClick={closeChoiceConfirmation}>
                        <CloseIcon />
                    </button>
                </div>

            ) : choiceIsOpen ? (
                <div className="storyvisualizer-flex-container">
                    <button className="storyvisualizer-close-btn btn" onClick={closeChoicePopup}>
                        <CloseIcon />
                    </button>
                </div>
            ) : null}

            <p className="choice-confirmation-indication">Appuyez à nouveau pour confirmer votre choix</p>
            {isStoryEnd ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + (edges[0]?.target || "")}>
                        <button className="storyvisualizer-continue-btn btn"
                            onClick={() => pause()}>
                            Relire
                        </button>
                    </Link>
                    <Link href="/#stories">
                        <button className="storyvisualizer-continue-btn btn"
                            onClick={() => pause()}>
                            Retourner aux publications
                        </button>
                    </Link>
                </div>
            ) : isChoiceAsked ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + edges[0].target}>
                        <button className="storyvisualizer-continue-btn btn">
                            Continuer
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="storyvisualizer-flex-container">
                    <button className="storyvisualizer-continue-btn btn" onClick={openChoicePopup}>
                        Continuer
                    </button>
                </div>
            )}

            {selectedChoice && (
                <Link
                    href={"/storyvisualizer/" + storyId + "/" + edges.find(edge => edge.id === selectedChoice)?.target}
                    className="overlay-navigation-link"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9999,
                        cursor: 'pointer',
                        pointerEvents: 'all'
                    }}>
                </Link>
            )}
        </div>
    );
}

export default StoryVisualizerPage;