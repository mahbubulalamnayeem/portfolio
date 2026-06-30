// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// In-page nav active state on scroll
const sections = document.querySelectorAll('main .section[id]');
const navLinks = document.querySelectorAll('.inpage-nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
});

sections.forEach(section => observer.observe(section));

// Lightbox for press, exhibitions and awards images
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Image viewer');
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <img class="lightbox-img" src="" alt="" />
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('.lightbox-img');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.list-img img, .award-img img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Image fallback — show a grey box when placeholder images are missing
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const parent = this.parentElement;
    if (parent && !parent.querySelector('.img-fallback')) {
      const fb = document.createElement('div');
      fb.className = 'img-fallback';
      fb.style.cssText = 'width:100%;height:100%;min-height:160px;background:#d0d0c8;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:12px;font-family:sans-serif;';
      fb.textContent = 'Photo placeholder';
      parent.appendChild(fb);
    }
  });
});
