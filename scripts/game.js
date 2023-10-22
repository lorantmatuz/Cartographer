class Game {
  constructor() {
    this.duration = 28;
    this.isRunning = true;
    this.table = new Table();
    this.table.createTable();
    this.elements = new Elements();
    const drag = new DragAndDropHandler(this);
    drag.delegateAll();
    this.next();
  }

  next() {
    if(this.running()) {
      this.elements.next();
      this.duration -= this.elements.current.time;
      this.isRunning = this.isRunning && this.duration > 0;
      console.log(this.duration, this.isRunning);
      if(this.isRunning) {
        this.elements.current.print();
      }
      else {
        this.gameOver();
      }
    }
  }

  running() {
    return this.isRunning && this.elements.hasNext();
  }

  gameOver() {
    setTimeout(() => { alert('Game over'); }, 0);
  }
}