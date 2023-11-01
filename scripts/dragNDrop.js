/**
 * This class provides the drag and drop handling for the game.
 */
class DragAndDropHandler {
  /**
   * Constructor.
   * @param game The initialized game object.
   */
  constructor(game) {
    this.game = game;
    this.elements = game.elements;
    this.table = game.table;
    this.elementTableTds = elementTableTds;
    this.dragRow = null;
    this.dragCol = null;
    this.dragIndices = [];
  }

  /**
   * Handles drag start event.
   * @param target The target element of the dragging
   */
  handleDragStart(target) {
    if(this.game.isRunning()) {
      this.dragRow = target.parentElement.rowIndex;
      this.dragCol = target.cellIndex;
      this.elements.current.shapeToIndexList().forEach((index) => {
        this.elementTableTds[index].classList.add('dragging');
      });
    }
  }

  /**
   * Handles the drag enter event.
   * @param target The target element of the dragging
   * @param e The dragenter event
   */
  handleDragEnter(target, e) {
    e.preventDefault();
  }

  /**
   * Handles the drag over event for the table td elements.
   * Checks if the current element can be accepted over the target, and then
   * modifies the classList of the specific elements in main table
   * by adding the specific over tag.
   * @param target The main table td element, the target of the dragging
   * @param e The dragover event
   */
  handleDragOver(target,e) {
    e.preventDefault();
    if (this.game.isRunning() && !this.dragIndices.length && this.dragRow !== null) {
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

  /**
   * Handles the drag leave event for the table td elements. Removes the specific
   * over tag from the main table td elements.
   */
  handleDragLeave() {
    if(this.game.isRunning()) {
      this.dragIndices.forEach((index) => {
        this.table.tds[index].classList.remove(('over-' + this.elements.current.type));
      });
      this.dragIndices.length = 0;
    }
  }

  /**
   * Handles the drag drop event. Inserts the element to the saved position
   * of the main table, then ends dragging and calls game next to move on
   * to the next element.
   * @param target The main table td element, the target of the dragging
   * @param e The dragLeave event
   */
  handleDrop(target,e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (this.game.isRunning() && this.dragIndices.length) {
      this.table.insertElement(this.elements.current, this.dragIndices);
      this.handleDragEnd();
      this.game.next();
      this.dragIndices.length = 0;
    }
  }

  /**
   * Handles the drag end event. Removes dragging tag from main table td
   * elements.
   */
  handleDragEnd() {
    if(this.game.isRunning()) {
      for (let i = 0; i < 9; ++i) {
        this.elementTableTds[i].classList.remove('dragging');
      }
    }
    this.dragRow = null;
  }

  /**
   * Delegate function, slightly modified version. Adds eventListeners to the
   * closest target of the selector with the given handler.
   * @param parent The parent element of the delegation
   * @param type The type of the event
   * @param selector The selector element whose parent is delegated
   * @param handler The handler function of the eventListener
   */
  delegate(parent, type, selector, handler) {
    parent.addEventListener(type, (event) => {
      const targetElement = event.target.closest(selector);
      if (parent.contains(targetElement)) {
        handler.call(this, targetElement, event);
      }
    });
  }

  /**
   * Delegates all above functions after initializing the game object.
   */
  delegateAll() {
    const elementTable = document.querySelector('#nextItemTable');
    this.delegate(elementTable, 'dragstart', 'td', this.handleDragStart);
    this.delegate(this.table.table, 'dragenter', 'td', this.handleDragEnter);
    this.delegate(this.table.table, 'dragover', 'td', this.handleDragOver);
    this.delegate(this.table.table, 'dragleave', 'td', this.handleDragLeave);
    this.delegate(this.table.table, 'drop', 'td', this.handleDrop);
    this.delegate(document, 'dragend', 'td', this.handleDragEnd);
  }
}
