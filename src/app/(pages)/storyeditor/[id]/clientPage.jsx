"use client";

import { useGrid } from "@/app/_context/gridContext";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Nav from "@/app/_components/Nav";
import Footer from "@/app/_components/Footer";
import { v4 as uuid } from "uuid";
import {
  updateStoryMeta,
  updateNode,
  updateEdge,
  deleteNodeAndEdges,
} from "@/app/actions/story-actions";
import { useEffect, useState } from "react";

const ClientPage = ({ story }) => {
  const {
    nodes,
    edges,
    internals,
    selection,
    addLocalNode,
    setNodesState,
    setEdgesState,
  } = useGrid();
  const [nodeTitle, setNodeTitle] = useState("");
  const [edgeText, setEdgeText] = useState("");
  const [nodeContent, setNodeContent] = useState("");
  const [edgeType, setEdgeType] = useState("regular");
  const [historyKey, setHistoryKey] = useState("");

  useEffect(() => {
    if (selection?.type === "node" && selection.node) {
      setNodeTitle(selection.node.data?.label ?? "");
      setNodeContent(selection.node.data?.body ?? "");
    } else {
      setNodeTitle("");
      setNodeContent("");
    }

    if (selection?.type === "edge" && selection.edge) {
      setEdgeText(selection.edge.label ?? "");
      setEdgeType(selection.edge.data?.edgeType ?? "regular");
      setHistoryKey(selection.edge.data?.historyKey ?? "");
    } else {
      setEdgeText("");
      setEdgeType("regular");
      setHistoryKey("");
    }
  }, [selection]);

  const onUpdateNode = async () => {
    if (selection?.type !== "node" || !selection.node?.id) return;
    const id = selection.node.id;
    const newNodes = nodes.map((n) =>
      n.id === id ? { ...n, data: { ...n.data, label: nodeTitle } } : n
    );
    setNodesState(newNodes);
    updateNode(story.id, id, {
      titre: nodeTitle,
      contenu: nodeContent,
      type: selection.node.data?.nodeType ?? "story",
      isEnding: selection.node.data?.isEnding ?? false,
    });
  };

  const onDeleteNode = async () => {
    if (selection?.type !== "node" || !selection.node?.id) return;
    if (selection.node.data?.nodeType === "start") return; // ne pas supprimer le départ
    const id = selection.node.id;
    // remove local edges attached
    const filteredEdges = edges.filter(
      (e) => e.source !== id && e.target !== id
    );
    setEdgesState(filteredEdges);
    // remove node locally
    const filteredNodes = nodes.filter((n) => n.id !== id);
    setNodesState(filteredNodes);
    // fire-and-forget serveur
    deleteNodeAndEdges(story.id, id);
  };

  const onUpdateEdge = async () => {
    if (selection?.type !== "edge" || !selection.edge?.id) return;
    const id = selection.edge.id;
    const newEdges = edges.map((e) =>
      e.id === id
        ? {
            ...e,
            label: edgeText,
            data: { ...e.data, edgeType, historyKey },
            edgeType,
          }
        : e
    );
    setEdgesState(newEdges);
    updateEdge(story.id, id, {
      texte: edgeText,
      edgeType,
      historyKey: historyKey?.trim() || null,
    });
  };

  return (
    <div className="page">
      <header>
        <Nav />
      </header>

      <div style={{ display: "flex", gap: 16, padding: 16 }}>
        <div style={{ flex: 3, height: 700 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={internals.onNodesChange}
            onEdgesChange={internals.onEdgesChange}
            onSelectionChange={internals.onSelectionChange}
            onConnect={internals.onConnect}
            fitView
          >
            <Background variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </div>

        <div style={{ flex: 1, border: "1px solid #ccc", padding: 12, backgroundColor: "Red" }}>
          <h3>{story.title}</h3>
          <p>{story.synopsis}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() =>
                addLocalNode({
                  id: uuid(),
                  type: "story",
                  titre: "Nouveau nœud",
                  position: { x: 100, y: 100 },
                })
              }
            >
              + Ajouter un nœud
            </button>
            <button onClick={onDeleteNode}>Supprimer la sélection</button>
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <button
              onClick={() =>
                updateStoryMeta(story.id, {
                  isPublished: !story.is_published,
                  title: story.title,
                  synopsis: story.synopsis,
                })
              }
            >
              {story.is_published ? "Remettre en brouillon" : "Publier"}
            </button>

            {selection?.type === "node" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label>Titre du nœud</label>
                <input
                  value={nodeTitle}
                  onChange={(e) => setNodeTitle(e.target.value)}
                  placeholder="Titre"
                />
                <label>Texte du nœud</label>
                <textarea
                  value={nodeContent}
                  onChange={(e) => setNodeContent(e.target.value)}
                  placeholder="Texte"
                  rows={3}
                />
                <button onClick={onUpdateNode}>Sauvegarder le nœud</button>
              </div>
            )}

            {selection?.type === "edge" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label>Texte du choix</label>
                <input
                  value={edgeText}
                  onChange={(e) => setEdgeText(e.target.value)}
                  placeholder="Texte de la branche"
                />
                <label>Type de branche</label>
                <select
                  value={edgeType}
                  onChange={(e) => setEdgeType(e.target.value)}
                >
                  <option value="regular">Par défaut</option>
                  <option value="history">Historique (donne une clé)</option>
                  <option value="conditional">
                    Conditionnelle (requiert une clé)
                  </option>
                </select>
                {(edgeType === "history" || edgeType === "conditional") && (
                  <>
                    <label>Identifiant de clé</label>
                    <input
                      value={historyKey}
                      onChange={(e) => setHistoryKey(e.target.value)}
                      placeholder="Ex: cle-1"
                    />
                  </>
                )}
                <button onClick={onUpdateEdge}>Sauvegarder la branche</button>
              </div>
            )}
          </div>

          <pre style={{ fontSize: 12, marginTop: 12 }}>
            Sélection: {selection?.type}{" "}
            {selection?.node?.id || selection?.edge?.id || "-"}
          </pre>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientPage;
