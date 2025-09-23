// DOMContentLoaded: Wait until HTML is fully loaded
document.addEventListener('DOMContentLoaded', function() {


// DYNAMIC EVENTS CALENDAR

function populateUpcomingEvents() {
  const eventList = document.getElementById('dynamic-events');
  if (!eventList) return;

  const today = new Date();
  const events = [
    { name: "Forest Bathing Walk", dayOfWeek: 6 }, // Saturday
    { name: "Birdwatching Tour", dayOfWeek: 0 },   // Sunday
    { name: "Family Camping Workshop", dayOfWeek: 6 } // Saturday
  ];

  const eventElements = events.map(event => {
    const nextDate = getNextDayOfWeek(today, event.dayOfWeek);
    const formattedDate = nextDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });

    return `
      <li>
        <strong>${formattedDate}:</strong> 
        <a href="contact.html?tour=event-${event.name.toLowerCase().replace(/\s+/g, '-')}" 
           class="event-link">
          ${event.name}
        </a>
      </li>
    `;
  });

  eventList.innerHTML = eventElements.join('');
}

//  Get next occurrence of a specific day of week
function getNextDayOfWeek(date, dayOfWeek) {
  const resultDate = new Date(date);
  resultDate.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
  if (resultDate <= date) {
    resultDate.setDate(resultDate.getDate() + 7);
  }
  return resultDate;
}

// Initialize
populateUpcomingEvents();


  // MOBILE MENU TOGGLE


  // Create hamburger button if it doesn't exist
  const header = document.querySelector('.header');
  if (!document.querySelector('.hamburger')) {
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    header.appendChild(hamburger);

   
    const style = document.createElement('style');
    style.textContent = `
      .hamburger {
        display: none;
        font-size: 1.8rem;
        cursor: pointer;
        background: none;
        border: none;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
      }
      @media (max-width: 768px) {
        .hamburger { display: block; }
        .nav-list { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background: #1e5720; padding: 1rem 0; box-shadow: 0 5px 10px rgba(0,0,0,0.2); }
        .nav-list.active { display: flex; }
      }
    `;
    document.head.appendChild(style);
  }

  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', function() {
      navList.classList.toggle('active');
      hamburger.textContent = navList.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a nav link (mobile)
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburger.textContent = '☰';
      });
    });
  }

  // SMOOTH SCROLL (for anchor links)


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Only prevent default if it's an anchor on the same page
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });

});