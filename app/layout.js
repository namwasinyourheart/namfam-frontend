// app/layout.js
"use client";

import './globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import ChatPopup from './components/ChatPopup'; // Adjust the import path as necessary

// export const metadata = {
//   title: 'Nam Fam',
//   description: 'Showcasing my work and skills.',
// };

export default function RootLayout({ children }) {
  const { pathname } = useRouter();

  return (
    <html lang="en">
      <body className={`bg-white flex flex-col h-screen ${pathname === '/' ? 'overflow-hidden' : ''}`}>
        <header className="p-3 rounded-b-md shadow-lg text-black flex items-center">


          {/* Logo */}
          <div className="flex items-center h-full ml-4">
            <Link 
              href="/"
              // className=" bg-gray-800"
            >
              <Image src="https://avatars.githubusercontent.com/u/102389548?v=4" alt="Logo" width={40} height={40} className="rounded-full" />
              
            </Link>
          </div>


          {/* Navigation */}
          <nav className="container mx-auto flex flex-col md:flex-row justify-center font-semibold text-2xl">
            <div>
              <Link href="/" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Home</Link>
              <Link href="/about" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">About</Link>
              <Link href="/projects" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Projects</Link>
              <Link href="https://aiunveiledblog.substack.com" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Blog</Link>
              <Link href="/contact" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Contact</Link>
            </div>

            {/* Social Buttons for GitHub and LinkedIn */}
            <div className="absolute top-3 right-10 flex space-x-2">
            <Link
                href="https://github.com/namwasinyourheart"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gray-800 rounded-md hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.61.07-.61 1.01.07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85.01 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.56 4.94.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.68.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/namfam/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-blue-600 rounded-md hover:bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.7s.78-1.7 1.75-1.7 1.75.79 1.75 1.7-.78 1.7-1.75 1.7zm13.5 10.3h-3v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.37v4.57h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v4.72z" />
                </svg>
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow w-full mx-auto p-4">
          {children}
        </main>

        <footer className="p-2 border-t shadow-lg rounded-t-md text-black text-center">
          &copy; {new Date().getFullYear()} Nam Fam
        </footer>

        {/* <ChatPopup /> */}
      </body>
    </html>
  );
}
