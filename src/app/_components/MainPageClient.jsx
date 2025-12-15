"use client";
import "@xyflow/react/dist/style.css";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_context/gridContext";
import { useEffect, useRef, useState } from "react";
import { session } from "@/db/schemas";
import { useAudio } from "@/app/_context/AudioContext";
import { useGSAP } from "@gsap/react";
import { usePathname } from 'next/navigation'
import useLenis from "../_hooks/useLenis.jsx";
import HistoireTemp from "./HistoireTemp";
import Swiper from 'swiper';
import gsap from "gsap";
import EastIcon from '@mui/icons-material/East';
import Link from "next/link";
import SplitText from "gsap/SplitText";
import GSDevTools from "gsap/GSDevTools";

import "@/app/_components/MainPageClient.css"
import "@/app/_components/Nav.css"
import "@/app/_components/Footer.css"
import "@/app/_components/RecentlyPublished.css"
import "@/app/_components/MainPageClient.css";
import "@/app/_components/Nav.css";
import "@/app/_components/Footer.css";
import "@/app/_components/RecentlyPublished.css";
import "@/app/_components/Swiper.css";
import "swiper/css";

import Footer from "@/app/_components/Footer.jsx";
import Nav from "@/app/_components/Nav.jsx";
import RecemmentPubliees from "@/app/_components/RecentlyPublished.jsx";
import ReprendreLecture from "@/app/_components/KeepReading.jsx";

gsap.registerPlugin(useGSAP, GSDevTools, SplitText,
  // CustomEase
);

const MainPageClient = ({ user, recentStories = [] }) => {
  const loaderNumberRef = useRef();
  const loaderLogoRef = useRef();
  const { pause } = useAudio(false);
  const [draftTitle, setDraftTitle] = useState("");
  const {
    nodes,
    edges,
    selection,
    addLocalNode,
    internals: { onNodesChange, onEdgesChange, onConnect, onSelectionChange },
  } = useGrid();

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 2.5,
      spaceBetween: 30,
      speed: 400,
      grabCursor: true,
      slidesOffsetAfter: 200,
    });

    return () => {
      swiper?.destroy?.();
    };
  }, []);

  useGSAP(() => {
    var landingPageSeen = false;
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline({ paused: true });

    tl.set(".main-logo", {
      opacity: 0,
    })
    tl.set(loaderLogoRef.current, {
      opacity: 1,
      y: "155%",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });
    tl.set(loaderNumberRef.current, {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 0,
      filter: "blur(15px)",
    });

    tl.to(loaderNumberRef.current, {
      opacity: 1,
      duration: 0.4,
    });
    tl.to(loaderNumberRef.current, {
      filter: "blur(0px)",
      duration: 1.4,
    });
    tl.to(loaderNumberRef.current, {
      innerText: 100,
      duration: 5,
      snap: { innerText: 2 },
      ease: "power4.out"
    }, "<");

    tl.to(loaderNumberRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power4.in"
    }, "-=1.9");

    tl.to(loaderLogoRef.current, {
      y: "0%",
      duration: 1,
      ease: "power4.out",
      delay: 3
    }, "<-2.2",);

    tl.set(".loader-logo-container ", {
      height: "100%",
    },);

    tl.to(loaderLogoRef.current, {
      top: "40px",
      left: "4vw",
      xPercent: 0,
      yPercent: 0,
      width: "120px",
      duration: 1.6,
      ease: "power4.inOut"
    },);

    tl.to(".header-nav",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "<0.9")
    tl.set(document.body, { style: { overflow: 'hidden' } });

    tl.to(".hero", {
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "<-0.5"
    )

    tl.fromTo(".hero-container > *", {
      y: -20
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.07,
      duration: 0.6,
      ease: "power2.out"
    }, "<0.1"
    )
    tl.set(".main-logo", {
      delay: 0.5,
      opacity: 1,
    })
    tl.to(".loader-logo", {
      opacity: 0,
    });

    //Checker si l'utilisateur a déjà vu la landing page dans le storage?
    if (landingPageSeen) {
      tl.progress(1).pause();
      gsap.set(document.body, { overflow: "auto" });
    } else {
      tl.play(0);
      landingPageSeen = true;
      //Ajouter au local storage?
    }
  })


  //Pause la musique si l'utilisateur viens d'une page de visualisation d'histoire.
  useEffect(() => {
    pause();
  }, []);

  const storyFormHref = draftTitle.trim()
    ? `/storyform?title=${encodeURIComponent(draftTitle.trim())}`
    : "/storyform";

  return (

    <div className="main-page">
      <div className="main-loader">
        <div className="loader-number-container">
          <p className="loader-number" ref={loaderNumberRef}>0</p>
        </div>
        <div className="loader-logo-container"><img className="loader-logo" ref={loaderLogoRef} src="../../../img/logo_inkveil_large.png" alt="" /></div>
      </div>
      <header className="main-header">
        <Nav user={user} />
        <div className="hero">
          <img className="main-bg" src="../../../img/Background_1.jpg" alt="" />
          <div className="hero-container">
            <h2 className="h2-header">Faites briller votre univers</h2>
            <h1 className="h1-header">
              Donnez vie à votre récit
            </h1>
            <h3 className="h3-header">
              Créez des chapitres comme des scènes de film : choisissez vos ambiances, ajoutez des effets et faites vibrer chaque moment.
            </h3>
            <div className="main-input-container">
              <input
                className="main-input"
                placeholder="Le titre de votre histoire..."
                required
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
              />
              <Link href={storyFormHref}>
                <div className="btn-input">
                  <EastIcon />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <RecemmentPubliees stories={recentStories} />
      <hr />
      <ReprendreLecture />
      <Footer />
    </div>
  );
};
export default MainPageClient;
