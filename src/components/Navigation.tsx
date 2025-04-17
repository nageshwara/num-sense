"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: '/home.svg' },
  { label: 'Explore', href: '/explore', icon: '/window.svg' },
  { label: 'Skip Counting', href: '/skip-counting', icon: '/file.svg' },
  { label: 'Addition', href: '/addition', icon: '/file.svg' },
  { label: 'Subtraction', href: '/subtraction', icon: '/file.svg' },
  { label: 'Quiz', href: '/quiz', icon: '/globe.svg' },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">Number Sense</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`text-lg hover:text-white/80 transition-colors ${
                pathname === item.href ? 'font-bold underline' : 'font-medium'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex">
          {/* Mobile menu button would go here */}
          <button className="text-white">Menu</button>
        </div>
      </div>
    </nav>
  );
};
