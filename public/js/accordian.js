/* Referenced: https://www.freecodecamp.org/news/build-an-accordion-menu-using-html-css-and-javascript/ */

const accordion = document.getElementsByClassName('container');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}

const addFlight = document.getElementById('addFlight')

addFlight.addEventListener('click', function () {
  var table = document.querySelector('.flights-table');
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  // Create and add input elements to the cells
  var input1 = document.createElement('td');
  input1.textContent = 7;
  cell1.appendChild(input1);

  var input2 = document.createElement('input');
  input2.type = 'text';
  cell2.appendChild(input2);

  var input3 = document.createElement('input');
  input3.type = 'text';
  cell3.appendChild(input3);

  var input4 = document.createElement('input');
  input4.type = 'text';
  cell4.appendChild(input4);

  var input5 = document.createElement('input');
  input5.type = 'text';
  cell5.appendChild(input5);

})