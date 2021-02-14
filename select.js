const search = document.getElementById('search');
const editor = document.getElementById('editor');

//
var canvas = document.createElement('canvas'); //Create a canvas element
//Set canvas width/height
canvas.style.width='100%';
canvas.style.height='100%';
//Set canvas drawing area width/height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Position canvas
canvas.style.position='absolute';
canvas.style.left=0;
canvas.style.top=0;
canvas.style.zIndex=100000;
canvas.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
document.body.appendChild(canvas); //Append canvas to body element
var context = canvas.getContext('2d');
//Draw rectangle
context.fillStyle = 'rgba(255, 255, 0, 0.65)';
//

function selectEntries() {
    const pattern = search.value;
    const text = editor.textContent;

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (pattern.length === 0) return;

    let pos = text.indexOf(pattern);
    while (pos !== -1) {
        console.log(`entry found at index ${pos}`);
        let range = new Range();
        range.setStart(editor.firstChild, pos);
        range.setEnd(editor.firstChild, pos + pattern.length);

        let rectList = range.getClientRects();
        for (let rect of rectList) {
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }

        pos = text.indexOf(pattern, pos + pattern.length);
    }


}



search.oninput = editor.oninput = selectEntries;
