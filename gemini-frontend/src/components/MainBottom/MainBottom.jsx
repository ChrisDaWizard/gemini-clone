import React from 'react'
import { assets } from '../../assets/assets'

export const MainBottom = ({ prompt, setPrompt, loading, handleSend }) => {
    return (
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
    )
}
