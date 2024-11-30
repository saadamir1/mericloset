import React, { useState, useEffect, useRef } from 'react';

// Import the image correctly
import supportIcon from '../assets/support.png'; 

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  const chatOutputRef = useRef<HTMLDivElement>(null);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('hello')) {
      return "Hello! How can I help you today? 😊";
    }

    if (lowerCaseMessage.includes('salam')) {
      return "Wa-salam! How can I assist you today? 😊";
    }

    if (lowerCaseMessage.includes('shalwar kameez')) {
      return "We have a wide variety of Shalwar Kameez. Are you looking for men's or kids' sizes?";
    }

    // Default response
    return "I'm sorry, I didn't quite catch that.";
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      const newUserMessage: Message = { text: userInput, sender: 'user' };
      const newMessages = [...messages, newUserMessage];
      setMessages(newMessages);
      setUserInput('');

      const botResponseText = getBotResponse(userInput);
      const botResponse: Message = { text: botResponseText, sender: 'bot' };
      setMessages([...newMessages, botResponse]);
    }
  };

  // Scroll to the bottom of chat whenever messages update
  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div style={chatbotIconStyle} onClick={toggleChatBox}>
        🛍
      </div>
      {isOpen && (
        <div style={chatbotContainerStyle}>
          <div style={headerStyle}>
            {/* Add the support icon image */}
            <img src={supportIcon} alt="Support" style={supportIconStyle} />
            <h3>Shopping Assistant</h3>
            <button onClick={toggleChatBox} style={closeButtonStyle}>✕</button>
          </div>
          <div style={chatboxStyle}>
            <div ref={chatOutputRef} style={chatOutputStyle}>
              {messages.map((msg, index) => (
                <div key={index} style={msg.sender === 'user' ? userMessageStyle : botMessageStyle}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={inputContainerStyle}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about Shalwar Kameez, colors, sizes, etc..."
                style={inputStyle}
              />
              <button onClick={sendMessage} style={sendButtonStyle}>
                📨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styling
const chatbotIconStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  fontSize: '24px',
  backgroundColor: '#28a745',
  color: 'white',
  padding: '15px',
  borderRadius: '50%',
  cursor: 'pointer',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const chatbotContainerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '140px',
  right: '20px',
  width: '340px',
  backgroundColor: '#ffffff',
  border: '1px solid #28a745',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  fontSize: '16px',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  cursor: 'pointer',
};

const supportIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
};

const chatboxStyle: React.CSSProperties = {
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
};

const chatOutputStyle: React.CSSProperties = {
  maxHeight: '220px',
  overflowY: 'auto',
  marginBottom: '10px',
  fontSize: '14px',
  padding: '5px',
};

const userMessageStyle: React.CSSProperties = {
  textAlign: 'right',
  backgroundColor: '#28a745',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '15px',
  marginBottom: '5px',
  maxWidth: '75%',
  alignSelf: 'flex-end',
  fontSize: '14px',
};

const botMessageStyle: React.CSSProperties = {
  textAlign: 'left',
  backgroundColor: '#e0f7e9',
  color: '#333',
  padding: '8px 12px',
  borderRadius: '15px',
  marginBottom: '5px',
  maxWidth: '75%',
  alignSelf: 'flex-start',
  fontSize: '14px',
};

const inputContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  flex: '1',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  fontSize: '14px',
  outline: 'none',
};

const sendButtonStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Chatbot;