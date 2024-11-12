import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { getOpenAICompletion } from './openai';
import { useState, useRef, useEffect } from 'react';


function App() {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{
    text: " Hi, I'm ChatAPT, a chatbot that can help you with your queries. How can I help you today?",
    isBot: true,

  }]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  , [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);
    const response = await getOpenAICompletion(text);
    setMessages([...messages, { text, isBot: false }, { text: response, isBot: true }]);
  }

  const handleKeyPress =  async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);
    const response = await getOpenAICompletion(text);
    setMessages([...messages, { text, isBot: false }, { text: response, isBot: true }]);
  }


  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatAPT</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="Query" />What is Programming?</button>
            <button className="query" onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="Query" />How to use an API?</button>
          </div>

        </div>
        <div className='lowerSide'>
          <div className="listItems"><img src={home} alt="home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="rocket" className="listItemsImg" />Upgrade to Pro</div>
       
        </div>


      </div>
      <div className='main'>
        <div className="chats">
          
          {messages.map((message, index) => (
            <div key={index} className={message.isBot?"chat bot":"chat"}>
              <img className="chatImg" src={message.isBot?gptImgLogo:userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef}></div>

        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Type a message" value={input} onKeyDown={handleKeyPress} onChange={(e) => {setInput(e.target.value)}}/>
            <button className="send" onClick={handleSend}><img src={sendBtn} alt="send" />Send</button>
          </div>
          <p>ChatAPT may produce text that is inappropriate or objectionable.</p>
        </div>

      </div>
      

    </div>
  );
}

export default App;
