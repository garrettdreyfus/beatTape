function translateRawToImage(height, width, raw){
    var image = [];
    for(var y=0;y<height;y++){
        var row=[]
        for(var x=0;x<width;x++){
            row.push([row[(y*width)+(x*4)],row[(y*width)+(x*4)+1],row[(y*width)+(x*4)+2]]);
        }
        image.push(row);
    }
    return image;
}
function averageOfArea(aX,aY,bX,bY,image){
       var totals=[0,0,0];       
       if(bY>aY){
           for(var y=0;y<bY-aY;y++){
                    if(bX>aX){
                        for(var x=0;x<bX-aX;x++){
                            totals[0] += image[aY+y][aX+x][0];
                            totals[1] += image[aY+y][aX+x][1];
                            totals[2] += image[aY+y][aX+x][2];
                        }
                    }
                    else{
                        for(var x=0;x<aX-bX;x++){
                            totals[0] += image[aY+y][bX+x][0];
                            totals[1] += image[aY+y][bX+x][1];
                            totals[2] += image[aY+y][bX+x][2];
                        }

                    }
           }
       }
       if(aY>bY){
           for(var y=0;y<bY-aY;y++){
                    if(bX>aX){
                        for(var x=0;x<bX-aX;x++){
                            totals[0] += image[bY+y][aX+x][0];
                            totals[1] += image[bY+y][aX+x][1];
                            totals[2] += image[bY+y][aX+x][2];
                        }
                    }
                    else{
                        for(var x=0;x<aX-bX;x++){
                            totals[0] += image[bY+y][bX+x][0];
                            totals[1] += image[bY+y][bX+x][1];
                            totals[2] += image[bY+y][bX+x][2];
                        }

                    }
           }
       }
       for(var i=0;i<3;i++){
           totals[i] /= (Math.abs(bX-aX)*Math.abs(bY-aY));
       }
       return totals;
}
function isOn(aX,aY,bX,bY,image){
    areaaverage = averageOfArea(aX,aY,bX,bY,image);
    if(areaaverage[0]>255 && areaaverage[1]>255 && areaaverage[2]>255){
        return 0;
    }
    return 1;
}
function imageToTape (height, width, image){
    //position and bpm strip height one half that of pads
    var stepLength = Math.floor(width/16);
    var halfPadHeight = Math.floor(height/5);
    var pads = [];
    for(var y=0;y<3;y++){
        var row =[];
        for(var x=0; x<16; x++){
            row.push(isOn(
                        (x*stepLength),
                        (x*(stepLength + 1)),
                        (y*(2*halfPadHeight)),
                        (y*(4*halfPadHeight)),
                        image
                        ))
        }
        pads.push(row);
    }
    var bpm=0;
    for(var i=0;i<8;i++){
       bpm+=isOn(x*stepLength,(x*stepLength)+1,y*2*halfPadHeight,y*4*halfPadHeight)*Math.pow(2,7-i);
    }
}
