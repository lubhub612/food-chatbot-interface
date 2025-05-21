import React, { useState } from 'react';
import './ChatbotInstructions.css';

const ChatbotInstructions = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const commands = [
    { command: "Show menu", description: "Displays all available food items" },
    { command: "Order [item name]", description: "Adds item to your cart" },
    { command: "Show cart", description: "Displays your current order" },
    { command: "Remove [item number]", description: "Removes item from cart" },
    { command: "Find [food item]", description: "Shows which locations have an item" },
    { command: "Order from [restaurant]", description: "Selects a specific location" },
    { command: "Checkout", description: "Proceeds to payment" },
    { command: "Delivery options", description: "Shows pickup/delivery choices" },
    { command: "Restaurant info", description: "Shows location details" },
    { command: "Help", description: "Displays this command list" }
  ];

  return (
    <div className={`instructions-container ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="instructions-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>💡 Available Commands</h4>
        <span className="toggle-icon">
          {isExpanded ? '▼' : '▲'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="commands-list">
          {commands.map((cmd, index) => (
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

export default ChatbotInstructions;