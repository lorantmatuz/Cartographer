/**
 * This class provides an implementation of the table in the game.
 */
class Table {
  mountainCells = [[1,1], [3,8], [5,3], [8,9], [9,5]];
  directions = [[-1,0],[0,-1],[1,0],[0,1]];

  /**
   * Constructor.
   */
  constructor() {
    this.size = 11;
    this.types = [];
    this.tds = [];
    this.table = null;
  }

  /**
   * Creates the table in the html.
   */
  createTable() {
    this.table = document.createElement('table');
    this.table.id = 'mainTable';
    let parent = document.querySelector('#mainTableDiv');
    for (let i = 0; i < this.size; ++i) {
      let type = [];
      let tr = document.createElement('tr');
      for (let j = 0; j < this.size; ++j) {
        type.push(null);
        let td = document.createElement('td');
        this.tds.push(td);
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
      this.types.push(type);
    }
    parent.appendChild(this.table);
    this.initTable();
  }

  /**
   * Initializes the table by adding the mountains.
   */
  initTable() {
    this.mountainCells.forEach(coord => {
      let index = this.coordinateToIndex(coord[0],coord[1]);
      let img = document.createElement('img');
      img.src = 'resources/fields/mountain.png';
      this.tds[index].appendChild(img);
      this.types[coord[0]][coord[1]] = 'mountain';
    });
  }

  /**
   * Calls the given function to the element.
   * @param element The element to be inserted
   * @param row The row coordinate of the element
   * @param col The column coordinate of the element
   * @param func The function to call
   * @returns {boolean} true if the given element is over free cells
   */
  funcForTable(element, row, col, func) {
    let retVal = true;
    element.shapeToIndices().forEach(coord => {
      const rowInTable = coord[0] + row;
      const colInTable = coord[1] + col;
      if(!this.isFreeCell(rowInTable, colInTable)) {
        return retVal = false;
      }
      const index = this.coordinateToIndex(rowInTable, colInTable);
      func(index);
    });
    return retVal;
  }

  /**
   * Checks if the given element can be accepted to insertion.
   * @param element The element to be inserted
   * @param row The row coordinate of the element
   * @param col The column coordinate of the element
   * @returns {boolean} true if the given element can be accepted
   */
  isAcceptableElement(element, row, col) {
    return this.funcForTable(element,row,col, (_) => {});
  }

  /**
   * Insert the given element into the game table.
   * @param element The element to be inserted
   * @param indices The indices to which the element is inserted
   */
  insertElement(element, indices) {
    indices.forEach(index => {
      const img = document.createElement('img');
      img.src = element.typeToSrc();
      this.tds[index].appendChild(img);
      const coord = this.indexToCoordinate(index);
      this.types[coord[0]][coord[1]] = element.type;
    });
  }

  /**
   * Converts the coordinates to index
   * @param row The row coordinate to be converted
   * @param col The columns coordinate to be converted
   * @returns {*} The index of the columns
   */
  coordinateToIndex(row,col) {
    return row * this.size + col;
  }

  /**
   * Converts the index to coordinates
   * @param index The index to be converted
   * @returns {number[]} The row and column coordinates
   */
  indexToCoordinate(index) {
    const col = index % this.size;
    const row = (index - col) / this.size;
    return [row, col];
  }

  /**
   * Checks if the given cell is free.
   * @param row The row coordinate to be checked
   * @param col The column coordinate to be checked
   * @returns {boolean} true if the given cell is free
   */
  isFreeCell(row,col) {
    if(!this.isInTable(row,col)) {
      return false;
    }
    return !this.types[row][col];
  }

  /**
   * Checks if the given cell is in the table.
   * @param row The row coordinate to be checked
   * @param col The column coordinate to be checked
   * @returns {boolean} true if the given cell is in the table
   */
  isInTable(row,col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  /**
   * Calls the given function to the incident cells of the given cell.
   * @param row The row coordinate to be checked
   * @param col The column coordinate to be checked
   * @param func The function to call to the incident cells
   */
  funcForIncidentCells(row, col, func) {
    for(const direction of this.directions) {
      const cell = [row + direction[0], col + direction[1]];
      if(this.isInTable(cell[0],cell[1])) {
        func(cell[0], cell[1]);
      }
    }
  }
}