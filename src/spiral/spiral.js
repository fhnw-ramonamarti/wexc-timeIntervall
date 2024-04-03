const spiral = document.querySelector("#spiralTime");

// cirvle spiral
const yy = 260;
let xx = 270;
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
    }" style="top:${yy}px;left:${xx - (size * i) / 2 - size / 2 - dd + 2}px;width:${
        i == 8 ? form + 5 : form * 2 + 5
    }px;height:${form + 5}px">`;
    elem += `<circle r="${form}" cx="${form + 2}" cy="0" stroke="black" fill="transparent" stroke-width="2" />`;
    elem += `<circle r="${form}" cx="${
        form + 2
    }" cy="0" stroke="gray" fill="transparent" stroke-width="7" class="min" id="m${i}" stroke-dashoffset="1" />`;
    elem += `<circle r="${form}" cx="${
        form + 2
    }" cy="0" stroke="black" fill="transparent" stroke-width="10" class="hour" id="h${i}" stroke-dashoffset="1" />`;
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
pathLength -= 0;
spiral.innerHTML = elem;

spiral.querySelectorAll("svg").forEach((e) => {
    const pathM = e.querySelector(".min");
    pathM.setAttribute("stroke-dasharray", `1,${pathLength / 24 / 4 - 1}`);
    const pathH = e.querySelector(".hour");
    pathH.setAttribute("stroke-dasharray", `2,${pathLength / 24 - 2}`);
});
