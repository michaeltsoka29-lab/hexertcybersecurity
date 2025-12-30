document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // --- NAVIGATION ---
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- ACTIVE LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (link) {
                    link.classList.add('active');
                }
            } else {
                if (link) {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);


    // --- HERO STATS COUNTER ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    function countUp() {
        statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-count');
            const isFloat = target % 1 !== 0;

            const updateCount = () => {
                const count = +statNumber.innerText;
                const increment = target / 200; // Speed of the counter

                if (count < target) {
                    let newCount = count + increment;
                    statNumber.innerText = isFloat ? newCount.toFixed(1) : Math.ceil(newCount);
                    setTimeout(updateCount, 10);
                } else {
                    statNumber.innerText = isFloat ? target.toFixed(1) : target;
                }
            };
            updateCount();
        });
    }
    
    // Animate stats when hero section is in view
    const heroSection = document.getElementById('home');
    const observerOptions = { root: null, threshold: 0.3 };

    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                countUp();
                hasCounted = true;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // --- FADE-IN ANIMATIONS FOR SECTIONS ---
    const fadeElements = document.querySelectorAll('.section');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for this demo
            
            // Simple validation and feedback
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';
            
            setTimeout(() => {
                submitButton.innerHTML = '<span>✓ Message Sent!</span>';
                submitButton.style.backgroundColor = 'var(--primary-dark)';
                
                // Reset form and button after a few seconds
                setTimeout(() => {
                    this.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    submitButton.style.backgroundColor = '';
                }, 3000);

            }, 1500);
        });
    }
});
