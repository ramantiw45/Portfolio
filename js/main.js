/* ============================================================
   LUMINOUS GLASS — JavaScript Interactions
   Personal Portfolio for Raman Tiwari
   ============================================================ */

(function () {
  'use strict';

  // ── CONSTANTS ──
  const DEPTH_SENSITIVITY = { bg: 0.02, mid: 0.015, fg: 0.04 };
  const DEPTH_ROTATION = { x: 0.01, y: 0.015 };
  const LERP_FACTOR = 0.08;
  const COUNTER_DURATION = 2000;
  const NAVBAR_SCROLL_THRESHOLD = 50;

  // ── STATE ──
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let depthAnimating = false;
  let isMobile = window.matchMedia('(max-width: 768px)').matches;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── DOM READY ──
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initDepthPhoto();
    initCursorGlow();
    initCounters();
    initActiveSection();
    initContactForm();
    initResumeButton();
    initLanguageBars();
    initProgressRings();
    initScrollProgress();
    initBackToTop();
    initCopyEmail();
    initFormTactileFeedback();
  }


  // ── 1. NAVBAR SCROLL EFFECT ──
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check initial state
  }


  // ── 2. MOBILE MENU ──
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.body.classList.toggle('mobile-menu-open', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
      });
    });
  }


  // ── 3. SMOOTH SCROLLING ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }


  // ── 4. SCROLL REVEAL (Intersection Observer) ──
  function initScrollReveal() {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }


  // ── 5. DEPTH PHOTO PARALLAX ──
  function initDepthPhoto() {
    if (prefersReducedMotion) return;

    const container = document.getElementById('depthPhoto');
    if (!container) return;

    const bgLayer = container.querySelector('.depth-bg');
    const midLayer = container.querySelector('.depth-mid');
    const fgLayer = container.querySelector('.depth-fg');
    const badges = container.querySelectorAll('.hero-badge');

    if (!bgLayer || !midLayer || !fgLayer) return;

    if (isMobile) {
      initGyroscope(bgLayer, midLayer, fgLayer, badges);
    } else {
      initMouseTracking(container, bgLayer, midLayer, fgLayer, badges);
    }
  }

  function initMouseTracking(container, bgLayer, midLayer, fgLayer, badges) {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (!depthAnimating) {
        depthAnimating = true;
        animateDepth(bgLayer, midLayer, fgLayer, badges);
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });
  }

  function animateDepth(bgLayer, midLayer, fgLayer, badges) {
    currentX += (mouseX - currentX) * LERP_FACTOR;
    currentY += (mouseY - currentY) * LERP_FACTOR;

    const bgX = currentX * DEPTH_SENSITIVITY.bg * 100;
    const bgY = currentY * DEPTH_SENSITIVITY.bg * 100;
    const midX = currentX * DEPTH_SENSITIVITY.mid * 100;
    const midY = currentY * DEPTH_SENSITIVITY.mid * 100;
    const fgX = currentX * DEPTH_SENSITIVITY.fg * 100;
    const fgY = currentY * DEPTH_SENSITIVITY.fg * 100;

    const rotateX = -currentY * DEPTH_ROTATION.x * 100;
    const rotateY = currentX * DEPTH_ROTATION.y * 100;

    bgLayer.style.transform = `translate3d(${bgX}px, ${bgY}px, 0)`;
    midLayer.style.transform = `translate3d(${midX}px, ${midY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    fgLayer.style.transform = `translate3d(${fgX}px, ${fgY}px, 0)`;

    // Animate badges at different speeds
    badges.forEach((badge, i) => {
      const factor = 0.03 + i * 0.015;
      badge.style.transform += ` translate(${currentX * factor * 60}px, ${currentY * factor * 60}px)`;
    });

    if (Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
      requestAnimationFrame(() => animateDepth(bgLayer, midLayer, fgLayer, badges));
    } else {
      depthAnimating = false;
    }
  }

  function initGyroscope(bgLayer, midLayer, fgLayer, badges) {
    if (!('DeviceOrientationEvent' in window)) return;

    const handler = (e) => {
      const gamma = (e.gamma || 0) / 45; // left/right tilt, -1 to 1
      const beta = ((e.beta || 0) - 45) / 45; // front/back tilt, -1 to 1

      const clampedGamma = Math.max(-1, Math.min(1, gamma));
      const clampedBeta = Math.max(-1, Math.min(1, beta));

      mouseX = clampedGamma;
      mouseY = clampedBeta;

      if (!depthAnimating) {
        depthAnimating = true;
        animateDepth(bgLayer, midLayer, fgLayer, badges);
      }
    };

    // iOS 13+ requires permission
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Will be triggered on user gesture (first tap)
      document.addEventListener('click', function requestPerm() {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handler, { passive: true });
            }
          })
          .catch(() => {});
        document.removeEventListener('click', requestPerm);
      }, { once: true });
    } else {
      window.addEventListener('deviceorientation', handler, { passive: true });
    }
  }


  // ── 6. CURSOR GLOW (Desktop Only) ──
  function initCursorGlow() {
    if (isMobile || prefersReducedMotion) return;

    const glow = document.querySelector('.hero-cursor-glow');
    if (!glow) return;

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }


  // ── 7. COUNTER ANIMATIONS ──
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;

    function render(num) {
      const formatted = isDecimal ? num.toFixed(2) : Math.floor(num);
      if (suffix) {
        el.innerHTML = formatted + '<span class="counter-suffix">' + suffix + '</span>';
      } else {
        el.textContent = formatted;
      }
    }

    if (prefersReducedMotion) {
      render(target);
      return;
    }

    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / COUNTER_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const current = target * eased;
      render(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        render(target);
      }
    }

    requestAnimationFrame(update);
  }


  // ── 8. ACTIVE SECTION TRACKING ──
  function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72}px 0px -40% 0px` }
    );

    sections.forEach(section => observer.observe(section));
  }


  // ── 9. CONTACT FORM SUBMISSION ──
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('.form-submit');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

    function setStatus(type, message, isHTML = false) {
      if (!statusEl) return;
      statusEl.className = 'form-status ' + type;
      if (isHTML) {
        statusEl.innerHTML = message;
      } else {
        statusEl.textContent = message;
      }
      statusEl.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('#contactName');
      const emailInput = form.querySelector('#contactEmail');
      const messageInput = form.querySelector('#contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // 1. Client-side validation
      if (!name || name.length < 2) {
        setStatus('warning', 'Please enter your name (at least 2 characters).');
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setStatus('warning', 'Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!message || message.length < 5) {
        setStatus('warning', 'Please write a message with at least 5 characters.');
        if (messageInput) messageInput.focus();
        return;
      }

      // 2. Honeypot anti-spam check
      const honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value.trim() !== '') {
        setStatus('success', '✓ Message sent successfully! I\'ll get back to you soon.');
        form.reset();
        return;
      }

      // 3. UI feedback for sending state
      setStatus('sending', 'Sending your message...');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // 4. Construct JSON payload for FormSubmit AJAX API
      const formData = new FormData(form);
      const payload = {
        name: name,
        email: email,
        message: message,
        _subject: formData.get('_subject') || ('Portfolio Message from ' + name),
        _template: formData.get('_template') || 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        let result = null;
        try {
          result = await response.json();
        } catch (_) {}

        if (response.ok && (!result || result.success !== 'false')) {
          setStatus('success', '✓ Message sent successfully! I\'ll get back to you soon.');
          form.reset();
          setTimeout(() => {
            if (statusEl && statusEl.classList.contains('success')) {
              statusEl.style.display = 'none';
            }
          }, 8000);
        } else {
          const errorMsg = (result && result.message) ? result.message : 'Server error occurred.';
          throw new Error(errorMsg);
        }
      } catch (error) {
        console.warn('Direct API submission issue, providing fallback mailto:', error);
        const mailtoUrl = 'mailto:work.ramantiwari@gmail.com?subject=' +
          encodeURIComponent('Portfolio Message from ' + name) +
          '&body=' + encodeURIComponent(message + '\n\n---\nFrom: ' + name + '\nEmail: ' + email);

        setStatus(
          'error',
          '✕ Could not send automatically. <a href="' + mailtoUrl + '">Click here to send directly to work.ramantiwari@gmail.com →</a>',
          true
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }


  // ── 10. RESUME BUTTON INTERACTION ──
  function initResumeButton() {
    const btns = document.querySelectorAll('#resumeBtn, #resumeBtnMobile');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (!href || href === '#') {
          e.preventDefault();
          window.location.href = 'mailto:work.ramantiwari@gmail.com?subject=' + encodeURIComponent('Resume Request — Raman Tiwari Portfolio');
        }
      });
    });
  }


  // ── 10. LANGUAGE BARS ANIMATION ──
  function initLanguageBars() {
    const bars = document.querySelectorAll('.language-bar-fill');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            if (width) {
              fill.style.width = width;
            }
            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.5 }
    );

    bars.forEach(bar => observer.observe(bar));
  }


  // ── 11. PROGRESS RINGS ANIMATION ──
  function initProgressRings() {
    const rings = document.querySelectorAll('.progress-ring-fill');
    if (rings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const ring = entry.target;
            const progress = parseFloat(ring.getAttribute('data-progress')) || 98;
            const circumference = 2 * Math.PI * 45; // ~282.74
            const offset = circumference - (progress / 100) * circumference;
            ring.style.strokeDashoffset = offset;
            ring.classList.add('animated');
            observer.unobserve(ring);
          }
        });
      },
      { threshold: 0.5 }
    );

    rings.forEach(ring => observer.observe(ring));
  }


  // ── 12. SCROLL PROGRESS BAR ──
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    function updateProgress() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        progressBar.style.width = '0%';
        return;
      }
      const progress = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }


  // ── 13. FLOATING BACK TO TOP ──
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const SCROLL_TRIGGER = 400;

    function onScroll() {
      if (window.scrollY > SCROLL_TRIGGER) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  // ── 14. ONE-CLICK COPY EMAIL WITH TOOLTIP ──
  function initCopyEmail() {
    const btn = document.getElementById('copyEmailBtn');
    if (!btn) return;

    const email = 'work.ramantiwari@gmail.com';
    let timeoutId = null;

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (err) {
          copied = fallbackCopy(email);
        }
      } else {
        copied = fallbackCopy(email);
      }

      if (copied) {
        btn.classList.add('copied');
        btn.setAttribute('aria-label', 'Email address copied to clipboard');
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          btn.classList.remove('copied');
          btn.setAttribute('aria-label', 'Copy email address to clipboard');
        }, 2200);
      }
    });

    function fallbackCopy(text) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      } catch (err) {
        return false;
      }
    }
  }


  // ── 15. CONTACT FORM CHARACTER COUNTER & TACTILE FEEDBACK ──
  function initFormTactileFeedback() {
    const messageInput = document.getElementById('contactMessage');
    const charCounter = document.getElementById('charCounter');
    const charCountEl = document.getElementById('charCount');
    const maxChars = 500;

    if (messageInput && charCounter && charCountEl) {
      function updateCounter() {
        const len = messageInput.value.length;
        charCountEl.textContent = len;

        if (len >= maxChars) {
          charCounter.className = 'char-counter limit';
        } else if (len >= maxChars * 0.85) {
          charCounter.className = 'char-counter warning';
        } else {
          charCounter.className = 'char-counter';
        }
      }

      messageInput.addEventListener('input', updateCounter);
      updateCounter();
    }

    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value.trim().length > 0) {
          if (input.checkValidity()) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
          } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
          }
        } else {
          input.classList.remove('is-valid', 'is-invalid');
        }
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid') && input.checkValidity()) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });
    });
  }


  // ── RESPONSIVE LISTENER ──
  window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
    isMobile = e.matches;
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
  });

})();
