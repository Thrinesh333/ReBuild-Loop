# ♻️ ReBuild Loop – Construction Material Reuse Platform

A simple, responsive web application that connects construction contractors who have **excess materials** with those who **need materials** — reducing waste, cutting costs, and building a greener construction industry.

---

## 🚀 Features

| Feature | Description |
|---|---|
| **Home Page** | Landing page with hero, how-it-works, and benefits sections |
| **Supplier Page** | Form to publish excess material listings |
| **Buyer Page** | Search form to find available materials |
| **Material Details** | Full detail view with Contact Supplier mailto link |
| **Dashboard** | Overview statistics, category breakdown, recent listings |
| **LocalStorage** | Supplier listings persist across browser refreshes |
| **15 Sample Listings** | Predefined JSON data always available for demonstration |

---

## 🛠️ Technology Stack

- **React 19** – UI framework
- **Vite 8** – Build tool and dev server
- **Tailwind CSS 4** – Utility-first styling
- **React Router DOM 7** – Client-side routing
- **JavaScript** – All logic and filtering
- **Browser LocalStorage** – Persist user-published listings
- **JSON** – Predefined sample material data

> No backend, no database, no API keys, no external services required.

---

## 📂 Project Structure

```
EVS/
├── public/
│   ├── _redirects          # Netlify SPA redirect rule
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── MaterialCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SupplierPage.jsx
│   │   ├── BuyerPage.jsx
│   │   ├── MaterialDetailPage.jsx
│   │   └── DashboardPage.jsx
│   ├── data/
│   │   └── materials.json  # 15 predefined sample listings
│   ├── utils/
│   │   ├── storage.js      # LocalStorage helpers
│   │   └── listings.js     # Search and filter logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Netlify Deployment

**Via GitHub (Recommended)**

1. Push this project to a GitHub repository.
2. On [netlify.com](https://netlify.com): **Add new site → Import an existing project → GitHub**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**.

The `public/_redirects` file handles React client-side routing automatically.

**Via Drag & Drop**

1. Run `npm run build` locally.
2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 📊 Data Management

- **Predefined listings** — 15 sample materials in `src/data/materials.json`. Always available.
- **User listings** — Saved in browser LocalStorage. Persist on refresh. Device-specific.
- **Search** — Keyword + quantity + location filtering in plain JavaScript.

---

## ⚠️ Prototype Limitations

1. LocalStorage is browser-specific — listings are not shared across devices.
2. Image uploads stored as Base64 in LocalStorage.
3. No real authentication or user accounts.
4. Contact Supplier opens the user's default email client (mailto link).

---

## 🎓 Academic Note

Developed as a college project to demonstrate React, client-side routing, LocalStorage persistence, and Netlify deployment without any backend services.
