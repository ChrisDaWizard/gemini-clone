import React, { useEffect, useState } from 'react'
import "./SideBar.css"
import { assets } from "../../assets/assets"
import { loadfromLocalStorage } from '../../utils/LocalStorage'
import Bottom from './Bottom/Bottom'
import Top from './Top/Top'

const SideBar = ({setSelectedChat}) => { //setSelectedChat se ancla desde el app.jsx

    const [extended, setExtended] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const storedHistory = loadfromLocalStorage("chatHistory") || []; //storedHistory se carga desde localstorage creado en utils
        setChatHistory([...storedHistory].reverse());
    }, []);

    return (
        <div className='sidebar'>
            <Top extended={extended} setExtended={setExtended} chatHistory={chatHistory} setSelectedChat={setSelectedChat} />
            <Bottom extended={extended} />
        </div>
    )
}

export default SideBar