// page.js

import Introduction from './components/Introduction';
import Chatbot from './components/Chatbot';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full bg-white-400">
      {/* Column 1 */}
      <Introduction />

      {/* Column 2 */}
      <div className="w-2/5 md:w-1/2 p-10 flex flex-col h-full justify-center">
        <p className='text-center font-bold mb-4 text-3xl'>
          Ask Nam Anything
        </p>
        <Chatbot />
      </div>
    </div>
  );
}
