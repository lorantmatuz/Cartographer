const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
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

class Mission {
  constructor(title, description, table) {
    this.title = title;
    this.description = description;
    this.table = table;
    this.types = this.table.types;
    this.size = this.table.size;
  }

  edgeOfForestPoints() {
    let points = 0;
    const check = (row, col) => {
      console.log(row,col);
      if(this.types[row][col] === 'forest') {
        ++points;
      }
    };
    for(let i = 0; i < this.size; ++i) {
      check(0,i);
      check(this.size-1,i);
    }
    for(let i = 1; i < this.size-1; i ++) {
      check(i,0);
      check(i,this.size-1);
    }
    return points;
  }

  sleepyValleyPoints() {
    let points = 0;
    for(let row = 0; row < this.size; ++row) {
      let ctr = 0;
      for(let col = 0; col < this.size; ++col) {
        if(this.types[row][col] == 'forest') {
          ++ctr;
        }
      }
      if(ctr == 3) {
        ++points;
      }
    }
    return points * 4;
  }

  three() {
    let points = 0;
    const check = (row, col) => {
      if(this.types[row][col] === 'farm') {
        ++points;
      }
    };
    for(let row = 0; row < this.size; ++row) {
      for(let col = 0; col < this.size; ++col) {
        if(this.types[row][col] == 'water') {
          this.table.funcForIncidentCells(row,col,check);
        }
      }
    }
    return points * 2;
  }

  four() {
    let points = 0;
    for(let i = 0; i < this.size; ++i) {
      let rowCtr = 0;
      let colCtr = 0;
      for(let j = 0; j < this.size; ++j) {
        if(this.types[i][j]) {
          ++rowCtr;
        }
        if(this.types[j][i]) {
          ++colCtr;
        }
      }
      if(rowCtr == this.size || colCtr == this.size) {
        ++points;
      }
    }
    return points * 6;
  }
}

class Missions {
  current = [];
  constructor(game) {
    this.game = game;
  }

  countPoints() {
    return 1;
  }
}