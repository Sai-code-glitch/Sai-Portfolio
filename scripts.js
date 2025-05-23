// scripts.js

// Modal viewer for project images
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.project-modal-trigger');

  modals.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = 'flex';

      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
          modal.style.display = 'none';
        }
      });
    });
  });
});
// Section highlight in navbar
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('#navbar a');

  let current = '';
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (top >= offset && top < offset + height) current = id;
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
// Resume Modal
document.addEventListener('DOMContentLoaded', () => {
  const resumeBtn = document.getElementById('resume-btn');
  const modal = document.getElementById('resume-modal');

  if (resumeBtn && modal) {
    resumeBtn.addEventListener('click', e => {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  }
});
// Language Switcher
document.getElementById('languageSwitcher').addEventListener('change', function () {
  const lang = this.value;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.dataset[lang];
  });
});
// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length) {
  setInterval(() => {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
  }, 5000);
}
// EmailJS Form Submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
        .then(() => {
          msg.textContent = "✅ Message sent successfully!";
          msg.style.color = "green";
          form.reset();
        }, (error) => {
          msg.textContent = "❌ Failed to send. Try again.";
          msg.style.color = "red";
        });
    });
  }
});
