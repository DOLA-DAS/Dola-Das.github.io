/* =============================================
   DOLA DAS – PORTFOLIO SCRIPT
   ============================================= */

// ── 1. NAVBAR: scroll effect + active link highlighting
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Scroll effect
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top button
  const backTop = document.getElementById('back-top');
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

// ── 2. HAMBURGER MENU (mobile)
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// ── 3. TYPED TEXT in hero (no flicker version)
const typedEl = document.getElementById('typed');
const phrases = [
  'Applied Cryptographer',
  'Information Security Researcher',
  'Privacy Preserving Systems Expert',
  'Educator & Painter'
];
let pi = 0, ci = 0, deleting = false;
let typingTimer = null;

// Fix height so page doesn't jump
typedEl.style.display = 'inline-block';
typedEl.style.minWidth = '1px';
typedEl.style.borderRight = '2px solid #c0392b';
typedEl.style.paddingRight = '3px';
typedEl.style.animation = 'blink 0.7s step-end infinite';

// Add blink keyframe once
if (!document.getElementById('blink-style')) {
  const blinkStyle = document.createElement('style');
  blinkStyle.id = 'blink-style';
  blinkStyle.textContent = `@keyframes blink { 0%,100%{border-color:#c0392b} 50%{border-color:transparent} }`;
  document.head.appendChild(blinkStyle);
}

function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    ci++;
    typedEl.textContent = phrase.slice(0, ci);
    if (ci === phrase.length) {
      deleting = true;
      typingTimer = setTimeout(typeLoop, 2000);
      return;
    }
    typingTimer = setTimeout(typeLoop, 80);
  } else {
    ci--;
    typedEl.textContent = phrase.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      typingTimer = setTimeout(typeLoop, 400);
      return;
    }
    typingTimer = setTimeout(typeLoop, 40);
  }
}
typeLoop();

// ── 4. PUBLICATION FILTER
const pubBtns = document.querySelectorAll('.pub-btn');
const pubItems = document.querySelectorAll('.pub-item');

pubBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pubBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    pubItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-type') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── 5. PAINTINGS
// Paintings are embedded directly in index.html
// To add more paintings, add <div class="painting-item"> blocks in the paintings-grid section

// ── 6. CONTACT FORM — Formspree integration
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button');
  const nameVal    = contactForm.querySelector('input[type="text"]').value.trim();
  const emailVal   = contactForm.querySelector('input[type="email"]').value.trim();
  const messageVal = contactForm.querySelector('textarea').value.trim();

  if (!nameVal || !emailVal || !messageVal) return;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xvzlrwed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: nameVal, email: emailVal, message: messageVal })
    });

    if (response.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#27ae60';
      btn.style.borderColor = '#27ae60';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    btn.textContent = 'Failed. Try again.';
    btn.style.background = '#c0392b';
    btn.style.borderColor = '#c0392b';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
    }, 3000);
  }
});

// ── 7. SCROLL REVEAL: fade in sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.pub-item, .achievement-card, .timeline-item, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
