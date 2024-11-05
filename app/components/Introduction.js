"use client"

// components/Introduction.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Introduction = () => {
  const phrases = ["Nam Fam", "an AI engineer"];
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingDuration = 60; // Typing speed in ms
  const pauseDuration = 1000; // Pause duration for full phrase display

  useEffect(() => {
    let typingInterval;
    let pauseTimeout;

    const typingLoop = () => {
      const phrase = phrases[currentIndex];
      let index = 0;

      const typeCharacter = () => {
        if (index < phrase.length) {
          setCurrentText(phrase.slice(0, index + 1)); // Show typed characters only
          index++;
        } else {
          clearInterval(typingInterval); // Stop typing when the full phrase is displayed
          pauseTimeout = setTimeout(() => {
            setCurrentText(''); // Reset text after pause
            setCurrentIndex((prev) => (prev + 1) % phrases.length); // Move to the next phrase
            typingLoop(); // Start typing the next phrase
          }, pauseDuration); // Wait before switching to the next phrase
        }
      };

      typingInterval = setInterval(typeCharacter, typingDuration); // Start typing characters
    };

    typingLoop(); // Start the typing effect

    return () => {
      clearInterval(typingInterval); // Cleanup typing interval
      clearTimeout(pauseTimeout); // Cleanup pause timeout
    };
  }, [currentIndex]);

  return (
    <div className="w-full md:w-1/2 text-left p-10">
      <h1 style={{ fontSize: '4vw' }} className="font-bold mb-4">
        Hi. I&apos;m <span className="highlight">{currentText}</span> {/* Highlighting the current text */}
      </h1>
      <div style={{ fontSize: '1.5rem', marginBottom: '4rem' }} className="text-xl mb-8">
        I leverage artificial intelligence to solve complex challenges and drive innovation.
        <p>Explore my portfolio to see how I turn cutting-edge AI concepts into practical solutions.</p>
      </div>

      <div className='flex flex-row gap-6'>
        <Link
          style={{ backgroundColor: '#7843e9', fontWeight: 600 }}
          href="/about"
          className="px-4 py-4 text-white rounded-md hover:bg-blue-700"
        >
          More About Me
        </Link>
        <Link
          style={{ backgroundColor: '#7843e9', fontWeight: 600 }}
          href="/projects"
          className="px-4 py-4 text-white rounded-md hover:bg-blue-700 ml-4"
        >
          See My Projects
        </Link>

        <Link
          style={{ backgroundColor: '#7843e9', fontWeight: 600 }}
          href="/Resume_AIEngineer_1.pdf"
          className="px-4 py-4 text-white rounded-md hover:bg-blue-700 ml-4"
        >
          See My Resume
        </Link>
      </div>

      <style jsx>{`
        .highlight {
        //   color: #7843e9; /* Change this color to highlight the text */
          color: green;
          font-weight: bold; /* Make the text bold */
        //   background-color: rgba(120, 67, 233, 0.2); /* Optional: Add a subtle background highlight */
          padding: 0 2px; /* Optional: Add some padding */
          border-radius: 2px; /* Optional: Slightly round the corners */
        }
      `}</style>
    </div>
  );
};

export default Introduction;
