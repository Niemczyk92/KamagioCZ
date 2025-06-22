// Loading screen
    window.addEventListener('load', function() {
      setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('hide');
      }, 1500);
    });

    // Cursor trail effect
    document.addEventListener('mousemove', function(e) {
      const trail = document.getElementById('cursorTrail');
      trail.style.left = (e.pageX - 10) + 'px';
      trail.style.top = (e.pageY - 10) + 'px';
      trail.style.opacity = '0.5';
      
      setTimeout(function() {
        trail.style.opacity = '0';
      }, 300);
    });

    // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
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

    // Email form submission
    document.getElementById('subscribeForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('emailInput');
      const submitBtn = document.getElementById('submitBtn');
      const formMessage = document.getElementById('formMessage');
      const errorMessage = document.getElementById('errorMessage');
      const discountCode = document.getElementById('discountCode');
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(emailInput.value);
      
      if (!isValid) {
        emailInput.classList.add('error');
        errorMessage.classList.add('show');
        formMessage.classList.remove('show');
        return;
      }
      
      // Simulate form submission
      submitBtn.classList.add('loading');
      emailInput.disabled = true;
      
      setTimeout(function() {
        submitBtn.classList.remove('loading');
        formMessage.classList.add('show');
        errorMessage.classList.remove('show');
        discountCode.classList.add('show');
        emailInput.classList.remove('error');
        
        // In a real implementation, you would send the data to your server here
        console.log('Submitted email:', emailInput.value);
      }, 1500);
    });

    // Copy discount code to clipboard
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(function() {
        const discountCode = document.getElementById('discountCode');
        discountCode.textContent = 'Copied!';
        
        setTimeout(function() {
          discountCode.textContent = text;
        }, 2000);
      });
    }

    // FAQ accordion functionality
    document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const answer = button.nextElementSibling;
        
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
      });
    });

    // Animate elements on scroll
    function animateOnScroll() {
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
    }

    // Initialize
    window.addEventListener('DOMContentLoaded', function() {
      createParticles();
      
      // Animate on first load
      animateOnScroll();
      
      // Scroll indicator click
      document.querySelector('.scroll-indicator').addEventListener('click', function() {
        window.scrollBy({
          top: window.innerHeight - 100,
          behavior: 'smooth'
        });
      });
    });

    window.addEventListener('scroll', animateOnScroll);