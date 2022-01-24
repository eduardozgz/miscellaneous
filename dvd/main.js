let deltaLast = performance.now();
let DELTA = 1;

const canvas = document.querySelector('#canvas');

function resizeToFullScreen() {
    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height
}
resizeToFullScreen()
window.addEventListener('resize', resizeToFullScreen)

let ctx = canvas.getContext('2d');

const FPS = 60;

const thing = {
    x: 200,
    y: 200,
    speed: 0.1,
    direction: 0.25 / 2,
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const h = 5, w = 5;
    ctx.fillRect(Math.floor(thing.x) - w / 2, Math.floor(thing.y) - h / 2, h, w);
}

function step() {
    DELTA = performance.now() - deltaLast;
    deltaLast = performance.now();

    thing.x = thing.x + 1 * Math.cos(thing.direction * 360 * Math.PI / 180) * thing.speed * DELTA;
    thing.y = thing.y + 1 * Math.sin(thing.direction * 360 * Math.PI / 180) * thing.speed * DELTA;

    if ((thing.x > canvas.width) || (thing.x < 0)) {
        thing.direction += 0.25;
    }

    if ((thing.y > canvas.height) || (thing.y < 0)) {
       thing.direction += 0.25;  
    }
    if (thing.direction > 1) thing.direction -= 1;
}

setInterval(() => {
    step()
    draw()
}, 1000 / FPS)
