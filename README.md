# Foliohub Law Firm — Project 25 (MY PART)

A complete, responsive **seven-page** demo law-firm website with a Node.js/Express API and MongoDB persistence. This is **only the Foliohub Law Firm project**; the Canvas and Bungee projects are not included.

## Requirements from the PDF

- Pages: **Home, Services, Gallery, Pricing, Booking, Reviews, Contact**.
- Frontend: **HTML + CSS + JavaScript**.
- Backend: **Node.js + Express**; database: **MongoDB**.
- **Libre Baskerville** font, navy `#0F2A44`, gold `#C9A227`, **parallax** hero text.
- Hosting targets: **Vercel (frontend)**, **Render (backend)**, **MongoDB Atlas (database)**.

## Run locally

1. Install **Node.js 20+** and make a free **MongoDB Atlas** database (or run local MongoDB).
2. Open a terminal in `backend/` and run:

   ```bash
   npm install
   cp .env.example .env
   ```

3. Set `MONGO_URI` in `backend/.env` to your real database connection string. (Do **not** commit `.env`.)
4. Start the API:

   ```bash
   npm run seed
   npm run dev
   ```

   Verify `http://localhost:5000/api/health` returns JSON with `"ok": true`.
5. Open a **separate terminal** from the project root:

   ```bash
   cd frontend
   python -m http.server 5500
   ```

   Open `http://localhost:5500`. Do **not** just double-click the HTML files: JavaScript modules are served more reliably via HTTP.

6. Complete the Booking or Contact form. Records should be created in your MongoDB database.

Windows PowerShell: use `Copy-Item .env.example .env` in place of `cp` and `py -m http.server 5500` if `python` isn't available.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | API health |
| GET | `/api/services` | List of database services |
| POST | `/api/bookings` | Save consultation request with default `pending` status |
| POST | `/api/contact` | Save a general contact message |

Sample booking JSON:

```json
{
  "name": "Alex Example",
  "phone": "+1 555 010 1234",
  "email": "alex@example.com",
  "service": "Corporate & Business",
  "date": "2027-01-15",
  "message": "I would like to discuss a business agreement."
}
```

**Important:** A successful booking response means a request was saved, **not** that an appointment is confirmed. There is no authentication, staff admin dashboard, real appointment availability checker, or email notification in this project. Add those before using this for a real legal practice.

## Deploy

1. **MongoDB Atlas**: create a database user, configure network access for your backend environment, copy the connection string.
2. **Render**: create a Node web service; repository root directory `backend`, build command `npm install`, start command `npm start`; add environment variables `MONGO_URI` and `CLIENT_ORIGINS` (your exact Vercel origin, e.g. `https://example.vercel.app`). Render provides the `PORT` value automatically.
3. **Frontend**: change `frontend/js/api-config.js` from `http://localhost:5000` to the Render HTTPS URL. Deploy the **frontend directory** as a static site in Vercel (Framework Preset: Other, no build command, Output Directory: `.` if requested).
4. Verify booking/contact submissions on the deployed URL. Update allowed CORS origins if your actual URL changes.

## Content disclaimer

This is a **demo**, not a real law firm. Services/pricing text, office hours, testimonials, and gallery are illustrative. No actual attorney names, real firm reviews, contact details, location, fees or case results were supplied in the source PDF. Replace the sample content with approved real information prior to public launch. Stock photos are externally hosted on Unsplash and may require attribution/license review for production use. Do not collect private case details in the demo forms.

## Project layout

```
frontend/    index.html + six page HTML files, CSS, JS, config
backend/     server.js, models/, routes/, scripts/seedServices.js
README.md    setup and deployment guide
```

## Notes

- Frontend provides sample service options; `GET /api/services` is available for integration but the displayed practice areas are authored statically for design consistency.
- Backend form inputs are validated and rate-limited; contact messages are stored, not emailed.
- The PDF only provided skeletal examples, so this implementation adds required package setup, models, robust routing, responsive design and form handling.
