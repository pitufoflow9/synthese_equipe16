"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import { useGrid } from "../_context/gridContext";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import CustomSwitch from "./CustomSwitch.jsx";
import EdgeTypeToggle from "@/app/_components/CustomBranchToggle.jsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { X } from 'lucide-react';
import { Background, BackgroundVariant, ReactFlow, Handle, isNode } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 as uuid } from "uuid";
import {
  updateStoryMeta,
  updateNode,
  updateEdge,
  deleteNodeAndEdges,
  deleteEdge,
} from "@/app/actions/story-actions";

import StoryCustomisation from "@/app/_components/StoryCustomisation.jsx";
import "@/app/_components/Nav.css";
import "@/app/_components/Footer.css";
import "@/app/_components/MainPageClient.css";
import "@/app/_components/StoryEditorPage.css";

const StoryEditorPage = ({ story }) => {
  const {
    nodes,
    edges,
    selection,
    addLocalNode,
    setNodesState,
    setEdgesState,
    internals,
    updateSelectionData,
  } = useGrid();

  const [nodeTitle, setNodeTitle] = useState("");
  const [nodeText, setNodeText] = useState("");
  const [edgeTitle, setEdgeTitle] = useState("");
  const [isEnding, setIsEnding] = useState(false);
  const [edgeType, setEdgeType] = useState("regular");
  const [historyKey, setHistoryKey] = useState("");
  const [imagePickerIsOpen, setImagePickerIsOpen] = useState(false);
  const [ambianceIsOpen, setAmbianceIsOpen] = useState(false);
  const [effectIsOpen, setEffectIsOpen] = useState(false);
  const ambiancePopupRef = useRef();
  const effectPopupRef = useRef();
  const imagePickerPopupRef = useRef();
  const preview1Ref = useRef(null);
  const preview2Ref = useRef(null);
  const preview3Ref = useRef(null);
  const previewTlRef = useRef(null);


  const isNodeSelected = selection?.type === "node" && selection.node;
  const isEdgeSelected = selection?.type === "edge" && selection.edge;
  const isStartNode = isNodeSelected && selection.node.data?.nodeType === "start";

  useEffect(() => {
    if (isNodeSelected) {
      setNodeTitle(selection.node.data?.label ?? "");
      setNodeText(selection.node.data?.body ?? "");
      setIsEnding(!!selection.node.data?.isEnding);
      setEdgeTitle("");
    } else if (isEdgeSelected) {
      setEdgeTitle(selection.edge.label ?? "");
      setEdgeType(selection.edge.data?.edgeType ?? "regular");
      setHistoryKey(selection.edge.data?.historyKey ?? "");
      setNodeTitle("");
      setNodeText("");
      setIsEnding(false);
    } else {
      setNodeTitle("");
      setNodeText("");
      setEdgeTitle("");
      setIsEnding(false);
      setEdgeType("regular");
      setHistoryKey("");
    }
  }, [isNodeSelected, isEdgeSelected, selection]);

  const handleNodeTitleChange = (value) => {
    setNodeTitle(value);
    if (isNodeSelected && !isStartNode) {
      setNodesState((current) =>
        current.map((n) =>
          n.id === selection.node.id ? { ...n, data: { ...n.data, label: value } } : n
        )
      );
      updateSelectionData();
    }
  };

  const handleApply = async () => {
    if (isNodeSelected) {
      const id = selection.node.id;
      const updatedNodes = nodes.map((n) =>
        n.id === id
          ? {
            ...n,
            data: {
              ...n.data,
              label: isStartNode ? n.data.label : nodeTitle,
              body: nodeText,
              isEnding: isStartNode ? false : isEnding,
            },
          }
          : n
      );
      setNodesState(updatedNodes);
      updateSelectionData();
      updateNode(story.id, id, {
        titre: isStartNode ? selection.node.data?.label : nodeTitle,
        contenu: nodeText,
        type: selection.node.data?.nodeType ?? "story",
        isEnding: isStartNode ? false : isEnding,
      });
    } else if (isEdgeSelected) {
      const id = selection.edge.id;
      const updatedEdges = edges.map((e) =>
        e.id === id
          ? {
            ...e,
            label: edgeTitle,
            data: { ...e.data, edgeType, historyKey },
            edgeType,
          }
          : e
      );
      setEdgesState(updatedEdges);
      updateSelectionData();
      updateEdge(story.id, id, {
        texte: edgeTitle,
        edgeType,
        historyKey: historyKey || null,
      });
    }
  };

  const handleAddNode = () => {
    addLocalNode({
      id: uuid(),
      type: "story",
      titre: "Nouveau noeud",
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





  const openImagePickerPopup = (e) => {
    e.preventDefault();
    setImagePickerIsOpen(true);
    console.log("Image picker opened");
  };

  const closeImagePickerPopup = (e) => {
    e.preventDefault();
    setImagePickerIsOpen(false);
    console.log("Image picker closed");
  };
  const openAmbiancePopup = (e) => {
    e.preventDefault();
    setAmbianceIsOpen(true);
  };

  const closeAmbiancePopup = (e) => {
    e.preventDefault();
    setAmbianceIsOpen(false);
  };

  const openEffectPopup = (e) => {
    e.preventDefault();
    setEffectIsOpen(true);
  };

  const closeEffectPopup = (e) => {
    e.preventDefault();
    setEffectIsOpen(false);
  };

  const previewButtonEnter = (textEffect, target, preview) => {

    previewTlRef.current = StoryCustomisation(target.current, preview, textEffect);
  };


  const previewButtonLeave = (ref) => {

    if (ref.current) {
      ref.current.innerHTML = ref.current.textContent;
    }
  };






  useEffect(() => {
    function handleClickOutside(e) {
      if (imagePickerIsOpen && imagePickerPopupRef.current && !imagePickerPopupRef.current.contains(e.target)) {
        setImagePickerIsOpen(false);
      }
      if (ambianceIsOpen && ambiancePopupRef.current && !ambiancePopupRef.current.contains(e.target)) {
        setAmbianceIsOpen(false);
      }
      if (effectIsOpen && effectPopupRef.current && !effectPopupRef.current.contains(e.target)) {
        setEffectIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [imagePickerIsOpen, ambianceIsOpen, effectIsOpen]);

  const nodeTypes = useMemo(
    () => ({
      default: ({ data }) => {
        const isStart = data?.nodeType === "start";
        const isEnd = data?.isEnding;
        const showTarget = !isStart;
        const showSource = !isEnd;

        return (
          <div>
            {showTarget && (
              <Handle
                type="target"
                position="top"
                style={{ width: 12, height: 12, background: "#8e10e7" }}
              />
            )}
            {data?.label || "Sans titre"}
            {showSource && (
              <Handle
                type="source"
                position="bottom"
                style={{ width: 12, height: 12, background: "#8e10e7" }}
              />
            )}
          </div>
        );
      },
    }),
    []
  );

  const canvas = useMemo(() => {
    return (
      <div className="storyeditor-canva">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={internals.onNodesChange}
          onEdgesChange={internals.onEdgesChange}
          onSelectionChange={internals.onSelectionChange}
          onConnect={internals.onConnect}
          nodesDraggable
          nodesConnectable
          elementsSelectable
          panOnDrag
          selectionOnDrag
          zoomOnScroll
          panOnScroll
          multiSelectionKeyCode={null}
          deleteKeyCode={null}
          nodeTypes={nodeTypes}
          fitViewOptions={{ padding: 0.3 }}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    );
  }, [nodes, edges, internals, nodeTypes]);

  return (
    <div className="page-container">
      <Nav />
      <div className="nav-bg"></div>

      <div className="flex-container-toolbar">
        <div className="tool-bar">
          <div className="inputs-flex-container-1">
            {isEdgeSelected && (
              <div className="inputs-flex-container-2">
                <label htmlFor="node-text">Nom du choix *</label>
                <input
                  id="node-title"
                  className="choice-name"
                  placeholder="Ecrire..."
                  value={edgeTitle}
                  onChange={(e) => {
                    setEdgeTitle(e.target.value);
                    handleNodeTitleChange(e.target.value);
                  }}
                />
                <button className="btn btn-editor-appliquer" onClick={handleApply}>
                  Appliquer
                </button>
              </div>
            )}
            {isNodeSelected && (
              <div className="inputs-flex-container-2">
                <div className="inputs-flex-container-3">
                  <div className="inputs-flex-container-4">
                    <label htmlFor="node-text">Nom du nœud</label>
                    <p className="inputs-optionnal">(Optionnel)</p>
                  </div>
                  <input
                    id="node-text"
                    placeholder="Ecrire..."
                    rows={1}
                    value={nodeTitle}
                    onChange={(e) => setNodeTitle(e.target.value)}
                  />
                </div>
                <div className="inputs-flex-container-3">
                  <label htmlFor="node-text">Texte affiché *</label>
                  <textarea
                    id="node-text"
                    placeholder="Ecrire..."
                    rows={5}
                    value={nodeText}
                    onChange={(e) => setNodeText(e.target.value)}
                  />
                </div>
                <div className="inputs-flex-container-3">
                  <label className="storyvisualizer-label" htmlFor="node-text">Effets temporaires</label>
                  <div className="inputs-flex-container-5">
                    <div className="form-btn-container">
                      <button type="button" onClick={openAmbiancePopup} className="btn-form btn-form-add-ambiance">
                        Choisir une ambiance
                      </button>
                      <button type="button" onClick={openEffectPopup} className="btn-form btn-form-add-effect">
                        Choisir un effet
                      </button>
                    </div>
                    <button type="button" onClick={openImagePickerPopup} className="add-image-button">
                      Ajouter une image
                    </button>
                  </div>
                </div>
                <div className="inputs-flex-container-3">
                  <label className="storyvisualizer-label" htmlFor="node-text">Type de nœud</label>
                  <EdgeTypeToggle
                    value={edgeType}
                    onChange={setEdgeType}
                  />

                </div>

                <div className="switch-container">
                  <p>Fin</p>
                  <CustomSwitch
                    checked={isEnding}
                    onChange={() => setIsEnding((v) => !v)}
                    disabled={!isNodeSelected || isStartNode}
                  />
                </div>

                <button className="btn btn-editor-appliquer" onClick={handleApply}>
                  Appliquer
                </button>
              </div>
            )}
          </div>
        </div>

        {imagePickerIsOpen && (
          <div className="popup-container">
            <div className="popup" ref={imagePickerPopupRef}>
              <button type="button" onClick={closeImagePickerPopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir la banque d'images</h2>
              <div className="banner-grid">
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_1.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_2.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_3.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_4.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_5.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_6.jpg" alt="" />
                </div>
              </div>
              <hr className="popup-banner-hr" />
              <Link href="../upload">
                <button type="button" className="btn-popup">
                  Téléverser à partir de l'appareil
                </button>
              </Link>
            </div>
          </div>
        )}
        {ambianceIsOpen && (
          <div className="popup-container">
            <div className="popup" ref={ambiancePopupRef}>
              <button type="button" onClick={closeAmbiancePopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir nos choix d'ambiances</h2>
              <div className="ambiance-list">
                <button type="button" className="ambiance-button ambiance-horreur">
                  <div className="ambiance-title">Ambiance d'horreur</div>
                </button>
                <button type="button" className="ambiance-button ambiance-magique">
                  <div className="ambiance-title">Ambiance magique</div>
                </button>
                <button type="button" className="ambiance-button ambiance-medieval">
                  <div className="ambiance-title">Ambiance médiéval</div>
                </button>
              </div>
              <hr className="popup-banner-hr" />
              <Link href="../upload"><button type="button" className="btn-popup">Téléverser à partir de l'appareil</button></Link>
            </div>
          </div>
        )}

        {effectIsOpen && (
          <div className="popup-container">
            <div className="popup popup-effect" ref={effectPopupRef}>
              <button type="button" onClick={closeEffectPopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir nos d'effets</h2>
              <div className="ambiance-list" >
                {/* Theme 1 */}
                <button type="button" className="ambiance-button effect-preview effect-preview-1"
                  onMouseEnter={() => previewButtonEnter(1, preview1Ref, true)}
                  onMouseLeave={() => previewButtonLeave(preview1Ref)}
                >
                  <div className="ambiance-title">Effet d'entrée par le bas  </div>
                  <div className="effect-preview-placeholder" ref={preview1Ref}>
                    Ceci est un aperçu
                  </div>
                </button>

                {/* Theme 2 */}
                <button type="button" className="ambiance-button effect-preview effect-preview-2"
                  onMouseEnter={() => previewButtonEnter(2, preview2Ref, true)}
                  onMouseLeave={() => previewButtonLeave(preview2Ref)}
                >
                  <div className="ambiance-title">Effet de flou</div>
                  <div className="effect-preview-placeholder" ref={preview2Ref}>
                    Ceci est un aperçu
                  </div>
                </button>

                {/* Theme 3 */}
                <button type="button" className="ambiance-button effect-preview effect-preview-3"
                  onMouseEnter={() => previewButtonEnter(3, preview3Ref, true)}
                  onMouseLeave={() => previewButtonLeave(preview3Ref)}
                >
                  <div className="ambiance-title">Effet de machine à écrire</div>
                  <div className="effect-preview-placeholder" ref={preview3Ref}>
                    Ceci est un aperçu
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="story-title-container">
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
      <div className="publish-container">
        <button className="draft-button" onClick={handlePublish}>
          Enregistrer comme brouillon
        </button>
        <Link href="/">
          <button className="publish-button" onClick={handlePublish}>
            {story.is_published ? "Remettre en brouillon" : "Publier"}
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}


export default StoryEditorPage;