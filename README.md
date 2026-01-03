# Problem Statement  
**PS-11: Real-Time Audio Fraud Detection for Scam Prevention**

With the rapid rise of voice-based scams, fraudsters increasingly exploit phone calls to deceive users—especially elderly individuals, digitally unaware users, and first-time internet adopters. These scams involve impersonation, emotional manipulation, urgency tactics, and psychological pressure, making them difficult to detect in real time. Traditional fraud detection systems focus on post-transaction analysis and fail to provide protection during live phone conversations, where most financial and emotional damage occurs.

This project addresses the need for an AI-powered real-time audio intelligence system that can detect scam patterns as a call is happening and proactively protect users before fraud occurs.

---

# Project Name  
**VoiceShield AI – Real-Time Call Fraud Detection & Protection System**

---

# Team Name  
**Quantum_Coders**

---

# Deployed Link 
**<DEPLOYED PROJECT LINK>**

---

# 2-Minute Demonstration Video Link  
**<2-MIN DEMO VIDEO LINK>**

---

# PPT Link  
**<PPT LINK>**

---

# Project Overview  

**VoiceShield AI** is an AI-driven real-time call fraud detection system designed to act as a *digital guardian* during live phone calls. It continuously analyzes call transcripts using the **Gemini API**, detects scam indicators, emotional pressure, and fraud patterns, assigns a risk score, and takes proactive actions to protect users—especially elderly and vulnerable populations.

Unlike traditional systems that detect fraud after losses occur, Google Antigravity works **during the call**, providing real-time alerts, guidance, guardian notifications, and responsible escalation to cyber authorities.

---

# Key Features  

## Real-Time Scam Detection  
- Live speech-to-text analysis of call audio  
- Detection of scam indicators such as:
  - Authority impersonation (bank, police, government)
  - Urgency and threat-based language
  - Requests for OTP, PIN, CVV, or money
  - Emotional manipulation and panic tactics

## Risk Scoring & Classification  
Each call is assigned a **risk score (0–100)** and classified as:
- **Low Risk**: Risk score < 30  
- **Medium Risk**: Risk score between 30–70  
- **High Risk**: Risk score > 70  

## User Safety Alerts  
- **Medium Risk:**  
  Warning message displayed:  
  *“Do not share OTP or sensitive information during this call.”*

- **High Risk:**  
  Pop-up alert displayed:  
  **“High Risk Detected”**  
  with an option to **end the call immediately**.

## Elderly Protection – Guardian Mode  
- Elderly users can register a trusted guardian (family member).  
- When a high-risk call is detected:
  - The guardian is automatically notified.
  - This helps break emotional pressure and prevents further scam progression.

##  Explainable AI  
- The system clearly explains:
  - Why a call is risky
  - Which indicators were detected
- Uses simple, non-technical language to build user trust and awareness.

---

# Innovative Feature: Cyber Cell Escalation (High Risk Only)  

When a **High-Risk fraud call** is detected **with user consent**, Google Antigravity prepares a **structured digital evidence report** to assist cyber authorities.

## Details Sent to Cyber Cell  
- Fraudster phone number  
- Call timestamp  
- Scam type  
- Risk score  
- Key fraud indicators detected by AI  

### Cyber Cell Evidence Format
```json
{
  "fraudster_number": "+91XXXXXXXXXX",
  "timestamp": "YYYY-MM-DD HH:MM:SS",
  "scam_type": "Bank Impersonation / OTP Fraud / Emergency Scam",
  "risk_score": 85,
  "key_indicators": [
    "Authority impersonation",
    "Urgency pressure",
    "OTP request",
    "Emotional manipulation"
  ]
}
````

## Transparency to User

Before escalation, the user is clearly informed about:

* What data is being shared
* Why reporting is recommended
* Confirmation that **no banking credentials are shared**

> ⚠️ This report assists investigation and does not imply guilt or automatic legal action.

---

# System Architecture

```
Live Call Audio
 → Speech-to-Text
 → Gemini AI (Fraud & Emotion Analysis)
 → Risk Scoring Engine
 → User Alerts / Guardian Notification
 → Cyber Cell Evidence Preparation (High Risk Only)
```

---

# 🛠️ Tech Stack

* **Frontend:** Web-based UI (Demo simulation)
* **Backend:** Node.js / Python
* **AI Engine:** Gemini API (Google Antigravity / AI Studio)
* **Real-Time Processing:** Streaming transcript analysis
* **Database:** Guardian details & report logs
* **Deployment:** Hackathon demo environment

---

# Setup & Installation

```bash
git clone https://github.com/ByteQuest-2025/GFGBQ-Team-quantum_coders
cd Voice Shield
npm install
npm run dev
```

> Note: For hackathon demonstration, live phone calls are simulated using microphone input or pre-recorded call logs.

---

# Usage Instructions

1. Launch the web application
2. Simulate a call using microphone or transcript input
3. Observe real-time:

   * Risk score updates
   * Safety alerts
   * Guardian notification (if enabled)
4. For **High Risk** calls:

   * Review cyber cell report preview
   * Confirm escalation (demo simulation)

---

# Social Impact

* Protects elderly and vulnerable users from financial and emotional harm
* Prevents scams in real time instead of post-loss
* Encourages responsible cybercrime reporting
* Demonstrates ethical and explainable AI usage

---

# Conclusion

**VoiceShield AI** transforms fraud detection from a reactive, post-event system into a **real-time, emotionally intelligent protection framework**. By combining AI-driven analysis, guardian involvement, and cyber-cell assistance, the system delivers strong social impact and real-world scalability.

```
- Optimize wording for **maximum judge score**
- Create a **short README version for submission portal**
- Align README with your **2-minute demo script**

Just tell me 👍
```
