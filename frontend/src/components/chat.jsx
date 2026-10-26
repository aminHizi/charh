import "./chat.css"
import { useState,useEffect } from "react";
export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, how can I help?", sender: "received" },
    { id: 2, text: "Can you summarize this file?", sender: "sent" },
    { id: 3, text: "Sure, give me a second.", sender: "received" }
  ]);
  const [text, setText] = useState("");
  const send = () => {
    if (text.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: text, sender: "sent" }]);
      setText("");
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="inputBar">
        <input type="text" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)}
        onkeyDown={(e) => {
            if (e.key === "Enter") {
                send()
            }
        }}
        />
        <button onClick={() => {send();}}>
          Send
        </button>
      </div>
    </div>
  );
}