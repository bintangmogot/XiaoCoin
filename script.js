
// fungsi-fungsi music player
let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
let songImg = document.getElementById('songImg');

let currentSongIndex = 0; // Index of the current song in the playlist


const playlist = [
    { title: 'AIMORAIMO - Tuki.', source: '/audio/tuki.『アイモライモ』Official Music Video.mp3', image: '/Images/aimoraimo-yorushika.jpg' },

    { title: 'HARU - Yorushika', source: '/Audio/ヨルシカ - 晴る（OFFICIAL VIDEO）.mp3', image: '/images/haru-yorushika.png' },

    { title: 'SEESAW - Tuki', source: '/Audio/tuki.『シーソー』Official Music Video.mp3', image: '/Images/seesaw-tuki.webp' },

    { title: 'GHOST IN A FLOWER - Yorushika', source: '/Audio/ヨルシカ - 花に亡霊（OFFICIAL VIDEO）.mp3', image: '/Images/hana ni bourei-yorushika.jpg' },

    // Add more songs to your playlist

];

// Load the current song
loadSong();

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}
// // Play the song after the page loads
window.addEventListener('load', () => {
    song.play().then(() => {
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }).catch((error) => {
        console.error('Autoplay failed:', error);
    });
});

// Play the song after the page loads
    // window.addEventListener('load', () => {
    //     song.play();
    //     ctrlIcon.classList.add('fa-pause');
    //     ctrlIcon.classList.remove('fa-play');
    // });

function loadSong() {
    let currentSong = playlist[currentSongIndex];
    song.src = currentSong.source;
    songImg.src = currentSong.image;
    document.querySelector('h6').textContent = currentSong.title;
}

function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }
}

// Update progress continuously
setInterval(() => {
    progress.value = song.currentTime;
}, 500);

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong();
    song.play();
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong();
    song.play();
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function rotateImage() {
    let rotation = 0;
    setInterval(() => {
        if (!song.paused) {
            rotation = (rotation + 1) % 360;
            songImg.style.transform = `rotate(${rotation}deg)`;
        }
    }, 50);
}

rotateImage();

song.onended = function () {
    playNext();
}