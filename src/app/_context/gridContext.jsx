"use client";
import { createContext, useContext, useState } from "react";
import useGridInternals, { SelectionType } from "../_hooks/useGridInternals";
import { addEdge, ReactFlowProvider } from "@xyflow/react";
import { v4 as uuid } from "uuid";
import {
  createEdge as createEdgeAction,
  createNode as createNodeAction,
  updateNodePosition as updateNodePositionAction,
} from "@/app/actions/story-actions";

const gridContext = createContext({
  nodes: [],
  edges: [],
  selection: { node: null, edge: null, type: SelectionType.none },
  deselect: () => {},
  updateSelectionData: () => {},
  setNodesState: () => {},
  setEdgesState: () => {},
  addLocalNode: (newNode) => {},
  internals: {
    onNodesChange: (changes) => {},
    onEdgesChange: (changes) => {},
    onSelectionChange: ({ nodes, edges }) => {},
    onConnect: (params) => {},
  },
  _v: 0,
});

const GridProvider = ({
  children,
  initialNodes = [],
  initialEdges = [],
  storyId,
}) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onUpdateNodePositionHandler = async ({ id, position }) => {
    if (!storyId) return;
    updateNodePositionAction(storyId, id, position);
  };

  const onEdgeCreatedHandler = async ({ source, target }) => {
    const newEdgeData = {
      id: uuid(),
      source,
      target,
      type: "default",
      data: { edgeType: "regular" },
      edgeType: "regular",
      selectable: true,
    };
    setEdges((currentEdges) => addEdge(newEdgeData, currentEdges));
    if (storyId) {
      createEdgeAction(storyId, newEdgeData);
    }
  };

  const { selection, deselect, updateSelectionData, internals } =
    useGridInternals(
      nodes,
      setNodes,
      edges,
      setEdges,
      onUpdateNodePositionHandler,
      onEdgeCreatedHandler
    );

  const addLocalNode = (newNode) => {
    const node = {
      id: newNode.id ?? uuid(),
      type: "default",
      position: newNode.position ?? { x: 0, y: 0 },
      data: {
        label: newNode.titre ?? "Nouveau noeud",
        nodeType: newNode.type ?? "story",
        isEnding: !!newNode.isEnding,
        body: newNode.contenu ?? "",
      },
      draggable: true,
      selectable: true,
    };

    setNodes((current) => [...current, node]);
    if (storyId) {
      createNodeAction(storyId, { ...newNode, id: node.id });
    }
  };

  return (
    <ReactFlowProvider>
      <gridContext.Provider
        value={{
          nodes,
          edges,
          selection,
          deselect,
          updateSelectionData,
          setNodesState: setNodes,
          setEdgesState: setEdges,
          internals,
          addLocalNode,
          _v: 1,
        }}
      >
        {children}
      </gridContext.Provider>
    </ReactFlowProvider>
  );
};

const useGrid = () => {
  const ctx = useContext(gridContext);
  if (ctx._v === 0) {
    console.log("Veuillez utiliser le GridProvider");
  }
  return ctx;
};

export { GridProvider, useGrid };

export default gridContext;

