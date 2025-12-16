"use client";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
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
    isNodeImg = false,
    nodeImgUrl = null,
    isNodeTempCustom = false,
    tempNodeAmbiance = null,
    tempNodeTextEffect = null
}) => {
    const [choiceIsOpen, setChoiceIsOpen] = useState(false);
    const [choiceConfirmationIsOpen, setChoiceConfirmationIsOpen] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [historyKeys, setHistoryKeys] = useState(new Set());
    const clonedRef = useRef(null);
    const choiceRefs = useRef({});
    const choicePopupRef = useRef();
    const storyTextRef = useRef();
    const backgroundRef = useRef();
    const timelineRef = useRef(null);
    const { changeSource, play, isReady, changeVolume, pause } = useAudio(false);
    const router = useRouter();

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

    }, [textEffect, ambiance, isFirstNode, isNodeTempCustom, tempNodeAmbiance, tempNodeTextEffect]);

    // Load stored history keys (local only)
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = JSON.parse(localStorage.getItem("inkveil-history") || "[]");
            const next = Array.isArray(stored) ? new Set(stored) : new Set();
            setHistoryKeys(next);
        } catch (err) {
            setHistoryKeys(new Set());
        }
    }, []);

    // Persist last-read info for KeepReading (localStorage only)
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const entry = {
                storyId,
                nodeId: current?.id,
                title: story?.title,
                synopsis: story?.synopsis,
                authorName: story?.authorName,
                theme: story?.theme,
                image: nodeImgUrl || story?.theme,
                updatedAt: Date.now(),
            };
            const stored = JSON.parse(localStorage.getItem("inkveil-recent") || "[]");
            const filtered = Array.isArray(stored)
                ? stored.filter((i) => i.storyId !== entry.storyId)
                : [];
            const next = [entry, ...filtered].slice(0, 6);
            localStorage.setItem("inkveil-recent", JSON.stringify(next));
        } catch (err) {
            // ignore write errors
        }
    }, [storyId, current?.id, story?.title, story?.synopsis, story?.authorName, story?.theme, nodeImgUrl]);

    useEffect(() => {
        if (isReady) {
            changeVolume(0.03);
        }
    }, [isReady, changeVolume]);


    const filteredEdges = useMemo(() => {
        return edges.filter((edge) => {
            if (edge.type === "conditional") {
                const requiredKey = edge.historyKey || edge.history_key;
                if (!requiredKey) return true;
                return historyKeys.has(requiredKey);
            }
            return true;
        });
    }, [edges, historyKeys]);

    const openChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(true);
    };

    const closeChoicePopup = (e) => {
        e.preventDefault();
        setChoiceIsOpen(false);
    };

    const openChoiceConfirmation = (e, edgeId) => {
        if (selectedChoice === edgeId) return;
        e.preventDefault();

        const clickedElement = choiceRefs.current[edgeId];
        const allChoices = filteredEdges.map(edge => choiceRefs.current[edge.id]);
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

    const closeChoiceConfirmation = () => {
        setChoiceConfirmationIsOpen(false);

        const allChoices = filteredEdges.map(edge => choiceRefs.current[edge.id]);
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

    const handleBack = () => {
        pause();
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
            return;
        }
        router.push("/#stories");
    };

    const persistHistoryKey = (key) => {
        if (!key) return;
        setHistoryKeys((current) => {
            const next = new Set(current);
            next.add(key);
            if (typeof window !== "undefined") {
                localStorage.setItem("inkveil-history", JSON.stringify(Array.from(next)));
            }
            return next;
        });
    };

    const handleEdgeFollow = (edgeId) => {
        const edge = filteredEdges.find((e) => e.id === edgeId);
        if (edge?.type === "history") {
            const key = edge.historyKey || edge.history_key;
            persistHistoryKey(key);
        }
        pause();
    };

    return (
        <div className="storyvisualizer-page" ref={backgroundRef}>
            <Nav />
            <button
                className="storyvisualizer-btn-back btn"
                type="button"
                onClick={handleBack}>
                <WestIcon />Retour
            </button>
            <h1 className="storyvisualizer-title">{story.title}</h1>
            {isNodeImg && nodeImgUrl && (
                <img src={nodeImgUrl} className="storyvisualizer-node-img" />
            )}
            <p className="storyvisualizer-text" ref={storyTextRef}>{current.contenu || "Contenu du nœud"}</p>
            <div className={choiceIsOpen ? "backdrop-blur open" : "backdrop-blur"} />
            <div className={"storyvisualizer-choices-container " + (choiceIsOpen ? "opened " : "") + "choice-" + filteredEdges.length}
                ref={choicePopupRef}>
                {filteredEdges.map((edge) => (
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
                {filteredEdges.length < 3 && <hr className="storyvisualizer-hr" />
                }
            </div>
            {choiceIsOpen && choiceConfirmationIsOpen ? (

                <div className="storyvisualizer-flex-container close">
                    <button className="storyvisualizer-close-btn confirmation btn" onClick={closeChoiceConfirmation}>
                        <CloseIcon />
                    </button>
                </div>

            ) : choiceIsOpen ? (
                <div className="storyvisualizer-flex-container close">
                    <button className="storyvisualizer-close-btn btn" onClick={closeChoicePopup}>
                        <CloseIcon />
                    </button>
                </div>
            ) : null}

            <p className="choice-confirmation-indication">Appuyez à nouveau pour confirmer votre choix</p>
            {isStoryEnd ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + (filteredEdges[0]?.target || "")} onClick={() => pause()} className="storyvisualizer-continue-btn btn">
                        Relire
                    </Link>
                    <Link href="/#stories" className="storyvisualizer-continue-btn btn" onClick={() => pause()}>
                        Retourner aux publications
                    </Link>
                </div>
            ) : (filteredEdges.length === 1) ? (
                <div className="storyvisualizer-flex-container">
                    <Link href={"/storyvisualizer/" + storyId + "/" + filteredEdges[0].target} className="storyvisualizer-continue-btn btn" onClick={() => handleEdgeFollow(filteredEdges[0].id)}>
                        Continuer
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
                    href={"/storyvisualizer/" + storyId + "/" + filteredEdges.find(edge => edge.id === selectedChoice)?.target}
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
                    }}
                    onClick={() => handleEdgeFollow(selectedChoice)}>
                </Link>
            )}
        </div>
    );
}

export default StoryVisualizerPage;
