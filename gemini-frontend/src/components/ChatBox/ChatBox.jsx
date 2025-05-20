import React from 'react'

const ChatBox = ({selectedChat, messages, loading}) => {
    return (
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
    )
}

export default ChatBox