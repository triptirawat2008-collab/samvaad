import React, { useState } from 'react';
import { 
  Camera, 
  VideoOff, 
  Play, 
  Square, 
  Copy, 
  Check, 
  Trash2, 
  Settings, 
  Hand, 
  PersonStanding, 
  AlertCircle 
} from 'lucide-react';

export default function TranslationStudio({
  videoRef,
  cameraStatus, // 'idle' | 'requesting' | 'active' | 'error'
  cameraError,
  streamResolution,
  onStartCamera,
  onStopCamera,
  isRecognizing,
  backendStatus,
  currentSign,
  translationText,
  copyFeedback,
  isSimulationMode,
  setIsSimulationMode,
  onStartRecognition,
  onStopRecognition,
  onClearTranslation,
  onCopyTranslation,
  onOpenBackendGuide,
}) {
  const [showHandLandmarks, setShowHandLandmarks] = useState(false);
  const [showPoseLandmarks, setShowPoseLandmarks] = useState(false);

  const isCameraActive = cameraStatus === 'active';
  const displayText = translationText || (currentSign ? currentSign.text : '');
  const hasContent = Boolean(displayText);

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#0e1f18] text-[#FAF9F4] overflow-hidden min-h-[calc(100vh-56px)]">
      
      {/* ========================================================================= */}
      {/* 1. MINIMAL TOOLS SIDEBAR (Narrow vertical toolbar on left)               */}
      {/* ========================================================================= */}
      <aside 
        className="w-full md:w-16 md:shrink-0 bg-[#183D32] border-r border-[#235244] py-2 md:py-4 px-2 flex md:flex-col items-center justify-between z-20"
        aria-label="Studio Toolbar"
      >
        {/* Top: Samwad small brand mark */}
        <div className="hidden md:flex flex-col items-center mb-4">
          <div className="w-8 h-8 rounded-md bg-[#FAF9F4]/10 border border-[#FAF9F4]/15 flex items-center justify-center p-1.5 text-[#FAF9F4]">
            <svg viewBox="0 0 40 40" className="w-full h-full text-[#FAF9F4]" fill="none" stroke="currentColor">
              <path d="M8 28 C16 16, 24 16, 32 28" stroke="#87966A" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M15 27V16C15 14.9 15.9 14 17 14C18.1 14 19 14.9 19 16V22" strokeWidth="2" strokeLinecap="round" />
              <path d="M19 16V13C19 11.9 19.9 11 21 11C22.1 11 23 11.9 23 13V22" strokeWidth="2" strokeLinecap="round" />
              <path d="M23 16V14.5C23 13.4 23.9 12.5 25 12.5C26.1 12.5 27 13.4 27 14.5V23" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Core Functional Tools */}
        <div className="flex md:flex-col items-center justify-around w-full md:w-auto space-x-1 md:space-x-0 md:space-y-3">
          
          {/* Tool 1: Camera Toggle */}
          <button
            onClick={() => {
              if (isCameraActive) onStopCamera();
              else onStartCamera();
            }}
            disabled={cameraStatus === 'requesting'}
            title={isCameraActive ? 'Stop Camera' : 'Start Camera'}
            className={`group relative p-2.5 rounded-md transition-colors cursor-pointer ${
              isCameraActive 
                ? 'bg-[#87966A] text-[#FAF9F4]' 
                : 'text-[#FAF9F4]/70 hover:text-[#FAF9F4] hover:bg-[#235244]'
            }`}
          >
            {isCameraActive ? <Camera className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            <span className="sr-only">Toggle Camera</span>
            <span className="hidden md:group-hover:block absolute left-full ml-2 px-2 py-1 bg-[#183D32] border border-[#235244] text-[#FAF9F4] text-xs rounded whitespace-nowrap z-50">
              {isCameraActive ? 'Stop Camera' : 'Start Camera'}
            </span>
          </button>

          {/* Tool 2: Hand Landmark Visibility */}
          <button
            onClick={() => setShowHandLandmarks(!showHandLandmarks)}
            title={`Hand Landmarks: ${showHandLandmarks ? 'Visible' : 'Hidden'}`}
            className={`group relative p-2.5 rounded-md transition-colors cursor-pointer ${
              showHandLandmarks 
                ? 'bg-[#87966A] text-[#FAF9F4]' 
                : 'text-[#FAF9F4]/60 hover:text-[#FAF9F4] hover:bg-[#235244]'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span className="sr-only">Toggle Hand Landmarks</span>
            <span className="hidden md:group-hover:block absolute left-full ml-2 px-2 py-1 bg-[#183D32] border border-[#235244] text-[#FAF9F4] text-xs rounded whitespace-nowrap z-50">
              Hand Landmarks ({showHandLandmarks ? 'ON' : 'OFF'})
            </span>
          </button>

          {/* Tool 3: Pose Landmark Visibility */}
          <button
            onClick={() => setShowPoseLandmarks(!showPoseLandmarks)}
            title={`Pose Landmarks: ${showPoseLandmarks ? 'Visible' : 'Hidden'}`}
            className={`group relative p-2.5 rounded-md transition-colors cursor-pointer ${
              showPoseLandmarks 
                ? 'bg-[#87966A] text-[#FAF9F4]' 
                : 'text-[#FAF9F4]/60 hover:text-[#FAF9F4] hover:bg-[#235244]'
            }`}
          >
            <PersonStanding className="w-4 h-4" />
            <span className="sr-only">Toggle Pose Landmarks</span>
            <span className="hidden md:group-hover:block absolute left-full ml-2 px-2 py-1 bg-[#183D32] border border-[#235244] text-[#FAF9F4] text-xs rounded whitespace-nowrap z-50">
              Pose Landmarks ({showPoseLandmarks ? 'ON' : 'OFF'})
            </span>
          </button>

          {/* Tool 4: Start / Stop Recognition */}
          <button
            onClick={() => {
              if (isRecognizing) onStopRecognition();
              else onStartRecognition();
            }}
            disabled={!isCameraActive}
            title={!isCameraActive ? 'Start camera first' : isRecognizing ? 'Stop Recognition' : 'Start Recognition'}
            className={`group relative p-2.5 rounded-md transition-colors ${
              !isCameraActive 
                ? 'opacity-40 cursor-not-allowed text-[#FAF9F4]/30' 
                : isRecognizing 
                  ? 'bg-[#87966A] text-[#FAF9F4] cursor-pointer' 
                  : 'text-[#FAF9F4]/70 hover:text-[#FAF9F4] hover:bg-[#235244] cursor-pointer'
            }`}
          >
            {isRecognizing ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4" />}
            <span className="sr-only">Toggle Recognition</span>
            <span className="hidden md:group-hover:block absolute left-full ml-2 px-2 py-1 bg-[#183D32] border border-[#235244] text-[#FAF9F4] text-xs rounded whitespace-nowrap z-50">
              {isRecognizing ? 'Stop Recognition' : 'Start Recognition'}
            </span>
          </button>

          {/* Tool 5: Settings / Python Backend Guide */}
          <button
            onClick={onOpenBackendGuide}
            title="Backend Settings"
            className="group relative p-2.5 rounded-md text-[#FAF9F4]/60 hover:text-[#FAF9F4] hover:bg-[#235244] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span className="sr-only">Backend Settings</span>
            <span className="hidden md:group-hover:block absolute left-full ml-2 px-2 py-1 bg-[#183D32] border border-[#235244] text-[#FAF9F4] text-xs rounded whitespace-nowrap z-50">
              Backend Settings
            </span>
          </button>
        </div>

        {/* Tooltip spacer for desktop */}
        <div className="hidden md:block"></div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. CAMERA WORKSPACE (Edge-to-edge camera preview)                         */}
      {/* ========================================================================= */}
      <main className="relative flex-1 bg-[#0e1f18] flex items-center justify-center overflow-hidden">
        
        {/* Actual Live Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 ${
            isCameraActive ? 'block' : 'hidden'
          }`}
        />

        {/* Unobtrusive Camera Status (Top-Left) */}
        {isCameraActive && (
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-xs font-mono text-[#FAF9F4]/80 bg-black/50 px-2.5 py-1 rounded border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#87966A]" />
            <span>Live{streamResolution ? ` • ${streamResolution.width}×${streamResolution.height}` : ''}</span>
          </div>
        )}

        {/* Unobtrusive Model Status (Top-Right) */}
        {isCameraActive && (
          <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 text-xs text-[#FAF9F4]/80">
            <button
              onClick={onOpenBackendGuide}
              className="bg-black/50 hover:bg-black/70 px-2.5 py-1 rounded border border-white/10 text-xs transition cursor-pointer"
            >
              {backendStatus === 'connected' ? (
                <span className="text-[#87966A] font-medium">Model connected</span>
              ) : isSimulationMode ? (
                <span className="text-amber-300 font-medium">Test mode</span>
              ) : (
                <span className="text-[#FAF9F4]/60">Model not connected</span>
              )}
            </button>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. SUBTLE HAND PLACEMENT GUIDE (Thin olive-green corner markers)       */}
        {/* ===================================================================== */}
        {isCameraActive && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
            <div className="relative w-[85%] max-w-lg h-[65%] max-h-[360px] rounded-lg border border-[#87966A]/40 transition-all duration-300 flex flex-col justify-end pb-3 items-center">
              
              {/* Thin corner markers */}
              <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-[#87966A]" />
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-[#87966A]" />
              <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-[#87966A]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-[#87966A]" />

              {/* Hand Landmark overlay indicator (only if landmark visibility toggled on) */}
              {showHandLandmarks && (
                <div className="absolute inset-0 flex items-center justify-center text-[#87966A]/40">
                  <svg viewBox="0 0 160 100" className="w-32 h-20 stroke-current fill-none">
                    <path d="M40 80 L40 40 M55 80 L55 30 M70 80 L70 25 M85 80 L85 35 M30 80 L20 60" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="40" cy="40" r="2.5" fill="#87966A" />
                    <circle cx="55" cy="30" r="2.5" fill="#87966A" />
                    <circle cx="70" cy="25" r="2.5" fill="#87966A" />
                    <circle cx="85" cy="35" r="2.5" fill="#87966A" />
                    <circle cx="20" cy="60" r="2.5" fill="#87966A" />
                  </svg>
                </div>
              )}

              {/* Pose skeleton overlay indicator (only if pose visibility toggled on) */}
              {showPoseLandmarks && (
                <div className="absolute inset-0 flex items-center justify-center text-[#87966A]/40">
                  <svg viewBox="0 0 120 80" className="w-24 h-16 stroke-current fill-none">
                    <circle cx="60" cy="18" r="4" strokeWidth="1.2" />
                    <line x1="60" y1="22" x2="60" y2="55" strokeWidth="1.2" />
                    <line x1="42" y1="32" x2="78" y2="32" strokeWidth="1.2" />
                  </svg>
                </div>
              )}

              {/* Small unobtrusive placement instruction */}
              <span className="text-[11px] text-[#FAF9F4]/70 bg-black/40 px-2 py-0.5 rounded border border-white/5 tracking-normal">
                Keep your hands within the frame
              </span>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 4. LIVE ENGLISH CAPTIONS OVERLAY AT BOTTOM OF VIDEO                   */}
        {/* ===================================================================== */}
        {isCameraActive && (
          <div className="absolute bottom-6 inset-x-4 z-20 flex flex-col items-center pointer-events-none">
            
            {/* The Subtitle Container */}
            <div className="pointer-events-auto bg-black/75 backdrop-blur-[2px] px-6 py-3 rounded-md max-w-2xl text-center border border-white/10 shadow-lg">
              
              {hasContent ? (
                <div className="space-y-1.5">
                  {/* Recognized English sentence */}
                  <p className="text-[#FAF9F4] text-lg sm:text-xl md:text-2xl font-medium tracking-normal leading-relaxed drop-shadow-md break-words">
                    {displayText}
                  </p>
                  
                  {/* Subtitle action bar (Copy & Clear) */}
                  <div className="flex items-center justify-center space-x-3 pt-1 text-xs text-[#FAF9F4]/70">
                    <button
                      onClick={onCopyTranslation}
                      className="hover:text-[#FAF9F4] inline-flex items-center space-x-1 cursor-pointer transition-colors"
                      title="Copy subtitle text"
                    >
                      {copyFeedback ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#87966A]" />
                          <span className="text-[#87966A]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    
                    <span className="text-white/20">&bull;</span>

                    <button
                      onClick={onClearTranslation}
                      className="hover:text-[#FAF9F4] inline-flex items-center space-x-1 cursor-pointer transition-colors"
                      title="Clear subtitles"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Discreet status when no prediction is available */
                <p className="text-[#FAF9F4]/60 text-sm font-normal">
                  {backendStatus === 'connected' 
                    ? 'Listening for signs...' 
                    : isSimulationMode 
                      ? 'Waiting for gestures...'
                      : 'Translation model not connected'}
                </p>
              )}

            </div>

            {/* Inconspicuous Test Mode link for developer demonstration */}
            <div className="pointer-events-auto mt-2 text-[10px] text-[#FAF9F4]/40 hover:text-[#FAF9F4]/70 transition-colors">
              <button
                onClick={() => setIsSimulationMode(!isSimulationMode)}
                className="underline decoration-dotted cursor-pointer"
              >
                {isSimulationMode ? 'Disable test mode' : 'Enable test gestures'}
              </button>
            </div>

          </div>
        )}

        {/* State: Inactive Camera (Simple dark-green placeholder with Start Camera button) */}
        {!isCameraActive && cameraStatus === 'idle' && (
          <div className="text-center p-6 max-w-sm z-10">
            <div className="w-12 h-12 rounded-md bg-[#183D32] border border-[#235244] mx-auto flex items-center justify-center text-[#FAF9F4]/60 mb-3">
              <VideoOff className="w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-[#FAF9F4]">
              Camera Inactive
            </h3>
            <p className="mt-1 text-xs text-[#FAF9F4]/60 leading-normal max-w-xs mx-auto">
              Start your webcam to begin real-time sign language translation.
            </p>
            <div className="mt-5">
              <button
                onClick={() => onStartCamera()}
                className="px-5 py-2.5 rounded-md bg-[#87966A] hover:bg-[#96a677] active:bg-[#6e7b54] text-[#FAF9F4] text-xs font-medium transition cursor-pointer"
              >
                Start Camera
              </button>
            </div>
          </div>
        )}

        {/* State: Requesting Camera Permission */}
        {!isCameraActive && cameraStatus === 'requesting' && (
          <div className="text-center p-6 max-w-sm z-10">
            <div className="w-10 h-10 rounded-full border-2 border-[#87966A] border-t-transparent mx-auto mb-3 animate-spin" />
            <h3 className="text-sm font-medium text-[#FAF9F4]">
              Requesting camera permission
            </h3>
            <p className="mt-1 text-xs text-[#FAF9F4]/60">
              Please allow camera access in your browser prompt.
            </p>
          </div>
        )}

        {/* State: Error State */}
        {!isCameraActive && cameraStatus === 'error' && (
          <div className="text-center p-6 max-w-sm bg-[#183D32] rounded-md border border-rose-500/30 z-10 m-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-[#FAF9F4]">
              {cameraError?.title || 'Camera error'}
            </h3>
            <p className="mt-1 text-xs text-[#FAF9F4]/70 leading-normal">
              {cameraError?.message || 'Unable to access your webcam.'}
            </p>
            <div className="mt-4">
              <button
                onClick={() => onStartCamera()}
                className="px-4 py-2 rounded-md bg-[#87966A] hover:bg-[#96a677] text-[#FAF9F4] text-xs font-medium transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
