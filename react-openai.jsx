import React, { useState } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([{ role: "user", content: "Hi!" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_API_KEY`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: updatedMessages,
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    setMessages([...updatedMessages, { role: "assistant", content: data.choices[0].message.content }]);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}><strong>{message.role}:</strong> {message.content}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;



// For deployment:
// Use GitHub secrets or environment variables in
// your cloud hosting environment (Heroku or AWS)
// to keep your private API key secure.
