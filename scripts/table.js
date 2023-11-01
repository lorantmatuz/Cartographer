class Table {
  constructor() {
    this.size = 11;
    this.types = [];
    this.tds = [];
    this.table = null;
  }

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

  initTable() {
    [[2,2], [4,9], [6,4], [9,10], [10,6]]
    .forEach(coord => {
      let index = this.coordinateToIndex(coord[0] - 1,coord[1] - 1);
      let img = document.createElement('img');
      img.src = 'resources/fields/mountain.png';
      this.tds[index].appendChild(img);
      this.types[coord[0] - 1][coord[1] - 1] = 'mountain';
    });
  }

  isAcceptableElement(element, row, col) {
    let retVal = true;
    element.shapeToIndices().forEach(coord => {
      const rowInTable = coord[0] + row;
      const colInTable = coord[1] + col;
      if(!this.isFreeCell(rowInTable, colInTable)) {
        retVal = false;
        return ;
      }
    });
    return retVal;
  }

  funcForTable(element, row, col, func) {
    element.shapeToIndices().forEach(coord => {
      const index = this.coordinateToIndex(coord[0] + row, coord[1] + col);
      func(index);
    });
  }

  insertElement(element, indices) {
    indices.forEach(index => {
      const img = document.createElement('img');
      img.src = element.typeToSrc();
      this.tds[index].appendChild(img);
      const coord = this.indexToCoordinate(index);
      this.types[coord[0]][coord[1]] = element.type;
    });
  }

  coordinateToIndex(row,col) {
    return row * this.size + col;
  }

  indexToCoordinate(index) {
    const col = index % this.size;
    const row = (index - col) / this.size;
    return [row, col];
  }

  isFreeCell(row,col) {
    if(!this.isInTable(row,col)) {
      return false;
    }
    return !this.types[row][col];
  }

  isInTable(row,col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  funcForIncidentCells(row, col, func) {
    const directions = [[-1,0],[0,-1],[1,0],[0,1]];
    for(const direction of directions) {
      const cell = [row + direction[0], col + direction[1]];
      if(this.isInTable(cell[0],cell[1])) {
        func(cell[0], cell[1]);
      }
    }
  }
}