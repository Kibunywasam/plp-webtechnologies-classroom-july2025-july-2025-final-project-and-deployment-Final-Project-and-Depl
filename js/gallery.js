// Wait for DOM and images to load
window.addEventListener('DOMContentLoaded', function() {
  // Only run on gallery.html
  if (!document.querySelector('.cards-grid')) return;

  const images = document.querySelectorAll('.gallery-img');
  const lightbox = document.createElement('div');
  const lightboxImg = document.createElement('img');
  const caption = document.createElement('div');
  const closeBtn = document.createElement('span');

  // Configure lightbox elements
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.style.display = 'none';

  lightboxImg.id = 'lightbox-img';
  lightboxImg.className = 'lightbox-content';

  caption.id = 'caption';
  caption.style.color = '#ccc';
  caption.style.textAlign = 'center';
  caption.style.padding = '10px 0';

  closeBtn.className = 'close';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close lightbox');

  // Build lightbox structure
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(caption);
  document.body.appendChild(lightbox);

  // Open lightbox
  images.forEach(img => {
    img.addEventListener('click', function() {
      const fullsize = this.getAttribute('data-full') || this.src;
      lightboxImg.src = fullsize;
      caption.textContent = this.alt || 'Image';
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      closeLightbox();
    }
  });
});