import Link from 'next/link';
import Chatbot from './components/Chatbot';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full bg-white-400">
      {/* Column 1 */}
      <div className="w-full md:w-1/2 text-left md:text-left p-10">
        <h1 style={{ fontSize: '5vw' }} className="font-bold mb-4">Hi. I&apos;m Nam</h1>
        <div style={{ fontSize: '1.5rem', marginBottom: '4rem' }} className="text-xl mb-8">I am an AI engineer focused on leveraging artificial intelligence to solve complex challenges and drive innovation. 
        
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
            href="/CV_Updated_1905.pdf"
            className="px-4 py-4 text-white rounded-md hover:bg-blue-700 ml-4"
          >
            See My Resume
          </Link>

        </div>
      </div>

      {/* Column 2 */}
      <div className="w-2/5 md:w-1/2 p-10 flex flex-col h-full justify-center ">
        <p className='text-center font-bold mb-4 text-3xl'>
          Ask Nam Anything
        </p>
          <Chatbot />
      </div>
    </div>
  );
}
