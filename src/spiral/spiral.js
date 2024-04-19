import { all, allHandles } from "./svgs.js";

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
    }px;height:${form + 10}px;z-index:${20 - i};">`;
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

spiral.querySelectorAll(".segments").forEach((e) => {
    e.innerHTML = all;
});
spiral.querySelectorAll(".handles").forEach((e) => {
    e.innerHTML = allHandles;
});
let ids = ["fragsBg", "fragsFg", "handsBg"];
let inxId = 0;
spiral.querySelectorAll(".frags").forEach((e) => {
    e.id = ids[inxId++];
});
spiral.querySelector("#hands").id = ids[inxId++];

const handlesBg = spiral.querySelector("#handsBg");
const segmentsFg = spiral.querySelector("#fragsFg");
const segmentsBg = spiral.querySelector("#fragsBg");

let cc = 0;
[...segmentsFg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((e) => {
        e.setAttribute("data-value", cc);
        e.setAttribute("id", `s${cc++}`);
        e.setAttribute("class", `seg`);
        e.setAttribute("stroke", "transparent");
    });
cc = 0;
[...segmentsBg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((e) => {
        e.setAttribute("id", `sb${cc++}`);
        e.setAttribute("class", `seg`);
        e.setAttribute("fill-opacity", "1");
        e.setAttribute("stroke", "transparent");
    });
cc = 0;
[...handlesBg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((e) => {
        e.setAttribute("id", `sh${cc++}`);
        e.setAttribute("class", `hand hidden`);
    });

// using fragments coloring
[...segmentsFg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((elem) => {
        elem.addEventListener("mousedown", (e) => {
            clicked = true;
            let temp = Number(e.target.getAttribute("data-value"));
            if (start == -1 || temp > startEnd[1] || temp < startEnd[0]) {
                start = temp;
                currClick = null;
                for (let i = 0; i < 96; i++) {
                    const elemI = segmentsBg.querySelector("#sb" + i);
                    elemI.classList.remove("selected");
                    elemI.classList.remove("clicked");
                    const elemI2 = handlesBg.querySelector("#sh" + i);
                    elemI2.classList.add("hidden");
                    elemI2.classList.remove("clicked");
                }
                const elemI = segmentsBg.querySelector("#sb" + e.target.getAttribute("data-value"));
                elemI.classList.add("selected");
                elemI.classList.add("clicked");
                const elemI2 = handlesBg.querySelector("#sh" + e.target.getAttribute("data-value"));
                elemI2.classList.add("clicked");
                elemI2.classList.remove("hidden");
            } else if (temp == startEnd[1]) {
                // move end
                start = startEnd[0];
                const elemI = segmentsBg.querySelector("#sb" + e.target.getAttribute("data-value"));
                elemI.classList.add("clicked");
                elemI.classList.add("active");
                const elemI2 = handlesBg.querySelector("#sh" + e.target.getAttribute("data-value"));
                elemI2.classList.add("clicked");
                for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                    const elemI = segmentsBg.querySelector("#sb" + i);
                    elemI.classList.add("clicked");
                }
            } else if (temp == startEnd[0]) {
                // move start
                start = startEnd[1];
                const elemI = segmentsBg.querySelector("#sb" + e.target.getAttribute("data-value"));
                elemI.classList.add("clicked");
                elemI.classList.add("active");
                const elemI2 = handlesBg.querySelector("#sh" + e.target.getAttribute("data-value"));
                elemI2.classList.add("clicked");
                for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                    const elemI = segmentsBg.querySelector("#sb" + i);
                    elemI.classList.add("clicked");
                }
            } else {
                // add class for draging
                for (let i = 0; i < 96; i++) {
                    const elemI = segmentsBg.querySelector("#sb" + i);
                    if (startEnd[0] <= i && startEnd[1] >= i) {
                        elemI.classList.add("clicked");
                    } else {
                        elemI.classList.remove("clicked");
                    }
                }
                currClick = temp;
            }
        });
        elem.addEventListener("mouseenter", (e) => {
            if (clicked) {
                fillSegs(e.target);
            }
            const val = e.target.getAttribute("data-value");
            if (startEnd[1] != -1 && startEnd[0] <= val && startEnd[1] >= val) {
                for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                    const elemI = segmentsBg.querySelector("#sb" + i);
                    elemI.classList.add("hover");
                    if (i == startEnd[0]) {
                        elemI.classList.add("first");
                    }
                    if (i == startEnd[1]) {
                        elemI.classList.add("last");
                    }
                }
            }
        });
        elem.addEventListener("mouseleave", (e) => {
            if (clicked) {
                handlesBg.querySelector("#sh" + e.target.id[(1, e.target.id.length - 1)]).classList.remove("clicked");
            }
            for (let i = startEnd[0]; i <= startEnd[1] && i != -1; i++) {
                const elemI = segmentsBg.querySelector("#sb" + i);
                elemI.classList.remove("hover");
                if (i == startEnd[0]) {
                    elemI.classList.remove("first");
                }
                if (i == startEnd[1]) {
                    elemI.classList.remove("last");
                }
            }
        });
        elem.addEventListener("mouseup", (e) => {
            clicked = false;
            currClick = null;
            for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                const elemI = segmentsBg.querySelector("#sb" + i);
                elemI.classList.remove("clicked");
            }
            handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("clicked");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("clicked");
        });
    });
segmentsFg.addEventListener("mouseleave", (e) => {
    clicked = false;
    currClick = null;
});

// using fragments coloring
const fillSegs = (e) => {
    const end = Number(e.getAttribute("data-value"));
    if (currClick) {
        const diff = end - currClick;
        if (startEnd[0] + diff >= 0 && startEnd[1] + diff < 96) {
            start = startEnd[0] + diff;
            currClick = end;
            handlesBg.querySelector("#sh" + startEnd[0]).classList.add("hidden");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.add("hidden");
            startEnd = [start, startEnd[1] + diff];
            handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("hidden");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("hidden");
            for (let i = 0; i < 96; i++) {
                const elemI = segmentsBg.querySelector("#sb" + i);
                if (startEnd[0] <= i && startEnd[1] >= i) {
                    elemI.classList.add("selected");
                    elemI.classList.add("clicked");
                } else {
                    elemI.classList.remove("selected");
                }
            }
        }
    } else {
        if (startEnd[0] != -1 && startEnd[1] != -1) {
            handlesBg.querySelector("#sh" + startEnd[0]).classList.add("hidden");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.add("hidden");
            handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("clicked");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("clicked");
            segmentsBg.querySelector("#sb" + startEnd[0]).classList.remove("active");
            segmentsBg.querySelector("#sb" + startEnd[1]).classList.remove("active");
        }
        startEnd = [start, end].sort((a, b) => a - b);
        if (startEnd[0] != -1 && startEnd[1] != -1) {
            handlesBg.querySelector("#sh" + end).classList.add("clicked");
            segmentsBg.querySelector("#sb" + end).classList.add("active");
            handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("hidden");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("hidden");
        }
        for (let i = 0; i < 96; i++) {
            const elemI = segmentsBg.querySelector("#sb" + i);
            if (startEnd[0] <= i && startEnd[1] >= i) {
                elemI.classList.add("selected");
                elemI.classList.add("clicked");
            } else {
                elemI.classList.remove("selected");
                elemI.classList.remove("clicked");
            }
        }
        segmentsBg.querySelector("#sb" + end).classList.add("clicked");
    }
};
