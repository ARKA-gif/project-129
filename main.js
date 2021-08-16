status1 = "";
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;

function preload() 
{
    song1 = loadSound("Peter_Pan_Title_Song.mp3");
    song2 = loadSound("Harry_Potter_Theme_Song.mp3");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = craeteCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() 
{
    console.log("Model is Inatialized");
}

function gotPoses(results) 
{
    if (results.length > 0) 
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.x;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
    }
}

function draw() 
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    
    status1 = song1.isPlaying(true);

    if (scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(status1 == false) 
        {
            song1.play()
            document.getElementById("song").innerHTML="Peter Pan";
        }
    }
}