/* const spring  = document.querySelector('#spring');
const summer  = document.querySelector('#summer');
const fall    = document.querySelector('#fall');
const winter  = document.querySelector('#winter');

const totalPoint = document.querySelector('#totalPoint');
 */
/* Button listeners */

document.querySelector('#rotateButton').addEventListener('click', () => {
  elements.current.rotate();
  elements.current.print();
});

document.querySelector('#mirrorButton').addEventListener('click', () => {
  elements.current.mirror();
  elements.current.print();
});


/* Shape update */

function removeImages() {
  for (let i = 0; i < 9; i++) {
    while(elementTableTds[i].firstChild) {
      elementTableTds[i].removeChild(elementTableTds[i].firstChild);
    }
  }
}


/* Driver code  */

const table = new Table();
table.createTable();

delegateAll();


const elements = new Elements();
elements.next().print();

