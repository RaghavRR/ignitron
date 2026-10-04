# IGNITRON Future Labs — MERN Website

Full multi-page MERN stack website (multiple real routes, not a single scrolling page) with a custom admin panel that can replace ANY photo on the site plus manage projects, gallery, testimonials, resources and leads.

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, Multer file uploads
- Frontend: React (Vite), React Router, Tailwind CSS, Axios

## Folder Structure
```
backend/   -> Express API + MongoDB models + admin auth + image upload
frontend/  -> React multi-page site + admin panel (routes: /admin/*)
```

## 1. Backend Setup
```
cd backend
cp .env.example .env      # edit MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed               # creates admin login + default image slots + sample projects
npm run dev                 # starts API on http://localhost:5000
```

## 2. Frontend Setup
```
cd frontend
cp .env.example .env       # set VITE_API_URL if backend runs elsewhere
npm install
npm run dev                 # starts site on http://localhost:5173
```

## 3. Admin Panel
Visit: `http://localhost:5173/admin/login`
Login with the ADMIN_EMAIL / ADMIN_PASSWORD set in backend/.env (defaults: admin@ignitron.com / ChangeMe@123 — change these before going live).

From the admin panel you can:
- **Site Photos** — replace ANY photo on the live website (hero images, ATL page, About, Kits, Gallery hero, Contact hero, logo, etc.) with one click, no code required.
- **Projects** — add/edit/delete Project Library entries with full detail template (components, circuit diagram, code, video, troubleshooting, challenge, upgrade ideas).
- **Gallery** — upload photos/videos by category (Workshops, Robotics, Labs, Student Projects, Competitions, Events).
- **Testimonials** — add school/teacher/student testimonials.
- **Resources** — manage blogs/tutorials/teacher resources.
- **Impact Numbers** — control the verified stats shown on the homepage.
- **Leads** — view and manage enquiries submitted through the Contact page.

## How "Change Any Photo" Works
Every editable image on the frontend uses the `<EditableImage keyName="..." />` component, which fetches its image from `GET /api/images/:key`. Each key (hero_banner, atl_hero, about_hero, etc.) maps to one `SiteImage` document in MongoDB. In the admin panel's **Site Photos** screen, uploading a new file calls `PUT /api/images/:key` and instantly updates that image everywhere it's used on the site — no redeploy needed.

## WhatsApp Integration
- A floating WhatsApp button appears on every page (bottom-right).
- The Contact page's enquiry form submits the lead to the backend, then automatically redirects the visitor to WhatsApp (`wa.me/<number>`) with a pre-filled message — exactly as requested.
- WhatsApp number is configured via `VITE_WHATSAPP_NUMBER` (frontend) and `WHATSAPP_NUMBER` (backend), currently set to +91 7393985330.

## Pages (real routes, not a one-pager)
`/`, `/about`, `/solutions`, `/atl-labs`, `/projects`, `/projects/:slug`, `/kits`, `/gallery`, `/resources`, `/resources/:slug`, `/contact`, `/privacy-policy`, `/terms`
Admin: `/admin/login`, `/admin/dashboard`, `/admin/images`, `/admin/projects`, `/admin/gallery`, `/admin/testimonials`, `/admin/resources`, `/admin/impact`, `/admin/leads`

## Production Notes
- Change `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` before deploying.
- Serve `backend/uploads` behind a CDN or move to S3/Cloudinary for production scale.
- Build frontend with `npm run build` (outputs to `frontend/dist`) and serve via Nginx/Vercel/Netlify; point `VITE_API_URL` to your deployed backend.
- Backend can be deployed on Render/Railway/EC2; whitelist your frontend domain in `CLIENT_URL`.
