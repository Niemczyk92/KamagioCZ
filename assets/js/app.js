// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
        }, 1500);
    }

    // Cursor Trail
    const cursorTrail = document.getElementById('cursorTrail');
    if (cursorTrail) {
        document.addEventListener('mousemove', (e) => {
            cursorTrail.style.opacity = '0.5';
            cursorTrail.style.left = `${e.pageX - 10}px`;
            cursorTrail.style.top = `${e.pageY - 10}px`;
            
            setTimeout(() => {
                cursorTrail.style.opacity = '0';
            }, 300);
        });

        document.addEventListener('mouseleave', () => {
            cursorTrail.style.opacity = '0';
        });
    }

    // Animated Scroll on CTA Button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            const target = ctaButton.getAttribute('href');
            if (target.startsWith('#')) {
                e.preventDefault();
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollBy({
                top: window.innerHeight - 100,
                behavior: 'smooth'
            });
        });
    }

    // Email Subscription Form Handling
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const errorMessage = document.getElementById('errorMessage');
    const discountCodeElement = document.getElementById('discountCode');
    const successMessage = document.getElementById('successMessage');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value;

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(email);

            if (!isValid) {
                emailInput.classList.add('error');
                errorMessage.classList.add('show');
                formMessage?.classList.remove('show');
                successMessage?.classList.remove('show');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            emailInput.disabled = true;
            emailInput.classList.remove('error');
            errorMessage.classList.remove('show');
            formMessage?.classList.remove('show');

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // On success
                if (successMessage) successMessage.classList.add('show');
                if (formMessage) formMessage.classList.add('show');
                if (discountCodeElement) discountCodeElement.classList.add('show');
                
                // In a real implementation, you would send the data to your server here
                console.log('Submitted email:', email);
            } catch (error) {
                // On error
                if (errorMessage) {
                    errorMessage.textContent = 'Something went wrong. Please try again.';
                    errorMessage.classList.add('show');
                }
            } finally {
                // Always remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    // Copy to clipboard functionality for discount code
    if (discountCodeElement) {
        discountCodeElement.addEventListener('click', () => {
            const code = discountCodeElement.textContent.trim();
            navigator.clipboard.writeText(code).then(() => {
                const originalText = discountCodeElement.textContent;
                discountCodeElement.textContent = 'Copied!';
                setTimeout(() => {
                    discountCodeElement.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Close all other open answers
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });

            // Toggle current answer
            question.classList.toggle('active');
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Animate on Scroll (Intersection Observer)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Dynamic Particles in Hero Section
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Initial animation on load
    animateOnScroll();
});

// Handle scroll events for animation
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            const delay = element.dataset.delay || 0;
            
            setTimeout(function() {
                element.classList.add('animated');
            }, delay);
        }
    });
});