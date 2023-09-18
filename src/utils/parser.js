export const data = {
  user: {
    name: "john",
    phonenumbers: ["445", "009"],
    education: {
      school: "vhm hr sec",
      college: "uim tech",
    },
    languages: [
      {
        name: "english",
        level: 5,
      },
      {
        name: "tamil",
        level: 5,
      },
    ],
    country: {
      name: 'india',
      state: {
          name: 'tn',
          capital: 'chennai',
          pin: [500,233]
      }
    }
  },
};

function getPrimitives(obj) {
    const keys = Object.keys(obj);
    const values = {};
    const children = [];
    keys.forEach((key) => {
      if (typeof obj[key] !== "object" || obj[key] === null) {
        values[key] = obj[key];
      } else {
        children.push(key);
      }
    });
    return { values, children };
  }

  export function generateNodesAndEdges(obj, parent, nodes = [], edges = []) {
    console.log({ parent });
    const values = Object.values(obj);
    const hasNoChildren = values.every((value) => {
      return typeof value !== "object" || value === null;
    });
    const parentId = parent ? `${parent}-child` : "root";
    if (hasNoChildren) {
      const rootNode = {
        id: parentId,
        data: { ...obj },
        type: "customNode",
      };
      nodes.push(rootNode);
      if (!parent) {
        // nodes.push(rootNode)
        return { nodes: [rootNode], edges: [] }
      }
      const edge = {
        source: parent,
        target: parentId,
        type: "smoothstep",
        id:`${parent}->${parentId}`
      };
      edges.push(edge);
      return { nodes, edges };
    }
    const { values: currentValues, children: currentChildren } =
      getPrimitives(obj);
    const containerNode = {
      id: parentId,
      type: "customNode",
      data: {
        ...currentValues,
      },
    };
    nodes.push(containerNode);
    currentChildren.forEach((key) => {
      const node = {
        id: `${parentId}-${key}`,
        data: { title: key },
        type: "customNode",
      };
      nodes.push(node);
      const edgeSource = parent || "root";
      const edgeTarget = parent ? parentId : `${parentId}-${key}`
      const edgeId = parent ? `${parent}->${parentId}` : `root->${parentId}-${key}`
      const parentToContainerEdge = {
        type: "smoothstep",
        source: edgeSource,
        target: edgeTarget,
        id: edgeId
      };
      edges.push(parentToContainerEdge);
      generateNodesAndEdges(obj[key], `${parentId}-${key}`, nodes, edges);
    });
    return { nodes, edges };
  }