//const nextItem = document.querySelector('#nextItem');
const nextItemTable = document.querySelector('#nextItemTable');
const nextItemTableCells = document.querySelectorAll('#nextItemTable td');

const rotateButton = document.querySelector('#rotateButton');
const mirrorButton = document.querySelector('#mirrorButton');

let currElement;


/* Elements in random order */

const remainingIndices = Array.from({ length: elements.length }, (_, index) => index);

function getRandomElement() {
  const remainingIndex = Math.floor(Math.random() * remainingIndices.length);
  const elementsIndex = remainingIndices[remainingIndex];
  remainingIndices.splice(remainingIndex, 1);
  return elements[elementsIndex];
}

/* Matrix transformations */

function rotate(matrix) {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push([]);
    for (let j = 0; j < 3; j++) {
      result[i].push(matrix[j][i]);
    }
  }
  result.reverse();
  return result;
}

function mirror(matrix) {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(matrix[i].slice().reverse());
  }
  return result;
}

/* Button listeners */

rotateButton.addEventListener('click', () => {
  currElement.shape = rotate(currElement.shape);
  currElement.rotation = (currElement.rotation + 1) % 4;
  print(currElement);
});

mirrorButton.addEventListener('click', () => {
  currElement.shape = mirror(currElement.shape);
  currElement.mirrored = !currElement.mirrored;
  print(currElement);
});

/* Shape update */

function removeImages() {
  for (let i = 0; i < 9; i++) {
    while(nextItemTableCells[i].firstChild) {
      nextItemTableCells[i].removeChild(nextItemTableCells[i].firstChild);
    }
  }
}

function print(element) {
  removeImages();
  shapeToIndexList(element).forEach((index) => {
    const image = document.createElement('img');
    image.src = typeToSrc(element);
    image.draggable = true;
    nextItemTableCells[index].appendChild(image);
  });
}

/* Drag and drop */

let dragIndices = [];
let dragRow, dragCol;

function handleDragStart(e) {
  dragRow = this.parentElement.rowIndex;
  dragCol = this.cellIndex;
  shapeToIndexList(currElement).forEach((index) => {
    nextItemTableCells[index].classList.add('dragging');
  });
}

function handleDragEnter(e) {
  e.preventDefault();
  const row = this.parentElement.rowIndex - dragRow;
  const col = this.cellIndex - dragCol;
  if(isAcceptableElement(currElement,row,col)) {
    funcForTable(currElement, row , col, (index) => {
      dragIndices.push(index);
      tds[index].classList.add('over');
    });
  }
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragLeave(e) {
  dragIndices.forEach((index) => {
    tds[index].classList.remove('over');
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
      img.src = typeToSrc(currElement);
      tds[index].appendChild(img);
      tds[index].classList.remove('dragging');
      tds[index].classList.remove('over');
    });
    for(let i = 0; i < 9; ++i) {
      nextItemTableCells[i].classList.remove('dragging');
    }
    currElement = getRandomElement();
    if(!currElement) {
      console.log('GAME ENDED');
    } else {
      print(currElement);
    }
  }
  return false;
}

function handleDragEnd() {
  console.log('drag end', dragIndices);
  for(let i = 0; i < 9; ++i) {
    nextItemTableCells[i].classList.remove('dragging');
  }
}

function callDelegate() {
  delegate(nextItemTable, 'dragstart', 'td', handleDragStart);
  delegate(table, 'dragenter', 'td', handleDragEnter);
  delegate(table, 'dragover', 'td', handleDragOver);
  delegate(table, 'dragleave', 'td', handleDragLeave);
  delegate(table, 'drop', 'td', handleDrop);
  delegate(document, 'dragend', 'td', handleDragEnd);
}

