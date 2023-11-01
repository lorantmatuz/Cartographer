const elementTableTds = document.querySelectorAll('#nextItemTable td');
const elementTableSpan = document.querySelector('#timeOfNextItem span');

/**
 * This class provides an implementation of an element to be placed.
 */
class Element {
  /**
   * Constructor.
   */
  constructor(time, type, shape) {
    this.time = time;
    this.type = type;
    this.shape = shape;
  }

  /**
   * Prints the source of the image of this element.
   * @returns {string} The source of the image
   */
  typeToSrc() {
    return 'resources/fields/' + this.type + '.png';
  }

  /**
   * Creates a 0..8 list that describes shape.
   * @returns {*[]} A list of indices
   */
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

  /**
   * Creates a list of coordinates of the shape.
   * @returns {*[]} A list of the coordinates of the indices.
   */
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

  /**
   * Rotates the shape of the element.
   */
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
  }

  /**
   * Mirrors the shape of the element.
   */
  mirror() {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(this.shape[i].slice().reverse());
    }
    this.shape = result;
  }

  /**
   * Prints the element to the 3x3 table.
   */
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

  /**
   * Removes the images from the 3x3 table.
   */
  removeImages() {
    for (let i = 0; i < 9; i++) {
      while(elementTableTds[i].firstChild) {
        elementTableTds[i].removeChild(elementTableTds[i].firstChild);
      }
    }
  }
}

/**
 * This class provides an implementation of the elements.
 */
class Elements {
  current = null;
  remainingIndices = [];

  /**
   * Constructor.
   */
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
    this.buttonHandlers();
    this.shuffle();
  }

  /**
   * Shuffles the indices for the iteration on the elements.
   */
  shuffle() {
    this.remainingIndices = Array.from({ length: this.elements.length }, (_, index) => index);
  }

  /**
   * Determines a random element from the elements.
   * @returns {*} A random element.
   */
  next() {
    const remainingIndex = Math.floor(Math.random() * this.remainingIndices.length);
    const elementsIndex = this.remainingIndices[remainingIndex];
    this.remainingIndices.splice(remainingIndex, 1);
    return this.current = this.elements[elementsIndex];
  }

  /**
   * Handles the rotate and mirror buttons.
   */
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
