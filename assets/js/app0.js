// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
        }, 1500); // Skryje loading screen po 1.5 sekundách
    }

    // Cursor Trail
    const cursorTrail = document.getElementById('cursorTrail');
    if (cursorTrail) {
        document.addEventListener('mousemove', (e) => {
            cursorTrail.style.opacity = '1';
            cursorTrail.style.left = `${e.clientX - 10}px`; // -10px pro vycentrování
            cursorTrail.style.top = `${e.clientY - 10}px`;   // -10px pro vycentrování
        });

        document.addEventListener('mouseleave', () => {
            cursorTrail.style.opacity = '0';
        });
    }

    // Animated Scroll on CTA Button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = ctaButton.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
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

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value;

            // Basic email validation
            if (!email || !email.includes('@') || !email.includes('.')) {
                errorMessage.classList.add('show');
                formMessage.classList.remove('show');
                emailInput.classList.add('error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            emailInput.classList.remove('error');
            errorMessage.classList.remove('show');
            formMessage.classList.remove('show');

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // On success
                formMessage.classList.add('show');
                discountCodeElement.classList.add('show');
                emailInput.value = ''; // Clear input
                emailInput.disabled = true; // Disable input after successful submission
                submitBtn.style.display = 'none'; // Hide submit button
                
            } catch (error) {
                // On error (e.g., network issue, server error)
                errorMessage.textContent = 'Something went wrong. Please try again.';
                errorMessage.classList.add('show');
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
                }, 1000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // Animate on Scroll (Intersection Observer)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible'); // Přidá třídu pro spuštění animace
                }, delay);
                observer.unobserve(entry.target); // Zastaví sledování po animaci
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Close all other open answers
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });

            // Toggle current answer
            question.classList.toggle('active');
            answer.classList.toggle('show');
        });
    });

    // Dynamic Particles in Hero Section
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const numParticles = 20;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 3; // 3-8px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10s
            particle.style.animationDelay = `${Math.random() * 5}s`; // 0-5s delay
            particlesContainer.appendChild(particle);
        }
    }
}); 
