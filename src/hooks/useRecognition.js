import { useState, useEffect, useCallback, useRef } from 'react';
import mlService from '../services/mlService';

/**
 * Hook managing the recognition state, backend connectivity,
 * sentence accumulation, and translation actions.
 */
export function useRecognition({ isCameraActive }) {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [backendStatus, setBackendStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected' | 'error'
  const [backendError, setBackendError] = useState(null);
  
  // Real recognition state
  const [currentSign, setCurrentSign] = useState(null); // { text, confidence, timestamp }
  const [translationText, setTranslationText] = useState('');
  const [history, setHistory] = useState([]);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Developer inspection mode (OFF by default)
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const simulationIntervalRef = useRef(null);

  // Subscribe to MLService events
  useEffect(() => {
    const unsubscribe = mlService.subscribe(({ type, data }) => {
      if (type === 'statusChange') {
        setBackendStatus(data.status);
        if (data.error) setBackendError(data.error);
        else setBackendError(null);
      } else if (type === 'prediction' && isRecognizing) {
        if (data.text) {
          setCurrentSign({
            text: data.text,
            confidence: data.confidence || 0.88,
            timestamp: new Date().toLocaleTimeString(),
          });

          setTranslationText((prev) => {
            if (!prev) return data.text;
            return `${prev} ${data.text}`;
          });

          setHistory((prev) => [
            ...prev,
            { text: data.text, confidence: data.confidence, time: new Date().toLocaleTimeString() },
          ]);
        }
      }
    });

    return () => unsubscribe();
  }, [isRecognizing]);

  // Handle Simulation Mode when explicitly enabled by user
  useEffect(() => {
    if (isSimulationMode && isRecognizing && isCameraActive) {
      const sampleISLSigns = [
        { text: 'Namaste (Hello)', confidence: 0.94 },
        { text: 'Thank you', confidence: 0.91 },
        { text: 'How are you?', confidence: 0.87 },
        { text: 'Welcome', confidence: 0.95 },
        { text: 'Good morning', confidence: 0.89 },
      ];
      let index = 0;

      simulationIntervalRef.current = setInterval(() => {
        const item = sampleISLSigns[index % sampleISLSigns.length];
        index++;
        setCurrentSign({
          text: item.text,
          confidence: item.confidence,
          timestamp: new Date().toLocaleTimeString(),
          isSimulated: true,
        });
        setTranslationText((prev) => (prev ? `${prev} ${item.text}` : item.text));
        setHistory((prev) => [
          ...prev,
          { text: item.text, confidence: item.confidence, time: new Date().toLocaleTimeString(), isSimulated: true },
        ]);
      }, 3500);
    } else {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
    }

    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, [isSimulationMode, isRecognizing, isCameraActive]);

  /**
   * Start Recognition
   */
  const startRecognition = useCallback(() => {
    if (!isCameraActive) {
      return { success: false, reason: 'CAMERA_INACTIVE' };
    }
    setIsRecognizing(true);
    return { success: true };
  }, [isCameraActive]);

  /**
   * Stop Recognition
   */
  const stopRecognition = useCallback(() => {
    setIsRecognizing(false);
  }, []);

  /**
   * Clear translation output
   */
  const clearTranslation = useCallback(() => {
    setTranslationText('');
    setCurrentSign(null);
    setHistory([]);
  }, []);

  /**
   * Copy translation to clipboard
   */
  const copyTranslation = useCallback(async () => {
    const textToCopy = translationText || (currentSign ? currentSign.text : '');
    if (!textToCopy) return false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  }, [translationText, currentSign]);

  /**
   * Connect to Python backend URL
   */
  const connectBackend = useCallback((url) => {
    mlService.connect(url);
  }, []);

  /**
   * Disconnect from backend
   */
  const disconnectBackend = useCallback(() => {
    mlService.disconnect();
  }, []);

  // Compute active recognition flag derived from camera status
  const effectiveIsRecognizing = isCameraActive && isRecognizing;

  return {
    isRecognizing: effectiveIsRecognizing,
    backendStatus,
    backendError,
    currentSign,
    translationText,
    history,
    copyFeedback,
    isSimulationMode,
    setIsSimulationMode,
    startRecognition,
    stopRecognition,
    clearTranslation,
    copyTranslation,
    connectBackend,
    disconnectBackend,
  };
}
