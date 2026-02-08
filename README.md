# 🌸 Cycle Tracker

A **privacy-first menstrual cycle tracking web app** that predicts upcoming periods and optionally syncs reminders to Google Calendar — with **full user control** and **no backend**.


---

## ✨ Features

### Core Features
- 🩸 **Period prediction** based on user-provided cycle information
- 📅 **Visual monthly calendar** highlighting cycle phases
- ⏳ **Quick stats** (next period date, days remaining)
- 💾 **Local-first storage** using browser Local Storage

### Google Calendar Integration (Optional)
- 🔐 **Google OAuth 2.0** (write-only calendar access)
- 🗓 **One-way sync** of predicted period events
- ✅ User-selectable sync options:
  - Period predictions only
  - Fertile window (optional)
  - Ovulation estimate (optional)
- 🔁 Manual sync only — no background access

### Privacy & Control
- 🔒 No backend, no database, no server
- 🧹 One-click **delete all data**
- ⚙ Explicit user consent for every sync action


## 🧠 How It Works

### Cycle Prediction Logic

Predictions are **deterministic and transparent** — no machine learning.

* **Next period**

  ```
  last_period_start + cycle_length
  ```

* **Ovulation (estimate)**

  ```
  next_period - 14 days
  ```

* **Fertile window (estimate)**

  ```
  ovulation - 5 days → ovulation + 1 day
  ```

All estimates are clearly labeled as such.

---

## 🏗 Architecture

### Frontend

* Vanilla **HTML / CSS / JavaScript**
* No frameworks, no build step
* Fully static — can be hosted on GitHub Pages

### State Management

* Browser **Local Storage**
* Single source of truth (`cycleState`)

### Google Calendar Sync

* OAuth 2.0 implicit flow
* Scope: `https://www.googleapis.com/auth/calendar.events`
* Write-only access
* Tokens stored locally on the device

### Folder Structure

```
cycle-tracker/
│
├── index.html        # Dashboard
├── calendar.html     # Monthly calendar view
├── settings.html     # Sync & privacy controls
│
├── css/
│   └── style.css
│
├── js/
│   ├── state.js      # Local state management
│   ├── cycle.js      # Prediction logic
│   ├── calendar.js   # Calendar rendering
│   ├── sync.js       # Google Calendar OAuth + sync
│
└── README.md
```

---

## 🔐 Privacy Philosophy

This project is built on a **privacy-by-design** mindset:

* 🚫 No user accounts
* 🚫 No analytics or tracking scripts
* 🚫 No third-party SDKs
* 🚫 No data collection or storage on servers

All data:

* Lives **only in the browser**
* Can be deleted instantly
* Is never shared unless the user explicitly chooses to sync with Google Calendar

Google Calendar access is:

* Optional
* One-way
* User-initiated
* Revocable at any time

---

## 🚀 Getting Started

### Run Locally

You can run this app using any static file server.

**Using Python:**

```bash
python -m http.server 8000
```

Open:

```
http://127.0.0.1:8000/index.html
```

**Or using VS Code Live Server**

---

## 🔧 Google Calendar Setup (Optional)

To enable calendar sync:

1. Create a Google Cloud project
2. Enable Google Calendar API
3. Configure OAuth consent screen
4. Create OAuth Client ID (Web application)
5. Add redirect URI:

   ```
   http://127.0.0.1:5500/settings.html
   ```
6. Paste the Client ID into `js/sync.js`

The app works **fully without this step**.

---

## ⚠ Disclaimer

This app provides **informational estimates only** and is **not a medical device**.
Predictions may vary and should not be used as a substitute for professional medical advice.

---

## 📌 Project Goals

* Demonstrate clean frontend architecture
* Show real OAuth integration without a backend
* Explore privacy-first product design
* Build a useful, respectful health-related tool

---

## 🧩 Future Improvements (Optional)

* Event deduplication & update handling
* Dark mode
* PWA offline support
* Export / backup options
* Accessibility audits & enhancements

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

Built with the help of **ChatGPT (OpenAI)** for development guidance and debugging support.

```




