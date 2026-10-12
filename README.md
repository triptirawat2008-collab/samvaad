# Samwad — Indian Sign Language to English Translation

A modern, responsive, nature-inspired web interface and full-screen translation studio for real-time **Indian Sign Language (ISL)** to English translation powered by computer vision and machine learning.

Designed with a calm, accessible palette featuring **Deep Pine Green**, **Muted Olive Green**, **Warm White**, and **Soft Beige**.

---

## Key Features

- **Samwad Translation Studio**: Full-screen, camera-first studio layout with the webcam occupying center stage.
- **Tools Sidebar**: Slim, focused 80px tool navigation bar with camera controls, hand landmark visualization toggle, pose skeleton toggle, recognition trigger, and backend settings.
- **Centered Hand-Placement Guide**: Transparent, responsive rectangular placement area with olive-green corner brackets informing the user: *"Place your hands inside this frame" / "Keep your hands visible and within the camera view"*.
- **Wide Horizontal Translation Panel**: Prominent output panel situated directly **below** the camera, giving ample room (20–28px text) for multi-line English sentence synthesis.
- **Live Webcam Integration**: Browser-based camera stream via `navigator.mediaDevices.getUserMedia` with full lifecycle cleanup (`track.stop()`) and status indicators.
- **Accessible Clipboard Actions**: 1-click **Copy** with visual confirmation and **Clear** resetting.
- **Honest ML State Handling**: Clear, honest labeling when the ML backend is not yet connected ("Model not connected").
- **Test Mode**: Dedicated toggle allowing team members or evaluators to test UI layout flows before model training completes.
- **Python ML Backend Starter**: Ready-to-use FastAPI WebSocket server (`backend/app_template.py`) for streaming 21-point MediaPipe hand landmarks.

---

## Color Palette

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Pine Green** | `#183D32` | Primary brand color, navigation, headings, primary buttons |
| **Muted Olive Green** | `#87966A` | Secondary buttons, active states, icons, subtle highlights |
| **Warm White** | `#FAF9F4` | Main page background |
| **Soft Beige** | `#E9E0CF` | Card backgrounds, borders, secondary surfaces |
| **Dark Text** | `#252C27` | Body text |
| **Muted Text** | `#72786F` | Supporting text, captions, and labels |

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v25)
- npm 9+

### 2. Install & Run Frontend
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

### 4. (Optional) Run the Python ML Backend
```bash
cd backend
pip install fastapi uvicorn mediapipe opencv-python numpy
python -m uvicorn app_template:app --port 8000 --reload
```
The server will listen at `ws://localhost:8000/ws/isl-recognize`.

---

## Project Structure

```
c:/isl/
├── backend/
│   ├── app_template.py         # FastAPI WebSocket server for ML model
│   └── README.md               # Backend guide and landmark pipeline documentation
├── public/
│   └── logo.svg                # Custom Samwad brand emblem
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation with compact studio mode
│   │   ├── Hero.jsx            # Landing hero with Samwad branding
│   │   ├── TranslationStudio.jsx # Camera-first studio with tools sidebar & bottom translation
│   │   ├── WorkflowPipeline.jsx# 4-stage pipeline visualization
│   │   ├── AboutSection.jsx    # ISL linguistics and academic ML methodology
│   │   ├── BackendGuideModal.jsx# Interactive modal with Python backend instructions
│   │   └── Footer.jsx          # Institutional footer and navigation
│   ├── hooks/
│   │   ├── useWebcam.js        # Webcam stream management and permission handling
│   │   └── useRecognition.js   # Sentence builder and ML socket listener
│   ├── services/
│   │   └── mlService.js        # WebSocket bridge for Python ML server
│   ├── App.jsx                 # View router and state coordinator
│   ├── index.css               # Tailwind CSS theme & nature palette tokens
│   └── main.jsx                # Application root entry
├── index.html
├── package.json
└── vite.config.js
```
