import Link from 'next/link';
import "./styles.css"

export default function Contact() {
  return (

      <div className="px-4 py-8 w-full max-w-4xl mx-auto">
        {/* <div class="section"> */}
          <div class="container">
            <div class="section-title">
              <h2>Contact me </h2>
            </div>
            
          </div>
        {/* </div> */}

        <h1 className="text-4xl font-bold mb-4 text-center">Contact Me</h1>
        If you would like to get in touch, please use the contact form below or reach out to me via email at{' '}
        <a href="mailto:itsnamfam@gmail.com" 
        className="text-blue-600 hover:underline">
          itsnamfam@gmail.com
        </a>.
        <form className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
            <input type="text" id="name" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-1">Message</label>
            <textarea id="message" rows="4" className="w-full p-2 border rounded-md"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Send Message
          </button>

          <a href='#contact' class="bg-red-400 btn"> Hire me </a>
        </form>
      </div>

  );
}
