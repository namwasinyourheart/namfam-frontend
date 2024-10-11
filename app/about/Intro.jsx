import React from 'react';
import avatar from './avatar.jpg';
import Link from 'next/link';
import Image from 'next/image';

const Intro = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start max-w-full p-4">
      {/* Left column for image */}
      <div className="flex-1 md:max-w-[30%] w-full mb-4 md:mb-0 md:mr-6">
        <Image
          src={avatar}
          alt="AI Engineer"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        //   width={400} // You can adjust width and height to match your image's resolution
        //   height={400}
        />
      </div>

      {/* Right column for text */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl mb-[15px] font-bold text-[var(--text-black-900)]">
            I'm Nam Fam
             {/* and{' '}
            <span className="text-[var(--skin-color)] text-red-400">
              AI Engineer
            </span> */}
          </h3>
          <p className="text-base leading-[25px]">
            I leverage artificial intelligence to solve complex challenges and
            drive innovation across various sectors. Explore my
            portfolio to see how I harness machine learning, natural language
            processing, and computer vision to revolutionize industries and
            improve lives.
          </p>
        </div>

        {/* Centered Download Resume Button */}
        <div className="flex justify-center mt-6">
          <Link
            style={{ backgroundColor: '#7843e9', fontWeight: 600 }}
            href="/Resume_AIEngineer.pdf"
            className="px-4 py-2 text-white rounded-md hover:bg-blue-700"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
