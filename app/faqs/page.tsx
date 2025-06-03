"use client";

import React, { useState } from 'react';

const FAQs = () => {
  const faqList = [
    {
      question: "What is RahulAI?",
      answer: "RahulAI is a personalized AI-powered portfolio assistant that provides information about Rahul Bedjavalge's skills, projects, and experience."
    },
    {
      question: "How can I contact Rahul?",
      answer: "You can use the Contact Us page to send a message or reach out via the provided email address."
    },
    {
      question: "What technologies does Rahul specialize in?",
      answer: "Rahul specializes in Full Stack Development, AI/ML technologies, and scalable web solutions."
    },
    {
      question: "Where is Rahul based?",
      answer: "Rahul is currently based in Berlin, Germany."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span>{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 border-t border-gray-700">
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
