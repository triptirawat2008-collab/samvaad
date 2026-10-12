import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Cpu } from 'lucide-react';

export default function BackendGuideModal({ isOpen, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const pythonSnippet = `# backend/app.py - Sample FastAPI WebSocket Server for Samwad
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI(title="Samwad ISL Inference Backend")

@app.websocket("/ws/isl-recognize")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("[Samwad] Client connected successfully")
    try:
        while True:
            # Receive landmark coordinates or video data from client
            _data = await websocket.receive_text()
            
            # --- MODEL INFERENCE PIPELINE ---
            # 1. landmarks = json.loads(_data)
            # 2. prediction = model.predict(landmarks)
            # --------------------------------
            
            response = {
                "text": "NAMASTE",
                "confidence": 0.95,
                "landmarks_detected": True
            }
            await websocket.send_text(json.dumps(response))
    except WebSocketDisconnect:
        print("[Samwad] Client disconnected")

# Run with: uvicorn app:app --port 8000 --reload
`;

  const copyCode = () => {
    navigator.clipboard.writeText(pythonSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF9F4] rounded-lg border border-[#DACDB6] shadow-md max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#252C27]">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#183D32] text-[#FAF9F4] flex items-center justify-between border-b border-[#235244]">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-[#87966A]" />
            <h2 className="text-sm font-semibold text-[#FAF9F4]">
              Python ML Backend Setup
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#FAF9F4]/70 hover:text-[#FAF9F4] hover:bg-[#235244] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div>
            <h3 className="font-semibold text-sm text-[#183D32] mb-1">
              WebSocket Communication Endpoint
            </h3>
            <p className="text-[#72786F] leading-relaxed">
              Samwad communicates with your inference model over WebSocket at <code className="bg-[#E9E0CF] px-1 py-0.5 rounded text-[#183D32] font-mono text-[11px]">ws://localhost:8000/ws/isl-recognize</code>.
            </p>
          </div>

          {/* Quick Steps */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] uppercase font-bold text-[#87966A] tracking-wider">
              Setup Instructions
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[#72786F]">
              <li>Install dependencies: <code className="bg-[#E9E0CF] px-1 py-0.5 rounded text-[#183D32] font-mono">pip install fastapi uvicorn mediapipe</code></li>
              <li>Save script below as <code className="bg-[#E9E0CF] px-1 py-0.5 rounded text-[#183D32] font-mono">backend/app.py</code></li>
              <li>Start server: <code className="bg-[#E9E0CF] px-1 py-0.5 rounded text-[#183D32] font-mono">uvicorn backend.app:app --port 8000 --reload</code></li>
              <li>In Samwad, navigate to <strong>Translate</strong> &rarr; click <strong>Start Camera</strong> &rarr; <strong>Start Recognition</strong></li>
            </ol>
          </div>

          {/* Code Snippet */}
          <div className="rounded border border-[#DACDB6] bg-[#183D32] text-[#FAF9F4] overflow-hidden">
            <div className="px-3 py-1.5 bg-[#0f2720] border-b border-[#235244] flex items-center justify-between text-[11px] text-[#FAF9F4]/70 font-mono">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#87966A]" />
                <span>backend/app.py</span>
              </span>
              <button
                onClick={copyCode}
                className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#87966A] hover:bg-[#96a677] text-white text-[10px] font-medium transition cursor-pointer"
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono overflow-x-auto text-[#FAF9F4]/90 leading-relaxed max-h-52">
              {pythonSnippet}
            </pre>
          </div>

          <div className="bg-[#E9E0CF]/40 p-3 rounded border border-[#DACDB6] text-[#72786F]">
            <strong className="text-[#183D32]">Offline Test:</strong> If testing without an active Python server, 
            select &ldquo;Enable test gestures&rdquo; in the translate studio to preview live caption formatting.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#E9E0CF]/20 border-t border-[#DACDB6] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#183D32] hover:bg-[#225344] text-[#FAF9F4] text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
