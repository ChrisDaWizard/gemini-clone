import React, { useState } from 'react';
import "./Main.css";
import { assets } from '../../assets/assets';

const Main = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extended, setExtended] = useState(false); // <<--- NUEVO

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setExtended(true); // <<--- ACTIVAR CHAT EXTENDIDO

    const userMessage = { type: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setPrompt("");

    try {
      const res = await fetch('http://localhost:3001/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const botMessage = { type: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = { type: 'bot', text: 'Error al conectarse con el servidor.' };
      setMessages(prev => [...prev, errorMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">

        {/* Solo se muestran si no se ha extendido el chat */}
        {!extended && (
          <>
            <div className="greet">
              <p><span>Hello!, Dev.</span></p>
              <p>How can I help you?</p>
            </div>

            <div className="cards">
              <div className="card"><p>Suggestion1</p><img src={assets.compass_icon} alt="" /></div>
              <div className="card"><p>Suggestion2</p><img src={assets.bulb_icon} alt="" /></div>
              <div className="card"><p>Suggestion3</p><img src={assets.message_icon} alt="" /></div>
              <div className="card"><p>Suggestion4</p><img src={assets.code_icon} alt="" /></div>
            </div>
          </>
        )}

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="chat-bubble bot">...</div>
          )}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter prompt here'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt="send"
                style={{ cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                onClick={handleSend}
              />
            </div>
          </div>
          <p className="bottom-info">
            {loading ? 'Loading...' : "Hi! I'm bottom info"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
