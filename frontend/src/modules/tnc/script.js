var tncBtn = document.getElementById("tnc-btn");
var privBtn = document.getElementById("priv-btn");
var tncBubble = document.getElementById("tnc-bubble");
var privBubble = document.getElementById("priv-bubble");
let active = tncBtn;
let activeBubble = tncBubble;
btnAction();

function btnAction(){
    active.style.backgroundColor = "#FFFFFF"
    active.style.borderRadius = "1em 0 0 1em";
    active.style.margin = "0.25em -2.75em .25em 0";
    active.style.color = "#154360";

    activeBubble.style.display = "block";
    activeBubble.style.zIndex = "2";
}

function tncOnClick() {
    if (active != tncBtn){
        active = tncBtn;
        activeBubble = tncBubble;
        privBubble.style.zIndex = "-1";
        privBubble.style.display = "none";
        privBtn.style.backgroundColor = "#cfcfcf";
        privBtn.style.color = "#154360";
        privBtn.style.borderRadius = "1em";
        privBtn.style.margin = "0.25em .25em .25em 0";
    } 
    btnAction()
}
function privOnClick() {
    if (active != privBtn){
        active = privBtn;
        activeBubble = privBubble;
        tncBubble.style.zIndex = "-1";
        tncBubble.style.display = "none";
        tncBtn.style.backgroundColor = "#cfcfcf";
        tncBtn.style.color = "#154360";
        tncBtn.style.borderRadius = "1em";
        tncBtn.style.margin = "0.25em .25em .25em 0";
    }
    btnAction()
}