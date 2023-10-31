class Game {
  constructor() {
    this.table = new Table();
    this.table.createTable();
    this.elements = new Elements();
    const drag = new DragAndDropHandler(this);
    drag.delegateAll();
    this.seasons = new Seasons(this);
    this.missions = new Missions(this);
    this.elements.next();
    this.elements.current.print();
  }

  // one element is placed
  // move on to the next one, check others
  next() {
    if(this.isRunning()) {
      // duration of placed element
      const duration = this.elements.current.time;
      console.log('Duration of element:', duration);
      this.seasons.current.timeDecrease(duration);
      // if the season is not ended yet
      if(this.seasons.current.isNotOver()) {
        console.log('Season continues');
      } 
      // if the season is already ended
      else {
        console.log('Season ended');
        // TODO: count points
        const points = this.missions.countPoints();
        this.seasons.current.addPoint(points);
        // next season or end
        if(this.seasons.isNotOver()) {
          this.seasons.next();
        } else {
          this.gameOver();
        }
      }
      // new element
      this.elements.next();
      this.elements.current.print();
    }
  }

  isRunning() {
    return this.seasons.hasNext();
  }

  gameOver() {
    setTimeout(() => { alert('Game over'); }, 0);
  }
}