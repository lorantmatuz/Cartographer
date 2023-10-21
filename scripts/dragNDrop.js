

let dragRow, dragCol;
let dragIndices = [];

function handleDragStart(e) {
  dragRow = this.parentElement.rowIndex;
  dragCol = this.cellIndex;
  elements.current.shapeToIndexList().forEach((index) => {
    elementTableTds[index].classList.add('dragging');
  });
}

function handleDragEnter(e) {
  e.preventDefault();
}

function handleDragOver(e) {
  e.preventDefault();
  if(!dragIndices.length) {
    const row = this.parentElement.rowIndex - dragRow;
    const col = this.cellIndex - dragCol;
    if(table.isAcceptableElement(elements.current,row,col)) {
      table.funcForTable(elements.current, row , col, (index) => {
        dragIndices.push(index);
        table.tds[index].classList.add('over');
      });
    }
  }
}

function handleDragLeave(e) {
  dragIndices.forEach((index) => {
    table.tds[index].classList.remove('over');
  });
  dragIndices.length = 0;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragIndices.length) {
    // insertElement
    dragIndices.forEach((index) => {
      const img = document.createElement('img');
      img.src = elements.current.typeToSrc();
      table.tds[index].appendChild(img);
      table.tds[index].classList.remove('dragging');
      table.tds[index].classList.remove('over');
    });
    handleDragEnd();
    if(elements.hasNext()) {
      elements.next().print();
    } else {
      console.log('END OF GAME');
    }
  }
  return false;
}

function handleDragEnd() {
  for(let i = 0; i < 9; ++i) {
    elementTableTds[i].classList.remove('dragging');
  }
}


function delegate(parent, type, selector, handler) {
parent.addEventListener(type, function (event) {
  const targetElement = event.target.closest(selector);
  if (this.contains(targetElement)) {
    handler.call(targetElement, event);
  }
});
}

function delegateAll() {
  delegate(elementTable, 'dragstart', 'td', this.handleDragStart);
  delegate(table.table, 'dragenter', 'td', this.handleDragEnter);
  delegate(table.table, 'dragover', 'td', this.handleDragOver);
  delegate(table.table, 'dragleave', 'td', this.handleDragLeave);
  delegate(table.table, 'drop', 'td', this.handleDrop);
  delegate(document, 'dragend', 'td', this.handleDragEnd);
}
