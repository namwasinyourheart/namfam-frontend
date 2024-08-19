// components/Navbar.js
import Link from 'next/link';

const categories = [
    { name: 'All', href: '/projects/' },
    { name: 'ML', href: '/projects/ml' },
    { name: 'DL', href: '/projects/dl' },
    { name: 'NLP', href: '/projects/nlp' },
    { name: 'CV', href: '/projects/cv' },
    { name: 'GenAI', href: '/projects/genai' },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center space-x-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="hover:underline">
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
