import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from "reactflow";
import CustomNode from "./CustomNode";
import dagre from "dagre";
import { useEffect, useMemo, useState } from "react";
import { generateNodesAndEdges } from "../utils/parser";

const nodeWidth = 250;
const nodeHeight = 150;
const customNodes = { customNode: CustomNode };
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);
  const nds = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const targetPosition = isHorizontal ? "Left" : "Top";
    const sourcePosition = isHorizontal ? "Right" : "Bottom";
    const position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return { ...node, position, targetPosition, sourcePosition };
  });
  return { nodes: nds, edges };
};
const initialData =  {
  name: 'karthik',
  age: 25,
  isActive: true,
  nums: {
    type: 'fooo',
    bar: 4,
    types: {
      color: 'red',
      uup: 5
    }
  },
  // prize: {
  //   apple: true,
  //   orange: false
  // },
  // exp: [1,5, { nest: 'true'}]
}
const {  nodes: dummyNodes,
  edges: dummyEd} = generateNodesAndEdges(initialData,null,[],[])
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  dummyNodes,
  dummyEd
);
export function Visualizer() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  console.log({nodes, edges})
  return (
    <ReactFlow
      nodeTypes={customNodes}
      edges={edges}
      nodes={nodes}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls position="bottom-right" />
    </ReactFlow>
  );
}
