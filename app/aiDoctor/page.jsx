"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesEndRef = useRef(null); // Ref to scroll to the last message

  const GOOGLE_API_KEY = "AIzaSyC9pKxzZo_zszqG8RKcndc-XWEVpZPjrXg"; // Replace with your actual API key

  async function generateAnswer() {
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: question, user: true },
    ]);
    setQuestion("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`,
        {
          contents: [{ parts: [{ text: question }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const answer = response.data.candidates[0].content.parts[0].text;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: answer, user: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Something went wrong. Please try again later.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setGeneratingAnswer(false);
    }
  }

  // Handle enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior (new line)
      generateAnswer();
    }
  };

  // Auto scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4 md:mx-8">
      <div className="flex-1 overflow-auto mb-4 p-4 md:p-44">
        {/* Conditional rendering of the welcome message */}
        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <div className="text-2xl md:text-4xl text-gray-400 text-center">
              <TypeAnimation
                sequence={[
                  "Welcome to ONLINE DOCTOR AI! Searching for anything? Here to clarify your doubts.", // Display single message
                  2000,
                ]}
                wrapper="div"
                cursor={true}
                repeat={0} // No loop
                style={{ whiteSpace: "pre-line" }} // Keeps formatting in one line
              />
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 md:p-3 rounded-lg ${
              msg.user ? "bg-blue-600 self-end" : "bg-gray-700 self-start"
            } max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`}
            style={{
              alignSelf: msg.user ? "flex-end" : "flex-start",
              marginLeft: msg.user ? "auto" : "0",
              marginRight: msg.user ? "0" : "auto",
            }}
          >
            <p className="text-sm md:text-base text-white">{msg.text}</p>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-2 md:p-4 bg-gray-900 flex justify-center mx-2 md:mx-16">
        <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800 w-full max-w-md md:max-w-2xl">
          <input
            className="flex-1 p-2 md:p-3 bg-transparent text-white outline-none placeholder-gray-500 rounded-l-lg"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress} // Handle enter key press
            placeholder="Ask something..."
          />
          <button
            className={`px-4 py-2 bg-blue-600 rounded-r-lg text-white font-bold ${
              generatingAnswer || !question.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={generateAnswer}
            disabled={generatingAnswer || !question.trim()}
          >
            {generatingAnswer ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
