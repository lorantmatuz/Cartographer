//const table = document.querySelector('table');

const spring  = document.querySelector('#spring');
const summer  = document.querySelector('#summer');
const fall    = document.querySelector('#fall');
const winter  = document.querySelector('#winter');

const totalPoint = document.querySelector('#totalPoint');





createTable();
initTable([[2,2], [4,9], [6,4], [9,10], [10,6]], 
          'resources/fields/mountain.png');

callDelegate();

/* Driver code */

currElement = getRandomElement();
print(currElement);

