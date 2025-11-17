"use client";
import "@xyflow/react/dist/style.css";
import Link from "next/link";
import { signOut } from "../actions/auth-actions";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useGrid } from "../_context/gridContext";
import { useEffect } from "react";
import { session } from "@/db/schemas";

import "../_components/MainPageClient.css"

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



      <div>

        <nav className="header-nav">
          <img className="logo" src="../../../img/logo_inkveil.png" alt="" />

          <ul className="nav-list">
            <li>
              <Link href="/auth/signIn" className="btn btn-compte">
                Se connecter
              </Link>
            </li>
            <li>
              <Link href="/auth/signUp" className="btn btn-compte">
                S'inscrire
              </Link>
            </li>
            <li>
              <form action={signOut}>
                <button
                  type="submit"
                  className="btn btn-compte"
                >
                  Se déconnecter
                </button>
              </form>
            </li>
            <li>
              <Link href="/auth/signUp" className="btn btn-creer">
                Créer une histoire
              </Link>
            </li>
          </ul>
        </nav>

      </div>


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
