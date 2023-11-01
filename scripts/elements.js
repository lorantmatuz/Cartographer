const elementTable = document.querySelector('#nextItemTable');
const elementTableTds = document.querySelectorAll('#nextItemTable td');
const elementTableSpan = document.querySelector('#timeOfNextItem span');


class Element {
  constructor(time, type, shape) {
    this.time = time;
    this.type = type;
    this.shape = shape;
    this.rotation = 0;
    this.mirrored = false;
  }

  typeToSrc() {
    return 'resources/fields/' + this.type + '.png';
  }

  shapeToIndexList() {
    let res = [];
    let ctr = 0;
    this.shape.forEach(row => {
      row.forEach((value) => {
        if(value) {
          res.push(ctr);
        }
        ++ctr;
      })
    });
    return res;
  }

  shapeToIndices() {
    let res = [];
    for(let i = 0; i < 3; ++i) {
      for(let j = 0; j < 3; ++j) {
        if(this.shape[i][j]) {
          res.push([i,j]);
        }
      }
    }
    return res;
  }

  rotate() {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push([]);
      for (let j = 0; j < 3; j++) {
        result[i].push(this.shape[j][i]);
      }
    }
    result.reverse();
    this.shape = result;
    this.rotation = ( this.rotate + 1 ) % 4;
  }

  mirror() {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(this.shape[i].slice().reverse());
    }
    this.shape = result;
    this.mirrored = !this.mirrored;
  }

  print() {
    this.removeImages();
    elementTableSpan.innerHTML = this.time;
    this.shapeToIndexList().forEach((index) => {
      const image = document.createElement('img');
      image.src = this.typeToSrc();
      image.draggable = true;
      elementTableTds[index].appendChild(image);
    });
  }

  removeImages() {
    for (let i = 0; i < 9; i++) {
      while(elementTableTds[i].firstChild) {
        elementTableTds[i].removeChild(elementTableTds[i].firstChild);
      }
    }
  }
}

class Elements {
  constructor() {
    this.elements = [
      new Element(2,'water',  [[1,1,1],[0,0,0],[0,0,0]]),
      new Element(2,'town',   [[1,1,1],[0,0,0],[0,0,0]]),
      new Element(1,'forest', [[1,1,0],[0,1,1],[0,0,0]]),
      new Element(2,'farm',   [[1,1,1],[0,0,1],[0,0,0]]),
      new Element(2,'forest', [[1,1,1],[0,0,1],[0,0,0]]),
      new Element(2,'town',   [[1,1,1],[0,1,0],[0,0,0]]),
      new Element(2,'farm',   [[1,1,1],[0,1,0],[0,0,0]]),
      new Element(1,'town',   [[1,1,0],[1,0,0],[0,0,0]]),
      new Element(1,'town',   [[1,1,1],[1,1,0],[0,0,0]]),
      new Element(1,'farm',   [[1,1,0],[0,1,1],[0,0,0]]),
      new Element(1,'farm',   [[0,1,0],[1,1,1],[0,1,0]]),
      new Element(2,'water',  [[1,1,1],[1,0,0],[1,0,0]]),
      new Element(2,'water',  [[1,0,0],[1,1,1],[1,0,0]]),
      new Element(2,'forest', [[1,1,0],[0,1,1],[0,0,1]]),
      new Element(2,'forest', [[1,1,0],[0,1,1],[0,0,0]]),
      new Element(2,'water',  [[1,1,0],[1,1,0],[0,0,0]])
    ];
    this.current = null;
    this.buttonHandlers();
    this.remainingIndices = [];
    this.shuffle();
  }

  shuffle() {
    this.remainingIndices = Array.from({ length: this.elements.length }, (_, index) => index);
  }

  hasNext() {
    return this.remainingIndices.length > 0;
  }

  next() {
    const remainingIndex = Math.floor(Math.random() * this.remainingIndices.length);
    const elementsIndex = this.remainingIndices[remainingIndex];
    this.remainingIndices.splice(remainingIndex, 1);
    return this.current = this.elements[elementsIndex];
  }

  buttonHandlers() {
    const rotate = document.querySelector('#rotateButton');
    const mirror = document.querySelector('#mirrorButton');
    rotate.addEventListener('click', () => {
      this.current.rotate();
      this.current.print();
    });
    mirror.addEventListener('click', () => {
      this.current.mirror();
      this.current.print();
    });
  }
}
