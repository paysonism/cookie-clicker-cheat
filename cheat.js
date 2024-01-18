var cheatMenu = document.createElement('div');
cheatMenu.id = 'cheatMenu';
cheatMenu.style.position = 'fixed';
cheatMenu.style.top = '10px';
cheatMenu.style.left = '10px';
cheatMenu.style.padding = '10px';
cheatMenu.style.background = '#333333';
cheatMenu.style.border = '1px solid #ccc';
cheatMenu.style.zIndex = '9999';
cheatMenu.style.cursor = 'move';

// Create a title element
var title = document.createElement('h2');
title.style.textAlign = 'center';
title.textContent = 'SubZero Cookie Clicker';

cheatMenu.appendChild(title);

dragElement(cheatMenu);

cheatMenu.innerHTML += `
  <button onclick="addCookies(100)">+100 Cookies</button>
  <button onclick="addCookies(1000)">+1000 Cookies</button>
  <button onclick="addCookies(10000)">+10000 Cookies</button>
  <button onclick="addCookies(100000)">+100000 Cookies</button>
  <div>
    <input type="number" id="customAmount" placeholder="Custom Amount">
    <button onclick="addCustomCookies()">Add Custom Cookies</button>
  </div>
  <button onclick="maxCookies()">Max Cookies</button>
`;

document.body.appendChild(cheatMenu);

function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function addCookies(amount) {
  Game.cookies = Game.cookies + amount;
  Game.UpdateMenu();
}

function addCustomCookies() {
  var customAmountInput = document.getElementById('customAmount');
  var customAmount = parseInt(customAmountInput.value, 10);
  if (!isNaN(customAmount)) {
    addCookies(customAmount);
    customAmountInput.value = '';
  }
}

function maxCookies() {
  Game.cookies = Number.MAX_SAFE_INTEGER;
  Game.UpdateMenu();
}
