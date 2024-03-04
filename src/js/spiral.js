const addSpiral = (elem) => {
    let x = -8,
        y = -8,
        grow = 14;
    for (let i = 1; i <= 17; i++) {
        let x1 = 1,
            y1 = 1,
            x2 = -1,
            y2 = 1,
            factor = grow + 3 - i / 5;
        switch (i % 4) {
            case 1: // top
                x *= -1;
                x += grow;
                y += -grow;
                x1 *= -1;
                y1 *= -1;
                x2 *= -i / 3;
                x2 -= x - i * factor;
                y2 = y;
                break;
            case 2: // right
                y *= -1;
                x += grow;
                y += grow;
                x1 *= 1;
                y1 *= -1;
                y2 *= -i / 3;
                y2 -= y - i * factor;
                x2 = x;
                break;
            case 3: // bottoms
                x *= -1;
                x += -grow;
                y += grow;
                x1 *= 1;
                y1 *= 1;
                x2 *= -i / 3;
                x2 -= x + i * factor;
                y2 = y - i;
                break;
            case 0: // left
                y *= -1;
                x += -grow;
                y += -grow;
                x1 *= -1;
                y1 *= 1;
                y2 *= -i / 3;
                y2 -= y + i * factor;
                x2 = x;
                break;
        }
        elem += `${x1} ${y1} ${x2} ${y2} ${x} ${y}\n`;
    }
    return elem;
};

const spiral = document.querySelector("#spiral");

let elem = `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg">`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="lightgreen" fill="transparent" stroke-width="30" stroke-linecap="butt"
    stroke-dasharray="1,1" stroke-dashoffset="0" id="timeBar" />`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="black" fill="transparent" stroke-width="2" stroke-linecap="butt" />`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="black" fill="transparent" stroke-width="6" stroke-dashoffset="-1" id="timeTicks2" />`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="black" fill="transparent" stroke-width="10" stroke-dashoffset="-1" id="timeTicks" />`;

elem += `</svg>`;
spiral.innerHTML = elem;

const path = spiral.querySelector("path#timeBar");
const total = path.getTotalLength() - 3;
const time = (90 * total) / 60 / 24;
const start = ((60 * 11 + 15) * total) / 60 / 24;
path.setAttribute("stroke-dasharray", `${time},${path.getTotalLength()}`);
path.setAttribute("stroke-dashoffset", `-${start}`);
const ticks = spiral.querySelector("path#timeTicks");
ticks.setAttribute("stroke-dasharray", `${2},${(path.getTotalLength() - 6) / 24 - 2}`);
const ticks2 = spiral.querySelector("path#timeTicks2");
ticks2.setAttribute("stroke-dasharray", `${1},${(path.getTotalLength() - 6) / 24 / 4 - 1}`);

for (let i = 0; i <= 24; i++) {
    spiral.innerHTML += `<div class="hour" id="h${i}">${i}</div>`;
}
