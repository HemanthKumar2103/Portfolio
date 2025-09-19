import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VoiceNavigation.module.css';

function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
          try {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(command);
            handleVoiceCommand(command);
          } catch (error) {
            console.warn('Speech recognition result error:', error);
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionInstance.onerror = (event) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
        setIsSupported(true);
      } catch (error) {
        console.warn('Speech recognition initialization error:', error);
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    try {
      if (command.includes('home') || command.includes('start')) {
        navigate('/');
      } else if (command.includes('about')) {
        navigate('/about');
      } else if (command.includes('skills') || command.includes('skill')) {
        navigate('/skills');
      } else if (command.includes('projects') || command.includes('project')) {
        navigate('/projects');
      } else if (command.includes('contact')) {
        navigate('/contact');
      }
      
      setTimeout(() => setTranscript(''), 3000);
    } catch (error) {
      console.warn('Voice command handling error:', error);
    }
  };

  const startListening = () => {
    if (recognition && isSupported) {
      try {
        setIsListening(true);
        recognition.start();
      } catch (error) {
        console.warn('Start listening error:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
        setIsListening(false);
      } catch (error) {
        console.warn('Stop listening error:', error);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.voiceBtn} ${isListening ? styles.listening : ''}`}
        onClick={isListening ? stopListening : startListening}
        title="Voice Navigation"
      >
        🎤
      </button>
      {transcript && (
        <div className={styles.transcript}>
          Heard: "{transcript}"
        </div>
      )}
      {isListening && (
        <div className={styles.listeningIndicator}>
          Listening... Say "home", "about", "skills", "projects", or "contact"
        </div>
      )}
    </div>
  );
}

export default VoiceNavigation;
