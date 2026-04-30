const songs = [
    { title: "Für Elise ", artist: "Ludwig van Beethoven ", src: "songs/song1.mp3" },
    { title: "Moonlight Sonata", artist: "Ludwig van Beethoven", src: "songs/song2.mp3" },
    { title: "Clair de Lune", artist: "Claude Debussy", src: "songs/song3.mp3" },
    { title: "River Flows in You", artist: "Yiruma", src: "songs/song4.mp3" },
    { title: "Gymnopédie No. 1", artist: "Erik Satie", src: "songs/song5.mp3" },
    { title: "Nuvole Bianche", artist: "Ludovico Einaudi", src: "songs/song6.mp3" },
    { title: "Prelude in C Major", artist: "Johann Sebastian Bach", src: "songs/song7.mp3" },
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");
const playlist = document.getElementById("playlist");

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "||";
        isPlaying = true;
    } else {
        audio.pause();
        playBtn.textContent = "▶";
        isPlaying = false;
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        document.getElementById("current").textContent = formatTime(audio.currentTime);
        document.getElementById("duration").textContent = formatTime(audio.duration);
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.onclick = () => {
            currentSongIndex = index;
            loadSong(index);
            audio.play();
            playBtn.textContent = "||";
            isPlaying = true;
        };
        playlist.appendChild(li);
    });
}

audio.addEventListener("ended", nextSong);

// Initialize
loadSong(currentSongIndex);
loadPlaylist();