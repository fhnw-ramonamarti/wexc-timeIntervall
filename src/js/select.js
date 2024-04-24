const rects = document.getElementsByClassName("rect");

let id = -1;

let start = -1;
let end = -1;

for (let i = 0; i < rects.length; i++) {
    rects[i].addEventListener("mousedown", (event) => {
        event.target.style.background = "purple";
        start = i+1;
        console.log(rects[i].id);
    });
}

for (let i = 0; i < rects.length; i++) {
    rects[i].addEventListener("mouseup", (event) => {

        end = i+1;

        for(let i = start; i === end; i++) {
            console.log("Hier bitschö: " + i);
            rects[i-1].style.background = "red";
        }

    });
}

function select () {
    
}



// on click end duet onclicked uf false, ner e eventlistener bi hover aber nur wenns onclicked true isch, de d id nä
// vo dem wo ghooveret wird und aui ids wo chliner si aus die aber grösser aus dr click werde de rot