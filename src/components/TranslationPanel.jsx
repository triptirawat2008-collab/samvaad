import React from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  Languages, 
  Cpu, 
  Radio, 
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export default function TranslationPanel({
  isCameraActive,
  isRecognizing,
  backendStatus,
  backendError,
  currentSign,
  translationText,
  history,
  copyFeedback,
  isSimulationMode,
  setIsSimulationMode,
  onClear,
  onCopy,
  onOpenBackendGuide,
}) {
  const hasText = Boolean(translationText || (currentSign && currentSign.text));

  return (
    <div className="bg-[#FAF9F4] rounded-2xl border border-[#E9E0CF] p-6 shadow-sm flex flex-col justify-between">
      
      {/* Top Header & Model Status */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#E9E0CF]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E9E0CF]/70 flex items-center justify-center text-[#183D32]">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#183D32] leading-tight">
                English Translation
              </h2>
              <p className="text-xs text-[#72786F]">
                Continuous sentence synthesis from ISL gestures
              </p>
            </div>
          </div>

          {/* Model Connectivity Badge */}
          <div className="flex items-center space-x-2">
            {backendStatus === 'connected' ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#183D32] text-[#FAF9F4]">
                <Radio className="w-3 h-3 mr-1 text-[#87966A] animate-pulse" />
                Python ML Connected
              </span>
            ) : isSimulationMode ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
                Simulated Test Mode
              </span>
            ) : (
              <button
                onClick={onOpenBackendGuide}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9E0CF] text-[#72786F] hover:bg-[#DACDB6] transition cursor-pointer"
                title="Click for instructions to connect your Python model"
              >
                <Cpu className="w-3 h-3 mr-1 text-[#87966A]" />
                Model Not Connected
              </button>
            )}
          </div>
        </div>

        {/* Translation Output Display Card */}
        <div className="my-5 bg-[#E9E0CF]/30 rounded-xl p-5 border border-[#DACDB6] min-h-[220px] flex flex-col justify-between">
          
          {/* Main Content Area */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#72786F]">
              <span>PREDICTED TEXT</span>
              {currentSign && currentSign.confidence && (
                <span className="font-mono text-[#183D32] bg-[#FAF9F4] px-2 py-0.5 rounded border border-[#DACDB6]">
                  Confidence: {Math.round(currentSign.confidence * 100)}%
                </span>
              )}
            </div>

            {/* Case 1: Translation is populated (Real or Simulated) */}
            {hasText ? (
              <div className="space-y-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#183D32] leading-snug tracking-tight">
                  &ldquo;{translationText || currentSign?.text}&rdquo;
                </div>
                
                {currentSign && (
                  <div className="flex items-center space-x-2 text-xs text-[#72786F]">
                    <Clock className="w-3.5 h-3.5 text-[#87966A]" />
                    <span>Last gesture detected: <strong className="text-[#183D32]">{currentSign.text}</strong> at {currentSign.timestamp}</span>
                    {currentSign.isSimulated && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-medium">
                        Simulated
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Case 2: Empty / Model not connected / Standby */
              <div className="py-6 flex flex-col items-center justify-center text-center">
                {!isCameraActive ? (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#E9E0CF] flex items-center justify-center text-[#72786F] mb-3">
                      <Languages className="w-6 h-6 text-[#87966A]" />
                    </div>
                    <p className="text-sm font-medium text-[#252C27]">
                      Translation standby
                    </p>
                    <p className="text-xs text-[#72786F] mt-1 max-w-xs">
                      Start your webcam and click &ldquo;Start Recognition&rdquo; to begin processing sign language gestures.
                    </p>
                  </>
                ) : !isRecognizing ? (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#E9E0CF] flex items-center justify-center text-[#72786F] mb-3">
                      <Radio className="w-6 h-6 text-[#87966A]" />
                    </div>
                    <p className="text-sm font-medium text-[#252C27]">
                      Camera is live &bull; Ready to recognize
                    </p>
                    <p className="text-xs text-[#72786F] mt-1 max-w-xs">
                      Click the &ldquo;Start Recognition&rdquo; button to feed video frames into the ML pipeline.
                    </p>
                  </>
                ) : (
                  /* Recognizing is clicked, but model not connected yet */
                  <div className="space-y-3 p-4 bg-[#FAF9F4] rounded-lg border border-[#DACDB6] max-w-sm">
                    <div className="flex items-center justify-center space-x-2 text-[#183D32]">
                      <Cpu className="w-5 h-5 text-[#87966A]" />
                      <span className="font-semibold text-sm">Model Not Connected Yet</span>
                    </div>
                    <p className="text-xs text-[#72786F] leading-relaxed">
                      {backendError || 'The computer vision feed is ready. The Python ML inference backend (FastAPI / PyTorch) has not been connected to port 8000.'}
                    </p>
                    <div className="pt-1 flex flex-col gap-2">
                      <button
                        onClick={onOpenBackendGuide}
                        className="text-xs text-[#183D32] hover:text-[#225344] font-semibold underline decoration-[#87966A] cursor-pointer"
                      >
                        View Python ML Backend Connection Guide &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Sentence Stream / Recent Tokens */}
          {history.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#DACDB6]/80">
              <span className="text-[11px] uppercase font-bold text-[#72786F] tracking-wider block mb-1.5">
                Token Sequence ({history.length})
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto pr-1">
                {history.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#FAF9F4] text-[#183D32] border border-[#DACDB6] font-medium"
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Action Buttons: Copy, Clear, and Dev Test Mode */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Copy Translation Button */}
          <button
            onClick={onCopy}
            disabled={!hasText}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-150 inline-flex items-center justify-center space-x-2 ${
              hasText
                ? copyFeedback
                  ? 'bg-[#183D32] text-[#FAF9F4]'
                  : 'bg-[#87966A] hover:bg-[#96a677] active:bg-[#6e7b54] text-[#FAF9F4] cursor-pointer shadow-sm'
                : 'bg-[#E9E0CF]/60 text-[#72786F] cursor-not-allowed border border-[#DACDB6]'
            }`}
          >
            {copyFeedback ? (
              <>
                <Check className="w-4 h-4 text-[#87966A]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Translation</span>
              </>
            )}
          </button>

          {/* Clear Output Button */}
          <button
            onClick={onClear}
            disabled={!hasText && history.length === 0}
            className={`py-3 px-4 rounded-lg font-medium text-sm border transition-all duration-150 inline-flex items-center justify-center space-x-2 ${
              hasText || history.length > 0
                ? 'bg-[#FAF9F4] hover:bg-[#E9E0CF] text-[#183D32] border-[#DACDB6] cursor-pointer'
                : 'bg-transparent text-[#72786F]/50 border-[#E9E0CF] cursor-not-allowed'
            }`}
            title="Clear current translation"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Output</span>
          </button>
        </div>

        {/* Developer Inspection Mode Toggle */}
        <div className="p-2.5 rounded-lg bg-[#E9E0CF]/40 border border-[#DACDB6] flex items-center justify-between text-xs text-[#72786F]">
          <div className="flex items-center space-x-2">
            <Info className="w-3.5 h-3.5 text-[#87966A]" />
            <span>Developer Test Mode (Simulate sample signs):</span>
          </div>
          <button
            onClick={() => setIsSimulationMode(!isSimulationMode)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isSimulationMode ? 'bg-[#87966A]' : 'bg-[#DACDB6]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                isSimulationMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

    </div>
  );
}
