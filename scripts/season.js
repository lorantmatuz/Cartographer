class Season {
  totalPointSpan = document.querySelector('#totalPoint span');
  timeInSeasonSpan = document.querySelector('#timeInSeason span');
  currentSeasonSpan = document.querySelector('#currentSeason span');
  missionTdDivs = document.querySelectorAll('#currentSeason table td div');
  constructor(seasons) {
    this.seasons = seasons;
    console.log("SEASON CREATED",this.seasons.indices);
    this.seasonName = seasons.seasonList[seasons.index];
    this.duration = 7;
    this.pointInSeasonSpan = document.querySelector('#' + this.seasonName + ' span');
    this.init();
  }

  init() {
    this.currentSeasonSpan.innerHTML = this.seasonName;
    for (let i = 0; i < this.seasons.seasonList.length; i++) {
      if(this.seasons.indices.includes(i)) {
        this.missionTdDivs[i].className = 'circle filled-' + this.seasonName;
      } else {
        this.missionTdDivs[i].className = 'circle empty';
      }
    }
    this.timeDecrease(0);
    this.addPoint(0);
  }

  addPoint(point) {
    this.pointInSeasonSpan.innerHTML = point;
    this.seasons.totalPoint += point;
    this.totalPointSpan.innerHTML = this.seasons.totalPoint;
  }

  // todo
  timeDecrease(duration) {
    this.duration = Math.max(this.duration - duration, 0);
    this.timeInSeasonSpan.innerHTML = this.duration;
  }

  isNotOver() {
    return this.duration > 0;
  }
}

class Seasons {
  seasonList = ["Spring", "Summer", "Fall", "Winter"];
  current = null;
  indices = [];
  totalPoint = 0;
  constructor(game) {
    this.game = game;
    this.index = 0;
    this.next();
  }

  isNotOver() {
    return this.index < this.seasonList.length || this.current.isNotOver();
  }

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