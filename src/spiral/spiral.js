import { circles, segments, handels, numbers } from "./svgs.js";

const spiral = document.querySelector("#spiralTime");
const padding = 100;
const height = spiral.clientHeight - padding;
const width = spiral.clientWidth - padding;

const names = ["line", "min", "hour"];
let ii = 0;
spiral.querySelector("#circles").innerHTML = circles + circles + circles;
spiral.querySelectorAll("#circles svg").forEach((e) => {
    e.classList.add(names[ii++]);
});

spiral.querySelector("#numbers").innerHTML = numbers;

// segments
let blockedTime = [5.25, 8.5].map((e, ei) => (ei % 2 === 1 ? e * 4 : e * 4 + 1));
let blocked = [...Array(blockedTime[1] - blockedTime[0] + 1).keys()].map((e) => e + blockedTime[0]);
let disabledTime = [0, 2, 22, 24].map((e, ei) => (ei % 2 === 1 ? e * 4 : e * 4 + 1));
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

let ids = ["fragsBg", "fragsFg", "handsBg", "circsFg", "circsM", "circsH", "numbsFg", "inputsFg"].sort();
let inxId = 0;
[...spiral.querySelectorAll(".container svg")]
    .filter((e) => e.classList.length > 0)
    .sort((a, b) => a.classList[0].localeCompare(b.classList[0]))
    .forEach((e) => {
        e.setAttribute("width", width);
        e.setAttribute("height", height);
        e.id = ids[inxId++];
    });
spiral.querySelectorAll(".inputs input").forEach((e) => {
    e.step = "900";
});

const fragsSelBg = spiral.querySelector("#fragsSelBg");
fragsSelBg.setAttribute("width", width);
fragsSelBg.setAttribute("height", height);

const handlesBg = spiral.querySelector("#handsBg");
const segmentsFg = spiral.querySelector("#fragsFg");
const segmentsBg = spiral.querySelector("#fragsBg");
const circsFg = spiral.querySelector("#circsFg");
const circMin = spiral.querySelector(".circles .min");
const circH = spiral.querySelector(".circles .hour");

let pathLength = 0;
let pLengths = [];
let offset = 0;
[...circsFg.children]
    .filter((e) => e.nodeName === "path")
    .forEach((e) => {
        pathLength += e.getTotalLength();
        pLengths.push(e.getTotalLength());
    });

const strokWidth = 1;
const o = 0;
pathLength = Math.floor(pathLength - pathLength / 24 / 4) - o - strokWidth;

ii = 0;
[...circMin.children]
    .filter((e) => e.nodeName === "path")
    .forEach((eM) => {
        eM.setAttribute(
            "stroke-dasharray",
            `${strokWidth / 2},${(offset === 0 ? 2 : 1) * (pathLength / 24 / 4 - strokWidth / 2)}`
        );
        eM.setAttribute("stroke-dashoffset", `${-(o + offset)}`);
        eM.setAttribute("stroke-width", `4`);
        eM.setAttribute("stroke", `black`);
        offset = pathLength / 24 - ((pLengths[ii++] - offset) % (pathLength / 24));
    });

ii = 0;
offset = 0;
[...circH.children]
    .filter((e) => e.nodeName === "path")
    .forEach((eH) => {
        eH.setAttribute("stroke-dasharray", `${strokWidth},${pathLength / 24 - strokWidth}`);
        eH.setAttribute("stroke-dashoffset", `${-(o + offset)}`);
        eH.setAttribute("stroke-width", `8`);
        eH.setAttribute("stroke", `black`);
        offset = pathLength / 24 - ((pLengths[ii++] - offset) % (pathLength / 24));
        if (ii === 1) {
            offset += pathLength / 24 / 4;
        }
    });

let cc = 0;
[...segmentsFg.children]
    .filter((e) => e.nodeName === "path")
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
    .filter((e) => e.nodeName === "path")
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
    .filter((e) => e.nodeName === "path")
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

spiral.querySelectorAll(".time").forEach((e) => {
    e.setCustomValidity("empty");
});
spiral.querySelector("#durIn").setCustomValidity("empty");

let oldDur = spiral.querySelector("#durIn").value;

