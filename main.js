song = "";
LeftWristX = "0";
LeftWristY = "0";
RightWristX = "0";
RightWristY = "0";
scoreLeftWrist = "0";
scoreRightWrist = "0";

function preload()
{
    song = loadSound("op.mp3");
    
}

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.hide();

    canvas = createCanvas(550, 500);
    canvas.position(600,200)

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw()
{
   image(video, 0, 0, 550, 500);

   fill("#FF0000")
   stroke("#FF0000")
    
   if(scoreLeftWrist > 0.2)
   {
   circle(LeftWristX,LeftWristY,20);
   InNumberLeftWristY = Number(LeftWristY);
   remove_decimals = floor(InNumberLeftWristY);
   volume = remove_decimals/500;
   document.getElementById("volume").innerHTML = "Volume = " + volume;
   song.setVolume(volume);
   }
}

function modelLoaded()
{
    console.log('Posenet is Initialized');
}  

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[8].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);
        console.log("ScoreRightWrist = " + scoreRightWrist);
        console.log(results);
        LeftWristX = results[0].pose.leftWrist.x
        LeftWristY = results[0].pose.leftWrist.y   
        RightWristX = results[0].pose.rightWrist.x
        RightWristY = results[0].pose.rightWrist.y
        console.log("LeftWristX = " + LeftWristX +"LeftWristY = " + LeftWristY );
        console.log("RightWristX = " + RightWristX +"RightWristY = " + RightWristY );

    }
}
