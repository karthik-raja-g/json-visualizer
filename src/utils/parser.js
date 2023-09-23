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

  const EDGE_TYPE = 'simplebezier'
  const NODE_TYPE = 'customNode'

  // It is a hotfix. Need to find the root cause
  // why duplicate/unwanted edges are produced
  function checkIfEdgeExists(edges = [],id) {
    return edges.findIndex(edge => edge.id === id) > -1
  }

  export function generateNodesAndEdges({obj, parent, nodes = [], edges = [], childCount = null}) {
    console.log({obj})
    const values = Object.values(obj);
    // console.log({values, obj})
    const hasNoChildren = values.every((value) => {
      return typeof value !== "object" || value === null;
    });
    let currentId = parent ? `${parent}-child` : "root";
    if(childCount) currentId = `${currentId}-${childCount}`
    const isArray = Object.hasOwn(obj, 'length');
    // const isArray = false;
    if(isArray) {
      obj.forEach((val, i) => {
        // primitive values in array
        const nodeId = `${parent}-child-${i+1}`
        if(typeof val !== "object" || val === null) {
          const edgeId = `${parent}->${parent}-child-${i+1}`
          // if(!checkIfEdgeExists(edges, edgeId)) {
            const edge = {
              source: parent,
              target: `${parent}-child-${i+1}`,
              type: EDGE_TYPE,
              // id: `${Math.random()}-x`
              id: edgeId
            }
            edges.push(edge)
          // }
          const node = {
            id: nodeId ,
            data: {
              $primx: val
            },
            type: NODE_TYPE
          }
          nodes.push(node)
        } else {
          const isArray = Object.hasOwn(val, 'length');
          // Array within the array
          if(isArray) {
            console.log(val, 'arr of arr')
            const titleNode = {
              type: NODE_TYPE,
              data: {
                title: 'array of array'
              },
              id: `${nodeId}-aoa`
            }
            nodes.push(titleNode);
            const edge = {
              target: `${nodeId}-aoa`,
              source: parent,
              type: EDGE_TYPE,
              id: `${parent}-${nodeId}-aoa`
            }
            edges.push(edge);
            generateNodesAndEdges({ obj: val, parent: `${nodeId}-aoa`, nodes, edges})
          } else {
            // Object within array
            console.log('in else', val)
            console.log({val, parent})
            /* Since each element of array needs separate node and,
             corresponding edge, I added the index as unique identifier
             for each node. For object this is not required as the contents
             of object will be contained in a single node  */
            generateNodesAndEdges({
              obj: val,
              parent,
              nodes,
              edges,
              childCount: i+1
            })

          }
        }
      })
    } else {
      // RECURSION TERMINATING CONDITION!!
      // goes on till a primitive value (leaf) is found
      // in a traversal
      if (hasNoChildren) {
        console.log('final one')
        const nodeId = currentId;
        const edgeId = `${parent}->${currentId}`
        const rootNode = {
          id: nodeId,
          data: { ...obj },
          type: NODE_TYPE,
        };
        nodes.push(rootNode);
        console.log({rootNode})
        if (!parent) {
          // nodes.push(rootNode)
          return;
          // return { nodes: [rootNode], edges: [] }
        }
        // if(!checkIfEdgeExists(edges, edgeId)) {
          const edge = {
            source: parent,
            target: currentId,
            type: EDGE_TYPE,
            // id: `${Math.random()}-x`
            id: edgeId
          };
          edges.push(edge);
          // return { nodes, edges };
        // }
        return;
      }
      const { values: currentValues, children: currentChildren } =
        getPrimitives(obj);
      const others = currentChildren.reduce((acc,curr) => {
        acc[curr] = Object.hasOwn(obj[curr],'length') ? 'Array' : 'Object'
        return acc
      },{})
      const primitivesNode = {
        id: currentId,
        type: NODE_TYPE,
        data: {
          ...currentValues,
          ...others
        },
      };
      nodes.push(primitivesNode);
      currentChildren.forEach((key, i) => {
        console.log({ob: obj[key], key})
        const isArray = Object.hasOwn(obj[key], 'length');
        const anchorNodeId = `${currentId}-${key}-${i+1}`;
          const childObjRootNode = {
            id: anchorNodeId,
            data: { title: `${key}-${isArray ? 'array' : 'object'}` },
            type: NODE_TYPE,
          };
          nodes.push(childObjRootNode);
          let parentToChildObjTitle = {}
          if(parent) {
            parentToChildObjTitle = {
              target: anchorNodeId,
              source: parent,
              type: EDGE_TYPE,
              id: `${parent}->${anchorNodeId}`
              // id: `${Math.random()}-x`
            }
            edges.push(parentToChildObjTitle)
          }
        const edgeSource = parent || "root";
        const edgeTarget = parent ? currentId : anchorNodeId
        // if(!checkIfEdgeExists(edges, `${edgeSource}->${edgeTarget}`)) {
          const parentToPrimitiveChildren = {
            type: EDGE_TYPE,
            source: edgeSource,
            target: edgeTarget,
            id: `${edgeSource}->${edgeTarget}`
            // id: `${Math.random()}-x`
          };
          edges.push(parentToPrimitiveChildren);
        // }
        // generateNodesAndEdges(obj[key], anchorNodeId, nodes, edges);
        generateNodesAndEdges({ obj: obj[key], nodes, edges, parent: anchorNodeId})
      });
    }
    return { nodes, edges };
  }