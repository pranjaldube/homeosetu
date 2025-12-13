"use client"

import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

// Type definitions
type OptionNode = {
  label: string;
  next?: string;       // id of next node
  message?: string;    // final output if no next node
};

type ChatNode = {
  id: string;
  question: string;
  options: Record<string, OptionNode>;
};

// Whole chatbot
type ChatbotGraph = {
  [key: string]: ChatNode;
};

type Message = {
  type: 'user' | 'bot';
  text: string;
};

// Static data structure with graph-based approach
const chatbotGraph: ChatbotGraph = {
  level1: {
    id: "level1",
    question: "Hello! Please select an option to get started:",
    options: {
      a: { label: "1. Guided Case-taking", next: "level1A" },
      b: { label: "2. Homeosetu Case Analytics", next: "level1B" },
      c: { label: "3. Homeosetu Diagnostic Map", next: "level1C" },
      d: { label: "4. Homeosetu Clinical Prescriber", next: "level1D" },
      e: { label: "5. Remedy Relationship", next: "level1E" },
      f: { label: "6. Homeosetu Remedy Validator", next: "level1F" },
    }
  },

  level1A: {
    id: "level1A",
    question: "You selected Guided Case-taking. Please choose from the following options:",
    options: {
      a: { label: "Acute Case Taking", next: "level3" },
      b: { label: "Chronic Case Taking", next: "level3" },
      c: { label: "Predefined Case Proformas", next: "level3" },
      d: { label: "Go Back", next: "level1" }
    }
  },
  level1B: {
    id: "level1B",
    question: "You selected Homeosetu Case Analytics. Please choose from the following options:",
    options: {
      a: { label: "Metaria Medica Selector", next: "level3" },
      b: { label: "Rubric Finder", next: "level3" },
      c: { label: "Repertory Navigator", next: "level3" },
      d: { label: "Organ Compass", next: "level3" },
      e: { label: "Go Back", next: "level1" }

    }
  },
  level1C: {
    id: "level1C",
    question: "You selected Homeosetu Diagnostic Map. Please choose from the following options:",
    options: {
      a: { label: "Coming Soon", next: "level3" },
      b: { label: "Go Back", next: "level1" }

    }
  },
  level1D: {
    id: "level1D",
    question: "You selected Homeosetu Clinical Prescriber. Please choose from the following options:",
    options: {
      a: { label: "Mind Symptoms", next: "level3" },
      b: { label: "Physical Generals", next: "level3" },
      c: { label: "Constitution", next: "level3" },
      d: { label: "Clinical examination", next: "level3" },
      e: { label: "Homeopathic examination", next: "level3" },
      f: { label: "Investigations", next: "level3" },
      g: { label: "Diagnosis", next: "level3" },
      h: { label: "Go Back", next: "level1" }

    }
  },
  level1E: {
    id: "level1E",
    question: "You selected Remedy Relationship. Please choose from the following options:",
    options: {
      a: { label: "Coming Soon", next: "level3" },
      b: { label: "Go Back", next: "level1" }

    }
  },
  level1F: {
    id: "level1F",
    question: "You selected Homeosetu Remedy Validator. Please choose from the following options:",
    options: {
      a: { label: "Coming Soon", next: "level3" },
      b: { label: "Go Back", next: "level1" }
    }
  },
  level3: {
    id: "level3",
    question: "the selected content will be coming soon as it is getting refined and want to make sure that correct and accurate content reaches to our users",
    options: {
      a: { label: "Done", next: 'level1' }
    }
  }
};

const Chatbot: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('level1');
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: chatbotGraph.level1.question }
  ]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Encode function to protect copied content
  const encodeText = (text: string): string => {
    // Base64 encode the text and add watermark
    const encoded = btoa(unescape(encodeURIComponent(text)));
    return encoded;
  };

  // Handle copy event
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) return;

      const selectedText = selection.toString();
      const encodedText = encodeText(selectedText);

      e.clipboardData?.setData('text/plain', encodedText);
      e.preventDefault();
    };

    container.addEventListener('copy', handleCopy);
    return () => {
      container.removeEventListener('copy', handleCopy);
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
  }, [messages]);

  const getCurrentNode = (): ChatNode | null => {
    return chatbotGraph[currentNodeId] || null;
  };

  const handleOptionClick = (optionKey: string, option: OptionNode): void => {
    // Add user message
    const userMessage: Message = { type: 'user', text: option.label };
    setMessages(prev => [...prev, userMessage]);

    // Check if this is a final option (has message, no next)
    if (option.message && !option.next) {
      // Final level - show message
      const botMessage: Message = { type: 'bot', text: option.message };
      setMessages(prev => [...prev, botMessage]);

      // Reset after a delay
      setTimeout(() => {
        setCurrentNodeId('level1');
        setMessages([{ type: 'bot', text: chatbotGraph.level1.question }]);
      }, 2000);
    } else if (option.next) {
      // Navigate to next node
      const nextNode = chatbotGraph[option.next];
      if (nextNode) {
        setCurrentNodeId(option.next);
        const botMessage: Message = { type: 'bot', text: nextNode.question };
        setMessages(prev => [...prev, botMessage]);
      }
    }
  };

  const handleReset = (): void => {
    setCurrentNodeId('level1');
    setMessages([{ type: 'bot', text: chatbotGraph.level1.question }]);
  };

  const currentNode = getCurrentNode();

  if (!currentNode) {
    return (
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>Chatbot</h2>
          <button onClick={handleReset} className="reset-btn">Reset</button>
        </div>
        <div className="chatbot-messages">
          <div className="message bot">
            <div className="message-content">Error: Node not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
        <button onClick={handleReset} className="reset-btn">Reset</button>
      </div>

      <div>
        <div className="chatbot-messages" ref={messagesContainerRef}>
          <div className="chatbot-logo">
            <img src="/logo.svg" alt="Homeosetu Logo" />
          </div>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="chatbot-options">
        {Object.entries(currentNode.options).map(([key, option]) => {
          return (
            <button
              key={key}
              onClick={() => handleOptionClick(key, option)}
              className="option-btn"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Chatbot;