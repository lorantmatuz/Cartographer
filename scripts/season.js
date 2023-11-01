/**
 * This class provides an implementation of a season in the game.
 */
class Season {
  time = 7;

  totalPointSpan = document.querySelector('#totalPoint span');
  timeInSeasonSpan = document.querySelector('#timeInSeason span');
  currentSeasonSpan = document.querySelector('#currentSeason span');
  missionTdDivs = document.querySelectorAll('#currentSeason table td div');

  /**
   * Constructor.
   * @param seasons The initialized Seasons object
   */
  constructor(seasons) {
    this.seasons = seasons;
    this.seasonName = seasons.seasonList[seasons.index];
    this.pointInSeasonSpan = document.querySelector('#' + this.seasonName + ' span');
    this.init();
  }

  /**
   * Initializes the season by printing season name, points and time.
   * Adds filled colored points to the current missions.
   */
  init() {
    this.currentSeasonSpan.innerHTML = this.seasonName;
    this.timeDecrease(0);
    this.addPoint(0);
    for (let i = 0; i < this.seasons.seasonList.length; i++) {
      if(this.seasons.indices.includes(i)) {
        this.missionTdDivs[i].className = 'circle filled-' + this.seasonName;
      } else {
        this.missionTdDivs[i].className = 'circle empty';
      }
    }
  }

  /**
   * Adds point at the end of the season, and registers it to screen.
   * @param point The given point at the end of the season
   */
  addPoint(point) {
    this.pointInSeasonSpan.innerHTML = point;
    this.seasons.totalPoint += point;
    this.totalPointSpan.innerHTML = this.seasons.totalPoint;
  }

  /**
   * Decreases the time of the season by the given time.
   * @param time The amount of the time spent with the previous element
   */
  timeDecrease(time) {
    this.time = Math.max(this.time - time, 0);
    this.timeInSeasonSpan.innerHTML = this.time.toString();
  }

  /**
   * Checks if the seasons is over or not.
   * @returns {boolean} true if the season is not yet over
   */
  isNotOver() {
    return this.time > 0;
  }
}

/**
 * This class provides an implementation of the seasons of the game.
 */
class Seasons {
  seasonList = ["Spring", "Summer", "Fall", "Winter"];
  current = null;
  indices = [];
  totalPoint = 0;

  /**
   * Constructor.
   * @param game The initialized game object.
   */
  constructor(game) {
    this.game = game;
    this.index = 0;
    this.next();
  }

  /**
   * Checks if the year is over or not.
   * @returns {boolean|boolean|*} true if the year is not yet over
   */
  isNotOver() {
    return this.index < this.seasonList.length || this.current.isNotOver();
  }

  /**
   * Iterates to the next season, shuffles the elements, and updates the
   * indices of the missions.
   */
  next() {
    if(this.current) {
      this.game.elements.shuffle();
      this.indices.length = 0;
    }
    this.indices.push(this.index);
    this.indices.push((this.index + 1) % this.seasonList.length);
    this.current = new Season(this);
    ++this.index;
  }
}