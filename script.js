// Global Variables
let particles = [];
let canvas, ctx;
let animationId;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeRippleEffects();
    initializeFAQ();
});

// Button Click Handlers
function handleBuyNow() {
    window.open('https://raydium.io/swap/?inputMint=sol&outputMint=5MM88hAZcY1cwZB2fFFe65JAuqwgrnMnogF6Lhmp1U1C', '_blank');
}

function handleChart() {
    window.open('https://dexscreener.com/solana/g4tpqmpkdfxnypllsbzj1ew96mxnbvjcbvrmt4ttknmb', '_blank');
}

function handleTelegram() {
    window.open('https://t.me/punkfuns', '_blank');
}

function handleFollowX() {
    window.open('https://x.com/punkfuns', '_blank');
}

function handleDisclaimer() {
    console.log('Read disclaimer clicked');
    // You can implement disclaimer functionality here
}

// Copy Address Functionality
function handleCopyAddress() {
    const contractAddress = "5MM88hAZcY1cwZB2fFFe65JAuqwgrnMnogF6Lhmp1U1C";
    const copyBtn = document.getElementById('copy-btn');
    const copySuccess = document.getElementById('copy-success');
    const copyIcon = copyBtn.querySelector('.copy-icon');
    const checkIcon = copyBtn.querySelector('.check-icon');
    
    navigator.clipboard.writeText(contractAddress).then(() => {
        // Show success state
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        copySuccess.style.display = 'block';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
            copySuccess.style.display = 'none';
        }, 2000);
    }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = contractAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success state
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        copySuccess.style.display = 'block';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
            copySuccess.style.display = 'none';
        }, 2000);
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Smooth Scrolling for Navigation
function initializeSmoothScrolling() {
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Ripple Effects for Buttons
function initializeRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// FAQ Functionality
function initializeFAQ() {
    // This will be called by toggleFaq function
}

function toggleFaq(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const targetItem = faqItems[index];
    
    if (targetItem) {
        targetItem.classList.toggle('active');
    }
}

// Floating Particles Animation
function initializeParticles() {
    canvas = document.getElementById('floating-particles');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '#ff69b4' : '#00ffff'
        });
    }
    
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animateParticles() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
    
    animationId = requestAnimationFrame(animateParticles);
}

// Mobile Touch Effects
function createTouchEffect(x, y) {
    const touchEffect = document.createElement('div');
    touchEffect.style.position = 'fixed';
    touchEffect.style.left = x - 25 + 'px';
    touchEffect.style.top = y - 25 + 'px';
    touchEffect.style.width = '50px';
    touchEffect.style.height = '50px';
    touchEffect.style.borderRadius = '50%';
    touchEffect.style.background = 'radial-gradient(circle, rgba(255,105,180,0.6) 0%, transparent 70%)';
    touchEffect.style.pointerEvents = 'none';
    touchEffect.style.animation = 'touch-ripple 0.6s ease-out forwards';
    touchEffect.style.zIndex = '9999';
    
    document.getElementById('mobile-touch-effects').appendChild(touchEffect);
    
    setTimeout(() => {
        touchEffect.remove();
    }, 600);
}

// Add touch effect styles
const touchStyle = document.createElement('style');
touchStyle.textContent = `
    @keyframes touch-ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(touchStyle);

// Add touch event listeners for mobile
document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        createTouchEffect(touch.clientX, touch.clientY);
    }
});

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const header = document.querySelector('.sticky-header');
    const currentScrollY = window.scrollY;
    
    if (header) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add background opacity based on scroll
        const opacity = Math.min(currentScrollY / 100, 0.95);
        header.style.background = `rgba(0, 0, 0, ${opacity})`;
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Cleanup function
window.addEventListener('beforeunload', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        if (canvas && ctx) {
            animateParticles();
        }
    }
});

// Add CSS for enhanced mobile experience
const mobileEnhancementStyle = document.createElement('style');
mobileEnhancementStyle.textContent = `
    /* Enhanced touch targets for mobile */
    @media (max-width: 767px) {
        .btn {
            min-height: 60px;
            font-size: 1.1rem;
        }
        
        .nav-link, .mobile-nav-link {
            min-height: 48px;
            display: flex;
            align-items: center;
        }
        
        .copy-btn {
            min-width: 48px;
            min-height: 48px;
        }
        
        /* Improve text readability on mobile */
        .main-headline {
            font-size: 3rem;
            line-height: 1.1;
        }
        
        .subtitle {
            font-size: 1.25rem;
            line-height: 1.4;
        }
        
        .section-title {
            font-size: 2rem;
            line-height: 1.2;
        }
        
        /* Optimize spacing for mobile */
        .container {
            padding: 0 1rem;
        }
        
        .hero-section {
            padding: 5rem 1rem 3rem;
        }
        
        /* Ensure proper touch scrolling */
        body {
            -webkit-overflow-scrolling: touch;
        }
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(mobileEnhancementStyle);