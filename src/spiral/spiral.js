import { circles, segments, handels, numbers } from "./svgs.js";

const spiral = document.querySelector("#spiralTime");

// circle spiral
// const size = 25;
// const yy = spiral.clientHeight / 2;
// let xx = spiral.clientWidth / 2 - size;
// let elem = "";
// let dd = 0;
// let pathLength = 0;
// let circs = [];
// let circs2 = [];
// for (let i = 0; i < 9; i++) {
//     let form = size * i + size;
//     pathLength += form * Math.PI;
//     circs.push(pathLength);
//     circs2.push(i == 8 ? (Math.PI * form) / 2 : Math.PI * form);
//     if (i % 2 != 0) {
//         // bottom
//         xx -= size * i;
//     } else {
//         // top
//         dd = -size / 2;
//     }
//     elem += `<svg width=""${
//         i == 8 ? form / 2 : form + 5
//     }" height=""${form}" xmlns="http://www.w3.org/2000/svg" id="time${i}" class=" ${
//         i % 2 == 0 ? "lll" : "rrr"
//     }"  viewbox=" ${
//         i % 2 == 0
//             ? `-10 -${form + 10} ${i == 8 ? form + 20 : form * 2 + 20} ${form + 10}`
//             : `-10 0 ${i == 8 ? form + 20 : form * 2 + 20} ${form + 10}`
//     }" style="top:${yy}px;left:${xx - (size * i) / 2 - size / 2 - dd}px;width:${
//         i == 8 ? form + 20 : form * 2 + 20
//     }px;height:${form + 10}px;z-index:${20 - i};">`;
//     elem += `<circle r="${form / 2}" cx="${
//         form + 2
//     }" cy="0" stroke="lightgreen" fill="transparent" stroke-width="${form}" stroke-dasharray="0,1" class="mark" id="mark${i}" />`;
//     elem += `<circle r="${form}" cx="${form + 2}" cy="0" stroke="black" fill="transparent" stroke-width="2" />`;
//     elem += `<circle r="${form}" cx="${
//         form + 2
//     }" cy="0" stroke="gray" fill="transparent" stroke-width="7" class="min" id="m${i}" stroke-dashoffset="0" stroke-dasharray="0,1" />`;
//     elem += `<circle r="${form}" cx="${
//         form + 2
//     }" cy="0" stroke="darkred" fill="transparent" stroke-width="13" class="hour" id="h${i}" stroke-dashoffset="0" stroke-dasharray="0,1" />`;
//     elem += `</svg>`;
//     if (i % 2 == 0) {
//         // top
//         xx += size * i;
//         dd = 0;
//     }
//     if (i == 8) {
//         pathLength -= (form * Math.PI) / 2;
//     }
// }
// pathLength = Math.floor(pathLength - pathLength / 24 / 4);
// spiral.querySelector("#circles").innerHTML += elem;
spiral.querySelector("#circles").innerHTML = circles;

// ticks
// let j = 0;
// let offset = 0;
// let offs = [];
// spiral.querySelectorAll("svg").forEach((e) => {
//     j = j == 1 ? 0 : 1;
//     const rad = Math.floor(size * (e.id.substring(4) - 1 + 2) * Math.PI);
//     const pathM = e.querySelector(".min");
//     pathM.setAttribute("stroke-dasharray", `1,${(e.id.substring(4) == 0 ? 2 : 1) * (pathLength / 24 / 4 - 1)}`);
//     pathM.setAttribute("stroke-dashoffset", `${-(3 + offset + j * rad)}`);
//     const pathH = e.querySelector(".hour");
//     pathH.setAttribute("stroke-dasharray", `2,${pathLength / 24 - 2}`);
//     pathH.setAttribute("stroke-dashoffset", `${-(3 + offset + j * rad)}`);
//     if (e.id.substring(4) == 0) {
//         offset = pathLength / 24 / 4;
//         offs.push(offset);
//     }
//     offset = pathLength / 24 - ((rad - offset) % (pathLength / 24));
//     offs.push(offset);
// });

