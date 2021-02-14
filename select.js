const search = document.getElementById('search');
const editor = document.getElementById('editor');

const canvas = document.getElementById('selection');

function drawSelections(rects) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(255, 255, 0, 0.65)';

    for (let rect of rects) {
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
}

function selectEntries() {
    const pattern = search.value;
    const text = editor.textContent;

    let rects = [];
    if (pattern.length !== 0) {
        let pos = text.indexOf(pattern);
        while (pos !== -1) {
            console.log(`entry found at index ${pos}`);
            let range = new Range();
            range.setStart(editor.firstChild, pos);
            range.setEnd(editor.firstChild, pos + pattern.length);

            let rectList = range.getClientRects();
            for (let rect of rectList) {
                rects.push(rect);
            }

            pos = text.indexOf(pattern, pos + pattern.length);
        }
    }
    drawSelections(rects);
}



search.oninput = editor.oninput = selectEntries;
