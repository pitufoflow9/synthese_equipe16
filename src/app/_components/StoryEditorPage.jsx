"use client";

import Link from "next/link";
import gsap from "gsap";
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
import { useGSAP } from "@gsap/react";

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
  const [isPublished, setIsPublished] = useState(!!story.is_published);
  const [selectedTempEffect, setSelectedTempEffect] = useState(null);
  const [selectedTempBG, setSelectedTempBG] = useState(null);
  const [selectedTempImg, setSelectedTempImg] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [isLoadingUserImages, setIsLoadingUserImages] = useState(false);
  const [userImagesError, setUserImagesError] = useState("");
  const ambiancePopupRef = useRef();
  const effectPopupRef = useRef();
  const imagePickerPopupRef = useRef();
  const preview1Ref = useRef(null);
  const preview2Ref = useRef(null);
  const preview3Ref = useRef(null);
  const previewTlRef = useRef(null);
  const toolbarRef = useRef();

  const isNodeSelected = selection?.type === "node" && selection.node;
  const isEdgeSelected = selection?.type === "edge" && selection.edge;
  const isStartNode = isNodeSelected && selection.node.data?.nodeType === "start";
  const showFieldConditional = edgeType == "conditional";
  const showFieldHistory = edgeType == "history";

  useEffect(() => {
    if (isNodeSelected) {
      setNodeTitle(selection.node.data?.label ?? "");
      setNodeText(selection.node.data?.body ?? "");
      setIsEnding(!!selection.node.data?.isEnding);
      setSelectedTempBG(selection.node.data?.tempAmbiance ?? null);
      setSelectedTempEffect(selection.node.data?.tempEffect ?? null);
      setSelectedTempImg(selection.node.data?.tempImageUrl ?? null);
      setEdgeTitle("");
    } else if (isEdgeSelected) {
      setEdgeTitle(selection.edge.label ?? "");
      setEdgeType(selection.edge.data?.edgeType ?? "regular");
      setHistoryKey(selection.edge.data?.historyKey ?? "");
      setNodeTitle("");
      setNodeText("");
      setIsEnding(false);
      setSelectedTempBG(null);
      setSelectedTempEffect(null);
      setSelectedTempImg(null);
    } else {
      setNodeTitle("");
      setNodeText("");
      setEdgeTitle("");
      setIsEnding(false);
      setEdgeType("regular");
      setHistoryKey("");
      setSelectedTempBG(null);
      setSelectedTempEffect(null);
      setSelectedTempImg(null);
    }
  }, [isNodeSelected, isEdgeSelected, selection]);

  const handleNodeTitleChange = (value) => {
    setNodeTitle(value);
    if (isNodeSelected) {
      setNodesState((current) =>
        current.map((n) =>
          n.id === selection.node.id ? { ...n, data: { ...n.data, label: value } } : n
        )
      );
      updateSelectionData();
    }
  };

  const handleToggleEnding = () => {
    if (!isNodeSelected || isStartNode) return;
    setIsEnding((prev) => {
      const next = !prev;
      setNodesState((current) =>
        current.map((n) =>
          n.id === selection.node.id
            ? { ...n, data: { ...n.data, isEnding: next } }
            : n
        )
      );
      updateSelectionData();
      return next;
    });
  };

  const handleApply = async () => {
    if (isNodeSelected) {
      const id = selection.node.id;
      const tempAmbiance = selectedTempBG;
      const tempEffect = selectedTempEffect;
      const tempImageUrl = selectedTempImg;
      const hasTempCustom = !!(tempAmbiance || tempEffect || tempImageUrl);
      const hasTempImg = !!tempImageUrl;
      const updatedNodes = nodes.map((n) =>
        n.id === id
          ? {
            ...n,
            data: {
              ...n.data,
              label: nodeTitle,
              body: nodeText,
              isEnding: isStartNode ? false : isEnding,
              tempAmbiance,
              tempEffect,
              tempImageUrl,
              isNodeTempCustom: hasTempCustom,
              isNodeImg: hasTempImg,
            },
          }
          : n
      );
      setNodesState(updatedNodes);
      updateSelectionData();
      updateNode(story.id, id, {
        titre: nodeTitle,
        contenu: nodeText,
        type: selection.node.data?.nodeType ?? "story",
        isEnding: isStartNode ? false : isEnding,
        tempAmbiance,
        tempEffect,
        tempImageUrl,
        isNodeTempCustom: hasTempCustom,
        isNodeImg: hasTempImg,
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
        historyKey: historyKey?.trim() || null,
      });
    }
  };

  const handleEdgeTitleChange = (value) => {
    setEdgeTitle(value);
    if (isEdgeSelected) {
      setEdgesState((current) =>
        current.map((e) => (e.id === selection.edge.id ? { ...e, label: value } : e))
      );
      updateSelectionData();
    }
  };

  const handleEdgeTypeChange = (value) => {
    setEdgeType(value);
    if (isEdgeSelected) {
      setEdgesState((current) =>
        current.map((e) =>
          e.id === selection.edge.id
            ? { ...e, data: { ...e.data, edgeType: value }, edgeType: value }
            : e
        )
      );
      updateSelectionData();
    }
  };

  const handleHistoryKeyChange = (value) => {
    setHistoryKey(value);
    if (isEdgeSelected) {
      setEdgesState((current) =>
        current.map((e) =>
          e.id === selection.edge.id
            ? { ...e, data: { ...e.data, historyKey: value || null } }
            : e
        )
      );
      updateSelectionData();
    }
  };

  const handleAddNode = () => {
    addLocalNode({
      id: uuid(),
      type: "story",
      titre: "Nouveau noeud",
      position: { x: Math.random() * 400, y: Math.random() * 200 },
      isNodeTempCustom: false,
      isNodeImg: false,
      tempAmbiance: null,
      tempEffect: null,
      tempImageUrl: null,
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

  const handlePublishStory = () => {
    if (isPublished) return;
    updateStoryMeta(story.id, {
      isPublished: true,
      title: story.title,
      synopsis: story.synopsis,
      theme: story.theme,
      ambiance: story.musique,
      textEffect: story.animation,
    });
    setIsPublished(true);
  };

  const handleSaveDraft = () => {
    if (!isPublished) return;
    updateStoryMeta(story.id, {
      isPublished: false,
      title: story.title,
      synopsis: story.synopsis,
      theme: story.theme,
      ambiance: story.musique,
      textEffect: story.animation,
    });
    setIsPublished(false);
  };

  const openImagePickerPopup = (e) => {
    e.preventDefault();
    setImagePickerIsOpen(true);
  };

  const closeImagePickerPopup = (e) => {
    e.preventDefault();
    setImagePickerIsOpen(false);
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

  const previewButtonEnter = (textEffect, text) => {
    if (previewTlRef.current) {
      previewTlRef.current.kill();
    }
    previewTlRef.current = StoryCustomisation(
      text.current,
      null,
      null,
      textEffect,
      null,
      true
    );
  };

  const previewButtonLeave = (ref) => {
    if (previewTlRef.current) {
      previewTlRef.current.kill();
    }
    ref.current.innerHTML = ref.current.textContent;
  };


  useGSAP(() => {
    const tl = gsap.timeline();

    if (isEdgeSelected || isNodeSelected) {
      tl.to(toolbarRef.current, {
        x: "0",
        duration: 0.4,
        ease: "power4.out",
      })
      gsap.set(".inputs-flex-container-2 > *",
        {
          opacity: 0,
          y: -10
        })
      gsap.to(".inputs-flex-container-2 > *",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
        },
        "-=0.3"
      );

    } else {
      tl.to(toolbarRef.current, {
        x: "-600px",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, { dependencies: [isEdgeSelected, isNodeSelected], scope: toolbarRef });




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

  useEffect(() => {
    const controller = new AbortController();
    const fetchUserImages = async () => {
      setIsLoadingUserImages(true);
      setUserImagesError("");
      try {
        const res = await fetch("/api/user-images", { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Impossible de recuperer vos images.");
        }
        const data = await res.json();
        setUserImages(data?.images ?? []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setUserImagesError(error.message);
        }
      } finally {
        setIsLoadingUserImages(false);
      }
    };
    fetchUserImages();
    return () => controller.abort();
  }, []);

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
    <div className="storyeditor-page-container">
      <Nav />
      <div className="nav-bg"></div>

      <div className="flex-container-toolbar">
        <div className="tool-bar" ref={toolbarRef}>
          <div className="inputs-flex-container-1">
            {isEdgeSelected && (
              <div className="inputs-flex-container-2">
                <div className="inputs-flex-container-3">
                  <label className="storyvisualizer-label" htmlFor="node-text">Nom du choix *</label>
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
                </div>
                <div className="inputs-flex-container-5">
                  <div className="inputs-flex-container-3">
                    <label className="storyvisualizer-label" htmlFor="node-text">Type de choix</label>
                    <EdgeTypeToggle
                      value={edgeType}
                      onChange={setEdgeType}
                    />
                  </div>
                </div>
                {showFieldConditional &&
                  <div className="inputs-flex-container-2">
                    <div className="inputs-flex-container-3">
                      <label className="storyvisualizer-label" htmlFor="node-text">Identifiant requis</label>
                      <input
                        className="choice-name"
                        placeholder="Ecrire..."
                      />
                      <p className="storyvisualization-history-conditional-fields">     Ce choix sera seulement offert au lecteur si celui-ci a préalablement sélectionné un choix du type <span>Historique </span>avec le même identifiant.</p>
                    </div>
                  </div>
                }
                {showFieldHistory &&
                  <div className="inputs-flex-container-2">
                    <div className="inputs-flex-container-3">
                      <label className="storyvisualizer-label" htmlFor="node-text">Identifiant unique</label>
                      <input
                        className="choice-name"
                        placeholder="Ecrire..."
                      />
                      <p className="storyvisualization-history-conditional-fields"> Ce choix enregistrera cet identifiant dans l'historique du joueur. Vous pourrez ensuite utiliser ce même identifiant dans un choix <span>Conditionnel</span> pour créer des conséquences.</p>
                    </div>
                  </div>
                }

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
                    onChange={(e) => handleNodeTitleChange(e.target.value)}
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

                      {selectedTempBG === null ? (
                        <button type="button" onClick={openAmbiancePopup} className="btn-form btn-form-add-ambiance">
                          Choisir une ambiance
                        </button>
                      ) : (
                        <button type="button" onClick={openAmbiancePopup} className="btn-form btn-form-add-ambiance chosen">
                          Changer l'ambiance
                        </button>
                      )}

                      {selectedTempEffect === null ? (

                        <button type="button" onClick={openEffectPopup} className="btn-form btn-form-add-effect">
                          Choisir un effet
                        </button>
                      ) : (
                        <button type="button" onClick={openEffectPopup} className="btn-form btn-form-add-effect chosen">
                          Changer l'effet
                        </button>
                      )}
                    </div>

                    {selectedTempImg === null ? (
                      <button type="button" onClick={openImagePickerPopup} className="btn-add-img btn-form">
                        Ajouter une image
                      </button>
                    ) : (
                      <button type="button" onClick={openImagePickerPopup} className="btn-add-img btn-form chosen">
                        Changer l'image
                      </button>
                    )}
                  </div>
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
            <div className="storyeditor-popup" ref={imagePickerPopupRef}>
              <button type="button" onClick={closeImagePickerPopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir la banque d'images</h2>
              <div className={userImages.length !== 0 ? ("banners-container-1") : ("")}>
                <div className="banners-container-2">
                  {userImages.length > 0 && (
                    <>
                      <p className="user-images-label">Vos téléversements</p>
                      <div className="banner-grid">
                        {userImages.map((img) => (
                          <button
                            type="button"
                            key={img.id}
                            className={"img-wrapper " + (selectedTempImg === img.url ? "active" : "")}
                            onClick={() =>
                              setSelectedTempImg((prev) => (prev === img.url ? null : img.url))
                            }
                          >
                            <img src={img.url} alt={img.description || "Image"} />
                          </button>
                        ))}
                      </div>
                      <hr className="popup-banner-hr" />
                    </>
                  )}
                  {isLoadingUserImages && <p>Chargement de vos images...</p>}
                  <p className="user-images-label">Galerie d’images</p>
                  {userImagesError && <p className="upload-error">{userImagesError}</p>}
                  <div className="banner-grid">
                    {[
                      "banniere_1.jpg",
                      "banniere_2.jpg",
                      "banniere_3.jpg",
                      "banniere_4.jpg",
                      "banniere_5.jpg",
                      "banniere_6.jpg",
                    ].map((img) => {
                      const url = `../../../img/${img}`;

                      return (
                        <button
                          type="button"
                          key={img}
                          className={"img-wrapper " + (selectedTempImg === url ? "active" : "")}
                          onClick={() =>
                            setSelectedTempImg((prev) => (prev === url ? null : url))
                          }
                        >
                          <img src={url} alt={img} />
                        </button>
                      );
                    })}
                  </div>
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
            <div className="storyeditor-popup popup-ambiance" ref={ambiancePopupRef}>
              <button type="button" onClick={closeAmbiancePopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir nos choix d'ambiances</h2>
              <div className="ambiance-list">
                <button type="button"
                  className={"ambiance-button ambiance-horreur " + (selectedTempBG === "1" ? "active-1" : "")}
                  onClick={() => setSelectedTempBG(selectedTempBG === "1" ? null : "1")}
                >
                  <div
                    className="ambiance-title"
                  >Ambiance d'horreur</div>
                </button>
                <button type="button"
                  className={"ambiance-button ambiance-magique " + (selectedTempBG === "2" ? "active-2" : "")}
                  onClick={() => setSelectedTempBG(selectedTempBG === "2" ? null : "2")}
                >
                  <div
                    className="ambiance-title">Ambiance magique</div>
                </button>
                <button type="button"
                  className={"ambiance-button ambiance-medieval " + (selectedTempBG === "3" ? "active-3" : "")}
                  onClick={() => setSelectedTempBG(selectedTempBG === "3" ? null : "3")}
                >
                  <div className="ambiance-title">Ambiance médiéval</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {effectIsOpen && (
          <div className="popup-container">
            <div className="storyeditor-popup popup-effect" ref={effectPopupRef}>
              <button type="button" onClick={closeEffectPopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir nos d'effets</h2>
              <div className="ambiance-list" >
                {/* Theme 1 */}
                <button type="button" className={"ambiance-button effect-preview effect-preview-1 " + (selectedTempEffect === "1" ? "active" : "")}
                  onClick={() => setSelectedTempEffect(selectedTempEffect === "1" ? null : "1")}

                  onMouseEnter={() => previewButtonEnter(1, preview1Ref, true)}
                  onMouseLeave={() => previewButtonLeave(preview1Ref)}
                >
                  <div className="ambiance-title">Effet d'entrée par le bas  </div>
                  <div className="effect-preview-placeholder" ref={preview1Ref}>
                    Ceci est un aperçu
                  </div>
                </button>

                {/* Theme 2 */}
                <button type="button"
                  className={"ambiance-button effect-preview effect-preview-2 " + (selectedTempEffect === "2" ? "active" : "")}
                  onClick={() => setSelectedTempEffect(selectedTempEffect === "2" ? null : "2")}
                  onMouseEnter={() => previewButtonEnter(2, preview2Ref, true)}
                  onMouseLeave={() => previewButtonLeave(preview2Ref)}
                >
                  <div className="ambiance-title">Effet de flou</div>
                  <div className="effect-preview-placeholder" ref={preview2Ref}>
                    Ceci est un aperçu
                  </div>
                </button>

                {/* Theme 3 */}
                <button type="button"
                  className={"ambiance-button effect-preview effect-preview-3 " + (selectedTempEffect === "3" ? "active" : "")}
                  onClick={() => setSelectedTempEffect(selectedTempEffect === "3" ? null : "3")}
                  onMouseEnter={() => previewButtonEnter(3, preview3Ref, true)}
                  onMouseLeave={() => previewButtonLeave(preview3Ref)}
                >
                  <div className="ambiance-title">Effet de machine à écrire</div>
                  <div
                    className="effect-preview-placeholder"
                    ref={preview3Ref}>
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
        <button
          className="draft-button"
          onClick={handleSaveDraft}
        // disabled={!isPublished}
        >
          {isPublished ? "Sauvegarder en brouillon" : "Sauvegarder le brouillon"}
        </button>
        <Link href="/profiles/myprofile">
          <button
            className="publish-button"
            onClick={handlePublishStory}
          // disabled={isPublished}
          >
            {isPublished ? "Sauvegarder" : "Publier"}
          </button>
        </Link>
      </div>
    </div>
  );
}


export default StoryEditorPage;
