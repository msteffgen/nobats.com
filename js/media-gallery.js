document.addEventListener('DOMContentLoaded', function() {
    // Check if the necessary elements and data exist
    if (typeof albums === 'undefined') {
        console.error("Albums data is not loaded.");
        return;
    }

    // Decade filtering for photo albums
    const decadeFilters = document.querySelectorAll('.decade-filter');
    const albumCards = document.querySelectorAll('.album-card');

    if (decadeFilters.length > 0 && albumCards.length > 0) {
        decadeFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const decade = filter.dataset.decade;

                decadeFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                albumCards.forEach(card => {
                    const albumTitle = card.querySelector('.album-title').textContent;
                    const yearMatch = albumTitle.match(/\d{4}/);
                    if (!yearMatch) return;

                    const year = parseInt(yearMatch[0]);
                    let isVisible = true;

                    if (decade !== 'all') {
                        const decadeStart = parseInt(decade.substring(0, 3) + '0');
                        isVisible = year >= decadeStart && year < decadeStart + 10;
                    }

                    card.style.display = isVisible ? 'block' : 'none';
                });
            });
        });

        // Default to 'All Years'
        const allYearsFilter = document.querySelector('.decade-filter[data-decade="all"]');
        if (allYearsFilter) {
            allYearsFilter.click();
        }
    }

    // Photo gallery modal functionality
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalCounter = document.querySelector('.modal-counter');
    let currentAlbum = [];
    let currentIndex = 0;

    if (modal && modalImage && modalClose && modalPrev && modalNext && modalCounter) {
        document.querySelectorAll('.album-card').forEach(card => {
            card.addEventListener('click', function() {
                const albumId = this.getAttribute('data-album');
                if (albums[albumId]) {
                    currentAlbum = albums[albumId];
                    currentIndex = 0;
                    updateModalImage();
                    modal.classList.add('active');
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Navigate images
        modalPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateModalImage();
            }
        });

        modalNext.addEventListener('click', () => {
            if (currentIndex < currentAlbum.length - 1) {
                currentIndex++;
                updateModalImage();
            }
        });

        // Update modal image and counter
        function updateModalImage() {
            modalImage.src = currentAlbum[currentIndex];
            modalCounter.textContent = `${currentIndex + 1} / ${currentAlbum.length}`;

            modalPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            modalNext.style.visibility = currentIndex === currentAlbum.length - 1 ? 'hidden' : 'visible';
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                modalPrev.click();
            } else if (e.key === 'ArrowRight') {
                modalNext.click();
            }
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Video functionality
    const videos = document.querySelectorAll('video');
    if (videos.length > 0) {
        videos.forEach(video => {
            video.addEventListener('play', () => {
                videos.forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                    }
                });
            });
        });
    }
}); 