padSequence =[[],[],[]]
positionStrip=[];
bpm=90
function initiateAudio(){
    lowLag.init() 
    lowLag.load('sounds/kick.wav');
    lowLag.load('sounds/snare.wav');
    lowLag.load('sounds/hat.wav');
    rowAudio = {
            0:"sounds/hat.wav",
            1:"sounds/snare.wav",
            2:"sounds/kick.wav",
    }
}
window.onload = function() {
        createPads(6.25,50);
        createPositionStrip(6.25,50);
        initiateAudio();
        playSequence(0);
};

function formatPadHTML (x,y,width,height,column,row){
    var pad = document.createElement('div');
    pad.className = "pad off";
    pad.style.top = y+"%";
    pad.style.left = x+"%";
    pad.style.width = width+"%";
    pad.style.height = height+"%";
    pad.x=column;
    pad.y=row;
    return pad
}
function togglePad(pad){
    var x = parseInt(pad.x);
    var y = parseInt(pad.y);
    console.log(x,y);
    padSequence[y][x].className = (padSequence[y][x].className == "pad on") ? "pad off" : "pad on"; 

}
function createPositionStrip(width,tapeHeight){
    for(var count=0; count<16;count++){
        var x = (count%16);
        var y = Math.floor((count/16));
        var pad = formatPadHTML(x*width,(50-(2*tapeHeight/3)),width,tapeHeight/6,x,y);
        document.body.appendChild(pad);
        positionStrip.push(pad);
    }
}
function createPads(width,tapeHeight){
    for(var count=0; count<48;count++){
        var x = (count%16);
        var y = Math.floor((count/16));
        var pad = formatPadHTML(x*width,(100-(tapeHeight/2)) + y * (tapeHeight/3) -50,width,tapeHeight/3,x,y);
        pad.onclick=function() {
            togglePad(this);
        }
        document.body.appendChild(pad);
        padSequence[y].push(pad);
    }
}
function stepPositionStrip(pos){
        positionStrip[pos].className = "pad pos"
        positionStrip[(pos+15)%16].className = "pad off "
}

function playSequence(pos){
        stepPositionStrip(pos);
        for(var i=0;i<3;i++){
                if(padSequence[i][pos].className=="pad on"){
                       lowLag.play(rowAudio[i]);
                }
        }
        setTimeout(function(){
                playSequence((pos+1)%16);
        },15000/bpm);
}
