import React , { useState } from 'react';
import FoodOrderChatbot from './FoodOrderChatbot';
import ChatbotInstructions from './ChatbotInstructions';
import HindiChatbotInstructions from './HindiChatbotInstructions';

function App() {
  const [language, setLanguage] = useState('english'); // 'hindi' or 'english'
  const LanguageToggle = ({ isHindi, toggleLanguage, isAnimating = false }) => {
  return (
    <button 
      className={`language-toggle ${isHindi ? 'hindi' : ''} ${isAnimating ? 'language-switch-animation' : ''}`}
      onClick={toggleLanguage}
    >
      <span className="language-icon">
        {isHindi ? '🌐' : '🇮🇳'}
      </span>
      {isHindi ? 'अंग्रेज़ी' : 'हिंदी'}
    </button>
  );
};
  return (
    <div className="App">
      {/* Your other components */}
      <FoodOrderChatbot />
    {/*}  <ChatbotInstructions /> */}
    {language === 'hindi' ? <HindiChatbotInstructions /> : <ChatbotInstructions />}
      <LanguageToggle isHindi={language === 'hindi'} toggleLanguage={() => setLanguage(language === 'hindi' ? 'english' : 'hindi')} isAnimating={true} />

      
    </div>
  );
}

export default App;