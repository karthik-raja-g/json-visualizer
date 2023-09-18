import { useEffect, useState } from "react";
import "./App.css";
import { ReactFlowProvider } from "reactflow";
import { Dasboard } from "./containers/Dashboard";
// const data = {
//   user: {
//     name: "john",
//     phonenumbers: ["445", "009"],
//     education: {
//       school: "vhm hr sec",
//       college: "uim tech",
//     },
//     languages: [
//       {
//         name: "english",
//         level: 5,
//       },
//       {
//         name: "tamil",
//         level: 5,
//       },
//     ],
//   },
//   people: "kk",
// };

// const data = {
// root: 'hello',
// // nums: [8,9,'o'],
// test: {
//   nam: 67,
//   fgv: '88'
// },
// user: {
//   name: "john",
//   // phonenumbers: ["445", "009"],
//   education: {
//     school: "vhm hr sec",
//     college: "uim tech",
//   },
//   languages: [
//     {
//       name: "english",
//       level: 5,
//       type: {
//         gender: 'male'
//       }
//     },
//     {
//       name: "tamil",
//       level: 5,
//       type: {
//         gender: 'female'
//       }
//     },
//   ],
//   country: {
//     name: 'india',
//     state: {
//         name: 'tn',
//         capital: 'chennai',
//         // pin: [500,233]
//     }
//   }
// },
// };
// const data = {
//   "type": "CANDIDATE",
//   "data": {
//       "id": 19617,
//       "primaryEmail": "karthikajar555@gmail.com",
//       "firstName": "Karthik",
//       "lastName": "Raja G",
//       "jobTitle": null,
//       "fullName": "Karthik Raja G",
//       "portfolioUrl": "https://www.linkedin.com/in/karthiik/",
//       "source": "linkedin",
//       "sourceId": "karthiik",
//       "profileImageURL": "https://media.licdn.com/dms/image/C4D03AQGbJXPoLD2rOQ/profile-displayphoto-shrink_200_200/0/1662045587246?e=1699488000&v=beta&t=ZypnMmunCzmCt_m086vwQ6ZdZ2tOS6RYoVr95M1mXbY",
//       "emails": [
//           {
//               "id": "karthikajar555@gmail.com",
//               "isPersonalEmail": true,
//               "isPrimary": true
//           }
//       ],
//       "phoneNumbers": [
//           {
//               "code": "+91",
//               "number": "8124875351",
//               "isPrimary": true
//           }
//       ],
//       "sequences": null,
//       "socialLinks": [
//           {
//               "type": "Linkedin",
//               "link": "https://www.linkedin.com/in/karthiik/"
//           },
//           {
//               "link": "https://www.karthiik.com",
//               "type": "PERSONAL"
//           }
//       ],
//       "contactLookupAttemptby": null,
//       "currentEmployementDetails": {
//           "role": "-",
//           "organization": "Ideas2IT Technologies"
//       },
//       "atsDetails": null,
//       "resumeUrl": null,
//       "resumeUploadedAt": null,
//       "isResumeUploaded": null,
//       "iceBreaker": null,
//       "recruiterFeedback": null,
//       "settings": null,
//       "is_deleted": false,
//       "is_active": true,
//       "createdAt": "2023-09-06T10:40:14.471Z",
//       "updatedAt": "2023-09-06T15:05:13.025Z",
//       "userid": 29,
//       "accountid": 18,
//       "notes": {
//           "id": null,
//           "is_deleted": null,
//           "core_type": null,
//           "body": null,
//           "is_active": null,
//           "version": null,
//           "createdAt": null,
//           "updatedAt": null,
//           "personid": 'ashok',
//           "userid": null,
//           "user": {
//               "id": null,
//               "fullName": null,
//               "firstName": null,
//               "lastName": null
//           }
//       },
//       "personenrich": []
//   }
// }

// const data = {
//   name: 'karthik',
//   age: 25,
//   isActive: true,
//   nums: {
//     type: 'fooo',
//     bar: 4,
//     // types: {
//     //   color: 'red',
//     //   uup: 5
//     // }
//   },
//   prize: {
//     apple: true,
//     orange: false
//   },
//   exp: [1,5, { nest: 'true'}]
// }
const data = {
  type: "candidate",
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
      name: "india",
      state: {
        name: "tn",
        capital: "chennai",
        pin: [500, 233],
      },
    },
  },
};
function App() {
  // useEffect(() => {
  //   // let nodes = [];
  //   // let edges = []
  //   function getPrimitives(obj) {
  //     const keys = Object.keys(obj);
  //     const values = {};
  //     const children = [];
  //     keys.forEach((key) => {
  //       if (typeof obj[key] !== "object" || obj[key] === null) {
  //         values[key] = obj[key];
  //       } else {
  //         children.push(key);
  //       }
  //     });
  //     return { values, children };
  //   }
  //   function test(obj, parent, nodes, edges) {
  //     console.log({ parent });
  //     const keys = Object.keys(obj);
  //     const values = Object.values(obj);
  //     const hasNoChildren = values.every((value) => {
  //       return typeof value !== "object" || value === null;
  //     });
  //     const parentId = parent ? `${parent}-child` : "root";
  //     if (hasNoChildren) {
  //       const rootNode = {
  //         id: parentId,
  //         data: { ...obj },
  //         type: "custom",
  //       };
  //       nodes.push(rootNode);
  //       if (!parent) return;
  //       const edge = {
  //         source: parent,
  //         target: parentId,
  //         type: "smoothstep",
  //       };
  //       edges.push(edge);
  //       return { nodes, edges };
  //     }
  //     const { values: currentValues, children: currentChildren } =
  //       getPrimitives(obj);
  //     const containerNode = {
  //       id: parentId,
  //       type: "custom",
  //       data: {
  //         ...currentValues,
  //       },
  //     };
  //     nodes.push(containerNode);
  //     currentChildren.forEach((key) => {
  //       const node = {
  //         id: `${parentId}-${key}`,
  //         data: { title: key },
  //         type: "custom",
  //       };
  //       nodes.push(node);
  //       const parentToContainerEdge = {
  //         type: "smoothstep",
  //         source: parent || "root",
  //         target: parent ? parentId : `${parentId}-${key}`,
  //       };
  //       // if(parent) {
  //       //   parentToContainerEdge.source = parent,
  //       //   parentToContainerEdge.target = parentId
  //       // } else {
  //       //   parentToContainerEdge.source = 'root'
  //       //   parentToContainerEdge.target
  //       // }
  //       // const parentToContainerEdge = {
  //       //   source: parent,
  //       //   target: parentId,
  //       //   type: 'smoothstep'
  //       // }
  //       edges.push(parentToContainerEdge);
  //       // if(!parent) {
  //       //   const edge = {
  //       //     source: 'root',
  //       //     target: `${parentId}-${key}`,
  //       //     type: 'smoothstep'
  //       //   }
  //       //   edges.push(edge)
  //       //   // return;
  //       // }
  //       test(obj[key], `${parentId}-${key}`, nodes, edges);
  //     });
  //     return { nodes, edges };
  //   }
  //   const ret = test(data, "", [], []);
  //   console.log({ ret });
  //   // console.log({nodes,edges})
  // }, []);

  return (
    <ReactFlowProvider>
      <Dasboard/>
    </ReactFlowProvider>
  );
}

export default App;
