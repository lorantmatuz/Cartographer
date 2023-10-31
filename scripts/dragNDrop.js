class DragAndDropHandler {
  constructor(game) {
    this.game = game;
    this.elements = game.elements;
    this.table = game.table;
    this.elementTable = elementTable;
    this.elementTableTds = elementTableTds;
    this.dragRow = null;
    this.dragCol = null;
    this.dragIndices = [];
  }

  handleDragStart(target,e) {
    if(this.game.isRunning) {
      this.dragRow = target.parentElement.rowIndex;
      this.dragCol = target.cellIndex;
      this.elements.current.shapeToIndexList().forEach((index) => {
        this.elementTableTds[index].classList.add('dragging');
      });
    }
  }

  handleDragEnter(target, e) {
    e.preventDefault();
  }

  handleDragOver(target,e) {
    e.preventDefault();
    if (this.game.isRunning && !this.dragIndices.length) {
      const row = target.parentElement.rowIndex - this.dragRow;
      const col = target.cellIndex - this.dragCol;
      if (this.table.isAcceptableElement(this.elements.current, row, col)) {
        this.table.funcForTable(this.elements.current, row, col, (index) => {
          this.dragIndices.push(index);
          this.table.tds[index].classList.add('over-' + this.elements.current.type);
        });
      }
    }
  }

  handleDragLeave(target,e) {
    if(this.game.isRunning) {
      this.dragIndices.forEach((index) => {
        this.table.tds[index].classList.remove(('over-' + this.elements.current.type));
      });
      this.dragIndices.length = 0;
    }
  }

  handleDrop(target,e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (this.game.isRunning && this.dragIndices.length) {
      this.table.insertElement(this.elements.current, this.dragIndices);
      this.handleDragEnd();
      this.game.next();
    }
    return false;
  }

  handleDragEnd(target,e) {
    if(this.game.isRunning) {
      for (let i = 0; i < 9; ++i) {
        this.elementTableTds[i].classList.remove('dragging');
      }
    }
  }

  delegate(parent, type, selector, handler) {
    parent.addEventListener(type, (event) => {
      const targetElement = event.target.closest(selector);
      if (parent.contains(targetElement)) {
        // slightly modified
        handler.call(this, targetElement, event);
      }
    });
  }

  delegateAll() {
    this.delegate(this.elementTable, 'dragstart', 'td', this.handleDragStart);
    this.delegate(this.table.table, 'dragenter', 'td', this.handleDragEnter);
    this.delegate(this.table.table, 'dragover', 'td', this.handleDragOver);
    this.delegate(this.table.table, 'dragleave', 'td', this.handleDragLeave);
    this.delegate(this.table.table, 'drop', 'td', this.handleDrop);
    this.delegate(document, 'dragend', 'td', this.handleDragEnd);
  }
}
