document.addEventListener('DOMContentLoaded', function() {

    initFlashScreen();
    initSkipFlashScreen();
    initTypedAnimation();
    initParticleBackground();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavOnScroll();
    initInteractiveSkills();

    initEmailJS();

    initEmailJSContactForm();

    initResumeDownload();

    initClickAnimation();
});


function initTypedAnimation() {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-element', {
            strings: [
                '{Backend Developer',
                '{Java and DSA Enthusiast',
                '{IoT Engineering Student',
                '{Blockchain Technology',
                '{Frontend Developer'
            ],
            typeSpeed: 30,
            backSpeed: 20,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '}',
            autoInsertCss: true
        });
    }
}


function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function initParticles() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        particles = [];
        const particleCount = Math.min(80, Math.floor(width * height / 10000));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(95, 108, 255, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });

        ctx.strokeStyle = 'rgba(95, 108, 255, 0.05)';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', initParticles);
    initParticles();
    drawParticles();
}


function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}


function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("Bg2qGe2VeoFXg2Uwd"); // Your Public Key
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS not loaded');
    }
}


function initEmailJSContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);

    newForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');

        const originalBtnText = submitBtn.innerHTML;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            showFormStatus(formStatus, 'error', 'Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus(formStatus, 'error', 'Please enter a valid email address');
            return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        formStatus.style.display = 'none';

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'avasthipranjal@gmail.com',
            reply_to: email
        };

        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_qfc17ib', 'template_e1dduda', templateParams)
                .then(function(response) {
                    console.log('EmailJS Success:', response);

                    showFormStatus(formStatus, 'success', 'Message sent successfully! I\'ll get back to you soon.');

                    newForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);

                    showFormStatus(formStatus, 'error', 'Failed to send. Please try again or email me directly.');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        } else {
            showFormStatus(formStatus, 'error', 'Email service not available. Please email me directly.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}


function showFormStatus(statusElement, type, message) {
    if (!statusElement) return;

    statusElement.style.display = 'block';
    statusElement.className = `form-status ${type}`;
    statusElement.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;

    if (type === 'success') {
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function initResumeDownload() {
    const resumeLinks = document.querySelectorAll('a[download]');

    resumeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const fileName = this.getAttribute('download');

            fetch(href, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        const link = document.createElement('a');
                        link.href = href;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        showCustomNotification('Resume download started!', 'success');
                    } else {
                        showCustomNotification('Resume file not found. Please try again later.', 'error');
                    }
                })
                .catch(() => {
                    window.location.href = href;
                });
        });
    });
}


function showCustomNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.background = type === 'success' ? '#4caf50' : '#f44336';
    notification.style.color = 'white';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideIn 0.3s ease';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}


const profileImage = document.getElementById('profileImage');
if (profileImage) {
    profileImage.onerror = function() {
        this.src = 'https://via.placeholder.com/400x400/1a1f2a/5f6cff?text=PA';
    };
}


(function addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .custom-notification {
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);
})();


function initInteractiveSkills() {
    const skillItems = document.querySelectorAll('.interactive-skill');
    const skillNameEl = document.getElementById('skillName');
    const skillDescEl = document.getElementById('skillDescription');
    const panel = document.getElementById('skillDescriptionPanel');

    if (!skillItems.length || !skillNameEl || !skillDescEl) return;

    function updateSkillDescription(skillItem) {
        const skillName = skillItem.getAttribute('data-skillName') || skillItem.textContent.trim();
        const skillDesc = skillItem.getAttribute('data-skillDesc') || 'No description available.';

        const icon = skillItem.querySelector('i') ? skillItem.querySelector('i').outerHTML : '<i class="fas fa-code"></i>';

        skillNameEl.innerHTML = `${icon} ${skillName}`;
        skillDescEl.textContent = skillDesc;

        panel.classList.add('updated');
        setTimeout(() => panel.classList.remove('updated'), 600);

        skillItems.forEach(item => item.classList.remove('active-skill'));
        skillItem.classList.add('active-skill');
    }

    skillItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            updateSkillDescription(this);
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.interactive-skill') && !e.target.closest('#skillDescriptionPanel')) {
            skillNameEl.innerHTML = '<i class="fas fa-lightbulb"></i> Explore My Skills';
            skillDescEl.textContent = 'Click on any skill to see detailed information about my experience and expertise.';
            skillItems.forEach(item => item.classList.remove('active-skill'));
        }
    });
}


function initClickAnimation() {
    console.log("Click animation initialized");

    const style = document.createElement('style');
    style.textContent = `
        .click-circle {
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: radial-gradient(circle, #5f6cff, #bb9aff);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%) scale(0);
            animation: clickPop 0.6s ease-out forwards;
            box-shadow: 0 0 20px #5f6cff, 0 0 40px #bb9aff;
        }

        @keyframes clickPop {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('click', function(e) {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.btn')) {
            return; 
        }

        const circle = document.createElement('div');
        circle.className = 'click-circle';

        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';

        document.body.appendChild(circle);

        setTimeout(() => {
            if (circle.parentNode) {
                circle.remove();
            }
        }, 500);
    });
}


function initFlashScreen() {
    const flashScreen = document.getElementById('flashScreen');
    const statusElement = document.getElementById('flashStatus');
    const percentElement = document.getElementById('progressPercent');

    if (!flashScreen) return;

    const statusMessages = [
        { text: "Loading modules...", icon: "fa-cube" },
        { text: "Initializing blockchain...", icon: "fa-link" },
        { text: "Connecting to backend...", icon: "fa-database" },
        { text: "Optimizing performance...", icon: "fa-tachometer-alt" },
        { text: "Ready to launch!", icon: "fa-rocket" }
    ];

    let currentIndex = 0;
    let progress = 0;

    const statusInterval = setInterval(() => {
        if (currentIndex < statusMessages.length) {
            const msg = statusMessages[currentIndex];
            statusElement.innerHTML = `<i class="fas ${msg.icon}"></i><span>${msg.text}</span>`;
            currentIndex++;
        }
    }, 500);

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            clearInterval(statusInterval);

            statusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>Ready to go!</span>';
        }

        if (percentElement) {
            percentElement.textContent = Math.floor(progress) + '%';
        }
    }, 150);

    setTimeout(() => {
        flashScreen.classList.add('fade-out');

        setTimeout(() => {
            if (flashScreen.parentNode) {
                flashScreen.remove();
            }
        }, 600);
    }, 3000);
}

function initSkipFlashScreen() {
    const flashScreen = document.getElementById('flashScreen');
    if (!flashScreen) return;

    flashScreen.addEventListener('click', function() {
        this.classList.add('fade-out');
        setTimeout(() => {
            if (this.parentNode) {
                this.remove();
            }
        }, 600);
    });
}
