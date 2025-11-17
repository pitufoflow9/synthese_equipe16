"use client";
import "@xyflow/react/dist/style.css";
// import Link from "next/link";
// import { signOut } from "../actions/auth-actions";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_context/gridContext";
import { useEffect } from "react";
import { session } from "@/db/schemas";
import Swiper from 'swiper';


import "swiper/css";
import "../_components/MainPageClient.css"
import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/RecemmentPubliees.css"


import Footer from "../_components/Footer.jsx"
import Nav from "../_components/Nav.jsx"
import RecemmentPubliees from "../_components/RecemmentPubliees.jsx"
import ReprendreLecture from "../_components/ReprendreLecture.jsx"

const MainPageClient = ({ displayName }) => {
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

  const swiper = new Swiper('.swiper', {
    slidesPerView: 2.5,
    spaceBetween: 30,
    speed: 50,
    freeMode: true
  });


  return (
    <div>
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
      <Footer></Footer>

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
