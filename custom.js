// Services Panel Toggle
function toggleServicesPanel() {
    const panel = document.querySelector('.services-panel');
    panel.classList.toggle('active');

    // Add visual feedback for the button
    const trigger = document.querySelector('.services-trigger');
    trigger.style.transform = panel.classList.contains('active') 
        ? 'translateY(-50%) rotate(90deg)'
        : 'translateY(-50%) rotate(0deg)';
}

// Close panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.querySelector('.services-panel');
    const trigger = document.querySelector('.services-trigger');

    if (!panel.contains(event.target) && !trigger.contains(event.target)) {
        panel.classList.remove('active');
    }
});

// Media Player Functionality
let currentAudio = null;

// Show media player when audio is played
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', function() {
        pauseOtherAudios(this);
        currentAudio = this;
        const songTitle = this.closest('.audio-player').querySelector('.song-title').textContent;
        showMediaPlayer(songTitle);
        updateSeekBar(); // Initialize seek bar
    });
});

// Hide media player when audio ends
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('ended', function() {
        hideMediaPlayer();
    });
});

// Toggle play/pause
function togglePlay() {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }
}

// Stop playback
function stopPlayback() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        hideMediaPlayer();
    }
}

// Show media player
function showMediaPlayer(songTitle) {
    const mediaPlayer = document.querySelector('.media-player-bar');
    const currentSong = document.querySelector('.current-song');
    currentSong.textContent = songTitle;
    mediaPlayer.classList.add('visible');
}

// Hide media player
function hideMediaPlayer() {
    const mediaPlayer = document.querySelector('.media-player-bar');
    mediaPlayer.classList.remove('visible');
}

// Pause other audios
function pauseOtherAudios(currentAudio) {
    document.querySelectorAll('audio').forEach(audio => {
        if (audio !== currentAudio && !audio.paused) {
            audio.pause();
        }
    });
}

// Skip backward by 10 seconds
function skipBackward() {
    if (currentAudio) {
        currentAudio.currentTime = Math.max(0, currentAudio.currentTime - 10);
    }
}

// Skip forward by 10 seconds
function skipForward() {
    if (currentAudio) {
        currentAudio.currentTime = Math.min(currentAudio.duration, currentAudio.currentTime + 10);
    }
}

// Update seek bar and time display
function updateSeekBar() {
    if (currentAudio) {
        const seekSlider = document.getElementById("seek-slider");
        const currentTimeDisplay = document.querySelector(".current-time");
        const durationDisplay = document.querySelector(".duration");

        // Update seek slider value
        seekSlider.value = (currentAudio.currentTime / currentAudio.duration) * 100;

        // Update current time display
        const currentMinutes = Math.floor(currentAudio.currentTime / 60);
        const currentSeconds = Math.floor(currentAudio.currentTime % 60);
        currentTimeDisplay.textContent = `${String(currentMinutes).padStart(2, "0")}:${String(currentSeconds).padStart(2, "0")}`;

        // Update duration display
        const durationMinutes = Math.floor(currentAudio.duration / 60);
        const durationSeconds = Math.floor(currentAudio.duration % 60);
        durationDisplay.textContent = `${String(durationMinutes).padStart(2, "0")}:${String(durationSeconds).padStart(2, "0")}`;
    }
}

// Seek audio based on slider input
function seekAudio() {
    if (currentAudio) {
        const seekSlider = document.getElementById("seek-slider");
        const seekTime = (seekSlider.value / 100) * currentAudio.duration;
        currentAudio.currentTime = seekTime;
    }
}

// Add event listeners to update seek bar
document.querySelectorAll("audio").forEach(audio => {
    audio.addEventListener("timeupdate", updateSeekBar);
    audio.addEventListener("loadedmetadata", updateSeekBar);
});

// Toggle Lyrics Visibility
function toggleLyrics(id) {
    const lyricsContent = document.getElementById(id);
    const toggleButton = lyricsContent.previousElementSibling;

    if (lyricsContent.style.display === "none" || lyricsContent.style.display === "") {
        lyricsContent.style.display = "block";
        toggleButton.textContent = "Hide Lyrics";
    } else {
        lyricsContent.style.display = "none";
        toggleButton.textContent = "Show Lyrics";
    }
}