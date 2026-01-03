## VoiceShield AI (**Real-Time Scam Call Guardian (PS-11)**)

VoiceShield AI is a web-based application designed to act as a **real-time safety layer during phone calls**, helping users detect potential scam or fraudulent behavior while a call is happening.
This project is being developed as part of ByteQuest hackathon and follows a **checkpoint-based development approach**.
The current version focuses on **frontend structure and layout**, built to support future AI-driven real-time audio analysis.

## 📌 Project Overview

With the rise of voice-based scams, users—especially elderly and digitally unaware individuals—are often manipulated using urgency, fear, and impersonation tactics.

**VoiceShield AI aims to:**

* Monitor calls in real time
* Detect risky patterns (planned AI feature)
* Warn and guide users instantly
* Reduce financial and emotional damage

> ⚠️ Current Build: UI + Project Structure only
> AI logic and live audio analysis will be added in later checkpoints.

---

## 📁 Project Structure Explanation

### 🗂️ Root Directory

```
STUDIO/
├── .idx/                   # Firebase Studio / IDX configuration
├── .next/                  # Auto-generated Next.js build files
├── docs/                   # Documentation assets (images, diagrams)
├── node_modules/           # Installed dependencies
├── src/                    # Main source code
├── .gitignore
├── apphosting.yaml         # Firebase hosting configuration
├── components.json         # UI components configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies & scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

### 📂 `src/` – Main Application Code

```
src/
├── ai/                     # (Planned) AI logic and processing modules
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
```

#### Folder Purpose (Simple Explanation):

* **`app/`**
  Contains the main pages of the application (Dashboard, Live Detection, etc.).

* **`components/`**
  Reusable UI blocks like buttons, cards, layouts, headers.

* **`ai/`**
  Reserved for future AI logic such as:

  * Scam detection
  * Risk scoring
  * Speech-to-text processing

* **`hooks/`**
  Custom React hooks for managing UI logic and state.

* **`lib/`**
  Helper functions, configurations, and shared utilities.

---

## Technology Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend & Hosting (Planned / Partial)

* **Firebase Studio (IDX)**
* **Vercel Hosting**

### AI (Planned)

* **(Gemini)**
* Speech-to-Text APIs
* Real-time risk analysis models

---

##  How to Open the Project in Firebase Studio (IDX)

Follow these steps if you are new to Firebase Studio:

1. Go to **Firebase Studio (IDX)**
2. Open or import this repository
3. Wait for dependencies to load automatically
4. Open the project in the **Explorer panel**
5. Navigate to the `src/` folder to explore the application code

Firebase Studio automatically detects:

* `package.json`
* Next.js configuration
* TypeScript setup

No manual environment setup is required.

---

## ▶️ How to Run the Project Locally (Inside Studio)

Open the terminal inside Firebase Studio and run:

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

---

##  How to Navigate the Code 

* Start from `src/app/` → main pages
* Look into `components/` → UI building blocks
* Future AI work will be inside `src/ai/`
* Styling is managed using **Tailwind CSS**

---

**Checkpoint 1 Summary**

In Checkpoint 1, we focused on setting up the foundation of the project.
We created a clean and scalable frontend structure in Firebase Studio and designed a professional UI layout that represents how the final system will work.

This checkpoint includes:

A dashboard-style interface with clear navigation

UI placeholders for live scam detection, risk scoring, and AI analysis

A well-organized project structure ready for future AI integration

No AI logic or live audio processing is implemented at this stage.
Checkpoint 1 ensures the project is visually complete, easy to understand, and ready for future development.

##  Current Status

* ✅ Project structure finalized
* ✅ UI foundation ready
* ⏳ AI logic integration (upcoming)
* ⏳ Live audio processing
* ⏳ Real-time alerts & explanations

---
## UI Screenshots
**Home Page**
![WhatsApp Image 2026-01-03 at 4 54 31 PM](https://github.com/user-attachments/assets/6b28732f-1851-4484-a708-79496e507af8)

**Live Detection Dashboard**
![WhatsApp Image 2026-01-03 at 4 53 50 PM](https://github.com/user-attachments/assets/5ba5e20e-b9ef-4621-8175-4810a1a62ae0)


## Team
This project is being developed collaboratively by :
* **Satyam Gupta [Team Leader]**
* **Adhyatma Singh Chauhan**
* **Garv Gupta**
* **Shivam Gupta**