// numbers ticks
// for (let i = 0; i <= 24; i++) {
//     spiral.querySelector("#numbs").innerHTML += `<div class="hour" id="hi${i}">${i}</div>`;
// }
spiral.querySelector("#numbers").innerHTML += numbers;

// segments
let blockedTime = [5.25, 6.5].map((e) => e * 4);
let blocked = [...Array(blockedTime[1] - blockedTime[0] + 1).keys()].map((e) => e + blockedTime[0]);
let disabledTime = [0, 2, 22, 24].map((e) => e * 4);
let disabled = [
    ...[...Array(disabledTime[1] - disabledTime[0] + 1).keys()].map((e) => e + disabledTime[0]),
    ...[...Array(disabledTime[3] - disabledTime[2] + 1).keys()].map((e) => e + disabledTime[2]),
];
let startEnd = [-1, -1];
let start = -1;
let currClick;
let clicked = false;

spiral.querySelectorAll(".segments").forEach((e) => {
    e.innerHTML = segments;
});
spiral.querySelector(".handles").innerHTML = handels;

let ids = ["fragsBg", "fragsFg", "handsBg", "circsFg", "numbsFg", "inputsFg"].sort();
let inxId = 0;
[...spiral.querySelectorAll(".container svg")]
    .sort((a, b) => a.classList[0].localeCompare(b.classList[0]))
    .forEach((e) => {
        e.setAttribute("width", spiral.clientWidth);
        e.setAttribute("height", spiral.clientHeight);
        e.id = ids[inxId++];
    });
spiral.querySelectorAll(".inputs input").forEach((e) => {
    e.step = "900";
});

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
        e.setAttribute("fill", "transparent");
        e.setAttribute("stroke", "transparent");
        if (blocked.includes(cc)) {
            e.classList.add("reserved");
        }
        if (disabled.includes(cc)) {
            e.classList.add("disabled");
        }
    });
