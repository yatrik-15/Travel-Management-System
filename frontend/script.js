/* ===================== DATA ===================== */
const TOUR_DATA = [
  {
    id: "paris-getaway",
    name: "Paris Getaway",
    short: "5 days exploring the City of Lights – Eiffel, Louvre & Seine.",
    image: "https://source.unsplash.com/800x600/?paris,eiffel",
    price: "₹1,20,000",
    badge: "Popular",
    details: {
      description: "A romantic classic: art, food and iconic landmarks.",
      days: [
        "Arrival, Seine walk and Eiffel Tower by evening",
        "Louvre museum + Montmartre evening",
        "Versailles day trip",
        "Shopping day + local markets",
        "Departure"
      ]
    }
  },
  {
    id: "bali-bliss",
    name: "Bali Bliss",
    short: "Relax on pristine beaches, cultural Ubud & rice terraces.",
    image: "https://source.unsplash.com/800x600/?bali,beach",
    price: "₹85,000",
    badge: "Best Value",
    details: {
      description: "Beaches, temples and yoga – perfect for rest & recharge.",
      days: [
        "Arrival and beach relaxation",
        "Ubud: monkey forest & rice terraces",
        "Water sports + beach club",
        "Island tour and sunset temple",
        "Departure"
      ]
    }
  },
  {
    id: "swiss-escape",
    name: "Swiss Escape",
    short: "Snowy alps, scenic trains and lakeside towns.",
    image: "https://source.unsplash.com/800x600/?switzerland,alps",
    price: "₹1,40,000",
    badge: "Premium",
    details: {
      description: "Scenic rail journeys, alpine hikes and cozy villages.",
      days: [
        "Zurich arrival + lakeside walk",
        "Interlaken & Jungfrau excursion",
        "Lucerne and Mount Pilatus",
        "Scenic train rides",
        "Departure"
      ]
    }
  }
];

/* ================ UTILITIES ================ */
function el(id){ return document.getElementById(id); }
function updateYear(){ el('year').textContent = new Date().getFullYear(); }
updateYear();

function setActiveNav(route){
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.dataset.route === route) a.classList.add('active'); else a.classList.remove('active');
  });
}

function parseHash(){
  const raw = location.hash.slice(1) || 'home';
  const [routePart, queryPart] = raw.split('?');
  const params = {};
  if(queryPart){
    queryPart.split('&').forEach(p=>{
      const [k,v] = p.split('=');
      if(k) params[k] = decodeURIComponent(v || '');
    });
  }
  return { route: routePart, params };
}

/* ================ RENDERERS ================ */
function renderHome(){
  setActiveNav('home');
  return `
    <section class="hero" role="banner">
      <div class="hero-left">
        <h2>Explore the World with Us</h2>
        <p>Handpicked packages, seamless bookings, and 24/7 support. Your dream destination awaits – let's make it a reality together.</p>
        <div style="margin-top:25px;display:flex;gap:15px;flex-wrap:wrap;">
          <a class="btn" href="#tours">Explore Tours</a>
          <a class="btn ghost" href="#booking">Book Now</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://source.unsplash.com/520x360/?travel,adventure" alt="travel" style="width:100%;max-width:400px;">
      </div>
    </section>

    <section class="section scroll-reveal">
      <h2 class="section-title">🌟 Popular Tours</h2>
      <p style="color:var(--text-light);margin-bottom:30px;font-size:1.1rem;">Discover our most loved destinations</p>
      <div class="cards">
        ${TOUR_DATA.map(t => tourCardHtml(t)).join('')}
      </div>
    </section>
  `;
}

function renderTours(){
  setActiveNav('tours');
  return `
    <section class="section">
      <h2 class="section-title">🗺️ All Tour Packages</h2>
      <p style="color:var(--text-light);margin-bottom:30px;font-size:1.1rem;">Click any package to view full itinerary and book your adventure</p>
      <div class="cards">
        ${TOUR_DATA.map(t => tourCardHtml(t, true)).join('')}
      </div>
    </section>
  `;
}

function tourCardHtml(t, showPrice=false){
  return `
    <article class="card" role="button" onclick="openItinerary('${t.id}')">
      ${t.badge ? `<div class="card-badge">${t.badge}</div>` : ''}
      <img src="${t.image}" alt="${t.name}">
      <div class="card-content">
        <h3>${t.name}</h3>
        <p>${t.short}</p>
        ${showPrice ? `<div class="card-price">${t.price}</div>` : ''}
      </div>
    </article>
  `;
}

