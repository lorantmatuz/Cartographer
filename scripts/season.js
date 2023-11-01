class Season {
  totalPointSpan = document.querySelector('#totalPoint span');
  timeInSeasonSpan = document.querySelector('#timeInSeason span');
  currentSeasonSpan = document.querySelector('#currentSeason span');
  constructor(season, points) {
    this.season = season;
    this.duration = 7;
    this.totalPoint = points;
    this.pointInSeasonSpan = document.querySelector('#' + this.season + ' span');
    this.init();
  }

  init() {
    this.currentSeasonSpan.innerHTML = this.season;
    this.timeDecrease(0);
    this.addPoint(0);
  }

  addPoint(point) {
    this.totalPoint += point;
    this.pointInSeasonSpan.innerHTML = point;
    this.totalPointSpan.innerHTML = this.totalPoint;
    console.log(this.totalPoint);
  }

  // todo
  timeDecrease(duration) {
    this.duration -= duration;
    this.timeInSeasonSpan.innerHTML = this.duration;
  }

  isNotOver() {
    return this.duration > 0;
  }
};

class Seasons {
  seasons = ["Spring", "Summer", "Fall", "Winter"];
  current = null;
  totalPoint = 0;
  constructor(game) {
    this.game = game;
    this.index = 0;
    this.next();
  }

  isNotOver() {
    return this.index < this.seasons.length;
  }

  next() {
    if(this.current) {
      this.game.elements.shuffle();
      this.totalPoint = this.current.totalPoint;
    }
    this.current = new Season(this.seasons[this.index++], this.totalPoint);
  }
}