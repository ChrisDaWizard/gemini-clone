import React from 'react'
import { assets } from '../../assets/assets'

const GreetAndCard = ({ extended }) => {

    if (extended) return null

    return (
        <>
            <div className="greet">
                <p><span>Hello!, Dev.</span></p>
                <p>How can I help you?</p>
            </div>

            <div className="cards">
                <div className="card"><p>Hello!, I'm Suggestion 1</p><img src={assets.compass_icon} alt="" /></div>
                <div className="card"><p>I'm Suggestion 2, waddup?</p><img src={assets.bulb_icon} alt="" /></div>
                <div className="card"><p>I'm Suggestion namba 3, go clean your room</p><img src={assets.message_icon} alt="" /></div>
                <div className="card"><p>Suggestion 4... what?</p><img src={assets.code_icon} alt="" /></div>
            </div>
        </>
    )
};


export default GreetAndCard

