var element = null;
var arr = [];
function initDraw  (canvas, numberId = 0, href = '#') {
    mouse = {
        id: 0,
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
        string: href
    };
    function hrefs() {
        divbutton = document.querySelector(`.div${numberId}`).lastChild;
        divbutton.addEventListener('click', function () {
            box = document.querySelector(`#box${this.parentNode.id}`).firstChild;
            box.setAttribute('href', this.parentNode.firstChild.value);
        })
    }
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset - 20;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };
    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    };
    canvas.onclick = function () {
        if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
        } else {
            numberId++;
            div = document.createElement('div');
            div.setAttribute('class', `div${numberId}`);
            div.setAttribute('id', `${numberId}`);
            inputs = document.createElement('input');
            button = document.createElement('button');
            mouse.id = numberId;
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            arr = [...arr, {...mouse}];
            button.innerHTML = `Set Link To ${numberId}`;
            element = document.createElement('div');
            elementA = document.createElement('a');
            elementA.innerHTML = numberId;
            element.className = `rectangle ${numberId}`;
            element.id = `box${numberId}`;
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            document.querySelector('.inputs').appendChild(div);
            document.querySelector(`.div${numberId}`).appendChild(inputs);
            document.querySelector(`.div${numberId}`).appendChild(button);
            element.appendChild(elementA);
            canvas.appendChild(element);
            canvas.style.cursor = "crosshair";
            hrefs();
        }
    };
}
initDraw(document.querySelector('.canvas'));