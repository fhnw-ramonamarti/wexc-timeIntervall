import { all } from "./svgs.js";

const spiral = document.querySelector("#spiralTime");

// circle spiral
const yy = 268;
let xx = 238;
let size = 25;
let elem = "";
let dd = 0;
let pathLength = 0;
let circs = [];
let circs2 = [];
for (let i = 0; i < 9; i++) {
    let form = size * i + size;
    pathLength += form * Math.PI;
    circs.push(pathLength);
    circs2.push(i == 8 ? (Math.PI * form) / 2 : Math.PI * form);
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
    }px;height:${form + 10}px;z-index:${10 - i};">`;
    // elem += `<circle r="${form / 2}" cx="${
    //     form + 2
    // }" cy="0" stroke="white" fill="transparent" stroke-width="${form}" />`;
    elem += `<circle r="${form / 2}" cx="${
        form + 2
    }" cy="0" stroke="lightgreen" fill="transparent" stroke-width="${form}" stroke-dasharray="0,1" class="mark" id="mark${i}" />`;
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
spiral.querySelector("#circles").innerHTML += elem;

// ticks
let j = 0;
let offset = 0;
let offs = [];
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
        offs.push(offset);
    }
    offset = pathLength / 24 - ((rad - offset) % (pathLength / 24));
    offs.push(offset);
});

// numbers ticks
for (let i = 0; i <= 24; i++) {
    spiral.querySelector("#numbs").innerHTML += `<div class="hour" id="hi${i}">${i}</div>`;
}

// segments
let startEnd = [-1, -1];
let start = -1;
let currClick;
let clicked = false;

spiral.querySelectorAll(".segments").forEach(e=>{
    e.innerHTML = all;
});
let ids = ["fragsBg","fragsFg"];
let inxId = 0;
spiral.querySelectorAll(".frags").forEach(e=>{
    e.id = ids[inxId++];
});
const segmentsFg = spiral.querySelector("#fragsFg");
const segmentsBg = spiral.querySelector("#fragsBg");

let cc = 0;
[...segmentsFg.children].forEach((e) => {
    e.setAttribute("data-value", cc);
    e.setAttribute("id", `s${cc++}`);
    e.setAttribute("class", `seg`);
    e.setAttribute("stroke", "transparent");
});
cc = 0;
[...segmentsBg.children].forEach((e) => {
    e.setAttribute("id", `sb${cc++}`);
    e.setAttribute("class", `seg`);
    e.setAttribute("fill", "lightgreen");
    e.setAttribute("stroke", "transparent");
});

// using fragments coloring
[...segmentsFg.children].forEach((elem) => {
    elem.addEventListener("mousedown", (e) => {
        clicked = true;
        let temp = Number(e.target.getAttribute("data-value"));
        if (start == -1 || temp >= startEnd[1] || temp < startEnd[0]) {
            start = temp;
            currClick = null;
            for (let i = 0; i < 96; i++) {
                const elemI = segmentsBg.querySelector("#sb" + i);
                elemI.setAttribute("fill-opacity", 0);
            }
            const elemI = segmentsBg.querySelector("#sb" + e.target.getAttribute("data-value"));
            elemI.setAttribute("fill-opacity", 1);
        } else {
            currClick = temp;
        }
    });
    elem.addEventListener("mouseenter", (e) => {
        if (clicked) {
            // updateSelection(e);
            fillSegs(e.target);
        }
    });
    elem.addEventListener("mouseup", (e) => {
        clicked = false;
    });
});
segmentsFg.addEventListener("mouseleave", (e) => {
    clicked = false;
});

// using fragments coloring
const fillSegs = (e) => {
    const end = Number(e.getAttribute("data-value"));
    if (currClick) {
        const diff = end - currClick;
        if (startEnd[0] + diff >= 0 && startEnd[1] + diff < 96) {
            start = startEnd[0] + diff;
            currClick = end;
            startEnd = [start, startEnd[1] + diff];
            for (let i = 0; i < 96; i++) {
                const elemI = segmentsBg.querySelector("#sb" + i);
                elemI.setAttribute("fill-opacity", startEnd[0] <= i && startEnd[1] >= i ? 1 : 0);
            }
        }
    } else {
        startEnd = [start, end].sort((a, b) => a - b);
        for (let i = 0; i < 96; i++) {
            const elemI = segmentsBg.querySelector("#sb" + i);
            elemI.setAttribute("fill-opacity", startEnd[0] <= i && startEnd[1] >= i ? 1 : 0);
        }
    }
};
// ----------------------------------------------------------------

// segment actions
// todo not correct for circle
// using circle coloring
// let c = 0;
// [...segments.children].forEach((elem) => {
//     elem.addEventListener("mousedown", (e) => {
//         clicked = true;
//         let temp = Number(e.target.getAttribute("data-value"));
//         if (start == -1 || temp >= startEnd[1] || temp < startEnd[0]) {
//             start = temp;
//             spiral.querySelectorAll(".mark").forEach((e) => {
//                 e.setAttribute("stroke-dasharray", `0,1`);
//                 e.setAttribute("stroke-dashoffset", `0`);
//             });
//             spiral.dispatchEvent(new Event("mouseenter"));
//         }
//     });
//     elem.addEventListener("mouseenter", (e) => {
//         if (clicked) {
//             updateSelection(e);
//         }
//     });
//     elem.addEventListener("mouseup", (e) => {
//         clicked = false;
//         updateSelection(e);
//     });
// });

// using cicle coloring
// pathLength /= 2;
// circs = circs.map((e) => e / 2);
// circs2 = circs2.map((e) => e / 2);
// offs = offs.map((e) => e / 2);
// const updateSelection = (e) => {
//     console.log("click", e.target.id);
//     spiral.querySelectorAll(".mark").forEach((e) => {
//         e.setAttribute("stroke-dasharray", `0,1`);
//         e.setAttribute("stroke-dashoffset", `0`);
//     });
//     startEnd = [start, Number(e.target.getAttribute("data-value")) + 1].sort((a, b) => a - b);
//     let inxS = circs.findLastIndex((e) => e < (pathLength / 24 / 4) * startEnd[0]) + 1;
//     let inxE = circs.findIndex((e) => e > (pathLength / 24 / 4) * startEnd[1]);
//     console.log(inxS, inxE, startEnd);
//     spiral.querySelectorAll(".mark").forEach((e, i) => {
//         if (i >= inxS && i <= inxE) {
//             let tmp = (x) => (i == 0 ? (pathLength / 24 / 4) * x : circs[i - 1] - (pathLength / 24 / 4) * (x + 1) - 2);
//             if (i == inxS) {
//                 let j = i % 2 == 0 ? circs2[i] : 0;
//                 e.setAttribute("stroke-dashoffset", `${-(1 + Math.abs(tmp(startEnd[0])) + j)}`);
//             }
//             if (i == inxE) {
//                 const q = Math.abs((pathLength / 24 / 4) * (startEnd[1] - startEnd[0])) * (i == 0 ? 2 : 1) - 2;
//                 e.setAttribute("stroke-dasharray", `${q},${pathLength}`);
//             } else {
//                 e.setAttribute("stroke-dasharray", `1,0`);
//             }
//             console.log(circs2[i], e.getAttribute("stroke-dashoffset"), e.getAttribute("stroke-dasharray"));
//         }
//     });
// };
