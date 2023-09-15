const data = {
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

let nodes = []
function parseData(data = {}, parent = '') {
  console.log({data})
  const keys = Object.keys(data);
  keys.forEach(key => {
      console.log(key, 'KEY')
      console.log(typeof data[key], 'TYPE')
      const ky = parent ? parent + '->' + key : key
      if([undefined,''].includes(typeof data[key]) || data[key] === null) {
          console.log('null key', key)
          nodes.push({ [key] : 'null', parent: ky})
          return
      }
      // string
      if(['string','number', 'boolean'].includes(typeof data[key])) {
          const obj = {[key] : data[key]};
          if(parent) obj.parent = parent;
          nodes.push(obj)
          return;
      }
      // array
      if(typeof data[key] === 'object' && !isNaN(data[key].length)) {
          if(data[key].length === 0) {
              // empty array
              nodes.push({ [key] : 'empty-array', parent: ky })
              return;
          }
          data[key].forEach(k => {
              if(typeof k === 'object') {
                  parseData(k, ky)
                  return;
              }
              const obj = { [key] : k }
              if(parent) obj.parent = parent;
              nodes.push(obj)
          })
      } else {
          // obj
          parseData(data[key], ky)
      }
  })
}

function getPaths(nodes) {
  const all = nodes.map(nd => nd.parent).filter(Boolean)
  const paths = new Set(all);
  return paths;
}