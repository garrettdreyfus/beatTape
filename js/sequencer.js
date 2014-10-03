window.onload = function() {
        createPads();
};

function formatPadHTML (x,y,height,width){
    return "<div class='pad' style='top:"+y+"%; left:"+x+"%; height:" + height + "%; width:"+ width "; '</div>"
}
function createPads(){
    for(var count=0; count<64;count++){
        console.log(createPads(1,1,1,2))
    }
}
