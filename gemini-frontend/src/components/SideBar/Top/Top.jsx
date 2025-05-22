import React from 'react'
import { assets } from '../../../assets/assets'

const Top = ({setExtended, extended, chatHistory, setSelectedChat}) => {
    return (
        <div className="top">
            <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
            <div className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended ? <p>New Chat</p> : null}
            </div>
            {extended && (
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {[...chatHistory].reverse().map((chat, index) => ( //mapea el objecto chatHistory
                        <div key={index} className="recent-entry" onClick={() => setSelectedChat({
                            ...chat,
                            messages: chat.messages || [
                                { type: "bot", text: "Ops! no hay nada" }
                            ]
                        })}>
                            <img src={assets.message_icon} alt="" />
                            <p>{chat.title || chat.prompt?.slice(0, 20) + "..."}</p>
                        </div>
                    ))}
                </div>
            )}</div>
    )
}

export default Top