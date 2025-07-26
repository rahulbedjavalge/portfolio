import { Metadata } from 'next';
import { Mail, Phone, MapPin, Calendar, Linkedin, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - Rahul Bedjavalge',
  description: 'Get in touch with Rahul Bedjavalge - Machine Learning Engineer & AI/ML Researcher based in Berlin, Germany.',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600">
              I&apos;m always interested in discussing new opportunities, collaborations, and innovative projects in AI/ML.
            </p>
          </div>

          {/* Centered Single Column Layout */}
          <div className="max-w-3xl mx-auto">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:rahulinberlinn@gmail.com" className="text-blue-600 hover:text-blue-800 text-lg">
                      rahulinberlinn@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:+4915560375039" className="text-green-600 hover:text-green-800 text-lg">
                      +49 155 6037 5039
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600 text-lg">Berlin, Germany</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Availability</p>
                    <p className="text-gray-600 text-lg">Open for collaborations & opportunities</p>
                  </div>
                </div>
              </div>

              {/* Social Links - Centered */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Me</h3>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://www.linkedin.com/in/rahul-bedjavalge-09ab90245"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Linkedin className="h-8 w-8" />
                  </a>
                  <a
                    href="https://github.com/bedjavalgerahul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white p-4 rounded-xl hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Github className="h-8 w-8" />
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Status Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Current Status</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                <div className="space-y-3">
                  <p className="text-blue-800 text-lg flex items-center justify-center gap-2">
                    🎓 <span className="font-semibold">Master&apos;s Student in AI at IU International University</span>
                  </p>
                  <p className="text-purple-800 text-lg flex items-center justify-center gap-2">
                    💼 <span className="font-semibold">ML Engineer Intern at iMouse Solution</span>
                  </p>
                  <p className="text-green-800 text-lg flex items-center justify-center gap-2">
                    🔍 <span className="font-semibold">Open to full-time opportunities in AI/ML</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Areas of Interest */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              I&apos;m particularly interested in discussing:
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Machine Learning Projects</h3>
                <p className="text-blue-800 text-sm">
                  Object detection, computer vision, and deep learning implementations
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Research Collaborations</h3>
                <p className="text-green-800 text-sm">
                  AI research initiatives and academic partnerships
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Career Opportunities</h3>
                <p className="text-purple-800 text-sm">
                  Full-time positions in AI/ML engineering and research roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
