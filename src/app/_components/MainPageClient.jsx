"use client";
import "@xyflow/react/dist/style.css";
// import Link from "next/link";
// import { signOut } from "../actions/auth-actions";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_context/gridContext";
import { useEffect } from "react";
import { session } from "@/db/schemas";
<<<<<<< HEAD
import HistoireTemp from "./HistoireTemp";
=======
import Swiper from 'swiper';


import "swiper/css";
import "../_components/MainPageClient.css"
import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/RecentlyPublished.css"


import Footer from "../_components/Footer.jsx"
import Nav from "../_components/Nav.jsx"
import RecemmentPubliees from "./RecentlyPublished.jsx"
import ReprendreLecture from "./KeepReading.jsx"
>>>>>>> Alexandre_artistique

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

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 2.5,
      spaceBetween: 30,
      speed: 50,
      freeMode: true
    });

  }, []);


  return (
<<<<<<< HEAD
    <div>
      <h1> Où Votre Imagination mène l'histoire </h1>
      <h2>Bienvenue, {displayName}</h2>

      
      <div>
        <Link href="/auth/signIn" className="text-purple-400 hover:text-purple-300 hover:underline">
        Se connecter 
        </Link>
        {" | "}
        <Link href="/auth/signUp" className="text-purple-400 hover:text-purple-300 hover:underline">
        S'inscrire
        </Link>
      </div>

        {/* Button pour se déconnecter
        <form action={signOut}>
        <button
          type="submit"
          className="text-purple-400 hover:text-purple-300 hover:underline"
        >
          Se déconnecter
        </button>
        </form> */}

      <button
        className="mt-2 bg-amber-500 px-2 rounded"
        onClick={() =>
          addLocalNode({ id: "id-quatre", position: { x: 0, y: -30 } })
        }
      >
      Créer une histoire
      </button>



      
=======
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

>>>>>>> Alexandre_artistique
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
<<<<<<< HEAD

      <div className="Recent">
        <h3> Récement publié</h3>
        { /* HistoiresTemp ajouter les histoires récentes ici en carroussel entre 5 et 7 histoire*/}
        
        <HistoireTemp title="L'aventure magique" genre="Fantastique" synopsis="Une histoire captivante d'un jeune héros découvrant un monde enchanté." Img="https://example.com/image1.jpg" />
        <HistoireTemp title="Le mystère de la forêt" genre="Mystère" synopsis="Un groupe d'amis part à la découverte des secrets cachés dans une forêt mystérieuse." Img="https://example.com/image2.jpg" />
        <HistoireTemp title="Voyage dans le temps" genre="Science-fiction" synopsis="Un scientifique invente une machine à voyager dans le temps et explore différentes époques." Img="https://example.com/image3.jpg" />
      </div>

      <div className="Continue">
        <h3> Reprenez votre aventure </h3>
        { /* HistoiresTemp ajouter les histoires en cours ici en
         carroussel entre 5 et 7 histoire rappel creer un en leture status dans la db*/}
        </div>

        <div className="Footer">
          <h2 className="t_footer">Inkveil</h2>
          <p className="p_footer">Site par Joseph Cesti Chamaya et Alexandre Dratton</p>
          <p className="p_footer">© 2024 Inkveil. Tous droits réservés.</p>

          </div>

    </div>
=======
    </div >
>>>>>>> Alexandre_artistique
  );
};
export default MainPageClient;
