const processMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data; // Return the data so the caller can use it
  
    } catch (error) {
      throw new Error('Failed to generate response.');
    }
  };
  
  export default processMessage;
  
//   const processMessage = async (message) => {
//     try {
//       const response = await fetch('http://localhost:8000/api/chat/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: message }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: data, isUser: false }, // Assuming the bot's reply is in `data.reply`
//       ]);

//     } catch (error) {
//       setError('Failed to generate response.');
//     }
//   };