let songIndex = 0;
let audioElement = new Audio('songs/5.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');


let songs = [
    {songName: "Meri Zindagi Hai Tu", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dil Galti Kar Baitha Hai", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sakhiya 2 Bell Bottom", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Raataan Lambiyan Shershaah", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Filhaal 2 Mohabbat B Praak", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Zaalima Coca Cola", filePath: "songs/1.mp3", coverPath: "covers/6.jpg"},
    {songName: "Phisal Jaa Tu", filePath: "songs/1.mp3", coverPath: "covers/7.jpg"},
    {songName: "Mehfooz - Hacked", filePath: "songs/1.mp3", coverPath: "covers/8.jpg"},
    {songName: "Kabhii Tumhhe - Shershah", filePath: "songs/1.mp3", coverPath: "covers/9.jpg"},
    {songName: "Param Sundari - Mimi", filePath: "songs/1.mp3", coverPath: "covers/10.jpg"}


]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;  
    }
})

audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log('progress');
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=> {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    } else{
        songIndex += 1; 
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    } else{
        songIndex -= 1; 
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})