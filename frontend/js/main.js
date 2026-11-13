import { config } from '../config.js';
// Local development uses port 5000. On Vercel set the API URL in js/api-config.js.
import { API_BASE_URL } from './api-config.js';
const api = (path) => `${API_BASE_URL.replace(/\/$/, '')}${path}`;
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
const filename = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => { if (a.getAttribute('href') === filename) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); } });
document.querySelector('#year').textContent = new Date().getFullYear();
// Restrict parallax to wider screens and to people who haven't requested reduced motion.
const heroCopy = document.querySelector('.hero-copy');
if (heroCopy && matchMedia('(min-width: 851px) and (prefers-reduced-motion: no-preference)').matches) {
  let pending = false;
  window.addEventListener('scroll', () => { if (pending) return; pending = true; requestAnimationFrame(() => { heroCopy.style.transform = `translate3d(0, ${Math.min(window.scrollY * .16, 75)}px, 0)`; pending = false; }); }, { passive: true });
}
const formStatus = (element, message, isError) => { element.textContent = message; element.className = `form-status ${isError ? 'error' : 'success'}`; };
const booking = document.querySelector('#booking-form');
if (booking) {
  const dateField = booking.querySelector('[name="date"]');
  const localNow = new Date();
  const today = `${localNow.getFullYear()}-${String(localNow.getMonth()+1).padStart(2,'0')}-${String(localNow.getDate()).padStart(2,'0')}`;
  dateField.min = today;
  const requestedService = new URLSearchParams(location.search).get('service');
  if (requestedService && [...booking.querySelector('[name="service"]').options].some(o => o.value === requestedService)) booking.querySelector('[name="service"]').value = requestedService;
  booking.addEventListener('submit', async (e) => {
    e.preventDefault(); const status = document.querySelector('#booking-status');
    if (!booking.reportValidity()) return;
    const data = Object.fromEntries(new FormData(booking).entries());
    const submit = booking.querySelector('[type="submit"]'); submit.disabled = true; formStatus(status,'Sending your request…',false);
    try {
      const res = await fetch(api('/api/bookings'), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.message || 'Unable to submit your request.');
      booking.reset();formStatus(status,'Your consultation request was received. An appointment is not yet confirmed.',false);
    } catch (err) { formStatus(status, `${err.message} Please verify your API URL and that the backend is running.`, true); }
    finally { submit.disabled = false; }
  });
}
const contact = document.querySelector('#contact-form');
if (contact) contact.addEventListener('submit', async (e) => {
  e.preventDefault(); const status = document.querySelector('#contact-status'); if (!contact.reportValidity()) return;
  const submit = contact.querySelector('[type="submit"]'); submit.disabled = true; formStatus(status,'Sending…',false);
  try {
    const res = await fetch(api('/api/contact'),{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(Object.fromEntries(new FormData(contact).entries()))});
    const result = await res.json().catch(() => ({})); if (!res.ok) throw new Error(result.message || 'Unable to send message.');
    contact.reset();formStatus(status,'Message received. Thank you for reaching out.',false);
  } catch(err) {formStatus(status,`${err.message} Please check that the backend is running.`,true)} finally {submit.disabled=false}
});
