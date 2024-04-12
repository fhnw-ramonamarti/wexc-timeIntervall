import { all } from "./svgs.js";

const spiral = document.querySelector("#spiralTime");

// circle spiral
const yy = 268;
let xx = 238;
let size = 25;
let elem = "";
let dd = 0;
let pathLength = 0;
for (let i = 0; i < 9; i++) {
    let form = size * i + size;
    pathLength += form * Math.PI;
    if (i % 2 != 0) {
        // bottom
        xx -= size * i;
    } else {
        // top
        dd = -size / 2;
    }
    elem += `<svg width=""${
        i == 8 ? form / 2 : form + 5
    }" height=""${form}" xmlns="http://www.w3.org/2000/svg" id="time${i}" class=" ${
        i % 2 == 0 ? "lll" : "rrr"
    }"  viewbox=" ${
        i % 2 == 0
            ? `-10 -${form + 10} ${i == 8 ? form + 20 : form * 2 + 20} ${form + 10}`
            : `-10 0 ${i == 8 ? form + 20 : form * 2 + 20} ${form + 10}`
    }" style="top:${yy}px;left:${xx - (size * i) / 2 - size / 2 - dd}px;width:${
        i == 8 ? form + 20 : form * 2 + 20
    }px;height:${form + 10}px">`;
    elem += `<circle r="${form}" cx="${form + 2}" cy="0" stroke="black" fill="transparent" stroke-width="2" />`;
    elem += `<circle r="${form}" cx="${
        form + 2
    }" cy="0" stroke="gray" fill="transparent" stroke-width="7" class="min" id="m${i}" stroke-dashoffset="0" stroke-dasharray="0,1" />`;
    elem += `<circle r="${form}" cx="${
        form + 2
    }" cy="0" stroke="darkred" fill="transparent" stroke-width="13" class="hour" id="h${i}" stroke-dashoffset="0" stroke-dasharray="0,1" />`;
    elem += `</svg>`;
    if (i % 2 == 0) {
        // top
        xx += size * i;
        dd = 0;
    }
    if (i == 8) {
        pathLength -= (form * Math.PI) / 2;
    }
}
pathLength = Math.floor(pathLength - pathLength / 24 / 4);
spiral.innerHTML += elem;

// ticks
let j = 0;
let offset = 0;
spiral.querySelectorAll("svg").forEach((e) => {
    j = j == 1 ? 0 : 1;
    const rad = Math.floor(size * (e.id.substring(4) - 1 + 2) * Math.PI);
    const pathM = e.querySelector(".min");
    pathM.setAttribute("stroke-dasharray", `1,${(e.id.substring(4) == 0 ? 2 : 1) * (pathLength / 24 / 4 - 1)}`);
    pathM.setAttribute("stroke-dashoffset", `${-(3 + offset + j * rad)}`);
    const pathH = e.querySelector(".hour");
    pathH.setAttribute("stroke-dasharray", `2,${pathLength / 24 - 2}`);
    pathH.setAttribute("stroke-dashoffset", `${-(3 + offset + j * rad)}`);
    if (e.id.substring(4) == 0) {
        offset = pathLength / 24 / 4;
    }
    offset = pathLength / 24 - ((rad - offset) % (pathLength / 24));
});

// segments
let startEnd;
let clicked = false;

const segments = spiral.querySelector("#segments");
const inner = all.join("\n");
segments.innerHTML += inner;

[...segments.children].forEach((e) => {
    e.setAttribute("data-value", e.id.slice(1));
});

for (let i = 0; i < 97; i++) {
    const elem = segments.querySelector("#s" + i);
    elem.addEventListener("mousedown", (e) => {
        clicked = true;
        if(!startEnd){
            startEnd = [Number(e.target.closest("svg").getAttribute("data-value"))];
        }
    });
    elem.addEventListener("mousemove", (e) => {
        if (clicked) {
        }
    });
    elem.addEventListener("mouseup", (e) => {
        clicked = false;
        startEnd = [...startEnd, Number(e.target.closest("svg").getAttribute("data-value")) + 1].sort();
        // todo mark action
        console.log(startEnd);
    });
}
