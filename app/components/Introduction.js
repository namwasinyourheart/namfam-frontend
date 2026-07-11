"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Introduction = () => {
  const phrases = ["Nam Fam", "an AI engineer"];
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingDuration = 60;
  const pauseDuration = 1000;

  useEffect(() => {
    let typingInterval;
    let pauseTimeout;

    const typingLoop = () => {
      const phrase = phrases[currentIndex];
      let index = 0;

      const typeCharacter = () => {
        if (index < phrase.length) {
          setCurrentText(phrase.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          pauseTimeout = setTimeout(() => {
            setCurrentText('');
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
            typingLoop();
          }, pauseDuration);
        }
      };

      typingInterval = setInterval(typeCharacter, typingDuration);
    };

    typingLoop();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, [currentIndex]);

  return (
    <div className="w-full p-6 sm:p-10 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Hi. I&apos;m <span className="text-black font-bold">{currentText}</span>
      </h1>
      <div className="text-xl mb-8 text-gray-600 leading-relaxed">
        I leverage AI to solve complex challenges and drive innovation.
        <p className="mt-2">Explore my portfolio to see how I turn cutting-edge AI concepts into practical solutions.</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/about"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
        >
          More About Me
        </Link>
        <Link
          href="/projects"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
        >
          See My Projects
        </Link>
      </div>
    </div>
  );
};

export default Introduction;
