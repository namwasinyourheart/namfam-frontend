// Resume.js

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Resume() {
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect to the PDF file
//     router.push('/CV_Updated_1905.pdf');
//   }, [router]);

//   return null;
// }


export default function Resume() {
  return (
    <div className="flex justify-center items-center h-screen">
      <embed
        src="/CV_Updated_1905.pdf"
        type="application/pdf"
        width="80%"
        height="80%"
      />
    </div>
  );
}
