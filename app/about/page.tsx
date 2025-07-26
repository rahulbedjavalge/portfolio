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
              AI/ML researcher and engineer currently pursuing Master's in Artificial Intelligence at IU International University of Applied Sciences in Berlin. 
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
                <span>Master's in Artificial Intelligence (Apr 2024 - Present)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">💼</span> 
                <span>ML Engineer Intern at iMouse Solution</span>
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
              <p className="text-blue-600 font-semibold text-lg mb-2">iMouse Solution • Aug 2024 – Present • Berlin, Germany</p>
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
      </div>
    </div>
  );
}
