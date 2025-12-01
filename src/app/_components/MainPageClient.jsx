"use client";
import "@xyflow/react/dist/style.css";
// import Link from "next/link";
// import { signOut } from "../actions/auth-actions";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_context/gridContext";
import { useEffect } from "react";
import { session } from "@/db/schemas";
// import useLenis from "../_hooks/useLenis.jsx";
import HistoireTemp from "./HistoireTemp";
import Swiper from 'swiper';
import { useGSAP } from "@gsap/react";


import "../_components/MainPageClient.css"
import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/RecentlyPublished.css"
import "swiper/css";
import "../_components/Swiper.css"


import Footer from "../_components/Footer.jsx"
import Nav from "../_components/Nav.jsx"
import RecemmentPubliees from "./RecentlyPublished.jsx"
import ReprendreLecture from "./KeepReading.jsx"
 


//TODO: Intégrer la logique pour afficher les histoires à reprendre (Tags, bannière, titre et synopsis)(ou ne pas l'afficher si l'utilisateur n'a jamais lu d'histoire et/ou il n'est pas connceté).

const MainPageClient = ({ displayName }) => {
  // useLenis();

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
    const swiper = new Swiper('.swiper', {
      slidesPerView: 2.5,
      spaceBetween: 30,
      speed: 400,
      grabCursor: true,
      slidesOffsetAfter: 200
    });

  }, []);


  return (
    <div className="page">
      {/* <h1>Main Page Client</h1>
      <h2>Bienvenue, {displayName}</h2>
      <button
        className="mt-2 bg-amber-500 px-2 rounded"
        onClick={() =>
          addLocalNode({ id: "id-quatre", position: { x: 0, y: -30 } })
        }
      >
        Ajouter un noeud

      </button> */}


      <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
      <header>
        <Nav></Nav>
        <h1 className="h1-header">
          Où votre <br />
          imagination <br />
          mène l'histoire
        </h1>
      </header>

      <RecemmentPubliees />
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
    </div >
  );
};
export default MainPageClient;
