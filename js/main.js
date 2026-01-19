/**
 * Cortivus Website Main JavaScript
 * Handles mobile navigation, smooth scrolling, and other UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');

            // Change icon based on state
            const icon = mobileNavToggle.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dropdown functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle click on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('mobile-active');
            }
        });
    });

    // Close mobile menu when clicking a nav link (except dropdown toggles)
    const navLinks = document.querySelectorAll('nav a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');

                // Reset icon
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');

                // Close any open dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('mobile-active');
                });
            }
        });
    });

    // Handle window resize - reset mobile nav if window size changes
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');

                // Reset icon
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }

            // Close any open mobile dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('mobile-active');
            });
        }
    });

    // Feature Card Carousel
    initFeatureCarousel();
});

/**
 * Initialize feature card carousels
 * Shows 2 cards at a time on desktop, 1 on mobile
 * Scrolls 1 card at a time
 * Supports multiple carousels on a page
 */
function initFeatureCarousel() {
    const carousels = document.querySelectorAll('.feature-carousel');
    if (carousels.length === 0) return;

    carousels.forEach((carousel, carouselIndex) => {
        const track = carousel.querySelector('.carousel-track');
        const cards = track.querySelectorAll('.carousel-card');
        const prevBtn = carousel.querySelector('.carousel-btn-prev');
        const nextBtn = carousel.querySelector('.carousel-btn-next');
        // Find the dots container that immediately follows this carousel
        const dotsContainer = carousel.nextElementSibling?.classList.contains('carousel-dots')
            ? carousel.nextElementSibling
            : null;

        if (cards.length === 0 || !dotsContainer) return;

        let currentIndex = 0;

        // Determine visible cards based on screen width
        function getVisibleCards() {
            return window.innerWidth <= 768 ? 1 : 2;
        }

        // Calculate max index (how many positions we can scroll)
        function getMaxIndex() {
            return Math.max(0, cards.length - getVisibleCards());
        }

        // Create dots
        function createDots() {
            dotsContainer.innerHTML = '';
            const maxIndex = getMaxIndex();
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        // Update carousel position
        function updateCarousel() {
            const visibleCards = getVisibleCards();
            const gap = 32; // 2rem gap
            const containerWidth = track.parentElement.offsetWidth;
            // Mobile (1 card): cards are 100% width. Desktop (2 cards): share space minus gap.
            const cardWidth = visibleCards === 1
                ? containerWidth
                : (containerWidth - gap) / visibleCards;
            const offset = currentIndex * (cardWidth + gap);

            track.style.transform = `translateX(-${offset}px)`;

            // Update dots
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= getMaxIndex();
        }

        // Go to specific slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
            updateCarousel();
        }

        // Navigation handlers
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < getMaxIndex()) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Handle resize (use shared timeout to avoid multiple handlers)
        window.addEventListener('resize', () => {
            clearTimeout(carousel._resizeTimeout);
            carousel._resizeTimeout = setTimeout(() => {
                // Ensure currentIndex is still valid after resize
                if (currentIndex > getMaxIndex()) {
                    currentIndex = getMaxIndex();
                }
                createDots();
                updateCarousel();
            }, 100);
        });

        // Initialize
        createDots();
        updateCarousel();
    });
}
