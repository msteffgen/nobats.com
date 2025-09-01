/**
 * No Bats Baseball Club - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize core components
    initHeader();
    initMobileNav();
    initAOS();

    // Initialize page-specific components
    initTabSystem();
    initDonationFilters();
    initCounters();
    initTestimonialsCarousel();
    initMediaCarousel();

    // Initialize hero photo carousel
    initHeroPhotoCarousel();

    // Initialize smooth scrolling
    initSmoothScrolling();
});

/**
 * Header scroll effect
 */
function initHeader() {
    const header = document.querySelector('.header');

    if (!header) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile navigation
 */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create overlay for mobile menu if it doesn't exist
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        body.classList.toggle('nav-open');
        navToggle.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function () {
        navMenu.classList.remove('active');
        body.classList.remove('nav-open');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Handle ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            navToggle.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            document.querySelector('.nav-overlay')?.classList.remove('active');
            document.querySelector('.nav-toggle')?.classList.remove('active');
            document.querySelector('.nav-menu')?.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

/**
 * Slider initialization
 */
function initSliders() {
    // Check if Swiper is available
    if (typeof Swiper !== 'undefined') {
        // Testimonials slider
        const testimonialSlider = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Events slider for mobile
        const eventsSlider = new Swiper('.events-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

/**
 * Counter animation
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');

    if (!counters.length) return;

    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const speed = Math.ceil(target / 100); // Adjust speed based on target value

                    const updateCount = () => {
                        if (count < target) {
                            count += speed;
                            if (count > target) count = target;
                            // Check if this is the donation counter and format accordingly
                            if (counter.classList.contains('donation-counter')) {
                                counter.textContent = '$' + formatNumber(count);
                            } else {
                                counter.textContent = formatNumber(count);
                            }
                            requestAnimationFrame(updateCount);
                        } else {
                            if (counter.classList.contains('donation-counter')) {
                                counter.textContent = '$' + formatNumber(target);
                            } else {
                                counter.textContent = formatNumber(target);
                            }
                        }
                    };

                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (counter.classList.contains('donation-counter')) {
                counter.textContent = '$' + formatNumber(target);
            } else {
                counter.textContent = formatNumber(target);
            }
        });
    }
}

/**
 * Format numbers with commas
 */
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

/**
 * Donation year filter functionality
 */
function initDonationFilters() {
    const yearLinks = document.querySelectorAll('.donation-year-link');
    const donationYears = document.querySelectorAll('.donation-year');

    if (!yearLinks.length || !donationYears.length) return;

    yearLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const year = this.getAttribute('data-year');

            // Remove active class from all links
            yearLinks.forEach(item => item.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Hide all donation years
            donationYears.forEach(item => item.style.display = 'none');

            // Show the selected year
            const selectedYear = document.getElementById(`donation-${year}`);
            if (selectedYear) {
                selectedYear.style.display = 'block';
            }

            // Update URL hash
            history.pushState(null, null, `#${year}`);
        });
    });

    // Check for hash in URL on page load
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`.donation-year-link[data-year="${hash}"]`)) {
        document.querySelector(`.donation-year-link[data-year="${hash}"]`).click();
    } else if (yearLinks.length) {
        // Default to first year
        yearLinks[0].click();
    }
}

/**
 * Initialize map functionality
 */
