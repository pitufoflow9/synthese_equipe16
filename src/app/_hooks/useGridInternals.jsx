"use client";
import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { useState, useCallback, useEffect } from "react";
import useDebouncedCallback from "./useDebounceCallback";

export const SelectionType = {
  node: "node",
  edge: "edge",
  none: "none",
};

const useGridInternals = (
  localNodes,
  setLocalNodes,
  localEdges,
  setLocalEdges,
  onUpdateNodePositionHandler,
  onEdgeCreateHandler
) => {
  const [selection, setSelection] = useState({
    node: null,
    edge: null,
    type: SelectionType.none,
  });

  const [selectionCounter, setSelectionCounter] = useState(0);
  const updateSelectionData = () =>
    setSelectionCounter((current) => current + 1);

  useEffect(() => {
    setSelection((current) => ({
      ...current,
      ...(current.type === SelectionType.node && {
        node: { ...localNodes.find((n) => n.id === current.node.id) },
      }),
      ...(current.type === SelectionType.edge && {
        edge: { ...localEdges.find((ed) => ed.id === current.edge.id) },
      }),
    }));
  }, [selectionCounter]);

  const deselect = () => {
    setLocalNodes((current) =>
      current.map((n) => (n.selected ? { ...n, selected: false } : n))
    );
    setLocalEdges((current) =>
      current.map((ed) => (ed.selected ? { ...ed, selected: false } : ed))
    );
  };

  const saveNodePosition = useDebouncedCallback(async (node) => {
    onUpdateNodePositionHandler(node);
  }, 250);

  const onNodesChange = useCallback(
    (changes) => {
      setLocalNodes((nodesSnapshot) => {
        const updatedNodes = applyNodeChanges(changes, nodesSnapshot);
        changes.forEach((change) => {
          if (change.position) {
            const node = updatedNodes.find((n) => n.id === change.id);
            if (node) saveNodePosition(node);
          }
        });
        return updatedNodes;
      });
    },
    [saveNodePosition]
  );

  const onSelectionChange = useCallback(({ nodes, edges }) => {
    setSelection({
      node: nodes.length > 0 ? nodes[0] : null,
      edge: edges.length > 0 ? edges[0] : null,
      type:
        nodes.length > 0
          ? SelectionType.node
          : edges.length > 0
          ? SelectionType.edge
          : SelectionType.none,
    });
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setLocalEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
  }, []);

  const onConnect = useCallback((params) => {
    onEdgeCreateHandler(params);
  }, []);

  return {
    selection,
    updateSelectionData,
    deselect,
    internals: {
      onNodesChange,
      onEdgesChange,
      onConnect,
      onSelectionChange,
    },
  };
};

export default useGridInternals;
