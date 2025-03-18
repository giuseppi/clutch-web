# Clutch Web

Clutch Web is the **web-based version of Clutch**, designed to simplify the experience of organizing and joining **pick-up basketball games**. Inspired by **competitive ranking systems in video games like VALORANT**, Clutch aims to help players find local basketball games effortlessly.

The **initial release** will focus on **Casual Mode**, allowing users to discover nearby games and set location preferences. A future **Competitive Mode** will introduce **stat tracking, player rankings, and advanced analytics**.

---

## **Table of Contents**

- [Clutch Web](#clutch-web)
  - [**Table of Contents**](#table-of-contents)
  - [**Why?**](#why)
  - [**Overview**](#overview)
    - [**Key Features:**](#key-features)
    - [**Future Enhancements:**](#future-enhancements)
  - [**Tech Stack**](#tech-stack)
  - [**Installation**](#installation)
    - [**1️⃣ Clone the repository**](#1️⃣-clone-the-repository)

---

## **Why?**

Clutch was created to **merge my passion for basketball and competitive gaming**. Many players struggle to find games or improve their skills due to a lack of **structure in pick-up basketball**.

This **web-based version** aims to:

- **Make it easier for players to find and join games nearby**.
- **Help new players integrate into a community**.
- **Provide a competitive layer** through rankings and stat tracking (in future updates).

---

## **Overview**

Clutch Web is a **React-based web application** designed to serve as the foundation for Clutch’s features before transitioning to a full **iOS app**.

### **Key Features:**

✅ **Casual Mode (MVP)** → Find and join pick-up games.

✅ **User Authentication** → Sign in via Google or email/password.

✅ **Real-time Updates** → Get notifications for new games (future).

✅ **Location Preferences** → Set preferred courts and playing times.

### **Future Enhancements:**

🚀 **Competitive Mode** → Player ranking & stat tracking.

🚀 **AI-powered Analytics** → Automated stat tracking & insights.

---

## **Tech Stack**

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| **Frontend**       | React.js / Next.js, TailwindCSS                 |
| **Backend**        | Firebase Cloud Functions (Serverless)           |
| **Database**       | Firebase Firestore                              |
| **Authentication** | Firebase Auth                                   |
| **Hosting**        | Vercel (Frontend), Firebase Functions (Backend) |

---

## **Installation**

To install and run Clutch Web locally:

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/clutch-web.git
cd clutch-web
```
