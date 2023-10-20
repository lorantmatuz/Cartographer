const elements = [
  {
      time: 2,
      type: 'water',
      shape: [[1,1,1],
              [0,0,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'town',
      shape: [[1,1,1],
              [0,0,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 1,
      type: 'forest',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'farm',
      shape: [[1,1,1],
              [0,0,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false
      },
  {
      time: 2,
      type: 'forest',
      shape: [[1,1,1],
              [0,0,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'town',
      shape: [[1,1,1],
              [0,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'farm',
      shape: [[1,1,1],
              [0,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 1,
      type: 'town',
      shape: [[1,1,0],
              [1,0,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 1,
      type: 'town',
      shape: [[1,1,1],
              [1,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 1,
      type: 'farm',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 1,
      type: 'farm',
      shape: [[0,1,0],
              [1,1,1],
              [0,1,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'water',
      shape: [[1,1,1],
              [1,0,0],
              [1,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'water',
      shape: [[1,0,0],
              [1,1,1],
              [1,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'forest',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,1]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'forest',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'water',
      shape: [[1,1,0],
              [1,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
]

class Elements {
  constructor(time, type, shape) {
    this.time = time;
    this.type = type;
    this.shape = shape;
    this.rotation = 0;
    this.mirrored = false;
  }

  typeToSrc() {
    return 'resources/fields/' + element.type + '.png';
  }
}

function typeToSrc(element) {
  return 'resources/fields/' + element.type + '.png';
}

function shapeToIndexList(element) {
  let res = [];
  let ctr = 0;
  element.shape.forEach(row => {
    row.forEach((value) => {
      if(value) {
        res.push(ctr);
      }
      ++ctr;
    })
  });
  return res;
}

function shapeToIndices(element) {
  let res = [];
  for(let i = 0; i < 3; ++i) {
    for(let j = 0; j < 3; ++j) {
      if(element.shape[i][j]) {
        res.push([i,j]);
      }
    }
  }
  return res;
}