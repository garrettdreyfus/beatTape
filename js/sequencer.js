padSequence =[[],[],[]]
positionStrip=[];
bpmStrip = [];
powers = [1,2,4,8,16,32,64,128];
bpm=90
running=true;
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
function createBpmStrip(width,tapeHeight){
    for(var count=0; count<16;count++){
        var x = (count%16);
        var y = Math.floor((count/16));
        var pad = formatPadHTML(x*width+10,(50+(1.5*tapeHeight/3)),width,tapeHeight/6,x,y);
        document.body.appendChild(pad);
        bpmStrip.push(pad);
    }
    updateBpm(bpm);
}

function updateBpm(newbpm){
   bpm=newbpm;
   var i=7;
   var binary=newbpm
   while(binary>=0 && i>-1){
        console.log(binary);
        if(powers[i]<=binary){
                binary= binary - powers[i]
                bpmStrip[i].className = "pad on";
        }
        else{
                bpmStrip[i].className = "pad off";
        }
        i--;
   }
}
function toggleRunning(){
   if(running==false){
        running=true;
        runSequence(0);
        document.getElementById("pausebutton").className="pad play";
   }
   else{
        $('.pos').addClass("off")
        $('.pos').removeClass('pos');
        running = false;
        document.getElementById("pausebutton").className="pad pause";
   }
}
window.onload = function() {
        createPads(5,30);
        createPositionStrip(5,30);
        createBpmStrip(5,30);
        initiateAudio();
        runSequence(0);
};
window.onblur = function(){
        if(! $("#pausebutton").hasClass("pause")){
                $("#pausebutton").click();
        }

}
function preparePrint(){
        $("#bpmSlider").hide();
        if(! $("#pausebutton").hasClass("pause")){
                $("#pausebutton").click();
        }
        $("#pausebutton").hide();
        $("#printbutton").hide();
        
        window.print();
        $("#bpmSlider").show();
        $("#pausebutton").show();
        $("#printbutton").show();

}

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
        var pad = formatPadHTML(x*width+10,(50-(2*tapeHeight/3)),width,tapeHeight/6,x,y);
        document.body.appendChild(pad);
        positionStrip.push(pad);
    }
}
function createPads(width,tapeHeight){
    for(var count=0; count<48;count++){
        var x = (count%16);
        var y = Math.floor((count/16));
        var pad = formatPadHTML(x*width+10,(100-(tapeHeight/2)) + y * (tapeHeight/3) -50,width,tapeHeight/3,x,y);
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

function runSequence(pos){
        if(running){ 
            stepPositionStrip(pos);
            for(var i=0;i<3;i++){
                    if(padSequence[i][pos].className=="pad on"){
                           lowLag.play(rowAudio[i]);
                    }
            }
            setTimeout(function(){
                    runSequence((pos+1)%16);
            },15000/bpm);
        }
}
