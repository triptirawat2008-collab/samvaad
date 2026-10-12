import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TranslationStudio from './components/TranslationStudio';
import WorkflowPipeline from './components/WorkflowPipeline';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import BackendGuideModal from './components/BackendGuideModal';
import { useWebcam } from './hooks/useWebcam';
import { useRecognition } from './hooks/useRecognition';

export default function App() {
  // Navigation view state: 'home' | 'translate' | 'how-it-works' | 'about'
  const [activeView, setActiveView] = useState('home');
  const [isBackendGuideOpen, setIsBackendGuideOpen] = useState(false);

  // Core webcam stream manager
  const webcam = useWebcam();

  // Core ML recognition state manager
  const recognition = useRecognition({
    isCameraActive: webcam.status === 'active',
  });

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'translate') {
      // Auto-start camera when entering translation studio if not already running
      if (webcam.status !== 'active' && webcam.status !== 'requesting') {
        webcam.startCamera();
      }
    }
  };

  const handleStartTranslating = () => {
    handleNavigate('translate');
  };

  const handleLearnMore = () => {
    handleNavigate('how-it-works');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F4] text-[#252C27] font-sans">
      
      {/* Consistent Primary Navigation Bar */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        isCameraActive={webcam.status === 'active'}
      />

      {/* Main Content Area based on current view */}
      {activeView === 'translate' ? (
        /* 1. DEDICATED FULL-SCREEN TRANSLATION STUDIO */
        <TranslationStudio
          videoRef={webcam.videoRef}
          cameraStatus={webcam.status}
          cameraError={webcam.error}
          streamResolution={webcam.streamResolution}
          onStartCamera={webcam.startCamera}
          onStopCamera={webcam.stopCamera}
          isRecognizing={recognition.isRecognizing}
          backendStatus={recognition.backendStatus}
          currentSign={recognition.currentSign}
          translationText={recognition.translationText}
          copyFeedback={recognition.copyFeedback}
          isSimulationMode={recognition.isSimulationMode}
          setIsSimulationMode={recognition.setIsSimulationMode}
          onStartRecognition={recognition.startRecognition}
          onStopRecognition={recognition.stopRecognition}
          onClearTranslation={recognition.clearTranslation}
          onCopyTranslation={recognition.copyTranslation}
          onOpenBackendGuide={() => setIsBackendGuideOpen(true)}
        />
      ) : activeView === 'how-it-works' ? (
        /* 2. HOW IT WORKS WORKFLOW PAGE */
        <main className="flex-1">
          <WorkflowPipeline onOpenTranslate={handleStartTranslating} />
          <Footer onNavigate={handleNavigate} />
        </main>
      ) : activeView === 'about' ? (
        /* 3. ABOUT ISL & BACKGROUND PAGE */
        <main className="flex-1">
          <AboutSection onOpenTranslate={handleStartTranslating} />
          <Footer onNavigate={handleNavigate} />
        </main>
      ) : (
        /* 4. HOME OVERVIEW PAGE */
        <main className="flex-1">
          <Hero 
            onStartTranslating={handleStartTranslating} 
            onLearnMore={handleLearnMore} 
          />
          <Footer onNavigate={handleNavigate} />
        </main>
      )}

      {/* Backend Integration Guide Modal */}
      <BackendGuideModal
        isOpen={isBackendGuideOpen}
        onClose={() => setIsBackendGuideOpen(false)}
      />

    </div>
  );
}
