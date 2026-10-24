/* ==========================================================================
   NELSON ÁLVAREZ - PORTFOLIO JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. THEME TOGGLE (DARK / LIGHT) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check if user previously selected light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-moon';
    } else {
        document.documentElement.classList.remove('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        
        if (document.documentElement.classList.contains('light-theme')) {
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- 1. INITIAL LOADER (QA AUTOMATION SUITE SIMULATION) ---
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercentage = document.getElementById('loader-percentage');
    const loaderText = document.getElementById('loader-text');
    const heroElements = document.querySelectorAll('.animate-on-load');

    const loaderStages = [
        { progress: 0, text: 'initializing_qa_suite...' },
        { progress: 15, text: 'loading_testng_runners...' },
        { progress: 30, text: 'connecting_to_rest_endpoints...' },
        { progress: 50, text: 'validating_soap_rest_equivalences...' },
        { progress: 70, text: 'asserting_jmeter_concurrency_load...' },
        { progress: 90, text: 'compiling_xlsx_certification_reports...' },
        { progress: 100, text: 'all_assertions_passed_done!' }
    ];

    let currentProgress = 0;
    let stageIndex = 0;

    const simulateLoading = () => {
        const interval = setInterval(() => {
            if (currentProgress >= 100) {
                clearInterval(interval);
                
                // Add minor delay for user to read final text
                setTimeout(() => {
                    loaderWrapper.classList.add('fade-out');
                    
                    // Trigger hero element animations
                    setTimeout(() => {
                        heroElements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('animated');
                            }, index * 200); // Staggered loading
                        });
                    }, 300);
                }, 400);
            } else {
                currentProgress += 1;
                loaderBar.style.width = `${currentProgress}%`;
                loaderPercentage.innerText = `${currentProgress}%`;
                
                // Update terminal text based on stage progress limits
                if (stageIndex < loaderStages.length - 1 && currentProgress >= loaderStages[stageIndex + 1].progress) {
                    stageIndex++;
                    loaderText.innerText = loaderStages[stageIndex].text;
                }
            }
        }, 15); // Adjust loading speed (approx 1.5 seconds total)
    };

    simulateLoading();


    // --- 2. FIXED NAVBAR SCROLL EFFECT & PROGRESS INDICATOR ---
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolledPercentage = (scrollTop / docHeight) * 100;
        
        // Progress Bar Update
        scrollProgress.style.width = `${scrolledPercentage}%`;

        // Fixed navbar shrink effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });


    // --- 3. MOBILE MENU TOGGLE ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    };

    mobileToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));


    // --- 4. SMOOTH SCROLL NAV LINK ACTIVE STATE ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 5. BACK TO TOP BUTTON ACTION ---
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 7. SKILLS PROGRESS BARS ANIMATION ---
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const percentage = fill.getAttribute('data-progress');
                fill.style.width = percentage;
                observer.unobserve(fill);
            }
        });
    }, {
        threshold: 0.5
    });

    progressFills.forEach(fill => skillsObserver.observe(fill));


    // --- 8. STATS COUNTER ANIMATION ---
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // Animation duration in milliseconds
        const stepTime = Math.max(Math.floor(duration / target), 10);
        let current = 0;
        
        // Custom step increments for large numbers (like 1000 and 500) to keep pace fluid
        const increment = target > 100 ? Math.ceil(target / 100) : 1;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = target === 4 ? `${target}+` : `+${target}`;
                clearInterval(timer);
            } else {
                element.innerText = target === 4 ? `${current}+` : `+${current}`;
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.8
    });

    statNumbers.forEach(num => statsObserver.observe(num));


    // --- 9. INTERACTIVE TOOLS GRID FILTER (TABS) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current tab
            button.classList.add('active');

            const filterCategory = button.getAttribute('data-tab');

            toolCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset card styling animation before transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    if (filterCategory === 'all' || cardCategory === filterCategory) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });


    // --- 10. CONTACT FORM TERMINAL SIMULATION ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const submitBtn = document.getElementById('btn-submit-contact');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameValue = document.getElementById('name').value.trim();
        const emailValue = document.getElementById('email').value.trim();
        const messageValue = document.getElementById('message').value.trim();

        if (!nameValue || !emailValue || !messageValue) {
            showTerminalFeedback('[ERROR] All input fields are required.', true);
            return;
        }

        // Disable button & change status
        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner animate-spin"></i>';
        formFeedback.classList.remove('hidden');
        
        // Simulation stages for Terminal Output
        const simulationLogs = [
            { text: '[INIT] Contact form submit trigger received...', error: false, delay: 0 },
            { text: '[VALIDATE] Sanitizing user inputs and validating email syntax... OK', error: false, delay: 600 },
            { text: '[PIPELINE] Initializing SSL connection to SMTP gateway... SUCCESS', error: false, delay: 1200 },
            { text: `[PAYLOAD] Packaging message from: "${nameValue}" <${emailValue}>`, error: false, delay: 1800 },
            { text: '[TEST] Running payload schema structural assertions... 200 OK', error: false, delay: 2400 },
            { text: '[POST] Dispatching request payload to email API... SUCCESS', error: false, delay: 3000 },
            { text: '[ASSERT] Response status code == 201 (Created). Success confirmation logged.', error: false, delay: 3600 },
            { text: '✔ Mensaje enviado exitosamente. ¡Nelson te responderá pronto!', error: false, delay: 4200 }
        ];

        simulationLogs.forEach((log) => {
            setTimeout(() => {
                showTerminalFeedback(log.text, log.error);
                
                // If it is the last log, reset form and restore button
                if (log.text.startsWith('✔')) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    contactForm.reset();
                    
                    // Hide feedback after some time
                    setTimeout(() => {
                        formFeedback.classList.add('hidden');
                        feedbackText.innerHTML = '';
                    }, 8000);
                }
            }, log.delay);
        });
    });

    const showTerminalFeedback = (text, isError) => {
        const line = document.createElement('div');
        line.style.margin = '4px 0';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'feedback-prompt';
        promptSpan.innerText = 'nelson@qa-engine:~$ ';
        
        const textSpan = document.createElement('span');
        textSpan.className = isError ? 'feedback-message error' : 'feedback-message';
        textSpan.innerText = text;

        if (text.startsWith('✔')) {
            textSpan.style.color = '#10b981';
            textSpan.style.fontWeight = 'bold';
            textSpan.style.fontSize = '0.95rem';
        }

        line.appendChild(promptSpan);
        line.appendChild(textSpan);
        
        // Append line and auto scroll to bottom of feedback block
        feedbackText.appendChild(line);
        formFeedback.scrollTop = formFeedback.scrollHeight;
    };
});
