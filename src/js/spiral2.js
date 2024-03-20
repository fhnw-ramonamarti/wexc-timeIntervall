const spiral = document.querySelector("#spiralTime");

// cirvle spiral
const yy = 260;
let xx = 270;
let size = 25;
let elem = "";
let dd = 0;
for (let i = 0; i < 9; i++) {
    let form = size * i + size;

    if (i % 2 != 0) {
        //bottom
        xx -= size * i;
    } else {
        dd = -size / 2;
    }
    elem += `<svg width=""${
        i==8?form / 2:form + 5
    }" height=""${form}" xmlns="http://www.w3.org/2000/svg" id="time${i}" class=" ${
        i % 2 == 0 ? "lll" : "rrr"
    }" style="top:${yy}px;left:${xx - (size * i) / 2 - size / 2 - dd + 2}px;width:${
        i==8?form +5:form*2 + 5
    }px;height:${form+5}px">`;
    elem += `<circle r="${form}" cx="${form + 2}" cy="0" stroke="lightgray" fill="transparent" stroke-width="2" />`;
    elem += `</svg>`;
    if (i % 2 == 0) {
        // top
        xx += size * i;
        dd = 0;
    }
}
spiral.innerHTML = elem; 

// segment static size
let elem2 = "";
let x = 230,
    y = 250,
    grow = 25,
    growX = -20,
    growY = -20;
for (let i = 0; i < 16/* 24 * 4 */; i++) {
    const deg = i * 1/(35 * Math.PI/ 37.5/180)%360;
    if(deg < 180) {
        // x +
        growX = Math.abs(growX);
    }
    if(deg > 180) {
        growX = -Math.abs(growX);
        // x -
    }
    if(deg < 270 && deg > 90) {
        growY = Math.abs(growY);
        // y +
    }
    if(deg > 270 || deg < 90) {
        growY = -Math.abs(growY);
        // y -
    }
    let factor = Math.floor((i) / 3) * 10;
    switch (Math.floor(i) % 8) {
        case 0: // left
            grow += factor;
            y += -grow;
            break;
        case 1: // top
            x += grow;
            y += -grow;
            break;
        case 2: // right
            x += grow;
            break;
        case 3: // bottoms
            x += grow;
            y += grow;
            break;
        case 4: // left
            grow += factor;
            y += grow;
            break;
        case 5: // top
            x += -grow;
            y += grow;
            break;
        case 6: // right
            x += -grow;
            break;
        case 7: // bottoms
            x += -grow;
            y += -grow;
            break;
    }

    elem2 += `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" id="time${i}" class="segment" style="transform:rotate(${
        (i) * 45 + 110 
    }deg);top:${y}px;left:${x}px;">`;
    elem2 += `<path d="m 5 35 c 10 10 23 10 33 0 l -10 -30 c -5 2 -15 2 -15 0 Z" stroke="black" fill="transparent" stroke-width="2" >`;
    elem2 += `<path d="m 5 35 c 10 10 23 10 33 0" stroke="black" fill="transparent" stroke-width="2" class="length">`;
    elem2 += `<path d="m 5 35 c 10 10 23 10 33 0 l -10 -30" stroke="black" fill="transparent" stroke-width="2" class="length2">`;
    elem2 += `</svg>`;
}
elem2 += `<path d="m 5 35 c 10 10 30 10 40 0 l -10 -30 c -5 2 -15 2 -20 0 Z" stroke="black" fill="transparent" stroke-width="2" >`;

spiral.onclick = () => {
    spiral.innerHTML += elem2;
}