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
    // console.log({ parent });
    const values = Object.values(obj);
    const hasNoChildren = values.every((value) => {
      return typeof value !== "object" || value === null;
    });
    // console.log({obj, hasNoChildren})
    const currentId = parent ? `${parent}-child` : "root";
    if (hasNoChildren) {
      const rootNode = {
        id: currentId,
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
        target: currentId,
        type: "smoothstep",
        // id: `${Math.random()}-x`
        id:`${parent}->${currentId}`
      };
      edges.push(edge);
      return { nodes, edges };
    }
    const { values: currentValues, children: currentChildren } =
      getPrimitives(obj);
    // console.log({obj})
    // console.log({currentValues, currentChildren})
    const containerNode = {
      id: currentId,
      type: "customNode",
      data: {
        ...currentValues,
      },
    };
    nodes.push(containerNode);
    // console.log({parent, currentId})
    // const edge = {
    //   source: parent,
    //   target: currentId,
    //   type: "smoothstep",
    //   id: `${Math.random()}-x`
    // }
    // edges.push(edge);
    currentChildren.forEach((key) => {
      const childObjRootNode = {
        id: `${currentId}-${key}`,
        data: { title: key },
        type: "customNode",
      };
      nodes.push(childObjRootNode);
      let parentToChildObjTitle = {}
      if(parent) {
        parentToChildObjTitle = {
          target: `${currentId}-${key}`,
          source: parent,
          type: 'smoothstep',
          id: `${parent}->${currentId}-${key}`
          // id: `${Math.random()}-x`
        }
        edges.push(parentToChildObjTitle)
      }
      const edgeSource = parent || "root";
      const edgeTarget = parent ? currentId : `${currentId}-${key}`
      // const edgeId = parent ? `${parent}->${currentId}` : `root->${currentId}-${key}`
      const parentToPrimitiveChildren = {
        type: "smoothstep",
        source: edgeSource,
        target: edgeTarget,
        id: `${edgeSource}->${edgeTarget}`
        // id: `${Math.random()}-x`
      };
      console.log({ parentToChildObjTitle, parentToPrimitiveChildren})
      edges.push(parentToPrimitiveChildren);
      generateNodesAndEdges(obj[key], `${currentId}-${key}`, nodes, edges);
    });
    return { nodes, edges };
  }