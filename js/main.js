/* =========================================
   MAIN.JS — Axl Lake EPK
   Animaciones, scroll, lazy load, header
   ========================================= */

(function () {
  'use strict';

  // ── Respect prefers-reduced-motion ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ══════════════════════════════════════
  // 8.1 SCROLL REVEAL SYSTEM
  // ══════════════════════════════════════
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('reveal--visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay) || 0;
            setTimeout(() => {
              entry.target.classList.add('reveal--visible');
            }, delay * 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => {
      // Skip hero elements — they animate on load
      if (!el.closest('#hero')) {
        observer.observe(el);
      }
    });
  }

  // ══════════════════════════════════════
  // 8.2 HEADER SCROLL
  // ══════════════════════════════════════
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    const heroLogo = document.querySelector('.hero__logo');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      if (window.innerWidth <= 767 && heroLogo) {
        const rect = heroLogo.getBoundingClientRect();
        
        // Disable CSS transitions during physical scroll computation to prevent collision stutter 
        header.style.transition = 'none';
        const headerLogo = header.querySelector('.header__logo');
        if (headerLogo) headerLogo.style.transition = 'none';
        heroLogo.style.transition = 'none';
        
        const startDrop = 150; // Start crossfade earlier
        const endDrop = 20;

        if (rect.top <= startDrop && rect.top > endDrop) {
          // Transition zone (0 to 1)
          const progress = 1 - ((rect.top - endDrop) / (startDrop - endDrop));
          
          header.style.background = `rgba(10, 10, 10, ${progress * 0.85})`;
          header.style.backdropFilter = `blur(${progress * 12}px)`;
          header.style.webkitBackdropFilter = `blur(${progress * 12}px)`;
          header.style.padding = `${20 - (progress * 6)}px 0`; // 20px shrinks to 14px
          
          if (headerLogo) {
            headerLogo.style.visibility = 'visible';
            headerLogo.style.opacity = progress.toString();
          }
          heroLogo.style.opacity = Math.max(0, 1 - (progress * 1.5)).toString(); // Fade out priority
        } else if (rect.top <= endDrop) {
          // Locked scrolled state
          header.style.background = `rgba(10, 10, 10, 0.85)`;
          header.style.backdropFilter = `blur(12px)`;
          header.style.webkitBackdropFilter = `blur(12px)`;
          header.style.padding = `14px 0`;
          
          if (headerLogo) {
             headerLogo.style.visibility = 'visible';
             headerLogo.style.opacity = '1';
          }
          heroLogo.style.opacity = '0';
        } else {
          // Original un-scrolled state
          header.style.background = 'transparent';
          header.style.backdropFilter = 'blur(0px)';
          header.style.webkitBackdropFilter = 'blur(0px)';
          header.style.padding = '20px 0';
          
          if (headerLogo) {
             headerLogo.style.visibility = 'hidden';
             headerLogo.style.opacity = '0';
          }
          heroLogo.style.opacity = '1';
        }
      } else {
        // Desktop
        if (window.scrollY > (window.innerHeight * 0.8)) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        
        if (heroLogo) heroLogo.style.opacity = '1';
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ══════════════════════════════════════
  // 8.3 SMOOTH SCROLL
  // ══════════════════════════════════════
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // ══════════════════════════════════════
  // 8.4 SCROLL PROGRESS INDICATOR
  // ══════════════════════════════════════
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
  }

  // ══════════════════════════════════════
  // 8.5 HERO LOAD ANIMATION
  // ══════════════════════════════════════
  function initHeroAnimation() {
    if (prefersReducedMotion) return;

    const heroReveals = document.querySelectorAll('#hero .reveal');
    heroReveals.forEach((el) => {
      const delay = parseFloat(el.dataset.delay) || 0;
      setTimeout(() => {
        el.classList.add('reveal--visible');
      }, (delay * 1000) + 300); // +300ms initial delay for page load
    });
  }

  // ══════════════════════════════════════
  // 8.6 HERO PARALLAX (ZOOM OUT)
  // ══════════════════════════════════════
  function initHeroParallax() {
    const heroImgContainer = document.querySelector('.hero__image');
    const heroImg = document.querySelector('.hero__image img');
    // Removed prefersReducedMotion to ensure it doesn't fail silently on iPhones with that setting
    if (!heroImg) return;

    // DEFINITIVELY kill the mobile URL bar jump by freezing the container's height in absolute pixels.
    if (window.innerWidth <= 767 && heroImgContainer) {
      // Force it to compute the current physical height and lock it.
      const lockedHeight = heroImgContainer.offsetHeight;
      if (lockedHeight > 0) {
        heroImgContainer.style.height = lockedHeight + 'px';
        heroImgContainer.style.maxHeight = 'none';
      }
    }

    // Start big (the size the user liked initially)
    const scaleStart = 1.15;
    // Grow heavily on scroll (Zoom In effect)
    const scaleEnd = 1.35; 
    
    // Use 3D transforms to force iOS Safari to hardware-accelerate and not freeze
    heroImg.style.transform = `scale3d(${scaleStart}, ${scaleStart}, 1) translateZ(0)`;
    heroImg.style.transformOrigin = 'center 20%'; 
    heroImg.style.willChange = 'transform';
    // Remove all CSS transitions so smooth JS execution doesn't micro-stutter
    heroImg.style.transition = 'none';

    function applyParallax() {
      // Disable on desktop as requested (do not touch version mobile)
      if (window.innerWidth > 767) {
        heroImg.style.transform = 'none';
        return;
      }

      // Prevent iOS rubber-banding math jump
      let scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 0) scrollY = 0; 
      
      const range = window.innerHeight * 0.6; 
      
      // Starts at 1.15, grows as user scrolls down
      let scale = scaleStart + ((scrollY / range) * (scaleEnd - scaleStart));
      
      // Clamp between 1.15 and 1.35
      scale = Math.max(scaleStart, Math.min(scaleEnd, scale));
      
      heroImg.style.transform = `scale3d(${scale}, ${scale}, 1) translateZ(0)`;
    }

    // Synchronous execution avoids iOS momentum scroll suspension
    window.addEventListener('scroll', applyParallax, { passive: true });
    // Force one initial application to be sure
    applyParallax();
  }

  // ══════════════════════════════════════
  // INIT
  // ══════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initHeroParallax();
    initScrollReveal();
    initHeaderScroll();
    initSmoothScroll();
    initScrollProgress();
  });
})();