cc = 0;
[...segmentsBg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((e) => {
        e.setAttribute("id", `sb${cc++}`);
        e.setAttribute("class", `seg`);
        e.setAttribute("fill-opacity", "1");
        e.setAttribute("fill", "transparent");
        e.setAttribute("stroke", "transparent");
        if (blocked.includes(cc)) {
            e.classList.add("reserved");
        }
        if (disabled.includes(cc)) {
            e.classList.add("disabled");
        }
    });
cc = 0;
[...handlesBg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((e) => {
        e.setAttribute("id", `sh${cc++}`);
        e.setAttribute("class", `hand hidden`);
        if (blocked.includes(cc)) {
            e.classList.add("reserved");
        }
        if (disabled.includes(cc)) {
            e.classList.add("disabled");
        }
    });

// using fragments coloring
[...segmentsFg.children]
    .filter((e) => e.nodeName == "path")
    .forEach((elem) => {
        if (!elem.classList.contains("reserved") && !elem.classList.contains("disabled")) {
            elem.addEventListener("mousedown", (e) => {
                clicked = true;
                let temp = Number(e.target.getAttribute("data-value"));
                if (start == -1 || temp > startEnd[1] || temp < startEnd[0]) {
                    start = temp;
                    spiral.querySelectorAll(".time").forEach((e) => {
                        e.value = `${Math.floor(start / 4)}:${
                            ((start / 4) % 1) * 60 ? ((start / 4) % 1) * 60 : "00"
                        }`.format();
                    });
                    spiral.querySelector(".dur").value = "00:00";
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
                    handlesBg
                        .querySelector("#sh" + e.target.id[(1, e.target.id.length - 1)])
                        .classList.remove("clicked");
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
                if (startEnd[1] != -1) {
                    for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                        const elemI = segmentsBg.querySelector("#sb" + i);
                        elemI.classList.remove("clicked");
                    }
                    handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("clicked");
                    handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("clicked");
                }
            });
        }
    });
segmentsFg.addEventListener("mouseleave", (e) => {
    clicked = false;
    currClick = null;
});

// using fragments coloring
const fillSegs = (e, input) => {
    const end = Number(e?.getAttribute("data-value") ?? input);
    if (currClick) {
        const diff = end - currClick;
        if (startEnd[0] + diff >= 0 && startEnd[1] + diff < 96) {
            start = startEnd[0] + diff;
            currClick = end;
            startEnd = [start, startEnd[1] + diff];
            spiral.querySelector(".dur").value = `${Math.floor((startEnd[1] - startEnd[0]) / 4) ?? "00"}:${
                (((startEnd[1] - startEnd[0]) / 4) % 1) * 60 ? (((startEnd[1] - startEnd[0]) / 4) % 1) * 60 : "00"
            }`.format();
            spiral.querySelector("#startIn").value = `${Math.floor(startEnd[0] / 4)}:${
                ((startEnd[0] / 4) % 1) * 60 ? ((startEnd[0] / 4) % 1) * 60 : "00"
            }`.format();
            spiral.querySelector("#endIn").value = `${Math.floor(startEnd[1] / 4)}:${
                ((startEnd[1] / 4) % 1) * 60 ? ((startEnd[1] / 4) % 1) * 60 : "00"
            }`.format();
            handlesBg.querySelector("#sh" + startEnd[0]).classList.add("hidden");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.add("hidden");
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
        spiral.querySelector(".dur").value = `${Math.floor((startEnd[1] - startEnd[0]) / 4)}:${
            (((startEnd[1] - startEnd[0]) / 4) % 1) * 60 ? (((startEnd[1] - startEnd[0]) / 4) % 1) * 60 : "00"
        }`.format();
        spiral.querySelector("#startIn").value = `${Math.floor(startEnd[0] / 4)}:${
            ((startEnd[0] / 4) % 1) * 60 ? ((startEnd[0] / 4) % 1) * 60 : "00"
        }`.format();
        spiral.querySelector("#endIn").value = `${Math.floor(startEnd[1] / 4)}:${
            ((startEnd[1] / 4) % 1) * 60 ? ((startEnd[1] / 4) % 1) * 60 : "00"
        }`.format();
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

spiral.querySelectorAll(".inputs input").forEach((e) => {
    e.oninput = (e) => {
        const val = Math.floor((Number(e.target.value.split(":")[0]) + Number(e.target.value.split(":")[1]) / 60) * 4);
        if (e.target.name === "duration") {
            start = start == -1 ? 0 : start;
            startEnd = [start, start + val];
            spiral.querySelector("#endIn").value = `${Math.floor(startEnd[1] / 4)}:${
                ((startEnd[1] / 4) % 1) * 60 ? ((startEnd[1] / 4) % 1) * 60 : "00"
            }`.format();
        }
        if (e.target.name === "start") {
            start = val;
            const tmp = startEnd[1] == -1 ? start : startEnd[1];
            startEnd = [start, tmp];
            spiral.querySelector("#dur").value = `${Math.floor(startEnd[0] / 4)}:${
                ((startEnd[0] / 4) % 1) * 60 ? ((startEnd[0] / 4) % 1) * 60 : "00"
            }`.format();
        }
        if (e.target.name === "end") {
            start = start == -1 ? val : start;
            startEnd = [start, val];
            spiral.querySelector("#dur").value = `${Math.floor(startEnd[0] / 4)}:${
                ((startEnd[0] / 4) % 1) * 60 ? ((startEnd[0] / 4) % 1) * 60 : "00"
            }`.format();
        }
        if (disabled.includes(val + 1)) {
            e.target.setCustomValidity("disabled");
        } else if (blocked.includes(val + 1)) {
            e.target.setCustomValidity("reserved");
        } else {
            e.target.setCustomValidity("");
            fillSegs(null, val);
        }
    };
});

String.prototype.format = function () {
    return (this.length == 4 ? "0" : "") + String(this);
};
