import React, { useState } from 'react'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'


const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <SideBar setSelectedChat={setSelectedChat} />
      <Main
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </>
  )
}

export default App