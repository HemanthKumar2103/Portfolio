import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VoiceNavigation.module.css';

function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        handleVoiceCommand(command);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = (command) => {
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
    } else if (command.includes('game') || command.includes('play')) {
      navigate('/');
    }
    
    setTimeout(() => setTranscript(''), 3000);
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  if (!recognition) return null;

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
