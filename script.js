document.addEventListener('DOMContentLoaded', function() {

        // --- Header Scroll Effect ---
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // --- Hamburger Menu for Mobile ---
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // --- Active Navigation Link Highlighting on Scroll ---
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', navHighlighter);

        function navHighlighter() {
            let scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                let sectionId = current.getAttribute('id');
                
                const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        }
        
        // --- Animate on Scroll (Fade-In Effect) ---
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.2, // Trigger when 20% of the element is visible
            rootMargin: "0px 0px -50px 0px"
        };
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });

        // --- Product Slider ---
        const productGrid = document.querySelector('.product-grid');
        const productCards = document.querySelectorAll('.product-card');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        let counter = 0;
        let slideWidth;
        
        function updateSlideWidth() {
            if (window.innerWidth <= 768) {
                slideWidth = productCards[0].clientWidth;
            } else if (window.innerWidth <= 992) {
                slideWidth = productCards[0].clientWidth * 2;
            } else {
                slideWidth = productCards[0].clientWidth * 3;
            }
        }
        
        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);

        // Clone cards for infinite loop effect
        const cardCount = productCards.length;
        for(let i = 0; i < cardCount; i++) {
            productGrid.appendChild(productCards[i].cloneNode(true));
        }

        function slide(direction) {
            productGrid.style.transition = 'transform 0.5s ease-in-out';
            if (direction === 'next') {
                counter++;
                productGrid.style.transform = 'translateX(' + (-productCards[0].clientWidth * counter) + 'px)';

                if (counter === cardCount) {
                    setTimeout(() => {
                        productGrid.style.transition = 'none';
                        counter = 0;
                        productGrid.style.transform = 'translateX(0)';
                    }, 500);
                }
            } else {
                 if (counter === 0) {
                    counter = cardCount;
                    productGrid.style.transition = 'none';
                    productGrid.style.transform = 'translateX(' + (-productCards[0].clientWidth * counter) + 'px)';
                    // Force reflow
                    productGrid.offsetHeight; 
                }
                setTimeout(() => {
                    productGrid.style.transition = 'transform 0.5s ease-in-out';
                    counter--;
                    productGrid.style.transform = 'translateX(' + (-productCards[0].clientWidth * counter) + 'px)';
                }, 50); // Small delay to ensure transition applies
            }
        }

        nextBtn.addEventListener('click', () => slide('next'));
        prevBtn.addEventListener('click', () => slide('prev'));
        
        // Auto-slide
        setInterval(() => {
            slide('next');
        }, 5000);

         
        
        // --- Footer Year ---
        document.getElementById('year').textContent = new Date().getFullYear();
    });