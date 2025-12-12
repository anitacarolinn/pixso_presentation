// Language Toggle
let currentLang = 'zh'; // Default to Traditional Chinese

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';

    // Update button text
    document.getElementById('langText').textContent = currentLang === 'zh' ? 'EN' : '中文';

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // Save preference
    localStorage.setItem('presentationLang', currentLang);
}

// Load saved language preference on page load
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('presentationLang');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
}

// Presentation Controller
class Presentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 1;
        this.totalSlides = this.slides.length;

        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.progressBar = document.getElementById('progress');
        this.progressBarContainer = document.querySelector('.progress-bar');

        this.init();
    }

    init() {
        // Set total slides
        this.totalSlidesEl.textContent = this.totalSlides;

        // Event listeners for navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Touch/swipe support
        this.setupTouchNavigation();

        // Progress bar click navigation
        this.setupProgressBarNavigation();

        // Slide picker
        this.setupSlidePicker();

        // Initial update
        this.updateSlide();
    }

    updateSlide() {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Show current slide
        const activeSlide = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        if (activeSlide) {
            activeSlide.classList.add('active');
        }

        // Update counter
        this.currentSlideEl.textContent = this.currentSlide;

        // Update progress bar
        const progress = ((this.currentSlide - 1) / (this.totalSlides - 1)) * 100;
        this.progressBar.style.width = `${progress}%`;

        // Update button states
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;

        // Close slide picker if open
        const picker = document.getElementById('slidePicker');
        if (picker) picker.classList.remove('active');
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateSlide();
        }
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateSlide();
        }
    }

    goToSlide(slideNum) {
        if (slideNum >= 1 && slideNum <= this.totalSlides) {
            this.currentSlide = slideNum;
            this.updateSlide();
        }
    }

    handleKeydown(e) {
        // Don't handle if slide picker is open and typing
        const picker = document.getElementById('slidePicker');
        if (picker && picker.classList.contains('active')) {
            if (e.key === 'Escape') {
                picker.classList.remove('active');
            }
            return;
        }

        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'g':
            case 'G':
                e.preventDefault();
                this.toggleSlidePicker();
                break;
        }

        // Number keys 1-9 for quick navigation
        if (e.key >= '1' && e.key <= '9') {
            this.goToSlide(parseInt(e.key));
        }
    }

    setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, false);

        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }
        };
    }

    setupProgressBarNavigation() {
        // Click on progress bar to jump to slide
        this.progressBarContainer.addEventListener('click', (e) => {
            const rect = this.progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const targetSlide = Math.round(percentage * (this.totalSlides - 1)) + 1;
            this.goToSlide(targetSlide);
        });

        // Make progress bar look clickable
        this.progressBarContainer.style.cursor = 'pointer';

        // Drag on progress bar
        let isDragging = false;

        this.progressBarContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.progressBarContainer.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const rect = this.progressBarContainer.getBoundingClientRect();
            const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percentage = clickX / rect.width;
            const targetSlide = Math.round(percentage * (this.totalSlides - 1)) + 1;
            this.goToSlide(targetSlide);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            this.progressBarContainer.style.cursor = 'pointer';
        });
    }

    setupSlidePicker() {
        // Create slide picker dropdown
        const picker = document.createElement('div');
        picker.id = 'slidePicker';
        picker.className = 'slide-picker';
        picker.innerHTML = `
            <div class="picker-header">
                <span data-en="Go to Slide" data-zh="跳轉到投影片">${currentLang === 'zh' ? '跳轉到投影片' : 'Go to Slide'}</span>
                <button class="picker-close">&times;</button>
            </div>
            <div class="picker-input-row">
                <input type="number" id="slideInput" min="1" max="${this.totalSlides}" placeholder="1-${this.totalSlides}">
                <button id="goToSlideBtn">Go</button>
            </div>
            <div class="picker-grid" id="pickerGrid"></div>
        `;
        document.body.appendChild(picker);

        // Populate grid with slide numbers
        const grid = document.getElementById('pickerGrid');
        for (let i = 1; i <= this.totalSlides; i++) {
            const btn = document.createElement('button');
            btn.className = 'picker-slide-btn';
            btn.textContent = i;
            btn.addEventListener('click', () => this.goToSlide(i));
            grid.appendChild(btn);
        }

        // Make slide counter clickable
        const slideCounter = document.querySelector('.slide-counter');
        slideCounter.style.cursor = 'pointer';
        slideCounter.addEventListener('click', () => this.toggleSlidePicker());

        // Close button
        picker.querySelector('.picker-close').addEventListener('click', () => {
            picker.classList.remove('active');
        });

        // Go button
        document.getElementById('goToSlideBtn').addEventListener('click', () => {
            const input = document.getElementById('slideInput');
            const slideNum = parseInt(input.value);
            if (slideNum >= 1 && slideNum <= this.totalSlides) {
                this.goToSlide(slideNum);
            }
            input.value = '';
        });

        // Enter key in input
        document.getElementById('slideInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('goToSlideBtn').click();
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!picker.contains(e.target) && !slideCounter.contains(e.target)) {
                picker.classList.remove('active');
            }
        });
    }

    toggleSlidePicker() {
        const picker = document.getElementById('slidePicker');
        picker.classList.toggle('active');
        if (picker.classList.contains('active')) {
            // Update current slide highlight
            const btns = picker.querySelectorAll('.picker-slide-btn');
            btns.forEach((btn, i) => {
                btn.classList.toggle('current', i + 1 === this.currentSlide);
            });
            // Focus input
            document.getElementById('slideInput').focus();
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load language preference
    loadLanguagePreference();

    const presentation = new Presentation();
    window.presentation = presentation; // Make accessible globally

    // Add animation class to elements when slide becomes active
    const observeSlides = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active')) {
                    // Animate elements in the active slide
                    const elements = mutation.target.querySelectorAll('.feature-list li, .pricing-list li, .step, .option, table tr');
                    elements.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            el.style.transition = 'all 0.4s ease';
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            });
        });

        document.querySelectorAll('.slide').forEach(slide => {
            observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
        });
    };

    observeSlides();
});

// Fullscreen support
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen not available');
            });
        } else {
            document.exitFullscreen();
        }
    }
});

// Image Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

// Open lightbox when clicking images
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.slide-body, .interface-container')) {
        e.stopPropagation();
        lightboxImg.src = e.target.src;
        lightbox.classList.add('active');
    }
});

// Close lightbox
lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});
