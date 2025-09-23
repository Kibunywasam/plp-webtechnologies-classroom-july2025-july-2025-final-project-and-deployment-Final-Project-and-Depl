document.addEventListener('DOMContentLoaded', function() {


  // HELPER FUNCTIONS 


  function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    element.setAttribute('role', 'alert'); // Accessible to screen readers
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function getTourName(tourKey) {
    const tours = {
      'yosemite': 'Yosemite National Park Hike',
      'banff': 'Banff Lakes & Wildlife Tour',
      'serengeti': 'Serengeti Safari Experience',
      'plitvice': 'Plitvice Lakes Walk',
      'maasai': 'Maasai Mara Cultural Trek',
      'blue-cruise': 'Turkish Blue Cruise',
      'wat-arun': 'Wat Arun Cultural Visit',
      'mont-saint': 'Mont-Saint-Michel Guided Tour'
    };
    return tours[tourKey] || tourKey;
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  // AUTO-FILL BOOKING FORM FROM URL PARAMETER

  function autoFillBookingForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const tourParam = urlParams.get('tour');

    if (tourParam) {
      const tourSelect = document.getElementById('tour');
      if (tourSelect && tourSelect.querySelector(`option[value="${tourParam}"]`)) {
        tourSelect.value = tourParam;

        const bookingSection = document.querySelector('.booking-card');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          bookingSection.style.outline = '3px solid #2e8b57';
          bookingSection.style.transition = 'outline 1s ease';
          setTimeout(() => {
            bookingSection.style.outline = 'none';
          }, 2000);
        }
      }
    }
  }


  // CONTACT FORM

  const contactForm = document.getElementById('contact-form');
  const contactMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showMessage(contactMessage, 'Please fill out all fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage(contactMessage, 'Please enter a valid email address.', 'error');
        return;
      }

      showMessage(contactMessage, 'Thank you! Your message has been sent. We’ll reply within 24–48 hours.', 'success');
      contactForm.reset();
    });
  }


  // BOOKING FORM

  const bookingForm = document.getElementById('booking-form');
  const bookingMessage = document.getElementById('booking-message');

  if (bookingForm) {
    const dateInput = document.getElementById('date');
    if (dateInput) {
      const today = new Date();
      const minDate = new Date();
      minDate.setDate(today.getDate() + 7);
      dateInput.min = minDate.toISOString().split('T')[0];
    }

    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const tour = document.getElementById('tour').value;
      const date = document.getElementById('date').value;
      const guests = document.getElementById('guests').value;

      if (!tour || !date || !guests) {
        showMessage(bookingMessage, 'Please complete all required fields.', 'error');
        return;
      }

      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showMessage(bookingMessage, 'Please select a date in the future.', 'error');
        return;
      }

      const tourName = getTourName(tour);
      const formattedDate = formatDate(date);

      showMessage(
        bookingMessage,
        ` Booking Confirmed!\n\nTour: ${tourName}\nDate: ${formattedDate}\nGuests: ${guests}\n\nWe’ll email you a confirmation shortly.`,
        'success'
      );

      bookingForm.reset();
    });
  }

  // Initialize
  autoFillBookingForm();

});