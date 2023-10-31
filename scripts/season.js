class Season {
  constructor(season) {
    this.season = season;
    this.duration = 7;
    this.timeInSeasonSpan = document.querySelector('#timeInSeason span');
    this.pointInSeasonSpan = document.querySelector('#' + this.season + ' span');
    this.currentSeasonSpan = document.querySelector('#currentSeason span');
    this.init();
  }

  init() {
    this.currentSeasonSpan.innerHTML = this.season;
    this.timeDecrease(0);
    this.addPoint(0);
  }

  addPoint(point) {
    this.pointInSeasonSpan.innerHTML = point;
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
  constructor(game) {
    this.game = game;
    this.index = 0;
    this.next();
  }

  isNotOver() {
    return this.index < this.seasons.length;
  }

  next() {
    this.game.elements.shuffle();
    this.current = new Season(this.seasons[this.index++]);
    console.log(this.current);
  }
}