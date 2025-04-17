import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Number Sense for Kindergartners</h1>
      
      <p className="text-xl max-w-2xl text-center mb-12">
        Welcome to Number Sense! Let&apos;s learn about numbers up to 9999 using visual blocks.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <ModeCard 
          title="Free Exploration" 
          description="Enter any number and see how it looks with blocks"
          href="/explore"
          color="bg-blue-500"
        />
        <ModeCard 
          title="Skip Counting" 
          description="Learn to count by 2s, 5s, 10s and more"
          href="/skip-counting"
          color="bg-green-500"
        />
        <ModeCard 
          title="Addition" 
          description="Watch numbers add together with visual blocks"
          href="/addition"
          color="bg-purple-500"
        />
        <ModeCard 
          title="Subtraction" 
          description="See how subtraction works with number blocks"
          href="/subtraction"
          color="bg-orange-500"
        />
        <ModeCard 
          title="Quiz" 
          description="Test your skills with fun addition and subtraction questions"
          href="/quiz"
          color="bg-red-500"
        />
      </div>
    </div>
  );
}

type ModeCardProps = {
  title: string;
  description: string;
  href: string;
  color: string;
};

const ModeCard: React.FC<ModeCardProps> = ({ title, description, href, color }) => {
  return (
    <Link href={href} className="block">
      <div className={`${color} hover:scale-105 transition-transform rounded-xl p-6 h-full flex flex-col text-white shadow-lg`}>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="opacity-90 flex-grow">{description}</p>
        <div className="mt-4 flex justify-end">
          <span className="text-sm font-bold uppercase tracking-wider">Start →</span>
        </div>
      </div>
    </Link>
  );
};