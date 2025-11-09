/* ===================== DATA ===================== */
const TOUR_DATA = [
  {
    id: "paris-getaway",
    name: "Paris Getaway",
    short: "5 days exploring the City of Lights – Eiffel, Louvre & Seine.",
    image: "https://source.unsplash.com/800x600/?paris,eiffel",
    price: "₹1,20,000",
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
        <h2>Explore the world with us</h2>
        <p>Handpicked packages, easy bookings and friendly support. Choose a destination below to view full itinerary and package details.</p>
        <div style="margin-top:18px;">
          <a class="btn" href="#tours">Explore Tours</a>
        </div>
      </div>
      <div style="max-width:360px;">
        <img src="https://source.unsplash.com/520x360/?travel,adventure" alt="travel" style="width:100%;border-radius:10px;box-shadow:0 8px 24px rgba(3,26,43,0.08)">
      </div>
    </section>

    <section class="section scroll-reveal">
      <h2 class="section-title">Popular Tours</h2>
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
      <h2 class="section-title">All Tour Packages</h2>
      <p style="max-width:800px;margin:0 auto 18px;color:var(--muted)">Click any package to view full itinerary and book.</p>
      <div class="cards">
        ${TOUR_DATA.map(t => tourCardHtml(t, true)).join('')}
      </div>
    </section>
  `;
}

function tourCardHtml(t, showPrice=false){
  return `
    <article class="card" role="button" onclick="openItinerary('${t.id}')">
      <img src="${t.image}" alt="${t.name}">
      <div class="card-content">
        <h3>${t.name}</h3>
        <p>${t.short}</p>
        ${showPrice ? `<p style="margin-top:10px;font-weight:700;color:var(--primary1)">${t.price}</p>` : ''}
      </div>
    </article>
  `;
}

function renderItinerary(id){
  setActiveNav('tours');
  const t = TOUR_DATA.find(x => x.id === id);
  if(!t) return `<section class="section"><h2 class="section-title">Tour not found</h2><p>We couldn't find that tour. <a href="#tours" class="btn ghost">Back to tours</a></p></section>`;
  return `
    <section class="section">
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start;justify-content:center">
        <div style="flex:1;min-width:300px;max-width:520px">
          <img src="${t.image}" alt="${t.name}" style="width:100%;border-radius:12px;box-shadow:0 8px 20px rgba(3,26,43,0.06)">
        </div>

        <div style="flex:1;min-width:280px;max-width:480px">
          <div class="itinerary-card">
            <h3>${t.name}</h3>
            <p style="margin:8px 0 10px;color:var(--muted)">${t.details.description}</p>
            <p style="font-weight:700;color:var(--primary1)">${t.price}</p>
            <h4 style="margin-top:14px;margin-bottom:8px">Itinerary</h4>
            <ul class="day-list">
              ${t.details.days.map((d,i)=>`<li><strong>Day ${i+1}:</strong> ${d}</li>`).join('')}
            </ul>

            <div style="margin-top:16px;display:flex;gap:10px">
              <button class="btn" onclick="startBooking('${t.id}')">Book this package</button>
              <a href="#tours" class="btn ghost" style="align-self:center">Back to Tours</a>
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
      <h2 class="section-title">Available Flights</h2>
      <p style="color:var(--muted)">Flight search & integration coming soon. For now, you can view packages and book customers below.</p>
    </section>
  `;
}

function renderHotels(){
  setActiveNav('hotels');
  return `
    <section class="section scroll-reveal">
      <h2 class="section-title">Hotels & Accommodations</h2>
      <p style="color:var(--muted)">Hotel listings coming soon. We'll integrate hotel suggestions to match packages.</p>
    </section>
  `;
}

function renderBooking(prefill){
  setActiveNav('booking');
  return `
    <section class="section">
      <h2 class="section-title">Customer Booking</h2>

      <div class="form" role="form">
        <label style="font-weight:600">Name</label>
        <input id="bk-name" type="text" placeholder="Full name" required>

        <label style="font-weight:600;margin-top:8px">Email</label>
        <input id="bk-email" type="email" placeholder="you@example.com" required>

        <label style="font-weight:600;margin-top:8px">Phone</label>
        <input id="bk-phone" type="text" placeholder="+91..." required>

        <label style="font-weight:600;margin-top:8px">Package</label>
        <select id="bk-package">
          <option value="">-- choose package --</option>
          ${TOUR_DATA.map(t => `<option value="${t.id}" ${prefill===t.id ? 'selected':''}>${t.name} – ${t.price}</option>`).join('')}
        </select>

        <button class="btn" id="bk-submit">Add Customer</button>
      </div>

      <ul id="customer-list"></ul>
    </section>
  `;
}

/* ================ APP / ROUTER ================ */
const app = el('app');

function routerRender(){
  const {route, params} = parseHash();
  
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
    app.innerHTML = `<section class="section"><h2 class="section-title">Page not found</h2><p><a href="#home" class="btn">Go home</a></p></section>`;
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
        renderCustomerList(null, "Please fill all fields and choose a package.");
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
  
  listEl.innerHTML = `<li style="color:var(--muted)"><span class="loading"></span> Sending booking...</li>`;

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
    renderCustomerList(null, "Could not connect to server. Is it running?");
  }
}

function renderCustomerList(booking, error) {
  const listEl = document.getElementById("customer-list");
  if (!listEl) return;
  
  if (error) {
    listEl.innerHTML = `<li style="color:red;font-weight:600;background:#fff0f0;">${error}</li>`;
  } else if (booking) {
    listEl.innerHTML = `<li style="color:green;font-weight:600;background:#f0fff0;">✓ Success! Booking for ${booking.name} received.</li>`;
  } else {
    listEl.innerHTML = `
      <p style="color:var(--muted);text-align:center;">
        Submit a booking to see its status here.
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
    threshold: 0.1
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

document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click', (e)=>{
    // Smooth navigation handled by router
  });
});

/* initial render + hash change listener */
window.addEventListener('hashchange', routerRender);
window.addEventListener('load', ()=>{
  if(!location.hash) location.hash = '#home';
  routerRender();
});

window.addEventListener('keydown', e=>{
  if(e.key === 'Escape') location.hash = '#home';
});