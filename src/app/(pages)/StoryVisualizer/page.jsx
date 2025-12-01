"use client";

import Link from "next/link";
import Nav from "./../../_components/Nav.jsx";
import { BookOpen } from 'lucide-react';

import gsap from "gsap";
// import Link from "next/link";
import { CustomEase } from "gsap/all";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
// import { useAudio } from "../_context/AudioContext.jsx";
// import "../../_components/StoryVisualizerPage.jsx"

import "../../_components/Nav.css"
// import "../_components/Footer.css"
import "../../_components/MainPageClient.css"
import "../../_components/StoryVisualizerPage.css"


const pageTestAlex = () => {

    gsap.registerPlugin(useGSAP, ScrollTrigger, GSDevTools, SplitText, CustomEase);

    const storyTextRef = useRef();
    const backgroundRef = useRef();
    //BOUTTONS THEME TEST
    const [theme, setTheme] = useState(1);

    // const { changeSource, play } = useAudio(false);
    const tl = useRef();

    useGSAP(() => {
        // Thème Horreur
        if (theme === 1) {
            gsap.to(backgroundRef.current, {
                background: "linear-gradient(135deg, #000000ff 0%, #4d0000ff 100%)",
                duration: 1,
                ease: "power2.inOut"
            });

            const split = new SplitText(storyTextRef.current, {
                type: "lines"
            });
            const lines = split.lines;

            gsap.set(lines, {
                opacity: 0,
                y: 50,
                color: "#ffffff"
            });

            gsap.to(lines, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.5,
                ease: "power2.out"
            });

            gsap.to(lines, {
                y: -15,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
                stagger: 0.2
            });
        }

        //Thème Magie
        else if (theme === 2) {
            gsap.to(backgroundRef.current, {
                background: "linear-gradient(135deg, #7c00adff 0%, #d298e9ff 100%)",
                duration: 1.5,
                ease: "power2.inOut"
            });

            const split = new SplitText(storyTextRef.current, {
                type: "chars"
            });
            gsap.from(split.chars, {
                opacity: 0,
                // scale: 0,
                duration: 0.6,
                stagger: 0.01,
                filter: "blur(4px)",
            });
        }

        //Thème Médieval
        else if (theme === 3) {
            gsap.to(backgroundRef.current, {
                background: "linear-gradient(135deg, #858585ff 0%, #ffcab2ff 100%)",
                duration: 1,
                ease: "power2.inOut"
            });

            const split = new SplitText(storyTextRef.current, {
                type: "chars"
            });

            gsap.set(split.chars, {
                opacity: 0,
                scale: 0,
            });

            gsap.set(split.chars, {
                opacity: 1,
                scale: 1,
                y: () => gsap.utils.random(-3, 3),
                x: () => gsap.utils.random(-1, 1),
                rotation: () => gsap.utils.random(-1, 1),
                duration: 0.1,
                stagger: gsap.utils.random(0.01, 0.04),
                // ease: "back.out(2)"
            });
        }

    }, [theme]);


    ////////////////////////////////////////////////////////////////////////
    //BOUTON QUI CYCLE ENTRE LES THÈMES (À retirer pour la remise):
    const changeTheme = () => {
        setTheme((previousTheme) => (previousTheme === 3 ? 1 : previousTheme + 1));
    };

    //RESET SPLITTEXT POUR TEST (IMPORTANT, sinon bug)(À retirer pour la remise):
    if (storyTextRef.current) {
        storyTextRef.current.innerHTML = storyTextRef.current.textContent;
    }
    ////////////////////////////////////////////////////////////////////////


    return (
        <div className="page-background-visualizer" ref={backgroundRef}>
            <Nav />

            {/* ////////////////////RESET SPLITTEXT ///////////////////////// */}
            {/*  (IMPORTANT, sinon bug)(À retirer pour la remise): */}
            <button onClick={changeTheme} className="theme-btn">
                Change Theme ({theme})
            </button>
            {/* ///////////////////////////////////////////////////////////// */}

            <p className="story-text" ref={storyTextRef}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            {/* <Footer /> */}
            <button className="continue-btn">Continuer</button>
        </div >
    )
}

export default pageTestAlex;




// "use client";
// import Footer from "./Footer.jsx"
// import Nav from "./Nav.jsx"

// import gsap from "gsap";
// import Link from "next/link";
// import { CustomEase } from "gsap/all";
// import { useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import { GSDevTools } from "gsap/GSDevTools";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// import { useAudio } from "../_context/AudioContext.jsx";

// import "../_components/Nav.css"
// import "../_components/Footer.css"
// import "../_components/MainPageClient.css"
// import "../_components/StoryVisualizerPage.css"





