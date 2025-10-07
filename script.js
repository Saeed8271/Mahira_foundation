// Header behavior: transparent over hero, turn solid on scroll
const header = document.getElementById('site-header');

function updateHeader() {
  const heroHeight = document.querySelector('.hero').offsetHeight;
  if (window.scrollY > 40) {
    header.classList.remove('transparent');
    header.classList.add('solid');
  } else {
    header.classList.add('transparent');
    header.classList.remove('solid');
  }
}

// initial set
updateHeader();
window.addEventListener('scroll', updateHeader);

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');

navToggle && navToggle.addEventListener('click', (e) => {
  // toggle a class to show/hide
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    nav.style.display = 'none';
  } else {
    nav.classList.add('open');
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.right = '20px';
    nav.style.top = '64px';
  }
});

// Ensure nav display resets on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    nav.style.display = 'flex';
    nav.classList.remove('open');
  } else {
    nav.style.display = 'none';
  }
});

// Smooth reveal for sections
const revealElems = document.querySelectorAll('.section, .card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 600ms ease, transform 600ms ease';
  io.observe(el);
});

// Donation modal (demo)
const donateBtn = document.getElementById('donateBtn');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const donationForm = document.getElementById('donation-form');

if (donateBtn && modal) {
  donateBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

// Demo submission
if (donationForm) {
  donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = donationForm.elements['name'].value || 'Friend';
    alert(`Thank you ${name}! This is a demo donation (no payment processed).`);
    donationForm.reset();
    modal.classList.add('hidden');
  });
}
