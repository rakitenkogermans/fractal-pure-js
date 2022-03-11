// Pick elements
const canvas = document.querySelector('#canvas');
const downloadBtn = document.querySelector('#download-btn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

downloadBtn.addEventListener('click', downloadTree);

// redraw when window size changed
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawTree(canvas.width/2, canvas.height - 100, 200, 0, 3, 'dodgerblue');
})
const ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    if (angle !== 0)
        ctx.rotate(angle*Math.PI/4);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 11) {
        // when line is too short stop drawing
        ctx.restore();
        return;
    }

    // left
    drawTree(0, -len, len * 0.730, -1, branchWidth);

    // right
    drawTree(0, -len, len * 0.730, 1, branchWidth);

    ctx.restore();
}
drawTree(canvas.width/2, canvas.height - 100, 200, 0, 3, 'dodgerblue');

// helper function for downloading
function downloadTree() {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBloB(), 'binary-fractal-tree.png');
    } else {
        const a = document.createElement('a');

        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/png");
        a.download = "binary-fractal-tree.png";
        a.click();
        document.body.removeChild(a);
    }
}
