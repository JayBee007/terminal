var arrayOfCircles = []

function onKeyDown(event) {

  if(keyData[event.key]) {
    keyData[event.key].sound.play();
    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    var newCircle = Path.Circle(point, view.size.width*.15);
    newCircle.fillColor=keyData[event.key].color;
    arrayOfCircles.push(newCircle);
  }


}

function onFrame(event) {
    for(var i = 0; i < arrayOfCircles.length; i++) {
      arrayOfCircles[i].fillColor.hue +=1;
      arrayOfCircles[i].scale(.9);
      if(arrayOfCircles[i].area < 1){
        arrayOfCircles[i].remove();
        arrayOfCircles.splice(i, 1);
        i--;
    }
  }
}
