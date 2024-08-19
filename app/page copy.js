import Link from 'next/link';
import ChatInterface from './components/ChatInterface';

// import Link from 'next/link';
// import ChatInterface from '../components/ChatInterface'; // Adjust the path if necessary

export default function Home() {
  return (
    <main className="bg-red-700 flex flex-col md:flex-row justify-center items-center h-screen">
      {/* Left Column: Introduction */}
      <div className="w-full md:w-1/2 text-center md:text-left p-4">
        <h1 style={{ fontSize: '6vw' }} className="font-bold mb-4">Hi. I'm Nam</h1>
        <p style={{ fontSize: '2rem' }} className="text-xl mb-8">An AI Engineer</p>
        <div>
          <Link
            style={{ backgroundColor: '#7843e9', fontWeight: 600 }}
            href="/about"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            More about Me
          </Link>
          <Link
            style={{ backgroundColor: '#7843e9', fontWeight: 600 }}
            href="/projects"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-4"
          >
            See my projects
          </Link>
        </div>
      </div>

      {/* Right Column: Chat Interface */}
      <aside className="max-w-3xl w-full md:w-1/2 p-4 flex justify-center items-center">
        <ChatInterface />
      </aside>
    </main>
  );
}

// export default function Home() {
//   return (
//     <>
//       <section className="text-center my-12">
//         <h1 className="text-4xl font-bold mb-4">Hello, I'm [Your Name]</h1>
//         <p className="text-xl mb-8">Welcome to my personal portfolio website.</p>
//       </section>

//       <section id="education" className="py-12 bg-gray-100">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Education</h2>
//           <p>Your education details go here.</p>
//         </div>
//       </section>

//       <section id="experience" className="py-12">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Experience</h2>
//           <p>Your work experience details go here.</p>
//         </div>
//       </section>

//       <section id="projects" className="py-12 bg-gray-100">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Projects</h2>
//           <p>Your project details go here.</p>
//         </div>
//       </section>

//       <section id="awards" className="py-12">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Awards</h2>
//           <p>Your awards and recognitions go here.</p>
//         </div>
//       </section>

//       <section id="skills" className="py-12 bg-gray-100">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Skills</h2>
//           <p>Your skills and proficiencies go here.</p>
//         </div>
//       </section>
//     </>
//   );
// }
