import styled from "styled-components";
import { Visualizer } from "../components/visualizer";
import { useEffect, useState } from "react";
import { generateNodesAndEdges } from "../utils/parser";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  flex-grow: 1;
`;

const ActionPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Builder = styled.div`
  flex-grow: 1;
  border: 1px solid red;
`;

const initialData =  {
  name: 'karthik',
  age: 25,
  isActive: true,
  nums: {
    type: 'fooo',
    bar: 4,
    // types: {
    //   color: 'red',
    //   uup: 5
    // }
  },
  // prize: {
  //   apple: true,
  //   orange: false
  // },
  // exp: [1,5, { nest: 'true'}]
}

const dummyNodes = [
  {
      "id": "root",
      "type": "customNode",
      "data": {
          "name": "karthik",
          "age": 25,
          "isActive": true
      },
      "position": {
          "x": 0,
          "y": 0
      },
      "targetPosition": "Top",
      "sourcePosition": "Bottom"
  },
  {
      "id": "root-nums",
      "data": {
          "title": "nums"
      },
      "type": "customNode",
      "position": {
          "x": 0,
          "y": 200
      },
      "targetPosition": "Top",
      "sourcePosition": "Bottom"
  },
  {
      "id": "root-nums-child",
      "data": {
          "type": "fooo",
          "bar": 4
      },
      "type": "customNode",
      "position": {
          "x": 0,
          "y": 400
      },
      "targetPosition": "Top",
      "sourcePosition": "Bottom"
  }
]
const dummyEd = [
  {
      "type": "smoothstep",
      "source": "root",
      "target": "root-nums"
  },
  {
      "source": "root-nums",
      "target": "root-nums-child",
      "type": "smoothstep"
  }
]

export function Dasboard() {
  const [data, setData] = useState(initialData);
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  useEffect(() => {
    if(!data || !Object.keys(data).length) return
    const { nodes: n, edges: e } = generateNodesAndEdges(data,null,[],[])
    console.log({nodes,edges})
    setNodes(n)
    setEdges(e)
  },[data])
  return (
    <Layout>
      <ActionPanel>
        {/* <button onClick={addNode}>Add node</button>
        <button onClick={straight}>Straighten</button>
        <button onClick={() => setDirection((p) => (p === "TB" ? "LR" : "TB"))}>
          Flip direction
        </button> */}
        <button>Hello</button>
      </ActionPanel>
      <Builder>
        <Visualizer nodes={nodes} edges={edges}/>
      </Builder>
    </Layout>
  );
}
