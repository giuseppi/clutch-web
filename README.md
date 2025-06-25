# Clutch Web

Clutch Web is the **web-based version of Clutch**, designed to simplify the experience of organizing and joining **pick-up basketball games**. Inspired by **competitive ranking systems in video games like VALORANT**, Clutch aims to help players find local basketball games effortlessly.

The **initial release** focuses on **Court Discovery Mode**, allowing users to discover nearby basketball courts and set location preferences. A future **Competitive Mode** will introduce **stat tracking, player rankings, and advanced analytics**.

---

## **Table of Contents**

- [Clutch Web](#clutch-web)
  - [**Table of Contents**](#table-of-contents)
  - [**Why?**](#why)
  - [**Overview**](#overview)
    - [**Key Features**](#key-features)
    - [**Future Enhancements**](#future-enhancements)
  - [**Tech Stack**](#tech-stack)
  - [**Installation**](#installation)
    - [**Clone the repository**](#clone-the-repository)
    - [**Install dependencies**](#install-dependencies)
    - [**Set up environment variables**](#set-up-environment-variables)
    - [**Start the development server**](#start-the-development-server)
  - [**Environment Variables**](#environment-variables)

---

## **Why?**

Clutch was created to **merge my passion for basketball and competitive gaming**. Many players struggle to find games or improve their skills due to a lack of **structure in pick-up basketball**.

This **web-based version** aims to:

- **Make it easier for players to find basketball courts nearby**.
- **Help new players discover local basketball facilities**.
- **Provide a competitive layer** through rankings and stat tracking (in future updates).

---

## **Overview**

Clutch Web is a **React-based web application** designed to serve as the foundation for Clutch's features before transitioning to a full **iOS app**.

### **Key Features**

- **Court Discovery Mode (MVP)** → Find basketball courts near you.

- **Interactive Maps** → Google Maps integration with custom styling.

- **User Authentication** → Sign in via Google or email/password.

- **Dark/Light Mode** → Elegant theme switching with system preference detection.

- **Responsive Design** → Optimized for desktop, tablet, and mobile devices.

### **Future Enhancements**

- **Competitive Mode** → Player ranking & stat tracking.

- **Game Scheduling** → Create and join organized games.

- **Social Features** → Player profiles and friend connections.

---

## **Tech Stack**

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| **Frontend**       | React 18, Vite, React Router v6                 |
| **Maps**           | Google Maps Platform, @vis.gl/react-google-maps |
| **Authentication** | Firebase Auth (Google OAuth + Email/Password)   |
| **Database**       | Supabase (PostgreSQL)                           |
| **Build Tool**     | Vite                                            |

---

## **Installation**

To install and run Clutch Web locally:

### **Clone the repository**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/clutch-web.git
cd clutch-web
```

### **Install dependencies**

```bash
npm install
```

### **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Start the development server**

```bash
npm run dev
```

Navigate to `http://localhost:5173` to see the application.

---

## **Environment Variables**

Make sure to set up the following environment variables in your `.env.local` file:

- `VITE_GOOGLE_MAPS_API_KEY` - Your Google Maps API key
- `VITE_FIREBASE_API_KEY` - Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Your Firebase app ID
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
