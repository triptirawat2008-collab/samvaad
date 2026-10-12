import React from 'react';
import WebcamPanel from './WebcamPanel';
import TranslationPanel from './TranslationPanel';
import WorkflowPipeline from './WorkflowPipeline';
import { Activity } from 'lucide-react';

export default function TranslationWorkspace({
  webcam,
  recognition,
  onOpenBackendGuide,
}) {
  return (
    <section id="translate-workspace" className="py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Title & Overview */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#87966A] tracking-wider">
                Translation Console
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#183D32] mt-1">
                Real-Time Gesture Translation
              </h2>
              <p className="text-sm text-[#72786F] mt-1 max-w-xl">
                Position both hands clearly in view. The system extracts kinematic landmarks and maps gestures to English text.
              </p>
            </div>

            {/* Pipeline State Summary Badge */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-[#E9E0CF]/60 border border-[#DACDB6] flex items-center space-x-2 text-[#183D32]">
                <Activity className="w-3.5 h-3.5 text-[#87966A]" />
                <span className="font-semibold">Pipeline:</span>
                <span className="text-[#72786F]">
                  {webcam.status === 'active' 
                    ? recognition.isRecognizing ? 'Inferencing' : 'Camera Streaming' 
                    : 'Standby'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Main Split Workspace: Left (Webcam) & Right (Translation) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Webcam Stream Panel */}
          <WebcamPanel
            videoRef={webcam.videoRef}
            status={webcam.status}
            error={webcam.error}
            devices={webcam.devices}
            selectedDeviceId={webcam.selectedDeviceId}
            setSelectedDeviceId={webcam.setSelectedDeviceId}
            streamResolution={webcam.streamResolution}
            onStartCamera={webcam.startCamera}
            onStopCamera={webcam.stopCamera}
            isRecognizing={recognition.isRecognizing}
            onStartRecognition={recognition.startRecognition}
            onStopRecognition={recognition.stopRecognition}
          />

          {/* Right: English Translation Output Panel */}
          <TranslationPanel
            isCameraActive={webcam.status === 'active'}
            isRecognizing={recognition.isRecognizing}
            backendStatus={recognition.backendStatus}
            backendError={recognition.backendError}
            currentSign={recognition.currentSign}
            translationText={recognition.translationText}
            history={recognition.history}
            copyFeedback={recognition.copyFeedback}
            isSimulationMode={recognition.isSimulationMode}
            setIsSimulationMode={recognition.setIsSimulationMode}
            onClear={recognition.clearTranslation}
            onCopy={recognition.copyTranslation}
            onOpenBackendGuide={onOpenBackendGuide}
          />

        </div>

        {/* Workflow Pipeline Section (Webcam -> Landmarks -> ML -> English) */}
        <WorkflowPipeline />

      </div>
    </section>
  );
}