function initMapFunction() {
    const mapContainer = document.getElementById('map');

    if (!mapContainer) return;

    // Check if Google Maps API is loaded
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        const mapOptions = {
            center: { lat: 39.8283, lng: -98.5795 }, // Center of the US
            zoom: 4,
            styles: [
                {
                    featureType: "administrative",
                    elementType: "all",
                    stylers: [{ saturation: -100 }]
                },
                {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{ saturation: -100 }]
                },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{ saturation: -100 }]
                },
                {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{ saturation: -100 }]
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{ saturation: -100 }]
                },
                {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{ saturation: -100 }]
                }
            ]
        };

        const map = new google.maps.Map(mapContainer, mapOptions);

        // Add markers for each state with members
        // This would be replaced with actual data from the database
        const states = [
            { name: 'Texas', lat: 31.9686, lng: -99.9018, members: 15 },
            { name: 'California', lat: 36.7783, lng: -119.4179, members: 10 },
            { name: 'Florida', lat: 27.6648, lng: -81.5158, members: 8 },
            { name: 'New York', lat: 43.0, lng: -75.0, members: 5 },
            { name: 'Illinois', lat: 40.0, lng: -89.0, members: 7 }
        ];

        states.forEach(state => {
            const marker = new google.maps.Marker({
                position: { lat: state.lat, lng: state.lng },
                map: map,
                title: state.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#2563eb',
                    fillOpacity: 0.8,
                    strokeWeight: 0
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="map-info"><h4>${state.name}</h4><p>${state.members} members</p></div>`
            });

            marker.addListener('click', function () {
                // Close any open info windows
                document.querySelectorAll('.map-info-window').forEach(window => {
                    window.close();
                });

                infoWindow.open(map, marker);
            });
        });
    }
}

/**
 * Initialize AOS (Animate On Scroll) library if available
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Check if we're on a page that needs smooth scrolling
    const hasAnchorLinks = document.querySelectorAll('a[href^="#"]').length > 0;

    if (!hasAnchorLinks) return;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Hero video initialization and fallback
 */
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');

    if (!heroVideo) return;

    // Ensure video loads properly
    heroVideo.addEventListener('loadeddata', function () {
        // Video loaded successfully
        console.log('Hero video loaded successfully');
    });

    // Error handling
    heroVideo.addEventListener('error', function (e) {
        console.error('Error loading hero video:', e);

        // Apply a background image as fallback
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundImage = 'url("img/nbbclogo.png")';
            hero.style.backgroundSize = 'cover';
            hero.style.backgroundPosition = 'center center';
        }
    });

    // Force reload if paused or stalled
    heroVideo.addEventListener('stalled', function () {
        heroVideo.load();
    });
}

/**
 * Initializes all tab systems on the page.
 * A tab system is identified by a `data-tab-container` attribute on a container.
 * Within the container, it finds tabs with `[data-target]` and content panes
 * with an `id` that matches the target.
 */
function initTabSystem() {
    const tabContainers = document.querySelectorAll('[data-tab-container]');

    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('[data-target]');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.target;

                // Find all content panes related to this tab group
                const contentPanes = Array.from(tabs).map(t => document.getElementById(t.dataset.target)).filter(Boolean);

                // Update active class on tabs within this container
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show/hide content panes
                contentPanes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.style.display = 'block';
                    } else {
                        pane.style.display = 'none';
                    }
                });

                // Refresh AOS animations after tab switch
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => AOS.refresh(), 100);
                }

                // Special handling for explanation text on members page
                if (container.closest('.section').querySelector('#lineup-explanation')) {
                    const lineupExplanation = document.getElementById('lineup-explanation');
                    const dlExplanation = document.getElementById('dl-explanation');
                    if (lineupExplanation && dlExplanation) {
                        lineupExplanation.style.display = (targetId === 'lineup') ? 'block' : 'none';
                        dlExplanation.style.display = (targetId === 'disabled-list') ? 'block' : 'none';
                    }
                }
            });
        });

        // Activate the default tab for each container
        const defaultTab = container.querySelector('.section-tab.active') || container.querySelector('[data-target]');
        if (defaultTab) {
            defaultTab.click();
        }
    });
}

/**
 * Member search functionality
 */
function initMemberSearch() {
    const searchInput = document.querySelector('.search-input');
    const memberCards = document.querySelectorAll('.member-card');

    if (!searchInput || !memberCards.length) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        memberCards.forEach(card => {
            const memberName = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const memberLocation = card.querySelector('.member-info span')?.textContent.toLowerCase() || '';
            const memberRole = card.querySelector('.member-role')?.textContent.toLowerCase() || '';

            // Check if search term matches name, location, or role
            const isMatch = memberName.includes(searchTerm) ||
                memberLocation.includes(searchTerm) ||
                memberRole.includes(searchTerm);

            // Show/hide the entire column container
            const column = card.closest('[class*="col-"]');
            if (column) {
                column.style.display = isMatch ? 'block' : 'none';
            }
        });
    });
}

/**
 * Testimonials carousel initialization
 */
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevButton = carousel.querySelector('.carousel-arrow.prev');
    const nextButton = carousel.querySelector('.carousel-arrow.next');
    let currentIndex = 0;
    let autoRotateInterval;

    if (slides.length <= 1) {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        return;
    }

    // Clear existing dots
    dotsContainer.innerHTML = '';

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.classList.add('carousel-indicator'); // Use same class as other carousel for consistency
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopAutoRotate();
            showSlide(i);
            startAutoRotate();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Event Listeners for arrows
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            stopAutoRotate();
            prevSlide();
            startAutoRotate();
        });

        nextButton.addEventListener('click', () => {
            stopAutoRotate();
            nextSlide();
            startAutoRotate();
        });
    }

    startAutoRotate();
}

function initMediaCarousel() {
    const carousel = document.querySelector('.media-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevButton = carousel.querySelector('.carousel-arrow.prev');
    const nextButton = carousel.querySelector('.carousel-arrow.next');

    // Get existing slides from HTML
    const slides = Array.from(track.querySelectorAll('.media-slide'));

    if (slides.length === 0) return;

    // Clear existing dots and create new ones
    dotsContainer.innerHTML = '';

    // Create dots for each slide
    slides.forEach((slide, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-indicator';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopAutoRotate();
            showSlide(i);
            startAutoRotate();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let currentIndex = 0;
    let autoRotateInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }

    function startAutoRotate() {
        if (slides.length > 1) {
            autoRotateInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Event Listeners for arrows
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            stopAutoRotate();
            prevSlide();
            startAutoRotate();
        });

        nextButton.addEventListener('click', () => {
            stopAutoRotate();
            nextSlide();
            startAutoRotate();
        });
    }

    showSlide(0);
    startAutoRotate();
}
/**
 * Hero Photo Carousel
 */
function initHeroPhotoCarousel() {
    console.log('Initializing hero photo carousel...');

    const carousel = document.querySelector('.hero-photo-carousel');
    if (!carousel) {
        // This is not an error - some pages don't have hero photo carousels
        console.log('Hero photo carousel not found on this page - skipping initialization');
        return;
    }

    const slides = carousel.querySelectorAll('.hero-photo-slide');
    const indicators = carousel.querySelectorAll('.hero-photo-indicator');
    const prevBtn = carousel.querySelector('.hero-photo-prev');
    const nextBtn = carousel.querySelector('.hero-photo-next');

    console.log('Found hero photo carousel elements:', {
        slides: slides.length,
        indicators: indicators.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });

    if (slides.length === 0) {
        console.error('No hero photo slides found');
        return;
    }

    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds

    // Initialize first slide
    showSlide(currentSlide);
    startAutoPlay();

    console.log('Hero photo carousel initialized successfully');

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Previous button clicked');
            showSlide(currentSlide - 1);
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            showSlide(currentSlide + 1);
            resetAutoPlay();
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index);
            showSlide(index);
            resetAutoPlay();
        });
    });

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', pauseAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                showSlide(currentSlide + 1);
            } else {
                // Swipe right - previous slide
                showSlide(currentSlide - 1);
            }
            resetAutoPlay();
        }
    }

    function showSlide(index) {
        console.log('Showing hero photo slide:', index);

        // Handle wrap-around
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Remove active class from current slide and indicator
        if (slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
        }
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.remove('active');
        }

        // Update current slide
        currentSlide = index;

        // Add active class to new slide and indicator
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }

        console.log('Current hero photo slide updated to:', currentSlide);
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, autoPlayDelay);
        console.log('Hero photo carousel auto-play started');
    }

    function pauseAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log('Hero photo carousel auto-play paused');
        }
    }

    function resetAutoPlay() {
        pauseAutoPlay();
        startAutoPlay();
    }

    // Pause auto-play when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}