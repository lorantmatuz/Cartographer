const parent = document.querySelector('#mainTable');
const size = 11;
let table;
let tds = []


/* Basic table creation and init */

function createTable() {
  table = document.createElement('table');
  for (let i = 0; i < size; ++i) {
    let tr = document.createElement('tr');
    for (let j = 0; j < size; ++j) {
      let td = document.createElement('td');
      tds.push(td);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  parent.appendChild(table);
}

function initTable(arr, src) {
  arr.forEach(coord => {
    let index = coordinateToIndex(coord[0] - 1,coord[1] - 1);
    let img = document.createElement('img');
    img.src = src;
    tds[index].appendChild(img);
  });
}

/* Helper functions */

function coordinateToIndex(i,j) {
  return i * size + j;
}

function isFreeCell(i,j) {
  const index = coordinateToIndex(i,j);
  return tds[index].firstChild == null;
}

function isAcceptableElement(element, row, col) {
  let retVal = true;
  shapeToIndices(element).forEach(coord => {
    const rowInTable = coord[0] + row;
    const colInTable = coord[1] + col;
    if(rowInTable >= size || colInTable >= size ||
        !isFreeCell(rowInTable, colInTable)) {
      retVal = false;
      return ;
    }
  });
  return retVal;
}

function funcForTable(element, row, col, func) {
  shapeToIndices(element).forEach(coord => {
    const index = coordinateToIndex(coord[0] + row, coord[1] + col);
    func(index);
  });
}

function insertElement(element, row, col) {
  funcForTable(element,row,col, (index) => {
    const img = document.createElement('img');
    img.src = typeToSrc(element);
    tds[index].appendChild(img);
  });
}


/* Handler */

function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);
    if (this.contains(targetElement)) {
      handler.call(targetElement, event);
    }
  });
}