import React, { useEffect, useState } from 'react';
import "./Main.css";
import { assets } from '../../assets/assets';
import { loadfromLocalStorage, saveToLocalStorage } from '../../utils/LocalStorage';
import { v4 as uuidv4 } from "uuid";

const Main = ({ selectedChat, setSelectedChat }) => {
  const [prompt, setPrompt] = useState(''); //almacenamiento del texto del usuario
  const [messages, setMessages] = useState([]); //almacenamiento de los mensajes del bot y usuario
  const [loading, setLoading] = useState(false); //se indica si se espera o no una respuesta del servidor
  const [extended, setExtended] = useState(false); //se indica si solo mostrar el chat o las sugerencia de inicio nuevo

  useEffect(()=> {
    if (selectedChat?.messages) {
      setMessages(selectedChat.messages);
      setExtended(true);
    }
  }, [selectedChat]);

  const handleSend = async () => {  //funcion que se ejecuta cuando el usuario manda el mensaje
    if (!prompt.trim()) return; //evita que se envien mensajes vacios

    setExtended(true); // chat extendido

    const userMessage = { type: 'user', text: prompt }; //se crea objecto para el mensaje del usuario
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages); //agrega el mensaje al historial de mensajes anteriores prev
    setLoading(true); //se activa el estado de carga
    setPrompt(""); //se limpia el input

    try { //peticion al backend para la respuesta del bot
      const res = await fetch('http://localhost:3001/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if(!res.ok) throw new Error("respuesta no valida")

      const data = await res.json(); // se covierte la respuesta a JSON

      if(!data.response) throw new Error("La respuesta del bot esta vacía")

      const botMessage = { type: 'bot', text: data.response }; //se crea objecto con la respuesta del bot (data.response)
      const finalMessages = [...messages, userMessage, botMessage];
      setMessages(finalMessages);//se agregan al historial

      const chatHistory = loadfromLocalStorage("chatHistory") || [];
      let updatedChatHistory;
      if (!selectedChat) {
        const newChat = {
          id: uuidv4(),
          title: prompt.slice(0, 25),
          messages: finalMessages,
          timestamp: Date.now()
        };
        updatedChatHistory = [newChat, ...chatHistory];
        saveToLocalStorage("chatHistory", updatedChatHistory);
        setSelectedChat(newChat); // ✅ Actualiza el estado del chat seleccionado
      } else {
        updatedChatHistory = chatHistory.map(chat =>
          chat.id === selectedChat.id
            ? { ...chat, messages: finalMessages }
            : chat
        );
        saveToLocalStorage("chatHistory", updatedChatHistory)
        setSelectedChat(prev => ({ ...prev, messages: finalMessages }));
      }
      saveToLocalStorage("chatHistory", updatedChatHistory);
    } catch (err) {
      const errorMsg = { type: 'bot', text: 'Error al conectarse con el servidor.' };
      setMessages(prev => [...prev, errorMsg]);
      console.error(err);
    } finally {
      setLoading(false); //se desactiva el estado de carga, haya respuesta o no
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
          {(selectedChat?.messages || messages).map((msg, index) => ( //se recorre cada mensaje y se genera un div, React necesita una clave única para cada elemento en una lista. En este caso, se usa el índice del array como clave
            <div key={index} className={`chat-bubble ${msg.type}`}>
              {msg.text}
            </div> //${msg.type} agrega una clase dinámica (user o bot), que cambia el estilo del mensaje y {msg.text} ,muestra el mensaje
          ))}
          {loading && (
            <div className="chat-bubble bot">...</div> //si el estado de carga es true, se muestra la "carga ..."
          )}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter prompt here'
              value={prompt} // El valor del input está ligado al estado prompt para que sea un campo controlado (el valor siempre refleja el estado React).
              onChange={e => setPrompt(e.target.value)} //Cada vez que el usuario escribe algo, se actualiza el estado prompt con el nuevo texto.
              onKeyDown={e => e.key === 'Enter' && handleSend()} //Cuando el usuario presiona la tecla Enter, se ejecuta la función handleSend() para enviar el mensaje.
              disabled={loading} //Mientras loading sea true (está esperando respuesta del servidor), el input se deshabilita para evitar que el usuario escriba o envíe más mensajes.
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
            {loading ? 'Loading... Let broder think' : "Hi! I'm bottom info"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
