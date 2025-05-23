import React, { useState } from 'react';
import './ChatbotInstructions.css';

const HindiChatbotInstructions = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hindiCommands = [
    { 
      command: "मेनू दिखाएं", 
      description: "सभी उपलब्ध भोजन विकल्प दिखाता है" 
    },
    { 
      command: "[आइटम नाम] ऑर्डर करें", 
      description: "आपके ऑर्डर में आइटम जोड़ता है" 
    },
    { 
      command: "कार्ट दिखाएं", 
      description: "आपका वर्तमान ऑर्डर दिखाता है" 
    },
    { 
      command: "[आइटम नंबर] हटाएं", 
      description: "आइटम को ऑर्डर से निकालता है" 
    },
    { 
      command: "[भोजन आइटम] खोजें", 
      description: "दिखाता है कि कौन से रेस्टोरेंट में आइटम उपलब्ध है" 
    },
    { 
      command: "[रेस्टोरेंट] से ऑर्डर करें", 
      description: "विशिष्ट रेस्टोरेंट चुनता है" 
    },
    { 
      command: "चेकआउट", 
      description: "भुगतान के लिए आगे बढ़ता है" 
    },
    { 
      command: "डिलीवरी विकल्प", 
      description: "पिकअप/डिलीवरी विकल्प दिखाता है" 
    },
    { 
      command: "रेस्टोरेंट जानकारी", 
      description: "स्थान का विवरण दिखाता है" 
    },
    { 
      command: "सहायता", 
      description: "यह कमांड सूची दिखाता है" 
    }
  ];

  return (
    <div className={`instructions-container ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="instructions-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>💡 उपलब्ध कमांड्स</h4>
        <span className="toggle-icon">
          {isExpanded ? '▼' : '▲'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="commands-list">
          {hindiCommands.map((cmd, index) => (
            <div key={index} className="command-item">
              <span className="command-text">{cmd.command}</span>
              <span className="command-desc">{cmd.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HindiChatbotInstructions;