function renderItinerary(id){
  setActiveNav('tours');
  const t = TOUR_DATA.find(x => x.id === id);
  if(!t) return `<section class="section"><h2 class="section-title">❌ Tour not found</h2><p style="color:var(--text-light);">We couldn't find that tour. <a href="#tours" class="btn ghost">Back to tours</a></p></section>`;
  return `
    <section class="section">
      <div style="display:flex;gap:30px;flex-wrap:wrap;align-items:flex-start;justify-content:center">
        <div style="flex:1;min-width:300px;max-width:520px">
          <img src="${t.image}" alt="${t.name}" style="width:100%;border-radius:20px;box-shadow:0 15px 50px rgba(0, 0, 0, 0.3);border:2px solid rgba(0, 212, 255, 0.3);">
        </div>

        <div style="flex:1;min-width:280px;max-width:520px">
          <div class="itinerary-card">
            <h3>${t.name}</h3>
            <p style="margin:10px 0 15px;color:var(--muted);font-size:1.05rem;">${t.details.description}</p>
            <div class="card-price">${t.price}</div>
            <h4 style="margin-top:25px;margin-bottom:15px;color:var(--primary1);font-size:1.3rem;">📅 Itinerary</h4>
            <ul class="day-list">
              ${t.details.days.map((d,i)=>`<li><strong>Day ${i+1}:</strong> ${d}</li>`).join('')}
            </ul>

            <div style="margin-top:25px;display:flex;gap:12px;flex-wrap:wrap;">
              <button class="btn" onclick="startBooking('${t.id}')">🎫 Book this package</button>
              <a href="#tours" class="btn ghost" style="align-self:center;">← Back to Tours</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFlights(){
  setActiveNav('flights');
  return `
    <section class="section scroll-reveal">
      <h2 class="section-title">✈️ Available Flights</h2>
      <p style="color:var(--text-light);font-size:1.1rem;">Flight search & integration coming soon. For now, you can view packages and book customers below.</p>
      <div style="margin-top:30px;padding:40px;background:rgba(255,255,255,0.05);border-radius:16px;border:2px dashed rgba(0,212,255,0.3);">
        <p style="color:var(--text-light);text-align:center;font-size:1.2rem;">🚀 Coming Soon: Advanced Flight Search</p>
        <p style="color:var(--muted);text-align:center;margin-top:10px;">We're working on bringing you the best flight deals from around the world!</p>
      </div>
    </section>
  `;
}

function renderHotels(){
  setActiveNav('hotels');
  return `
    <section class="section scroll-reveal">
      <h2 class="section-title">🏨 Hotels & Accommodations</h2>
      <p style="color:var(--text-light);font-size:1.1rem;">Hotel listings coming soon. We'll integrate hotel suggestions to match packages.</p>
      <div style="margin-top:30px;padding:40px;background:rgba(255,255,255,0.05);border-radius:16px;border:2px dashed rgba(0,212,255,0.3);">
        <p style="color:var(--text-light);text-align:center;font-size:1.2rem;">🏨 Coming Soon: Luxury Hotel Bookings</p>
        <p style="color:var(--muted);text-align:center;margin-top:10px;">From 5-star resorts to cozy boutique stays, we've got you covered!</p>
      </div>
    </section>
  `;
}

function renderBooking(prefill){
  setActiveNav('booking');
  return `
    <section class="section">
      <h2 class="section-title">📝 Customer Booking</h2>
      <p style="color:var(--text-light);text-align:center;margin-bottom:30px;font-size:1.1rem;">Fill out the form below to reserve your dream vacation</p>

      <div class="form" role="form">
        <label>👤 Full Name</label>
        <input id="bk-name" type="text" placeholder="Enter your full name" required>

        <label>📧 Email Address</label>
        <input id="bk-email" type="email" placeholder="you@example.com" required>

        <label>📱 Phone Number</label>
        <input id="bk-phone" type="text" placeholder="+91 98765 43210" required>

        <label>🎫 Select Package</label>
        <select id="bk-package">
          <option value="">-- Choose your dream destination --</option>
          ${TOUR_DATA.map(t => `<option value="${t.id}" ${prefill===t.id ? 'selected':''}>${t.name} – ${t.price}</option>`).join('')}
        </select>

        <button class="btn" id="bk-submit">Confirm Booking</button>
      </div>

      <ul id="customer-list"></ul>
    </section>
  `;
}

/* ================ APP / ROUTER ================ */
const app = el('app');

function routerRender(){
  const {route, params} = parseHash();
  
  // Smooth scroll to top
  window.scrollTo({top: 0, behavior: 'smooth'});
  
  if(route === 'home' || route === ''){
    app.innerHTML = renderHome();
  } else if(route === 'tours'){
    app.innerHTML = renderTours();
  } else if(route === 'itinerary'){
    app.innerHTML = renderItinerary(params.id);
  } else if(route === 'flights'){
    app.innerHTML = renderFlights();
  } else if(route === 'hotels'){
    app.innerHTML = renderHotels();
  } else if(route === 'booking'){
    app.innerHTML = renderBooking(params.prefill);
  } else {
    app.innerHTML = `<section class="section"><h2 class="section-title">❌ Page not found</h2><p style="color:var(--text-light);">The page you're looking for doesn't exist. <a href="#home" class="btn">Go Home</a></p></section>`;
  }

  attachAfterRender();
  initScrollReveal();
}

function attachAfterRender(){
  const bkBtn = document.getElementById('bk-submit');
  if(bkBtn){
    bkBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      const name = document.getElementById('bk-name').value.trim();
      const email = document.getElementById('bk-email').value.trim();
      const phone = document.getElementById('bk-phone').value.trim();
      const pkg = document.getElementById('bk-package').value;

      if(!name || !email || !phone || !pkg){
        renderCustomerList(null, "⚠️ Please fill all fields and choose a package.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        renderCustomerList(null, "⚠️ Please enter a valid email address.");
        return;
      }

      addCustomer({name,email,phone,pkg});
      
      document.getElementById('bk-name').value='';
      document.getElementById('bk-email').value='';
      document.getElementById('bk-phone').value='';
      document.getElementById('bk-package').value='';
    });
  }

  renderCustomerList();
}

async function addCustomer(bookingData) {
  const listEl = document.getElementById("customer-list");
  if (!listEl) return;
  
  listEl.innerHTML = `<li style="color:var(--primary1);background:rgba(0,212,255,0.1);border-color:var(--primary1);"><span class="loading"></span> Processing your booking...</li>`;

  try {
    const backendUrl = "http://localhost:3000/api/bookings";

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to save booking");
    }

    const savedBooking = await res.json();
    renderCustomerList(savedBooking, null);

  } catch (err) {
    console.error("Error sending to backend:", err);
    renderCustomerList(null, "❌ Could not connect to server. Please make sure the backend is running on port 3000.");
  }
}

function renderCustomerList(booking, error) {
  const listEl = document.getElementById("customer-list");
  if (!listEl) return;
  
  if (error) {
    listEl.innerHTML = `<li style="color:#ff4757;font-weight:600;background:#fff0f0;border-color:#ff4757;">${error}</li>`;
  } else if (booking) {
    listEl.innerHTML = `<li style="color:#00d4a1;font-weight:600;background:#f0fff4;border-color:#00d4a1;">✅ Success! Booking confirmed for ${booking.name}. Check your email for details!</li>`;
  } else {
    listEl.innerHTML = `
      <p style="color:var(--text-light);text-align:center;opacity:0.7;">
        📋 Submit a booking to see confirmation here.
      </p>`;
  }
}

/* Scroll reveal animation */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => observer.observe(reveal));
}

/* ================ NAV ACTIONS ================ */
window.openItinerary = function(id){
  location.hash = `itinerary?id=${encodeURIComponent(id)}`;
};

window.startBooking = function(id){
  location.hash = `booking?prefill=${encodeURIComponent(id)}`;
};

/* Add click animation to cards */
document.addEventListener('click', function(e) {
  if (e.target.closest('.card')) {
    const card = e.target.closest('.card');
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 100);
  }
});

/* Initial render + hash change listener */
window.addEventListener('hashchange', routerRender);
window.addEventListener('load', ()=>{
  if(!location.hash) location.hash = '#home';
  routerRender();
});

/* Keyboard shortcuts */
window.addEventListener('keydown', e=>{
  if(e.key === 'Escape') location.hash = '#home';
  if(e.ctrlKey && e.key === 'h') {
    e.preventDefault();
    location.hash = '#home';
  }
  if(e.ctrlKey && e.key === 't') {
    e.preventDefault();
    location.hash = '#tours';
  }
  if(e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    location.hash = '#booking';
  }
});

/* Add a subtle cursor trail effect */
document.addEventListener('mousemove', function(e) {
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.width = '5px';
  trail.style.height = '5px';
  trail.style.borderRadius = '50%';
  trail.style.background = 'rgba(0, 212, 255, 0.5)';
  trail.style.pointerEvents = 'none';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  trail.style.zIndex = '9999';
  document.body.appendChild(trail);
  
  setTimeout(() => {
    trail.style.opacity = '0';
    trail.style.transition = 'opacity 0.5s';
    setTimeout(() => trail.remove(), 500);
  }, 10);
});

console.log('%c🌍 Travel Agency System Loaded! ✈️', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #0096ff; font-size: 14px; font-weight: bold;');
console.log('%cESC - Go to Home', 'color: #00d4ff;');
console.log('%cCtrl+H - Go to Home', 'color: #00d4ff;');
console.log('%cCtrl+T - Go to Tours', 'color: #00d4ff;');
console.log('%cCtrl+B - Go to Booking', 'color: #00d4ff;');