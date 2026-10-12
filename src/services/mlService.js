/**
 * ==============================================================================
 * Samwad — ML Backend Integration Service
 * ==============================================================================
 * This service handles communication between the React frontend and the future
 * Python Machine Learning backend (FastAPI / Flask / WebSockets / PyTorch / TensorFlow).
 */

export class MLService {
  constructor() {
    this.ws = null;
    this.status = 'disconnected'; // 'disconnected' | 'connecting' | 'connected' | 'error'
    this.listeners = new Set();
    this.backendUrl = 'ws://localhost:8000/ws/isl-recognize';
  }

  /**
   * Subscribe to prediction events & status updates
   * @param {Function} callback - ({ type, data }) => void
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(event, data) {
    this.listeners.forEach((cb) => {
      try {
        cb({ type: event, data });
      } catch (err) {
        console.error('Error in MLService subscriber:', err);
      }
    });
  }

  /**
   * Connect to Python WebSocket server
   */
  connect(url = this.backendUrl) {
    this.backendUrl = url;
    this.status = 'connecting';
    this.notify('statusChange', { status: this.status });

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.status = 'connected';
        this.notify('statusChange', { status: this.status });
        console.info('[Samwad ML] Connected to Python backend at:', url);
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          this.notify('prediction', payload);
        } catch {
          console.warn('[Samwad ML] Non-JSON payload received:', event.data);
        }
      };

      this.ws.onerror = (_err) => {
        this.status = 'error';
        this.notify('statusChange', { 
          status: this.status, 
          error: 'Could not connect to Python ML server. Ensure backend is running on port 8000.' 
        });
      };

      this.ws.onclose = () => {
        this.status = 'disconnected';
        this.notify('statusChange', { status: this.status });
        console.info('[Samwad ML] Disconnected from Python backend');
      };
    } catch (err) {
      this.status = 'error';
      this.notify('statusChange', { status: this.status, error: err.message });
    }
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.status = 'disconnected';
    this.notify('statusChange', { status: this.status });
  }

  /**
   * Send a video frame (JPEG base64 or binary Blob) to the Python model
   */
  sendFrame(frameData) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(frameData);
    }
  }

  /**
   * Send pre-extracted MediaPipe Landmark coordinates
   * @param {Array} landmarks - 21 hand landmarks [{x, y, z}, ...]
   */
  sendLandmarks(landmarks) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'landmarks', data: landmarks }));
    }
  }
}

export const mlServiceInstance = new MLService();
export default mlServiceInstance;
