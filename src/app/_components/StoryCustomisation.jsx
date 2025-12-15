"use client";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);



const StoryCustomization = (
    storyText,
    backgroundRef,
    changeSource,
    textEffect,
    ambiance,
    preview,
    isFirstNode,
    isNodeTempCustom,
    tempNodeAmbiance,
    tempNodeTextEffect
) => {

    console.log(ambiance)
    storyText.innerHTML = storyText.textContent;

    const ambiances = {
        //Ambiance horreur
        "1": {
            bg: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
            music: "../../../../audio/horror_ambiance.mp3"
        },

        //Ambiance magique
        "2": {
            bg: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
            music: "../../../../audio/magic_ambiance.mp3"
        },

        //Ambiance médiévale
        "3": {
            bg: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
            music: "../../../../audio/medieval_ambiance.mp3"
        }
    };
    const ambianceMode = isNodeTempCustom ? tempNodeAmbiance : ambiance;
    const currentAmbiance = ambiances[ambianceMode];

    if (ambianceMode) {
        gsap.set(backgroundRef, {
            backgroundImage: currentAmbiance.bg,
        });

        if (isFirstNode || isNodeTempCustom) {
            changeSource(currentAmbiance.music, true);
        }
    }


    const textEffects = {
        //Entrée par le bas et opacité
        "1": {
            splitType: "lines",
            animate: (split, storyText) => {
                const lines = split.lines;
                gsap.set(storyText, { opacity: 1 });
                gsap.set(lines, {
                    color: "#ffffff",
                    opacity: 0,
                    y: 50,
                });
                gsap.to(lines, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.5,
                    ease: "power2.out",
                });
            }
        },

        //Flou et opacité
        "2": {
            splitType: "words,chars",
            animate: (split, storyText) => {
                gsap.set(storyText, { opacity: 1 });
                gsap.from(split.chars, {
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.01,
                    filter: "blur(4px)",
                });
            }
        },

        //Style machine à écrire
        "3": {
            splitType: "words,chars",
            animate: (split, storyText) => {
                gsap.set(storyText, { opacity: 1 });
                gsap.set(split.chars, {
                    opacity: 0,
                    scale: 0
                });
                gsap.set(split.chars, {
                    opacity: 1,
                    scale: 1,
                    y: () => gsap.utils.random(-1, 1),
                    x: () => gsap.utils.random(-1, 1),
                    rotation: () => gsap.utils.random(-1, 1),
                    duration: 0.1,
                    stagger: gsap.utils.random(0.01, 0.04),
                });
            }
        }
    };

    const textEffectMode = isNodeTempCustom ? tempNodeTextEffect : textEffect;
    const currentTextEffect = textEffects[textEffectMode];

    if (currentTextEffect) {
        const split = new SplitText(storyText, {
            type: currentTextEffect.splitType,
            wordsClass: "word"
        });
        currentTextEffect.animate(split, storyText);
    }

    // PREVIEW Theme 1 (entrée par le bas)
    if (textEffect === "1" && preview === true) {
        const split = new SplitText(storyText, { type: "lines" });
        const lines = split.lines;
        gsap.set(lines, { opacity: 0, y: 50, color: "#ffffff" });
        const tl = gsap.timeline();
        tl.to(lines, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.5,
            ease: "power2.out",
        });
        return tl;
    }

    // PREVIEW Theme 2 (flou)
    if (textEffect === "2" && preview === true) {
        const split = new SplitText(storyText, { type: "chars" });
        return gsap.from(split.chars, {
            opacity: 0,
            duration: 0.6,
            stagger: 0.01,
            filter: "blur(4px)",
        });
    }

    // PREVIEW Theme 3 (machine à écrire)
    else if (textEffect === "3" && preview === true) {
        const split = new SplitText(storyText, { type: "chars" });
        gsap.set(split.chars, { opacity: 0, scale: 0 });
        const tl = gsap.timeline();
        tl.set(split.chars, {
            opacity: 1,
            scale: 1,
            y: () => gsap.utils.random(-3, 3),
            x: () => gsap.utils.random(-1, 1),
            rotation: () => gsap.utils.random(-1, 1),
            duration: 0.1,
            stagger: gsap.utils.random(0.01, 0.04),
        });
        return tl;
    }


};

export default StoryCustomization;