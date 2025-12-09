"use client";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);
const StoryCustomization = (storyText, backgroundRef, changeSource, textEffect, ambiance, preview, isFirstNode) => {

    console.log("StoryCustomization appelée avec:");
    console.log("textEffect:", textEffect, "type:", typeof textEffect);
    console.log("ambiance:", ambiance, "type:", typeof ambiance);
    console.log("preview:", preview);
    console.log("storyText:", storyText);
    console.log("backgroundRef:", backgroundRef);

    storyText.innerHTML = storyText.textContent;

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

    if (ambiance === "1") {
        if (isFirstNode) changeSource("/audio/horror_ambiance.mp3", true);
        gsap.set(backgroundRef, {
            backgroundImage: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
        });
    }

    if (ambiance === "2") {
        if (isFirstNode) changeSource("/audio/magic_ambiance.mp3", true);
        gsap.set(backgroundRef, {
            backgroundImage: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
        });
    }
    if (ambiance === "3") {
        if (isFirstNode) changeSource("/audio/medieval_ambiance.mp3", true);
        gsap.set(backgroundRef, {
            backgroundImage: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
        });
    }

    if (textEffect === "1") {
        const split = new SplitText(storyText, {
            type: "lines",
            wordsClass: "word"
        });
        const lines = split.lines;

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

    if (textEffect === "2") {
        const split = new SplitText(storyText, {
            type: "chars",
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

    if (textEffect === "3") {
        const split = new SplitText(storyText, {
            type: "chars",
            type: "words,chars",
            wordsClass: "word"
        });
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

};

export default StoryCustomization;