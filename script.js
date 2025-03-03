    // Wait for the complete page to load
    window.addEventListener("load", function() {
        // Ensure loader is visible for at least 3 seconds
        setTimeout(function() {
            // Hide the loader
            document.getElementById("loader").style.display = "none";
            // Display the main content
            document.getElementById("content").style.display = "block";
        }, 3000);
    });

        // Scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const scrollTrack = document.querySelector('.scroll-track');
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight);
            
            // Calculate indicator height relative to track
            const trackHeight = scrollTrack.offsetHeight;
            scrollIndicator.style.height = `${scrolled * trackHeight}px`;
        });

        // Smooth scroll and active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Update opacity based on scroll
        window.addEventListener('scroll', () => {
            if(window.innerWidth > 768) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    const section = document.querySelector(link.getAttribute('href'));
                    if(!section) return;
                    
                    const rect = section.getBoundingClientRect();
                    link.style.opacity = rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2 ? '1' : '0.5';
                });
            }
        });

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