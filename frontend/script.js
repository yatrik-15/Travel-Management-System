document.addEventListener('DOMContentLoaded', () => {
  // Mock data for Tours, Flights, and Hotels
  const tours = [
    { title: 'Paris Getaway', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', desc: '5 Days in the City of Lights' },
    { title: 'Bali Adventure', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', desc: '7 Days of beaches and temples' },
    { title: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80', desc: 'Explore snowy peaks and lakes' }
  ];

  const flights = [
    { title: 'Delhi → Paris', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80', desc: 'Air France • 9 hrs' },
    { title: 'Mumbai → Bali', img: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=800&q=80', desc: 'Singapore Airlines • 8 hrs' },
    { title: 'Ahmedabad → Zurich', img: 'https://images.unsplash.com/photo-1543128639-6e4c7c57c5d9?auto=format&fit=crop&w=800&q=80', desc: 'Swiss Air • 10 hrs' }
  ];

  const hotels = [
    { title: 'Hilton Paris', img: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=800&q=80', desc: 'Luxury stay near Eiffel Tower' },
    { title: 'Bali Resort', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', desc: 'Ocean view with private villa' },
    { title: 'Swiss Lodge', img: 'https://images.unsplash.com/photo-1590490360181-c1d3e51d7b8e?auto=format&fit=crop&w=800&q=80', desc: 'Peaceful mountain retreat' }
  ];

  // Function to render cards
  function renderCards(list, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = list.map(item => `
      <div class="card">
        <img src="${item.img}" alt="${item.title}">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Render all sections
  renderCards(tours, 'tours-list');
  renderCards(flights, 'flights-list');
  renderCards(hotels, 'hotels-list');

  //
  // --- NEW CUSTOMER FORM LOGIC ---
  //
  const form = document.getElementById('customer-form');
  const customerList = document.getElementById('customer-list');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // 1. Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // 2. Simple validation
    if (!name || !email || !phone) {
      alert('Please fill all fields');
      return;
    }

    // 3. Create the data object to send to the backend
    const customerData = {
      name: name,
      email: email,
      phone: phone
    };
    
    // Clear old messages
    const existingMessage = document.getElementById('form-message');
    if (existingMessage) existingMessage.remove();

    try {
      // 4. Send the data to your backend API
      const response = await fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      // 5. Handle the response from the server
      if (response.ok) {
        const result = await response.json();
        
        // Add success message to the page
        const li = document.createElement('li');
        li.id = 'form-message';
        li.textContent = `Success: Customer "${result.name}" was added!`;
        li.style.color = 'green';
        customerList.prepend(li); // Add to top of the list

        form.reset(); // Clear the form
      } else {
        // Handle errors (like duplicate email)
        const errorResult = await response.json();
        const li = document.createElement('li');
        li.id = 'form-message';
        li.textContent = `Error: ${errorResult.message}`;
        li.style.color = 'red';
        customerList.prepend(li);
      }
    } catch (error) {
      // Handle network errors (e.g., backend is not running)
      console.error('Network error:', error);
      const li = document.createElement('li');
      li.id = 'form-message';
      li.textContent = 'Error: Could not connect to the server. Is it running?';
      li.style.color = 'red';
      customerList.prepend(li);
    }
  });

  // Smooth scroll navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if(targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});