// Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');
            
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
                    
                // Toggle body scroll when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('#navMenu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        document.body.style.overflow = '';
                    }
                }
            });

            // Set active navigation based on current page
            document.addEventListener('DOMContentLoaded', function() {
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('#navMenu a');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });

                // Animate stats on scroll
                function animateStats() {
                    const statNumbers = document.querySelectorAll('.stat-number, .about-stat h3');
                    statNumbers.forEach(stat => {
                        const finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                        if (!isNaN(finalValue)) {
                            let currentValue = 0;
                            const increment = finalValue / 50;
                            const timer = setInterval(() => {
                                currentValue += increment;
                                if (currentValue >= finalValue) {
                                    stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '+');
                                    clearInterval(timer);
                                } else {
                                    stat.textContent = Math.floor(currentValue);
                                }
                            }, 30);
                        }
                    });
                }

                // Trigger animation when stats come into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                const statsSection = document.querySelector('.results-showcase');
                if (statsSection) {
                    observer.observe(statsSection);
                }

                // Add smooth scrolling for anchor links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function(e) {
                        const href = this.getAttribute('href');
                        if (href !== '#' && href.startsWith('#')) {
                            e.preventDefault();
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }
                    });
                });
            });

            // Add header scroll effect
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const header = document.querySelector('header');
                
                if (currentScroll > 100) {
                    if (currentScroll > lastScroll && !navMenu.classList.contains('active')) {
                        // Scrolling down
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        header.style.transform = 'translateY(0)';
                        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    }
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
                
                lastScroll = currentScroll;
            });

            // Resize listener to handle menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });

            // Premium Scroll-to-Top Button
            function initScrollToTop() {
                const scrollBtn = document.getElementById('scrollToTopBtn');
                const progressRing = document.querySelector('.progress-ring-circle');
                
                if (!scrollBtn) return;
                
                // Update progress ring based on scroll
                function updateProgressRing() {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (window.scrollY / windowHeight) * 100;
                    const progress = 100 - scrolled;
                    if (progressRing) {
                        progressRing.style.strokeDashoffset = progress;
                    }
                }
                
                // Toggle button visibility
                function toggleScrollButton() {
                    if (window.scrollY > 300) {
                        scrollBtn.classList.add('visible');
                    } else {
                        scrollBtn.classList.remove('visible');
                    }
                    updateProgressRing();
                }
                
                // Scroll to top function
                function scrollToTop() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                
                // Event Listeners
                window.addEventListener('scroll', toggleScrollButton);
                scrollBtn.addEventListener('click', scrollToTop);
                
                // Initialize on load
                toggleScrollButton();
            }

            // Initialize when DOM is loaded
            document.addEventListener('DOMContentLoaded', function() {
                initScrollToTop();
                
                // Also add it to window load for good measure
                window.addEventListener('load', initScrollToTop);
            });
            
            // Basic hotlink protection
            if (document.referrer && 
                !document.referrer.includes('localreach.in') && 
                !document.referrer.includes('localhost') &&
                document.referrer !== '') {
                
                // Optional: Redirect hotlinkers to your homepage
                // window.location.href = 'https://localreach.in';
                
                // Or show a warning
                console.log('Hotlinking detected from:', document.referrer);
            }
            
            document.addEventListener('DOMContentLoaded', function() {
            const cursor = document.querySelector('.custom-cursor');
            if (!cursor) return;

            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            const speed = 0.1;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * speed;
                cursorY += (mouseY - cursorY) * speed;
                cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
                requestAnimationFrame(animateCursor);
            }

            animateCursor();

            document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
            document.addEventListener('mouseenter', () => cursor.style.opacity = '0.5');
        });

        // ===== BAR GRAPH ANIMATION =====
        function initBarAnimation() {
            const bars = document.querySelectorAll('.bar');
            if (!bars.length) return;

            // 1. Initially set all bar heights to 0
            bars.forEach(bar => {
                bar.style.height = '0';
            });

            // 2. Create an observer for the graph container
            const barObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate each bar to its target height
                        const targetBars = entry.target.querySelectorAll('.bar');
                        targetBars.forEach(bar => {
                            if (bar.classList.contains('bar-before')) {
                                bar.style.height = '120px';   // before value
                            } else if (bar.classList.contains('bar-after')) {
                                bar.style.height = '200px';   // after value
                            }
                        });
                        // Stop observing after animation triggers
                        barObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 }); // trigger when 50% visible

            const graphContainer = document.querySelector('.results-graph');
            if (graphContainer) {
                barObserver.observe(graphContainer);
            }
        }

        // Call it inside DOMContentLoaded (after your existing code)
        document.addEventListener('DOMContentLoaded', function() {
            // ... your existing code (stats animation, active links, etc.) ...
            initBarAnimation(); // <-- add this line
        });

        // ===== TESTIMONIALS CAROUSEL (AUTO + MANUAL, HOVER PAUSE) =====
        document.addEventListener('DOMContentLoaded', function() {
        const testimonials = [
            {
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                name: 'Ramesh Gupta',
                business: 'Gupta Electronics, Bareilly',
                rating: 5,
                text: 'LocalReach transformed our online presence! We used to rely on walk-ins, but now we get calls every day from customers who found us on Google. The team is honest and delivers exactly what they promise.'
            },
            {
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                name: 'Priya Mehra',
                business: 'Mehra Boutique, Lucknow',
                rating: 5,
                text: 'I was skeptical about digital marketing, but their local SEO strategy doubled our footfall in just 3 months. They really understand small businesses.'
            },
            {
                avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
                name: 'Amit Sharma',
                business: 'Sharma Sweets, Delhi',
                rating: 5,
                text: 'The WhatsApp automation saved us hours of manual work. Our repeat customers love the quick responses. Highly recommended!'
            },
            {
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                name: 'Sunita Devi',
                business: 'Sunita’s Salon, Agra',
                rating: 5,
                text: 'Their social media management brought in so many new clients. The content is creative and connects with local audience perfectly.'
            },
            {
                avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                name: 'Vikram Singh',
                business: 'Vikram Hardware, Meerut',
                rating: 5,
                text: 'We finally have a website that works and brings leads! The team guided us through every step and the after-sales support is amazing.'
            },
            {
                avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
                name: 'Neha Kapoor',
                business: 'Kapoor’s Kitchen, Noida',
                rating: 5,
                text: 'The Google Ads campaign they ran for us gave 5x ROI in the first month itself. Absolutely thrilled with the results!'
            }
        ];

        const wrapper = document.getElementById('testimonialsWrapper');
        const track = document.getElementById('testimonialsTrack');
        if (!wrapper || !track) return;

        // Build cards
        track.innerHTML = '';
        testimonials.forEach(t => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';

            const avatarHtml = t.avatar 
                ? `<img src="${t.avatar}" alt="${t.name}" loading="lazy">`
                : `<i class="fas fa-user-circle"></i>`;

            const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);

            card.innerHTML = `
                <div class="testimonial-quote-icon">“</div>
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${avatarHtml}</div>
                    <div class="testimonial-info">
                        <div class="testimonial-name">${t.name}</div>
                        <div class="testimonial-business">${t.business}</div>
                    </div>
                    <div class="testimonial-rating">${stars}</div>
                </div>
                <div class="testimonial-text">${t.text}</div>
            `;
            track.appendChild(card);
        });

        // Clone cards once to create seamless infinite scroll
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        // ===== AUTO-SCROLL (RIGHT TO LEFT) & MANUAL CONTROL =====
        let currentPosition = 0;
        const cardWidth = 380 + 30; // width + gap
        const totalWidth = track.scrollWidth / 2; // half because we duplicated
        let autoScrollInterval = null;
        let isDragging = false;
        let startX = 0;
        let startPosition = 0;

        // Start auto-scroll (right to left)
        function startAutoScroll() {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                if (!isDragging && !wrapper.matches(':hover')) {
                    currentPosition -= 1; // move left
                    // Infinite loop: reset when halfway through
                    if (Math.abs(currentPosition) >= totalWidth) {
                        currentPosition = 0;
                    }
                    track.style.transform = `translateX(${currentPosition}px)`;
                }
            }, 16); // ~60fps
        }

        // Stop auto-scroll
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Dragging handlers
        function onDragStart(e) {
            e.preventDefault();
            isDragging = true;
            wrapper.classList.add('dragging');
            stopAutoScroll();
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            startPosition = currentPosition;
        }

        function onDragMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const delta = currentX - startX;
            currentPosition = startPosition + delta;
            track.style.transform = `translateX(${currentPosition}px)`;
        }

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            wrapper.classList.remove('dragging');
            // Resume auto-scroll if not hovering
            if (!wrapper.matches(':hover')) {
                startAutoScroll();
            }
        }

        // Hover handlers
        wrapper.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });

        wrapper.addEventListener('mouseleave', () => {
            if (!isDragging) {
                startAutoScroll();
            }
        });

        // Mouse wheel (optional, but keeps manual control)
        wrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            stopAutoScroll();
            currentPosition -= e.deltaY * 0.5;
            // Clamp to prevent going out of bounds
            const maxScroll = 0;
            const minScroll = -totalWidth * 2 + wrapper.offsetWidth;
            if (currentPosition > maxScroll) currentPosition = maxScroll;
            if (currentPosition < minScroll) currentPosition = minScroll;
            track.style.transform = `translateX(${currentPosition}px)`;
            // Resume auto-scroll after a tiny delay (if not hovering)
            if (!wrapper.matches(':hover')) {
                startAutoScroll();
            }
        }, { passive: false });

        // Drag events
        wrapper.addEventListener('mousedown', onDragStart);
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
        wrapper.addEventListener('touchstart', onDragStart, { passive: false });
        window.addEventListener('touchmove', onDragMove, { passive: false });
        window.addEventListener('touchend', onDragEnd);

        // Prevent default drag on images
        wrapper.addEventListener('dragstart', (e) => e.preventDefault());

        // Start auto-scroll initially
        startAutoScroll();

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        });
    });