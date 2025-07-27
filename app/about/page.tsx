import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Rahul Bedjavalge',
  description: 'Learn more about Rahul Bedjavalge - Machine Learning Engineer & AI/ML Researcher based in Berlin, Germany.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About Rahul Bedjavalge
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-2xl text-gray-700 mt-8 mb-4">Machine Learning Engineer & AI/ML Researcher</p>
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <span className="text-2xl">📍</span> Berlin, Germany
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Professional Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">👨‍💻</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Professional Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              AI/ML researcher and engineer currently pursuing Master&apos;s in Artificial Intelligence at IU International University of Applied Sciences in Berlin. 
              Experienced in developing object detection models, data analysis, and technology initiatives with a focus on machine learning, computer vision, and generative AI.
            </p>
          </div>
          
          {/* Current Focus Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Current Focus</h2>
            </div>
            <ul className="text-gray-700 space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎓</span> 
                <span>Master&apos;s in Artificial Intelligence (Apr 2024 - Present)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">💼</span> 
                <span>ML Engineer Intern at <a href="https://imouse.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">iMouse GmbH</a></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🔬</span> 
                <span>Object Detection & Computer Vision Research</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🤖</span> 
                <span>YOLO Architecture & Model Optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📊</span> 
                <span>Real-time Surveillance Systems Integration</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">💼</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
          </div>
          
          <div className="space-y-8">
            <div className="relative border-l-4 border-blue-500 pl-8 pb-8">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Machine Learning Engineer (Intern)</h3>
              <p className="text-blue-600 font-semibold text-lg mb-2">
                <a href="https://imouse.info/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 underline">
                  iMouse GmbH
                </a> • Aug 2024 – Present • Berlin, Germany
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Developing and training custom object detection models using YOLO architecture. Conducting R&D on real-time surveillance systems 
                with AI integration, focusing on data collection, preprocessing, and model optimization.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">YOLO</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">Python</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">Roboflow</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">Computer Vision</span>
              </div>
            </div>

            <div className="relative border-l-4 border-green-500 pl-8">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Technology Specialist</h3>
              <p className="text-green-600 font-semibold text-lg mb-2">Infinite Variable Pvt Ltd • Dec 2022 – June 2024 • Pune, India</p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Led cross-functional AI initiatives and technology projects, conducting market research and data analysis for B2C e-commerce operations. 
                Partnered with academia to address client challenges and managed complex technical projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">Data Analysis</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">Market Research</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">E-commerce</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">Project Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Technical Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h4 className="font-bold text-blue-900 mb-4 text-lg">Programming</h4>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Python (Expert)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  React (Advanced)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  JavaScript (Advanced)
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <h4 className="font-bold text-purple-900 mb-4 text-lg">ML & AI</h4>
              <ul className="text-purple-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  TensorFlow (Advanced)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  PyTorch (Advanced)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  YOLO (Expert)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Transformers (Advanced)
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <h4 className="font-bold text-green-900 mb-4 text-lg">Data Tools</h4>
              <ul className="text-green-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Pandas (Expert)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  NumPy (Expert)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  OpenCV (Advanced)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Roboflow (Advanced)
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <h4 className="font-bold text-orange-900 mb-4 text-lg">Cloud & Tools</h4>
              <ul className="text-orange-800 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  AWS (Advanced)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  Google Workspace (Expert)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  Jira (Advanced)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Languages & Interests */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Languages */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌐</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Languages</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                <p className="font-bold text-teal-900 text-lg">English</p>
                <p className="text-teal-700">Fluent</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                <p className="font-bold text-teal-900 text-lg">Hindi</p>
                <p className="text-teal-700">Fluent</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                <p className="font-bold text-teal-900 text-lg">Marathi</p>
                <p className="text-teal-700">Native</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                <p className="font-bold text-teal-900 text-lg">German</p>
                <p className="text-teal-700">Basic</p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">❤️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Interests</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 px-4 py-3 rounded-xl font-medium">
                Research and Innovation
              </span>
              <span className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 px-4 py-3 rounded-xl font-medium">
                Generative AI
              </span>
              <span className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 px-4 py-3 rounded-xl font-medium">
                Traveling
              </span>
              <span className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 px-4 py-3 rounded-xl font-medium">
                Exploring New Technologies
              </span>
            </div>
          </div>
        </div>

        {/* Beta Notice Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">🚧</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Beta Version Notice</h2>
          </div>
          <div className="bg-white rounded-xl p-6 border border-yellow-200">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              🔬 <strong>This portfolio website is currently in Beta/Testing phase!</strong> I&apos;m continuously improving and refining the user experience, 
              AI chat functionality, and overall performance. Your feedback is valuable in making this platform better.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
                <span>⚡</span> Active Development
              </span>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
                <span>🧪</span> Testing Phase
              </span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
                <span>📊</span> Performance Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Future Improvements Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Future Improvements & Roadmap</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI & Chat Enhancements */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span>🤖</span> AI & Chat Enhancements
              </h3>
              <ul className="text-blue-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">▶</span>
                  <span>Advanced conversation memory and context awareness</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">▶</span>
                  <span>Multi-language support for international visitors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">▶</span>
                  <span>Voice interaction capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">▶</span>
                  <span>Enhanced response accuracy and speed optimization</span>
                </li>
              </ul>
            </div>

            {/* User Experience */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <span>✨</span> User Experience
              </h3>
              <ul className="text-purple-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">▶</span>
                  <span>Dark/Light theme toggle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">▶</span>
                  <span>Advanced mobile responsiveness</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">▶</span>
                  <span>Interactive project showcase with live demos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">▶</span>
                  <span>Personalized user preferences</span>
                </li>
              </ul>
            </div>

            {/* Performance & Analytics */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span>📈</span> Performance & Analytics
              </h3>
              <ul className="text-green-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">▶</span>
                  <span>Advanced performance monitoring and optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">▶</span>
                  <span>Real-time user behavior analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">▶</span>
                  <span>Edge computing for faster global response times</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">▶</span>
                  <span>Smart caching and content delivery optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">▶</span>
                  <span>A/B testing for UI improvements</span>
                </li>
              </ul>
            </div>

            {/* New Features */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                <span>🎯</span> New Features
              </h3>
              <ul className="text-orange-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">▶</span>
                  <span>Blog section for technical articles and insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">▶</span>
                  <span>Project collaboration request system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">▶</span>
                  <span>Newsletter subscription for updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">▶</span>
                  <span>Integration with GitHub and LinkedIn APIs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
            <p className="text-gray-700 text-lg text-center">
              <strong>🔄 Continuous Improvement:</strong> This portfolio is constantly evolving with new features, 
              performance improvements, and user experience enhancements based on visitor feedback and latest web technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