// using fragments coloring
[...segmentsFg.children]
    .filter((e) => e.nodeName === "path")
    .forEach((elem) => {
        if (!elem.classList.contains("reserved") && !elem.classList.contains("disabled")) {
            elem.addEventListener("mousedown", (e) => {
                clicked = true;
                let temp = Number(e.target.getAttribute("data-value"));
                if (start === -1 || temp > startEnd[1] || temp < startEnd[0]) {
                    start = temp;
                    startEnd = [-1, -1];
                    spiral.querySelectorAll(".time").forEach((e) => {
                        e.value = `${Math.floor(start / 4)}:${
                            ((start / 4) % 1) * 60 ? ((start / 4) % 1) * 60 : "00"
                        }`.format();
                    });
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
                    elemI.classList.add("active");
                    const elemI2 = handlesBg.querySelector("#sh" + e.target.getAttribute("data-value"));
                    elemI2.classList.add("clicked");
                    elemI.classList.add("active");
                    elemI2.classList.remove("hidden");
                    fillClickedSegs(e.target.getAttribute("data-value"));
                } else if (temp === startEnd[1]) {
                    // move end
                    start = startEnd[0];
                    const elemI = segmentsBg.querySelector("#sb" + e.target.getAttribute("data-value"));
                    elemI.classList.add("clicked");
                    elemI.classList.add("active");
                    const elemI2 = handlesBg.querySelector("#sh" + e.target.getAttribute("data-value"));
                    elemI2.classList.add("clicked");
                    elemI2.classList.add("active");
                    for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                        const elemI = segmentsBg.querySelector("#sb" + i);
                        elemI.classList.add("clicked");
                    }
                } else if (temp === startEnd[0]) {
                    // move start
                    start = startEnd[1];
                    const elemI = segmentsBg.querySelector("#sb" + e.target.getAttribute("data-value"));
                    elemI.classList.add("clicked");
                    elemI.classList.add("active");
                    const elemI2 = handlesBg.querySelector("#sh" + e.target.getAttribute("data-value"));
                    elemI2.classList.add("clicked");
                    elemI2.classList.add("active");
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
                    fillClickedSegs(e.target.getAttribute("data-value"));
                }
            });
            elem.addEventListener("mouseenter", (e) => {
                const val = e.target.getAttribute("data-value");
                if (clicked) {
                    fillSegs(e.target);
                    if (currClick) {
                        fillClickedSegs(val);
                    }
                }
                if (startEnd[1] !== -1 && startEnd[0] <= val && startEnd[1] >= val) {
                    for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                        const elemI = segmentsBg.querySelector("#sb" + i);
                        elemI.classList.add("hover");
                        if (i === startEnd[0]) {
                            elemI.classList.add("first");
                        }
                        if (i === startEnd[1]) {
                            elemI.classList.add("last");
                        }
                    }
                }
                if (clicked) {
                    fillClickedSegs(val);
                }
            });
            elem.addEventListener("mouseleave", (e) => {
                if (clicked) {
                    const elem = handlesBg.querySelector("#sh" + e.target.id[(1, e.target.id.length - 1)]);
                    elem.classList.remove("clicked");
                    elem.classList.remove("active");
                    const elem2 = segmentsBg.querySelector("#sb" + e.target.id[(1, e.target.id.length - 1)]);
                    elem2.classList.remove("clicked");
                    elem2.classList.remove("active");
                }
                for (let i = startEnd[0]; i <= startEnd[1] && i !== -1; i++) {
                    const elemI = segmentsBg.querySelector("#sb" + i);
                    elemI.classList.remove("hover");
                    if (i === startEnd[0]) {
                        elemI.classList.remove("first");
                    }
                    if (i === startEnd[1]) {
                        elemI.classList.remove("last");
                    }
                }
            });
            elem.addEventListener("mouseup", (e) => {
                clicked = false;
                currClick = null;
                if (start !== -1 && startEnd[1] === -1) {
                    startEnd = [start, start];
                }
                if (startEnd[1] !== -1) {
                    for (let i = startEnd[0]; i <= startEnd[1]; i++) {
                        const elemI = segmentsBg.querySelector("#sb" + i);
                        elemI.classList.remove("clicked");
                        elemI.classList.remove("active");
                    }
                    handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("clicked");
                    handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("active");
                    handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("clicked");
                    handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("active");
                }
                fillClickedSegs(e.target.getAttribute("data-value"));
            });
        }
    });
