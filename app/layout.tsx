import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from './components/Sidebar';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "RahulAI - Rahul Bedjavalge's AI Portfolio",
  description: 'AI-powered portfolio showcasing Rahul Bedjavalge\'s projects, skills, and expertise in Full Stack Development & AI',
  authors: [{ name: "Rahul Bedjavalge" }],
  keywords: ["Rahul Bedjavalge", "RahulAI", "AI Portfolio", "Full Stack Developer", "AI Specialist"]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
