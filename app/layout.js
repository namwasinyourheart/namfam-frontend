// app/layout.js
"use client";

import './globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
        <header className="p-3 rounded-b-md shadow-lg text-black">
          <nav className="container mx-auto flex flex-col md:flex-row justify-center font-semibold text-2xl">
            <div>
              <Link href="/" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Home</Link>
              <Link href="/about" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">About</Link>
              <Link href="/projects" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Projects</Link>
              <Link href="/contact" className="px-4 py-2 text-black hover:text-white hover:bg-gray-400 rounded-md">Contact</Link>
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
