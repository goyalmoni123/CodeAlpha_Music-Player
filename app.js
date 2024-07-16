const songs=[
    
    {
        title:"Sun Saathiyan",
         name:"Divya Kumar, Priya Saraiya",
        source:"Sun Saathiyan.mp3",
        cover:"song2.png",   
    },
    {
        title:"Hoo Nhi Skta",
        name:"Udit Narayan",
        source:"Hoo Nhi Skta.mp3",
        cover:"song1.png",   
    },
    {
        title:"Keech Meri Photo",
        name:" Akasa, Darshan Raval, and Neeti Mohan",
        source:"Keech Meri Photo.mp3",
        cover:"song3.png",   
    },
    {
        title:"Kho Na Jaana Mujhe Dekhte Dekhte ",
        name:"Vishal Mishra, Raj Shekhar",
        source:"Kho Na Jaana Mujhe Dekhte Dekhte.mp3",
        cover:"s5.PNG",
    },
    {
        title:"Chal Wahan Jaate Hain",
        name:"Arijit Singh",
        source: "Chal Wahan Jaate Hain.mpeg",
        cover:"s2.PNG",
    },
    {
        title:"Aankhon Se Tune Kya",
        name:"Alka Yagnik and Kumar Sanu",
        source:"Aankhon Se Tune Kya.mp3",
        cover:"s4.PNG",   
    },
    {
        title:"pal-pal-dil-ke-pass",
        name:"Arijit Singh and Parampara Thakur",
        source:"pal-pal-dil-ke-pass.mp3",
        cover:"s6.PNG",   
    },
    {
        title:"Romantic Song",
        name:"Shreya Ghoshal",
        source:"Romantic Song.mp3",
        cover:"s3.PNG",   
    },
    {
        title:"Tere Hawale",
        name:"Shreya Ghoshal",
        source:"Tere Hawale.mp3",
        cover:"s7.PNG",   
    },
    {
        title:"wajah tum ho",
        name:" Mithoon, and Tulsi Kumar",
        source:"wajah tum ho.mp3",
        cover:"s8.PNG",   
    },
];
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".song-title");
const artistName = document.querySelector(".artist-name");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

function startRotation(){
    if(!rotating){
        rotating = true;
        rotationInterval = setInterval(rotateImage, 50);
    }
}

function pauseRotation(){
    clearInterval(rotationInterval);
    rotating = false;
}

function rotateImage(){
    currentRotation += 1;
    rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

let currentSongIndex = 0;

function updateSongInfo(){
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;
    rotatingImage.src = songs[currentSongIndex].cover;
}

song.addEventListener("loadeddata", function(){

});

song.addEventListener("timeupdate", function(){
    if(!song.paused){
        progress.value = song.currentTime;
    }
});

song.addEventListener("loadedmetadata", function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
});

song.addEventListener("ended", function(){
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
});

function playPause(){
    if (song.paused){
        song.play();
        controlIcon.classList.add("fa-solid", "fa-pause");
        controlIcon.classList.remove("fa-solid", "fa-play");
        startRotation();
    }else{
        song.pause();
        controlIcon.classList.remove("fa-solid", "fa-pause");
        controlIcon.classList.add("fa-solid", "fa-play");
        pauseRotation();
    }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function(){
    song.currentTime = progress.value;
});

progress.addEventListener("change", function(){
    if (song.paused) {
        song.play();
        controlIcon.classList.add("fa-solid", "fa-pause");
        controlIcon.classList.remove("fa-solid", "fa-play");
        startRotation();
    }
});

forwardButton.addEventListener("click", function(){
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
});

backwardButton.addEventListener("click", function(){
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    playPause();
});

updateSongInfo();
