"use client";
import "@xyflow/react/dist/style.css";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_context/gridContext";
import { useEffect, useState } from "react";
import { session } from "@/db/schemas";
import useLenis from "../_hooks/useLenis.jsx";
import HistoireTemp from "./HistoireTemp";
import Swiper from 'swiper';
import { useGSAP } from "@gsap/react";
import { usePathname } from 'next/navigation'
import EastIcon from '@mui/icons-material/East';
import Link from "next/link";

import "../_components/MainPageClient.css"
import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/RecentlyPublished.css"
import "../_components/MainPageClient.css";
import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/RecentlyPublished.css";
import "swiper/css";
import "../_components/Swiper.css";

import Footer from "../_components/Footer.jsx";
import Nav from "../_components/Nav.jsx";
import RecemmentPubliees from "./RecentlyPublished.jsx";
import ReprendreLecture from "./KeepReading.jsx";

// TODO: Intégrer la logique pour afficher les histoires à reprendre (Tags, bannière, titre et synopsis)
// (ou ne pas l'afficher si l'utilisateur n'a jamais lu d'histoire et/ou il n'est pas connecté).

const MainPageClient = ({ user, recentStories = [] }) => {
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

  return (
    <div className="page">
      <header>
        <Nav user={user} />
        <div className="hero">
          <div className="hero-container">
            <h2 className="h2-header">Faites briller votre univers</h2>
            <h1 className="h1-header">
              Donnez vie à votre récit


            </h1>
            <img className="main-bg" src="../../../img/Background_1.jpg" alt="" />
            <h3 className="h3-header">
              Créez des chapitres comme des scènes de film : choisissez vos ambiances, ajoutez des effets et faites vibrer chaque moment.
            </h3>
            <div className="main-input-container">
              <input
                className="main-input"
                placeholder="Le titre de votre histoire..."
                required
              />
              <Link href="/storyform"
              >
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

      {/* <div style={{ width: 1000, height: 1000 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={onSelectionChange}
          onConnect={onConnect}
          // Multi-sélection désactivée pour simplifier votre travail
          multiSelectionKeyCode={null}
          // Suppression par le clavier désactivée pour simplifier votre travail
          deleteKeyCode={null}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div> */}
    </div>
  );
};
export default MainPageClient;