segmentsFg.addEventListener("mouseleave", (e) => {
    clicked = false;
    currClick = null;
    fillClickedSegs(0);
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
            oldDur = spiral.querySelector("#durIn").value = `${
                Math.floor((startEnd[1] - startEnd[0] + 1) / 4) ?? "00"
            }:${
                (((startEnd[1] - startEnd[0] + 1) / 4) % 1) * 60
                    ? (((startEnd[1] - startEnd[0] + 1) / 4) % 1) * 60
                    : "00"
            }`.format();
            spiral.querySelector("#startIn").value = `${Math.floor(startEnd[0] / 4)}:${
                ((startEnd[0] / 4) % 1) * 60 ? ((startEnd[0] / 4) % 1) * 60 : "00"
            }`.format();
            spiral.querySelector("#endIn").value = `${Math.floor((startEnd[1] + 1) / 4)}:${
                (((startEnd[1] + 1) / 4) % 1) * 60 ? (((startEnd[1] + 1) / 4) % 1) * 60 : "00"
            }`.format();
            for (let i = 0; i < 96; i++) {
                const elemI = segmentsBg.querySelector("#sb" + i);
                const elemI2 = handlesBg.querySelector("#sh" + i);
                if (startEnd[0] <= i && startEnd[1] >= i) {
                    elemI.classList.add("selected");
                    elemI.classList.add("clicked");
                    if ((startEnd[0] === i || startEnd[1] === i) && ![...disabled, ...blocked].includes(i + 1)) {
                        elemI2.classList.remove("hidden");
                    } else {
                        elemI2.classList.add("hidden");
                    }
                } else {
                    elemI.classList.remove("selected");
                    elemI2.classList.add("hidden");
                }
            }
        }
    } else {
        if (startEnd[0] !== -1 && startEnd[1] !== -1) {
            handlesBg.querySelector("#sh" + startEnd[0]).classList.add("hidden");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.add("hidden");
            handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("clicked");
            handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("clicked");
            segmentsBg.querySelector("#sb" + startEnd[0]).classList.remove("active");
            segmentsBg.querySelector("#sb" + startEnd[1]).classList.remove("active");
        }
        if (start === -1) {
            start = end;
        }
        startEnd = [start, end].sort((a, b) => a - b);
        handlesBg.querySelector("#sh" + end).classList.add("clicked");
        handlesBg.querySelector("#sh" + startEnd[0]).classList.remove("hidden");
        handlesBg.querySelector("#sh" + startEnd[1]).classList.remove("hidden");
        oldDur = spiral.querySelector("#durIn").value = `${Math.floor((startEnd[1] - startEnd[0] + 1) / 4)}:${
            (((startEnd[1] - startEnd[0] + 1) / 4) % 1) * 60 ? (((startEnd[1] - startEnd[0] + 1) / 4) % 1) * 60 : "00"
        }`.format();
        spiral.querySelector("#startIn").value = `${Math.floor(startEnd[0] / 4)}:${
            ((startEnd[0] / 4) % 1) * 60 ? ((startEnd[0] / 4) % 1) * 60 : "00"
        }`.format();
        spiral.querySelector("#endIn").value = `${Math.floor((startEnd[1] + 1) / 4)}:${
            (((startEnd[1] + 1) / 4) % 1) * 60 ? (((startEnd[1] + 1) / 4) % 1) * 60 : "00"
        }`.format();
        for (let i = 0; i < 96; i++) {
            const elemI = segmentsBg.querySelector("#sb" + i);
            const elemI2 = handlesBg.querySelector("#sh" + i);
            if (startEnd[0] <= i && startEnd[1] >= i) {
                elemI.classList.add("selected");
                elemI.classList.add("clicked");
                if ((startEnd[0] === i || startEnd[1] === i) && ![...disabled, ...blocked].includes(i + 1)) {
                    elemI2.classList.remove("hidden");
                } else {
                    elemI2.classList.add("hidden");
                }
            } else {
                elemI.classList.remove("selected");
                elemI.classList.remove("active");
                elemI.classList.remove("clicked");
                elemI2.classList.add("hidden");
            }
        }
        segmentsBg.querySelector("#sb" + end).classList.add("active");
        segmentsBg.querySelector("#sb" + end).classList.add("clicked");
    }
    spiral.querySelectorAll(".time").forEach((e) => {
        const val = Math.floor((Number(e.value.split(":")[0]) + Number(e.value.split(":")[1]) / 60) * 4);
        if (disabled.includes(val + 1)) {
            e.setCustomValidity("disabled");
        } else if (blocked.includes(val + 1)) {
            e.setCustomValidity("reserved");
        } else {
            e.setCustomValidity("");
        }
    });
    const dur = spiral.querySelector("#durIn");
    dur.setCustomValidity(dur.value === "00:00" ? "empty" : "");
};

const fillClickedSegs = () => {
    const fragsSelBg = spiral.querySelector("#fragsSelBg");
    const newSel = fragsSelBg.cloneNode(true);
    newSel.innerHTML = "";
    newSel.append(segmentsBg.firstChild.cloneNode(true));
    const marked = segmentsBg.querySelectorAll(".clicked:not(.reserved):not(.disabled)");
    if (marked.length > 1) {
        marked.forEach((s) => {
            const node = s.cloneNode(true);
            node.id = "s" + node.id;
            newSel.append(node);
        });
    }
    fragsSelBg.replaceWith(newSel);
};

spiral.querySelectorAll(".inputs .time").forEach((e) => {
    e.oninput = (e) => {
        const val =
            Math.floor((Number(e.target.value.split(":")[0]) + Number(e.target.value.split(":")[1]) / 60) * 4) -
            (e.target.name === "end" ? 1 : 0);
        spiral.querySelectorAll(".time").forEach((e) => {
            const val = Math.floor((Number(e.value.split(":")[0]) + Number(e.value.split(":")[1]) / 60) * 4);
            if (disabled.includes(val + 1)) {
                e.setCustomValidity("disabled");
            } else if (blocked.includes(val + 1)) {
                e.setCustomValidity("reserved");
            } else {
                e.setCustomValidity("");
            }
        });
        if (e.target.checkValidity()) {
            if (e.target.name === "start") {
                start = val;
                const end = startEnd[1] === -1 ? start : startEnd[1];
                // startEnd = [start, end].sort();
            }
            if (e.target.name === "end") {
                start = start === -1 ? val : start;
                // startEnd = [start, val].sort();
            }
            fillSegs(null, val);
        }
    };
});

spiral.querySelector("#durIn").oninput = (e) => {
    e.target.value = oldDur;
};

String.prototype.format = function () {
    return this.includes("-") ? "00:00" : (this.length === 4 ? "0" : "") + String(this);
};
