const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
      "function": game => {
        const types = game.table.types;
        const size = game.table.size;
        let points = 0;
        const check = (row, col) => {
          if(types[row][col] === 'forest') {
            ++points;
          }
        };
        for(let i = 0; i < size; ++i) {
          check(0,i);
          check(size-1,i);
        }
        for(let i = 1; i < size-1; i ++) {
          check(i,0);
          check(i,size-1);
        }
        return points;
      },
      "image": "resources/missions/0.png"
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
      "function": game => {
        const types = game.table.types;
        const size = game.table.size;
        let points = 0;
        for(let row = 0; row < size; ++row) {
          let ctr = 0;
          for(let col = 0; col < size; ++col) {
            if(types[row][col] == 'forest') {
              ++ctr;
            }
          }
          if(ctr == 3) {
            ++points;
          }
        }
        return points * 4;
      },
      "image": "resources/missions/1.png"
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
      "function": game => {
        const types = game.table.types;
        const size = game.table.size;
        let points = 0;
        const check = (row, col) => {
          if(types[row][col] === 'farm') {
            ++points;
          }
        };
        for(let row = 0; row < size; ++row) {
          for(let col = 0; col < size; ++col) {
            if(types[row][col] == 'water') {
              game.table.funcForIncidentCells(row,col,check);
            }
          }
        }
        return points * 2;
      },
      "image": "resources/missions/2.png"
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
      "function": game => {
        const size = game.table.size;
        const types = game.table.types;
        let points = 0;
        for(let i = 0; i < size; ++i) {
          let rowCtr = 0;
          let colCtr = 0;
          for(let j = 0; j < size; ++j) {
            if(types[i][j]) {
              ++rowCtr;
            }
            if(types[j][i]) {
              ++colCtr;
            }
          }
          if(rowCtr == size || colCtr == size) {
            ++points;
          }
        }
        return points * 6;
      },
      "image": "resources/missions/3.png"
    }
  ],
  "extra": [
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
  ],
}

class Missions {
  missions = [];
  constructor(game) {
    this.game = game;
    this.init();
  }

  init() {
    let missionTds = document.querySelectorAll('#currentSeason table td');
    for(let i = 0; i < 4; ++i) {
      this.missions.push(missions['basic'][i]);
      this.missions[0].function(this.game);
      const img = new Image();
      img.src = this.missions[i].image;
      missionTds[i].appendChild(img);
    }
  }

  countPoints() {
    return this.missions[this.game.seasons.indices[0]].function(this.game)
        + this.missions[this.game.seasons.indices[1]].function(this.game);
  }

}