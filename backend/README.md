# SignBridge — Python ML Backend

This directory contains the Python machine learning integration template for the SignBridge Indian Sign Language translation project.

## Requirements

Ensure you have Python 3.9+ installed:

```bash
pip install fastapi uvicorn mediapipe opencv-python numpy
```

## Running the Inference Server

Start the FastAPI WebSocket server:

```bash
cd backend
python -m uvicorn app_template:app --port 8000 --reload
```

The WebSocket server will listen at:
`ws://localhost:8000/ws/isl-recognize`

## How it Communicates with the Frontend

1. When the SignBridge web UI has active camera and recognition, it connects to `ws://localhost:8000/ws/isl-recognize`.
2. The UI sends landmark data or frames.
3. Your Python model (`app_template.py:ISLModel.predict_from_landmarks`) executes forward inference.
4. The server returns JSON in the following structure:

```json
{
  "text": "NAMASTE",
  "confidence": 0.94,
  "landmarks_detected": true
}
```

5. The SignBridge web UI immediately renders the translated word/sentence on the screen, updates confidence statistics, and appends to the translation history!
