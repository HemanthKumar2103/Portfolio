import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AIChatbot.module.css';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Hemanth's AI assistant. How can I help you explore his portfolio?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // Close chatbot when page changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const botResponses = {
    'skills': "Hemanth is skilled in React, JavaScript, TypeScript, Node.js, and modern web technologies. Would you like to see his skills page?",
    'projects': "Hemanth has built amazing projects including e-commerce platforms, task management apps, and real-time chat applications. Check out his projects!",
    'experience': "Hemanth is a passionate Frontend Developer with expertise in React and modern web development. Visit his about page to learn more!",
    'contact': "You can reach Hemanth through the contact form or connect with him on LinkedIn and GitHub. Shall I take you to the contact page?",
    'resume': "You can download Hemanth's resume from the hero section. It contains all his professional details and experience.",
    'hello': "Hello! Welcome to Hemanth's portfolio. I can help you navigate and learn about his skills, projects, and experience.",
    'help': "I can help you with information about Hemanth's skills, projects, experience, and contact details. Just ask me anything!",
    'default': "That's interesting! I can tell you about Hemanth's skills, projects, experience, or help you contact him. What would you like to know?"
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let response = botResponses.default;
    let action = null;

    if (lowerInput.includes('skill')) {
      response = botResponses.skills;
      action = () => navigate('/skills');
    } else if (lowerInput.includes('project')) {
      response = botResponses.projects;
      action = () => navigate('/projects');
    } else if (lowerInput.includes('about') || lowerInput.includes('experience')) {
      response = botResponses.experience;
      action = () => navigate('/about');
    } else if (lowerInput.includes('contact')) {
      response = botResponses.contact;
      action = () => navigate('/contact');
    } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
      response = botResponses.resume;
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      response = botResponses.hello;
    } else if (lowerInput.includes('help')) {
      response = botResponses.help;
    }

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: response, sender: 'bot', action };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleAction = (action) => {
    if (action) action();
  };

  return (
    <div className={styles.container} ref={chatRef}>
      <button 
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        🤖
      </button>
      
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <span>AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className={styles.messages}>
            {messages.map(message => (
              <div key={message.id} className={`${styles.message} ${styles[message.sender]}`}>
                <p>{message.text}</p>
                {message.action && (
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleAction(message.action)}
                  >
                    Take me there →
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about Hemanth's portfolio..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIChatbot;
