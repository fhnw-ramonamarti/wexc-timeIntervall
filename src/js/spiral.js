const addSpiral = (elem, withTag = false) => {
    let x = -8,
        y = -8,
        ox = 260,
        oy = 270,
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
        if (withTag) {
            elem += `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg" id="timeLine"><path d="m${ox} ${oy} c`;
        }
        elem += `${x1} ${y1} ${x2} ${y2} ${x} ${y}\n`;
        if (withTag) {
            elem += `" stroke="black" fill="transparent" stroke-width="2" stroke-linecap="butt" /></svg>`;
        }
        ox += x;
        oy += y;
    }
    return elem;
};

const spiral = document.querySelector("#spiral");

let elem = `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg" id="time">`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="lightgreen" fill="transparent" stroke-width="40" stroke-linecap="butt"
    stroke-dasharray="1,1" stroke-dashoffset="0" id="timeBar" />`;

elem += `</svg>`;

elem += `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg">`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="black" fill="transparent" stroke-width="6" stroke-dashoffset="-1" id="timeTicks2" />`;

elem += `<path d="m260 270 c`;
elem = addSpiral(elem);
elem += `" stroke="black" fill="transparent" stroke-width="10" stroke-dashoffset="-1" id="timeTicks" />`;
elem += `</svg>`;

elem = addSpiral(elem, true);

spiral.innerHTML = elem;

const path = spiral.querySelector("path#timeBar");
const total = path.getTotalLength() - 3;
const time = (90 * total) / 60 / 24;
const start = ((60 * 11 + 15) * total) / 60 / 24 ;
path.setAttribute("stroke-dasharray", `${time},${path.getTotalLength()}`);
path.setAttribute("stroke-dashoffset", `-${start}`);
const ticks = spiral.querySelector("path#timeTicks");
ticks.setAttribute("stroke-dasharray", `${2},${(path.getTotalLength() - 6) / 24 - 2}`);
const ticks2 = spiral.querySelector("path#timeTicks2");
ticks2.setAttribute("stroke-dasharray", `${1},${(path.getTotalLength() - 6) / 24 / 4 - 1}`);

for (let i = 0; i <= 24; i++) {
    spiral.innerHTML += `<div class="hour" id="h${i}">${i}</div>`;
}

/* 
m260 270 c-1 -1 -4.866666666666666 -22 22 -22 1 -1 36 -3.4666666666666637 36 36 1 1 1.8000000000000043 47 -50 50 -1 1 -64 -2.13333333333333 -64 -64 -1 -1 3.666666666666667 -78 78 -78 1 -1 92 0.8000000000000114 92 92 1 1 -0.8666666666666694 99 -106 106 -1 1 -120 -5.866666666666669 -120 -120 -1 -1 5.799999999999983 -134 134 -134 1 -1 148 -1.3333333333333335 148 148 1 1 2.866666666666655 151 -162 162 -1 1 -176 -3.1999999999999886 -176 -176 -1 -1 1.53333333333335 -190 190 -190 1 -1 204 -9.866666666666685 204 204 1 1 13 203 -218 218 -1 1 -232 5.866666666666656 -232 -232 -1 -1 -9.133333333333344 -246 246 -246 
*/

spiral.querySelectorAll("svg").forEach(
    (el) =>
        (el.onclick = (e) => {
            console.log(spiral.children[0]);
            const t = spiral.children[0];
            t.innerHTML = t.innerHTML.replace("green", "blue");
            spiral.replaceChild(spiral.children[0], t);
            console.log(spiral.children[0]);
        })
);
