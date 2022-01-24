const canvas = document.querySelector('#canvas');

function resizeToFullScreen() {
    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height
}
resizeToFullScreen()
window.addEventListener('resize', resizeToFullScreen)

let ctx = canvas.getContext('2d');

// nice variable naming
let x = 0;
const step = (new Array(2000)).fill(null);

function draw() {
    for (const never in step) {
        const h = 2, w = 2;
        const cos = Math.cos(x * 360 * Math.PI / 180);
        a = 100
        const y = cos * a + a;
        ctx.fillRect(x, y, h, w);
        x += 0.998;
    }
}

draw()
