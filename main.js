array_objects = [];
status = "";
let video;

function preload()
{
video = createVideo('video.mp4');
}


function setup ()
{
    canvas = createCanvas(500,300);
    canvas.center();
    video.hide();

}

function modelloaded()
{
    console.log("modelloaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw()
{
image(video, 0, 0, 500, 300);

if(status != "")
{
    objects_detected.detect(video, gotResults);
    for (var index = 0; index < array_objects.length; index++) 
    {
        document.getElementById("status").innerHTML = "Status - Detected ";
        document.getElementById("no_ofObjects").innerHTML = "Number of objects detected are - "+array_objects.length;

        fill('#FF0000');
        noFill();
        stroke('#FF0000');
        percent = floor(array_objects[index].confidence*100);
        text(array_objects[index].label +"" +percent+"%", array_objects[index].x, array_objects[index].y);
        rect(array_objects[index].x, array_objects[index].y, array_objects[index].width, array_objects[index].height);

    }
    }
}

function gotResults(error, results)
{
if(error)
{
console.log(error);
}

else
{
console.log(results);

array_objects = results;

}

}

function Start()
{
    objects_detected = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}