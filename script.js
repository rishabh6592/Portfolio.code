// ---------- Navigation: tabs + sidebar scroll to section ----------
const navTargets = document.querySelectorAll('[data-target]');
const sections = document.querySelectorAll('.code-section');
const tabs = document.querySelectorAll('.tab');
const fileLinks = document.querySelectorAll('.file-link');

navTargets.forEach(el => {
  el.addEventListener('click', (e) => {
    const id = el.getAttribute('data-target');
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeSidebar();
    }
  });
});

function setActive(id) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
  fileLinks.forEach(f => f.classList.toggle('active', f.dataset.target === id));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActive(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));

// ---------- Mobile sidebar ----------
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

menuToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

function closeSidebar() {
  sidebar.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== menuToggle) {
    closeSidebar();
  }
});

// ---------- Typed role text ----------
const roles = ["Web Developer", "MERN Stack Developer", "Frontend Engineer", "Problem Solver"];
const roleEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!roleEl) return;
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    roleEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// ---------- Live visitor counter ----------
// Free, no-backend hit counter (increments once per page load, shared across all visitors)
const viewCountEl = document.getElementById('viewCount');

fetch('https://abacus.jasoncameron.dev/hit/rishabh-kumar-portfolio-v3/views')
  .then(res => res.json())
  .then(data => {
    if (viewCountEl) viewCountEl.textContent = data.value.toLocaleString() + ' views · live';
  })
  .catch(() => {
    if (viewCountEl) viewCountEl.textContent = 'views unavailable';
  });
