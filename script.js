// Set dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu on link click
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// Asynchronous Contact Form Submission via FormSubmit.co AJAX API
async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const successOverlay = document.getElementById('contact-success-state');
    
    const nameVal = document.getElementById('name').value;
    const emailVal = document.getElementById('email').value;
    const messageVal = document.getElementById('message').value;
    
    // Show loading spinner status
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Sending Message...`;
    
    // Disable all fields during submission
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.disabled = true);
    
    // Clear prior error display
    const existingAlert = form.querySelector('.error-alert');
    if (existingAlert) existingAlert.remove();
    
    try {
        const response = await fetch("https://formsubmit.co/ajax/palrohan068@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: nameVal,
                email: emailVal,
                message: messageVal,
                _subject: `New Portfolio Message from ${nameVal}`,
                _captcha: "false"
            })
        });
        
        const result = await response.json();
        
        if (response.ok && (result.success === "true" || result.success === true)) {
            // Trigger success overlay screen entry
            successOverlay.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
            successOverlay.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        } else {
            throw new Error(result.message || "Unable to send your message.");
        }
    } catch (error) {
        console.error("Submission failed:", error);
        
        // Construct error alert feedback
        const alertDiv = document.createElement('div');
        alertDiv.className = "error-alert p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-4 flex items-center space-x-2";
        alertDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation text-lg"></i> <span>Failed to send. Please try again or email directly at <a href="mailto:palrohan068@gmail.com" class="underline font-semibold text-electric">palrohan068@gmail.com</a></span>`;
        form.insertBefore(alertDiv, form.firstChild);
        
        // Re-enable form interactions
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Message";
        inputs.forEach(input => input.disabled = false);
    }
}

// Reset the form fields and remove success layer
function resetContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const successOverlay = document.getElementById('contact-success-state');
    
    form.reset();
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.disabled = false);
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";
    
    successOverlay.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
    successOverlay.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    
    const existingAlert = form.querySelector('.error-alert');
    if (existingAlert) existingAlert.remove();
}

/* 1. Interactive 3D Particle Mesh Sphere (Canvas) */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    let particles = [];
    const numParticles = 80;
    const sphereRadius = Math.min(width, height) * 0.42;
    
    // Interaction states
    let mouse = { x: 0, y: 0, active: false };
    let targetRotationX = 0.003;
    let targetRotationY = 0.003;
    let currentRotationX = 0.003;
    let currentRotationY = 0.003;
    
    class Particle {
        constructor() {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            this.x3d = sphereRadius * Math.sin(phi) * Math.cos(theta);
            this.y3d = sphereRadius * Math.sin(phi) * Math.sin(theta);
            this.z3d = sphereRadius * Math.cos(phi);
            
            this.color = Math.random() > 0.45 ? '#00E5FF' : '#8A2BE2'; // electric or violet
        }
        
        rotate(rx, ry) {
            // Y axis rotation
            let x1 = this.x3d * Math.cos(ry) - this.z3d * Math.sin(ry);
            let z1 = this.x3d * Math.sin(ry) + this.z3d * Math.cos(ry);
            
            // X axis rotation
            let y2 = this.y3d * Math.cos(rx) - z1 * Math.sin(rx);
            let z2 = this.y3d * Math.sin(rx) + z1 * Math.cos(rx);
            
            this.x3d = x1;
            this.y3d = y2;
            this.z3d = z2;
        }
        
        project() {
            const fov = 300;
            const distance = 350;
            const scale = fov / (distance + this.z3d);
            
            this.x2d = (width / 2) + this.x3d * scale;
            this.y2d = (height / 2) + this.y3d * scale;
            this.size = Math.max(1, (scale * 2.2) * (1.3 + this.z3d / sphereRadius));
            this.alpha = (this.z3d + sphereRadius) / (sphereRadius * 2) * 0.65 + 0.35;
        }
    }
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
        
        const dx = mouse.x - width / 2;
        const dy = mouse.y - height / 2;
        targetRotationY = dx * 0.00008;
        targetRotationX = -dy * 0.00008;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.active = false;
        targetRotationX = 0.003;
        targetRotationY = 0.003;
    });
    
    window.addEventListener('resize', () => {
        if (!canvas.offsetWidth) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    });
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        currentRotationX += (targetRotationX - currentRotationX) * 0.08;
        currentRotationY += (targetRotationY - currentRotationY) * 0.08;
        
        particles.forEach(p => {
            p.rotate(currentRotationX, currentRotationY);
            p.project();
        });
        
        // Draw connecting lines (depth constellations)
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                const dx = p1.x2d - p2.x2d;
                const dy = p1.y2d - p2.y2d;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 60) {
                    const avgAlpha = (p1.alpha + p2.alpha) / 2;
                    // Fade lines if they are deep
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 60) * avgAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x2d, p1.y2d);
                    ctx.lineTo(p2.x2d, p2.y2d);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x2d, p.y2d, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.globalAlpha = 1.0;
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* 2. Count-Up Animation for Stats */
const countUpElements = document.querySelectorAll('.count-up');
const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetVal = parseFloat(target.getAttribute('data-target'));
            const suffix = target.getAttribute('data-suffix') || '';
            const decimals = parseInt(target.getAttribute('data-decimals') || '0');
            const duration = 2000; // ms
            const startTime = performance.now();
            
            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * targetVal;
                
                target.textContent = currentVal.toFixed(decimals) + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    target.textContent = targetVal.toFixed(decimals) + suffix;
                }
            }
            
            requestAnimationFrame(updateCount);
            observer.unobserve(target);
        }
    });
}, { threshold: 0.1 });

countUpElements.forEach(el => countUpObserver.observe(el));

/* 3. Project Filter Logic */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active-filter', 'text-white'));
        filterBtns.forEach(b => b.classList.add('text-gray-400'));
        btn.classList.add('active-filter', 'text-white');
        btn.classList.remove('text-gray-400');
        
        const filterVal = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            // Fade/Scale out
            card.classList.add('opacity-0', 'scale-95');
            
            setTimeout(() => {
                const category = card.getAttribute('data-category');
                if (filterVal === 'all' || category === filterVal) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.classList.remove('opacity-0', 'scale-95');
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            }, 250);
        });
    });
});

/* 4. Scroll Spy & Navbar blur, scroll indicator, scroll-to-top */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav div.hidden.md\\:flex a');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
const scrollProgressBar = document.getElementById('scroll-progress');
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Scroll progress
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrolled + '%';
    }
    
    // Scroll to top button visibility
    if (scrollToTopBtn) {
        if (winScroll > 400) {
            scrollToTopBtn.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        } else {
            scrollToTopBtn.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }
    }
    
    // Navbar glass style on scroll
    const nav = document.getElementById('navbar');
    if (winScroll > 20) {
        nav.classList.add('glass', 'shadow-lg', 'border-b', 'border-gray-800');
    } else {
        nav.classList.remove('shadow-lg', 'border-b', 'border-gray-800');
    }
    
    // Scroll Spy logic
    let currentSection = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update desktop active links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            if (currentSection === 'contact') {
                link.classList.add('active-link-contact');
            } else {
                link.classList.add('active-link');
            }
        } else {
            link.classList.remove('active-link');
            if (href === '#contact') {
                link.classList.remove('active-link-contact');
            }
        }
    });

    // Update mobile active links
    mobileNavLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-electric');
        } else {
            link.classList.remove('text-electric');
        }
    });
});

// Scroll to top click
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* 5. Scroll Reveal animations */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else if (entry.boundingClientRect.top > 0) {
            // Reset on scroll up past the element
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
