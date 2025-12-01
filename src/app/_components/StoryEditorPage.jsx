"use client";

import { useEffect, useMemo, useState } from "react";
import { useGrid } from "../_context/gridContext";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import CustomSwitch from "./CustomSwitch.jsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { v4 as uuid } from "uuid";
import {
  updateStoryMeta,
  updateNode,
  updateEdge,
  deleteNodeAndEdges,
  deleteEdge,
} from "@/app/actions/story-actions";

import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/StoryEditorPage.css";

const StoryEditorPage = ({ story }) => {
  const {
    nodes,
    edges,
    selection,
    addLocalNode,
    setNodesState,
    setEdgesState,
    internals,
  } = useGrid();

  const [choiceTitle, setChoiceTitle] = useState("");
  const [nodeText, setNodeText] = useState("");
  const [isEnding, setIsEnding] = useState(false);

  const isNodeSelected = selection?.type === "node" && selection.node;
  const isEdgeSelected = selection?.type === "edge" && selection.edge;

  useEffect(() => {
    if (isNodeSelected) {
      setChoiceTitle(selection.node.data?.label ?? "");
      setNodeText(selection.node.data?.body ?? "");
      setIsEnding(!!selection.node.data?.isEnding);
    } else if (isEdgeSelected) {
      setChoiceTitle(selection.edge.label ?? "");
      setNodeText("");
      setIsEnding(false);
    } else {
      setChoiceTitle("");
      setNodeText("");
      setIsEnding(false);
    }
  }, [isNodeSelected, isEdgeSelected, selection]);

  const handleApply = async () => {
    if (isNodeSelected) {
      const id = selection.node.id;
      const updatedNodes = nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: { ...n.data, label: choiceTitle, body: nodeText, isEnding },
            }
          : n
      );
      setNodesState(updatedNodes);
      updateNode(story.id, id, {
        titre: choiceTitle,
        contenu: nodeText,
        type: selection.node.data?.nodeType ?? "story",
        isEnding,
      });
    } else if (isEdgeSelected) {
      const id = selection.edge.id;
      const updatedEdges = edges.map((e) =>
        e.id === id ? { ...e, label: choiceTitle } : e
      );
      setEdgesState(updatedEdges);
      updateEdge(story.id, id, {
        texte: choiceTitle,
        edgeType: selection.edge.data?.edgeType ?? "regular",
        historyKey: selection.edge.data?.historyKey ?? null,
      });
    }
  };

  const handleAddNode = () => {
    addLocalNode({
      id: uuid(),
      type: "story",
      titre: "Nouveau nœud",
      position: { x: Math.random() * 400, y: Math.random() * 200 },
    });
  };

  const handleDelete = () => {
    if (isNodeSelected) {
      const node = selection.node;
      if (node.data?.nodeType === "start") return;
      const filteredEdges = edges.filter(
        (e) => e.source !== node.id && e.target !== node.id
      );
      setEdgesState(filteredEdges);
      setNodesState(nodes.filter((n) => n.id !== node.id));
      deleteNodeAndEdges(story.id, node.id);
    } else if (isEdgeSelected) {
      setEdgesState(edges.filter((e) => e.id !== selection.edge.id));
      deleteEdge(story.id, selection.edge.id);
    }
  };

  const handlePublish = () => {
    updateStoryMeta(story.id, {
      isPublished: !story.is_published,
      title: story.title,
      synopsis: story.synopsis,
    });
  };

  const canvas = useMemo(
    () => (
      <div className="editor-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={internals.onNodesChange}
          onEdgesChange={internals.onEdgesChange}
          onSelectionChange={internals.onSelectionChange}
          onConnect={internals.onConnect}
          nodesDraggable
          elementsSelectable
          panOnDrag
          selectionOnDrag
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    ),
    [nodes, edges, internals]
  );

  return (
    <div className="page-container">
      <Nav />
      <div className="nav-bg"></div>

      <div className="flex-container-toolbar">
        <div className="tool-bar">
          <label htmlFor="title">Nom du choix</label>
          <input
            className="choice-name"
            placeholder="Écrire..."
            value={choiceTitle}
            onChange={(e) => setChoiceTitle(e.target.value)}
          />
          <label htmlFor="title">Texte</label>
          <textarea
            placeholder="Écrire..."
            rows={20}
            value={nodeText}
            onChange={(e) => setNodeText(e.target.value)}
            disabled={isEdgeSelected}
          />
          <div className="switch-container">
            <p>Fin</p>
            <CustomSwitch
              checked={isEnding}
              onChange={() => setIsEnding((v) => !v)}
              disabled={!isNodeSelected}
            />
          </div>
          <button className="btn btn-editor-appliquer" onClick={handleApply}>
            Appliquer
          </button>
          <div className="bg-grid"></div>
        </div>

        <div className="stroy-title-container">
          <div className="story-name">{story.title}</div>
          {canvas}
        </div>
      </div>

      <div className="flex-container-icons">
        <button className="icon delete-icon" onClick={handleDelete}>
          <DeleteOutlineIcon
            sx={{
              color: "#ff0000ff",
              fontSize: 30,
            }}
          />
        </button>
        <button className="icon add-icon" onClick={handleAddNode}>
          <AddIcon
            sx={{
              color: "#333333",
              fontSize: 30,
            }}
          />
        </button>
      </div>

      <button className="publish-icon" onClick={handlePublish}>
        {story.is_published ? "Remettre en brouillon" : "Publier"}
      </button>
      <Footer />
    </div>
  );
};

export default StoryEditorPage;
