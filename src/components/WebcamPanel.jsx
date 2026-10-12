import React from 'react';
import { 
  Camera, 
  VideoOff, 
  Play, 
  Square, 
  AlertCircle, 
  RefreshCw, 
  Settings, 
  Activity
} from 'lucide-react';

export default function WebcamPanel({
  videoRef,
  status, // 'idle' | 'requesting' | 'active' | 'error'
  error,
  devices,
  selectedDeviceId,
  setSelectedDeviceId,
  streamResolution,
  onStartCamera,
  onStopCamera,
  isRecognizing,
  onStartRecognition,
  onStopRecognition,
}) {
  const isCameraActive = status === 'active';

  return (
    <div className="bg-[#FAF9F4] rounded-2xl border border-[#E9E0CF] p-6 shadow-sm flex flex-col justify-between">
      
      {/* Top Header & Status Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E9E0CF]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E9E0CF]/70 flex items-center justify-center text-[#183D32]">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#183D32] leading-tight">
              Webcam Feed
            </h2>
            <p className="text-xs text-[#72786F]">
              Live video input for hand & pose landmark tracking
            </p>
          </div>
        </div>

        {/* Status Indicator Badge */}
        <div className="flex items-center space-x-2">
          {status === 'idle' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9E0CF] text-[#72786F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#72786F] mr-1.5" />
              Camera Inactive
            </span>
          )}
          {status === 'requesting' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#87966A]/20 text-[#183D32]">
              <RefreshCw className="w-3 h-3 mr-1.5 animate-spin text-[#87966A]" />
              Requesting Permission
            </span>
          )}
          {status === 'active' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#183D32] text-[#FAF9F4]">
              <span className="w-2 h-2 rounded-full bg-[#87966A] mr-1.5 animate-pulse" />
              Live Stream Active
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">
              <AlertCircle className="w-3 h-3 mr-1.5 text-rose-600" />
              Camera Error
            </span>
          )}
        </div>
      </div>

      {/* Main Video Viewport Panel */}
      <div className="my-5 relative rounded-xl overflow-hidden bg-[#252C27] aspect-4/3 sm:aspect-16/10 flex items-center justify-center border border-[#DACDB6]">
        
        {/* Actual HTML5 Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 ${
            isCameraActive ? 'block' : 'hidden'
          }`}
        />

        {/* Overlay: Viewfinder and Landmark guide when camera is active */}
        {isCameraActive && (
          <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 border-t-2 border-l-2 border-[#87966A]/70 rounded-tl" />
              <div className="px-2.5 py-1 rounded bg-[#183D32]/80 backdrop-blur-xs text-[11px] font-mono text-[#FAF9F4] border border-[#87966A]/30">
                {streamResolution ? `${streamResolution.width}×${streamResolution.height}` : 'HD Stream'}
              </div>
              <div className="w-8 h-8 border-t-2 border-r-2 border-[#87966A]/70 rounded-tr" />
            </div>

            <div className="self-center border border-dashed border-[#FAF9F4]/20 rounded-xl w-3/4 h-3/5 flex items-center justify-center">
              <span className="text-[11px] text-[#FAF9F4]/50 font-medium px-2 py-1 bg-[#252C27]/40 rounded">
                Keep hands within this region
              </span>
            </div>

            <div className="flex justify-between items-end">
              <div className="w-8 h-8 border-b-2 border-l-2 border-[#87966A]/70 rounded-bl" />
              {isRecognizing && (
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#183D32]/90 text-xs text-[#FAF9F4] font-medium border border-[#87966A]">
                  <Activity className="w-3.5 h-3.5 text-[#87966A] animate-pulse" />
                  <span>Tracking ISL Landmarks</span>
                </div>
              )}
              <div className="w-8 h-8 border-b-2 border-r-2 border-[#87966A]/70 rounded-br" />
            </div>
          </div>
        )}

        {/* State: Camera Inactive / Idle */}
        {status === 'idle' && (
          <div className="p-8 text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF9F4]/10 border border-[#FAF9F4]/20 mx-auto flex items-center justify-center text-[#FAF9F4]/70 mb-4">
              <VideoOff className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-[#FAF9F4]">
              Camera is Inactive
            </h3>
            <p className="mt-1.5 text-xs text-[#FAF9F4]/60 leading-relaxed">
              Click &ldquo;Start Camera&rdquo; below to allow your browser to stream your video feed. 
              No video frames are uploaded or saved to any external cloud server.
            </p>
          </div>
        )}

        {/* State: Requesting Camera Permission */}
        {status === 'requesting' && (
          <div className="p-8 text-center max-w-sm">
            <div className="w-14 h-14 rounded-full bg-[#87966A]/20 border border-[#87966A] mx-auto flex items-center justify-center text-[#87966A] mb-4 animate-spin">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-[#FAF9F4]">
              Requesting Camera Permission
            </h3>
            <p className="mt-1.5 text-xs text-[#FAF9F4]/70 leading-relaxed">
              Please check your browser’s permission pop-up and click &ldquo;Allow&rdquo; to enable video capture.
            </p>
          </div>
        )}

        {/* State: Error / Denied */}
        {status === 'error' && (
          <div className="p-6 text-center max-w-md bg-[#252C27]/90 rounded-xl m-4 border border-rose-500/30">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#FAF9F4]">
              {error?.title || 'Camera Unavailable'}
            </h3>
            <p className="mt-1 text-xs text-[#FAF9F4]/75 leading-relaxed">
              {error?.message || 'Unable to access your video device.'}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-3">
              <button
                onClick={() => onStartCamera()}
                className="px-4 py-2 rounded-lg bg-[#87966A] hover:bg-[#96a677] text-[#FAF9F4] text-xs font-semibold transition cursor-pointer"
              >
                Retry Camera
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Camera Selection Dropdown */}
      {isCameraActive && devices.length > 1 && (
        <div className="mb-4 flex items-center space-x-2 text-xs text-[#72786F]">
          <Settings className="w-3.5 h-3.5 text-[#87966A]" />
          <span>Device:</span>
          <select
            value={selectedDeviceId}
            onChange={(e) => {
              setSelectedDeviceId(e.target.value);
              onStartCamera(e.target.value);
            }}
            className="bg-[#E9E0CF]/40 border border-[#DACDB6] rounded px-2 py-1 text-xs text-[#252C27] focus:outline-none focus:border-[#87966A]"
          >
            {devices.map((device, index) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Control Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {!isCameraActive ? (
          <button
            onClick={() => onStartCamera()}
            disabled={status === 'requesting'}
            className="flex-1 py-3 px-4 rounded-lg bg-[#183D32] hover:bg-[#225344] active:bg-[#0f2720] text-[#FAF9F4] font-medium text-sm transition-all duration-150 inline-flex items-center justify-center space-x-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Camera className="w-4 h-4 text-[#87966A]" />
            <span>{status === 'requesting' ? 'Requesting...' : 'Start Camera'}</span>
          </button>
        ) : (
          <button
            onClick={onStopCamera}
            className="flex-1 py-3 px-4 rounded-lg bg-[#E9E0CF] hover:bg-[#DACDB6] text-[#183D32] font-medium text-sm border border-[#DACDB6] transition-all duration-150 inline-flex items-center justify-center space-x-2 cursor-pointer"
          >
            <VideoOff className="w-4 h-4 text-[#72786F]" />
            <span>Stop Camera</span>
          </button>
        )}

        {!isRecognizing ? (
          <button
            onClick={onStartRecognition}
            disabled={!isCameraActive}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-150 inline-flex items-center justify-center space-x-2 shadow-sm ${
              isCameraActive
                ? 'bg-[#87966A] hover:bg-[#96a677] active:bg-[#6e7b54] text-[#FAF9F4] cursor-pointer'
                : 'bg-[#E9E0CF]/60 text-[#72786F] cursor-not-allowed border border-[#DACDB6]'
            }`}
            title={!isCameraActive ? 'Please start camera first' : 'Start ISL Recognition'}
          >
            <Play className="w-4 h-4" />
            <span>Start Recognition</span>
          </button>
        ) : (
          <button
            onClick={onStopRecognition}
            className="flex-1 py-3 px-4 rounded-lg bg-[#183D32] hover:bg-[#225344] text-[#FAF9F4] font-medium text-sm transition-all duration-150 inline-flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Square className="w-4 h-4 text-[#87966A] fill-current" />
            <span>Stop Recognition</span>
          </button>
        )}
      </div>

    </div>
  );
}
