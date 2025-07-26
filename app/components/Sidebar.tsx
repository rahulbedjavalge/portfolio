'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, User, Mail, FileText, Github, Linkedin, Menu, X, Download } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900/90 backdrop-blur-md text-white rounded-xl shadow-lg hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-4 z-40 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="mb-8 mt-12 lg:mt-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">RahulAI</h2>
          <p className="text-xs sm:text-sm text-gray-400">AI-Powered Portfolio Assistant</p>
        </div>

        <nav className="mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg mb-2 text-sm sm:text-base"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-700 pt-4 mt-auto">
          {/* Download CV Button */}
          <div className="mb-4">
            <a
              href="/RahulBedjavalge.pdf"
              download="Rahul_Bedjavalge_CV.pdf"
              className="flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 w-full text-center justify-center"
            >
              <Download size={20} />
              <span>Download CV</span>
            </a>
          </div>
          
          <h3 className="text-xs sm:text-sm font-semibold mb-4">Connect with Rahul</h3>
          <div className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg text-sm sm:text-base"
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
    </>
  );
};

export default Sidebar;
