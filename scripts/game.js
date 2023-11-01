/**
 * This class provides an implementation of the game object.
 * This is the driver class of the game.
 */
class Game {

  /**
   * Constructor.
   */
  constructor() {
    this.table = new Table();
    this.table.createTable();
    this.elements = new Elements();
    new DragAndDropHandler(this).delegateAll();
    this.seasons = new Seasons(this);
    this.missions = new Missions(this);
    this.elements.next();
    this.elements.current.print();
  }

  /**
   * Places the current element, reduces the time in the season.
   * Then, counts the points if the seasons is ended, and moves
   * on to the next season or alert by game over.
   * Finally, moves on to the next element, and prints it.
   */
  next() {
    if(this.isRunning()) {
      const time = this.elements.current.time;
      this.seasons.current.timeDecrease(time);
      if(!this.seasons.current.isNotOver()) {
        const points = this.missions.countPoints();
        this.seasons.current.addPoint(points);
        if(this.seasons.isNotOver()) {
          this.seasons.next();
        } else {
          this.gameOver();
        }
      }
      this.elements.next();
      this.elements.current.print();
    }
  }

  /**
   * Checks if the game is still running.
   * @returns {boolean|*} true if the game is still running
   */
  isRunning() {
    return this.seasons.isNotOver();
  }

  /**
   * Alerts by game over if the game is over.
   */
  gameOver() {
    setTimeout(() => { alert('Game over'); }, 0);
  }
}