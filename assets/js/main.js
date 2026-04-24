/**
 * NestQuest — Main Script
 * Sections:
 *   1. Nav scroll behaviour
 *   2. Hero parallax
 *   3. Hero headline word-by-word animation
 *   4. Hero pill filter
 *   5. Scroll-reveal (IntersectionObserver)
 *   6. Counter animation (Trust bar)
 *   7. Property card filter
 *   8. Property card heart toggle
 *   9. Testimonial slider
 *  10. CTA form submission
 */

/* ─────────────────────────────────────────
   1. NAV SCROLL BEHAVIOUR
───────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─────────────────────────────────────────
   2. HERO PARALLAX
───────────────────────────────────────── */
const heroBg = document.getElementById('heroBg');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroBg.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
}, { passive: true });

/* ─────────────────────────────────────────
   3. HERO HEADLINE — WORD-BY-WORD ANIMATION
   Wraps each word in a <span> with a staggered
   CSS animation delay so words fade up one-by-one.
───────────────────────────────────────── */
(function animateHeadline() {
  const heading = document.getElementById('heroHeadline');
  if (!heading) return;

  // Split on HTML tags and entities to preserve <em> and <br>
  const parts = heading.innerHTML.split(/(<[^>]+>|&[^;]+;)/g);
  let wordDelay = 0.5;
  let result = '';

  for (const part of parts) {
    if (part.startsWith('<') || part.startsWith('&')) {
      result += part;
    } else {
      result += part.replace(/(\S+)/g, (word) => {
        const delay = wordDelay;
        wordDelay += 0.07;
        return `<span class="word" style="animation:fadeUp 0.5s ${delay}s ease-out forwards">${word}</span>`;
      });
    }
  }

  heading.innerHTML = result;
})();

/* ─────────────────────────────────────────
   4. HERO PILL FILTER
───────────────────────────────────────── */
function setHeroPill(el) {
  document.querySelectorAll('.hero-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

/* ─────────────────────────────────────────
   5. SCROLL-REVEAL
   Adds .visible to .step-item and .service-card
   elements as they enter the viewport.
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.step-item, .service-card').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 0.12 + 's';
  revealObserver.observe(el);
});

/* ─────────────────────────────────────────
   6. COUNTER ANIMATION (TRUST BAR)
   Counts up each [data-target] stat number
   with an eased animation when the section
   scrolls into view.
───────────────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const trustSection = document.getElementById('trust');
if (trustSection) counterObserver.observe(trustSection);

function runCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target    = parseFloat(el.dataset.target);
    const prefix    = el.dataset.prefix || '';
    const suffix    = el.dataset.suffix || '';
    const isDecimal = String(target).includes('.');
    const duration  = 1400;
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value    = target * eased;

      el.textContent = prefix
        + (isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString())
        + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Final value — append '+' only when no explicit suffix was set
        el.textContent = prefix
          + (isDecimal ? target.toFixed(1) : target.toLocaleString())
          + (suffix || '+');
      }
    }

    requestAnimationFrame(tick);
  });
}

/* ─────────────────────────────────────────
   7. PROPERTY CARD FILTER
───────────────────────────────────────── */
function filterProps(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.prop-card').forEach(card => {
    const isMatch = type === 'all' || card.dataset.type === type;
    card.style.opacity   = isMatch ? '' : '0.3';
    card.style.transform = isMatch ? '' : 'scale(0.97)';
  });
}

/* ─────────────────────────────────────────
   8. PROPERTY CARD — HEART TOGGLE
───────────────────────────────────────── */
function toggleHeart(el) {
  el.classList.toggle('liked');

  const card = el.closest('.prop-card');
  card.style.transition = 'transform 0.15s';
  card.style.transform  = 'scale(1.02)';

  setTimeout(() => { card.style.transform = ''; }, 150);
}

/* ─────────────────────────────────────────
   9. TESTIMONIAL SLIDER
───────────────────────────────────────── */
let currentSlide = 0;

const testimonialCards = document.querySelectorAll('.testi-card');
const testimonialDots  = document.querySelectorAll('.testi-dot');
const testimonialTrack = document.getElementById('testiTrack');

function updateSlider() {
  const cardWidth = testimonialCards[0].offsetWidth + 24; // card + gap
  testimonialTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  testimonialCards.forEach((c, i) => c.classList.toggle('active', i === currentSlide));
  testimonialDots.forEach((d, i)  => d.classList.toggle('active', i === currentSlide));
}

function slideTestimonials(direction) {
  currentSlide = Math.max(0, Math.min(testimonialCards.length - 1, currentSlide + direction));
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Auto-advance every 5 seconds; stop on manual interaction
let autoSlide = setInterval(() => {
  slideTestimonials(currentSlide < testimonialCards.length - 1 ? 1 : -currentSlide);
}, 5000);

document.getElementById('testiPrev')?.addEventListener('click', () => clearInterval(autoSlide));
document.getElementById('testiNext')?.addEventListener('click', () => clearInterval(autoSlide));

/* ─────────────────────────────────────────
   10. CTA FORM SUBMISSION
───────────────────────────────────────── */
function submitCTA() {
  const name   = document.getElementById('ctaName')?.value.trim();
  const email  = document.getElementById('ctaEmail')?.value.trim();
  const intent = document.getElementById('ctaIntent')?.value;

  if (!name || !email || !intent) {
    alert('Please fill in all fields.');
    return;
  }

  const fieldsEl  = document.getElementById('ctaFormFields');
  const successEl = document.getElementById('formSuccess');

  fieldsEl.style.opacity = '0';

  setTimeout(() => {
    fieldsEl.style.display = 'none';
    successEl.classList.add('show');
  }, 300);
}
