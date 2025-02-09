import Link from "next/link";

export default function Contact() {
  return (
    <div className="px-6 py-10 w-full max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
      <p className="text-lg text-center mb-6">
        Feel free to reach out via email at{" "}
        <a href="mailto:itsnamfam@gmail.com" className="text-blue-600 hover:underline">
          itsnamfam@gmail.com.
        </a>
        {/* {" "}
        or use the form below. */}
      </p>

      {/* <form className="space-y-5">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="name" className="block text-lg font-medium mb-1">
              Name
            </label>
            <input type="text" id="name" className="w-full p-2 border rounded-md focus:outline-blue-500" />
          </div>
          <div className="w-1/2">
            <label htmlFor="email" className="block text-lg font-medium mb-1">
              Email
            </label>
            <input type="email" id="email" className="w-full p-2 border rounded-md focus:outline-blue-500" />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-lg font-medium mb-1">
            Subject
          </label>
          <input type="text" id="subject" className="w-full p-2 border rounded-md focus:outline-blue-500" />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-medium mb-1">
            Message
          </label>
          <textarea id="message" rows="4" className="w-full p-2 border rounded-md focus:outline-blue-500"></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto">
          Send Message
        </button>
      </form> */}

    </div>
  );
}
