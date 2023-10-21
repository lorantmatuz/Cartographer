class Table {
  constructor() {
    this.size = 11;
    this.tds = [];
    this.table = null;
    this.parent = document.querySelector('#mainTable'); 
  }

  createTable() {
    this.table = document.createElement('table');
    for (let i = 0; i < this.size; ++i) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this.size; ++j) {
        let td = document.createElement('td');
        this.tds.push(td);
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
    }
    this.parent.appendChild(this.table);
    this.initTable();
  }

  initTable() {
    [[2,2], [4,9], [6,4], [9,10], [10,6]]
    .forEach(coord => {
      let index = this.coordinateToIndex(coord[0] - 1,coord[1] - 1);
      let img = document.createElement('img');
      img.src = 'resources/fields/mountain.png';
      this.tds[index].appendChild(img);
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

  insertElement(element, row, col) {
    this.funcForTable(element,row,col, (index) => {
      const img = document.createElement('img');
      img.src = element.typeToSrc();
      this.tds[index].appendChild(img);
    });
  }

  coordinateToIndex(row,col) {
    return row * this.size + col;
  }

  isFreeCell(row,col) {
    if(!this.isInTable(row,col)) {
      return false;
    }
    const index = this.coordinateToIndex(row,col);
    return !this.tds[index].firstChild;
  }

  isInTable(row,col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }
}