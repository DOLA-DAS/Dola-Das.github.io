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

// ── 3. TYPED TEXT in hero
const typedEl = document.getElementById('typed');
const phrases = [
  'Applied Cryptographer',
  'Information Security Researcher',
  'Privacy Preserving Systems Expert',
  'Educator & Painter'
];
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ci + 1);
    ci++;
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
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

// ── 5. PAINTINGS: add your painting filenames here
//    Once you upload images to the data/ folder, add their names to this array.
//    Example: ['painting1.png', 'painting2.jpg', 'painting3.png']
const paintings = [
  // 'painting1.png',
  // 'painting2.png',
  // 'painting3.png',
];

function loadPaintings() {
  const grid = document.getElementById('paintings-grid');
  if (!paintings.length) return; // show placeholder if no paintings

  // Remove placeholder
  grid.innerHTML = '';

  paintings.forEach((filename, i) => {
    const div = document.createElement('div');
    div.classList.add('painting-item');
    const img = document.createElement('img');
    img.src = `data/${filename}`;
    img.alt = `Painting ${i + 1} by Dola Das`;
    img.loading = 'lazy';
    div.appendChild(img);
    grid.appendChild(div);
  });
}
loadPaintings();

// ── 6. CONTACT FORM (client-side only — use Formspree or EmailJS for backend)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#27ae60';
  btn.style.borderColor = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.borderColor = '';
    contactForm.reset();
  }, 3000);
  // To actually send emails, integrate Formspree:
  // 1. Go to https://formspree.io, create a free account
  // 2. Add your form endpoint: <form action="https://formspree.io/f/YOUR_ID" method="POST">
  // 3. Remove the e.preventDefault() above
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
