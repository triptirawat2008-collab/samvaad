import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage HTML5 Webcam stream lifecycle,
 * permission handling, device enumeration, and track releasing.
 */
export function useWebcam() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'requesting' | 'active' | 'error'
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [streamResolution, setStreamResolution] = useState(null);

  // Enumerate video devices if available
  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return;
    }
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');
      setDevices(videoInputs);
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch (err) {
      console.warn('Could not enumerate video devices:', err);
    }
  }, [selectedDeviceId]);

  /**
   * Release all active camera tracks and clean video srcObject
   */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.error('Error stopping track:', e);
        }
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
    setStatus('idle');
    setError(null);
    setStreamResolution(null);
  }, []);

  /**
   * Request user permission and start camera feed
   */
  const startCamera = useCallback(async (preferredDeviceId = selectedDeviceId) => {
    // If already active, stop first
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('error');
      setError({
        code: 'NOT_SUPPORTED',
        title: 'Browser Not Supported',
        message: 'Your browser does not support camera access (getUserMedia API). Please try modern Chrome, Firefox, or Edge.',
      });
      return;
    }

    setStatus('requesting');
    setError(null);

    const constraints = {
      video: preferredDeviceId
        ? { deviceId: { exact: preferredDeviceId }, width: { ideal: 1280 }, height: { ideal: 720 } }
        : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    };

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = mediaStream;
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((playErr) => {
              console.warn('Auto-play prevented by browser policy:', playErr);
            });
            setStreamResolution({
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight,
            });
          }
        };
      }

      setStatus('active');
      setError(null);
      refreshDevices();
    } catch (err) {
      console.error('Error accessing webcam:', err);
      let userError = {
        code: 'UNKNOWN',
        title: 'Camera Error',
        message: err.message || 'An unexpected error occurred while accessing the camera.',
      };

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        userError = {
          code: 'PERMISSION_DENIED',
          title: 'Camera Permission Denied',
          message: 'Camera access was blocked. Please click the camera/lock icon in your browser URL bar and allow camera permissions for this site.',
        };
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        userError = {
          code: 'NOT_FOUND',
          title: 'No Camera Detected',
          message: 'No video input device was found. Please ensure your webcam is properly connected and recognized by your system.',
        };
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        userError = {
          code: 'DEVICE_IN_USE',
          title: 'Camera Already in Use',
          message: 'Your camera might be in use by another application (e.g. Zoom, Google Meet, Teams). Please close other apps and try again.',
        };
      } else if (err.name === 'OverconstrainedError') {
        userError = {
          code: 'OVERCONSTRAINED',
          title: 'Resolution Constraint Error',
          message: 'The requested video resolution is not supported by your camera. Attempting fallback...',
        };
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = fallbackStream;
          setStream(fallbackStream);
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.play();
          }
          setStatus('active');
          setError(null);
          return;
        } catch {
          // Fallback also failed
        }
      }

      setStatus('error');
      setError(userError);
    }
  }, [selectedDeviceId, refreshDevices, stopCamera]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    stream,
    status, // 'idle' | 'requesting' | 'active' | 'error'
    error,
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
    streamResolution,
    startCamera,
    stopCamera,
  };
}
