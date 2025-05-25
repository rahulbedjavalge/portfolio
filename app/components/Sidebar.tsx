'use client';

import Link from 'next/link';
import { Home, User, Mail, FileText, Github, Linkedin, Globe } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { title: 'Home', icon: <Home size={20} />, href: '/' },
    { title: 'About', icon: <User size={20} />, href: '/about' },
    { title: 'Contact', icon: <Mail size={20} />, href: '/contact' },
    { title: 'FAQ', icon: <FileText size={20} />, href: '/faq' },
  ];

  const socialLinks = [
    { 
      title: 'GitHub',
      icon: <Github size={20} />,
      href: 'https://github.com/rahulbedjavalge'
    },
    { 
      title: 'LinkedIn',
      icon: <Linkedin size={20} />,
      href: 'https://www.linkedin.com/in/rahul-bedjavalge/'
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">RahulAI</h2>
        <p className="text-sm text-gray-400">AI-Powered Portfolio Assistant</p>
      </div>

      <nav className="mb-8">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg mb-2"
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-700 pt-4 mt-auto">
        <h3 className="text-sm font-semibold mb-4">Connect with Rahul</h3>
        <div className="flex flex-col gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg"
            >
              {link.icon}
              <span>{link.title}</span>
            </a>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RahulAI<br />
        All rights reserved
      </div>
    </div>
  );
};

export default Sidebar;
