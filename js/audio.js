// Function to format time from seconds to M:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

document.querySelectorAll('.play-button').forEach(button => {
    const audioId = button.getAttribute('data-audio-id');
    const audioPlayer = document.getElementById(audioId);
    const card = button.closest('.audio-card');

    // Get the new UI elements for this specific card
    const progressBar = card.querySelector('.progress-bar');
    const currentTimeSpan = card.querySelector('.current-time');

    // === 1. CLICK TO PLAY/PAUSE LOGIC (Modified to include progress bar logic) ===
    button.addEventListener('click', function () {
        const icon = this.querySelector('i');

        if (audioPlayer.paused) {
            // Pause all others (as before)
            document.querySelectorAll('audio').forEach(otherPlayer => {
                if (otherPlayer !== audioPlayer && !otherPlayer.paused) {
                    otherPlayer.pause();
                    document.querySelector(`[data-audio-id="${otherPlayer.id}"]`).closest('.audio-card').classList.remove('playing');
                    document.querySelector(`[data-audio-id="${otherPlayer.id}"] i`).className = 'fas fa-play-circle';
                }
            });

            audioPlayer.play();
            icon.className = 'fas fa-pause-circle';
            card.classList.add('playing');
        } else {
            audioPlayer.pause();
            icon.className = 'fas fa-play-circle';
            card.classList.remove('playing');
        }
    });

    // === 2. UPDATE PROGRESS BAR AND TIME AS AUDIO PLAYS ===
    audioPlayer.addEventListener('timeupdate', function () {
        if (!isNaN(audioPlayer.duration)) {
            // Update the slider position
            progressBar.value = audioPlayer.currentTime;

            // Update the current time display
            currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        }
    });

    // === 3. SET PROGRESS BAR MAX VALUE WHEN METADATA LOADS ===
    audioPlayer.addEventListener('loadedmetadata', function () {
        // Set the max value of the range input to the total duration
        progressBar.max = audioPlayer.duration;
    });

    // === 4. ALLOW USER TO SCRUB/SEEK (Fast Forward/Rewind) ===
    progressBar.addEventListener('input', function () {
        // When the user drags the slider, update the audio player's time
        audioPlayer.currentTime = progressBar.value;
    });

    // === 5. RESET STATE WHEN AUDIO ENDS (As before) ===
    audioPlayer.addEventListener('ended', function () {
        const icon = card.querySelector('.audio-icon i');
        icon.className = 'fas fa-play-circle';
        card.classList.remove('playing');
        progressBar.value = 0; // Reset slider
        currentTimeSpan.textContent = "0:00"; // Reset time
    });
});